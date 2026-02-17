import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Simple in-memory cache
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get('lat') || '27.7172'; // Default Kathmandu lat
        const lon = searchParams.get('lon') || '85.3240'; // Default Kathmandu lon
        const cacheKey = `${lat},${lon}`;

        // Check cache first
        const cached = cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            return NextResponse.json(cached.data);
        }

        // Get Configs (API Key & Module Status)
        const configs = await prisma.systemConfig.findMany({
            where: {
                key: { in: ['API_WEATHER', 'MODULE_WEATHER'] }
            }
        });

        const apiKey = configs.find(c => c.key === 'API_WEATHER')?.value;
        const isEnabled = configs.find(c => c.key === 'MODULE_WEATHER')?.value === 'true';

        if (!isEnabled && apiKey) {
            // If disabled but key exists, potentially return error or empty? 
            // For now, let's allow it if key exists but maybe frontend handles 'disabled' UI
        }

        if (!apiKey) {
            return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
        }

        // Use One Call API 3.0 for precise daily data
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        // Handle failures by falling back to 2.5 API
        if (!response.ok) {
            console.warn(`Weather API 3.0 failed with status ${response.status}. Trying fallback...`);

            const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const fbRes = await fetch(fallbackUrl);

            if (fbRes.ok) {
                const fbData = await fbRes.json();
                const result = {
                    current: {
                        temp: Math.round(fbData.main.temp),
                        condition: fbData.weather[0].main,
                        description: fbData.weather[0].description,
                        city: fbData.name,
                        sunrise: fbData.sys.sunrise,
                        sunset: fbData.sys.sunset,
                        humidity: fbData.main.humidity,
                        wind: fbData.wind.speed
                    },
                    forecast: [], // 2.5 doesn't easily provide 8-day forecast in one call
                    past: null
                };
                cache.set(cacheKey, { data: result, timestamp: Date.now() });
                return NextResponse.json(result);
            }

            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json({
                error: errorData.message || 'Failed to fetch weather data',
                code: response.status
            }, { status: 400 });
        }

        const data = await response.json();

        // Optional: Fetch Yesterday's data (One Call 3.0 feature)
        let yesterdayData = null;
        try {
            const yesterdayTs = Math.floor(Date.now() / 1000) - 86400;
            const historyUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${yesterdayTs}&appid=${apiKey}&units=metric`;
            const hRes = await fetch(historyUrl);
            if (hRes.ok) {
                const hData = await hRes.json();
                yesterdayData = {
                    temp: Math.round(hData.data[0].temp),
                    condition: hData.data[0].weather[0].main,
                    humidity: hData.data[0].humidity
                };
            }
        } catch (e) {
            console.error("Historical fetch failed", e);
        }

        const result = {
            current: {
                temp: Math.round(data.current.temp),
                condition: data.current.weather[0].main,
                description: data.current.weather[0].description,
                city: data.timezone.split('/')[1]?.replace('_', ' ') || 'Local',
                sunrise: data.daily[0].sunrise,
                sunset: data.daily[0].sunset,
                humidity: data.current.humidity,
                wind: data.current.wind_speed,
                uv: data.current.uvi
            },
            forecast: data.daily.map((d: any) => ({
                dt: d.dt,
                temp: {
                    max: Math.round(d.temp.max),
                    min: Math.round(d.temp.min)
                },
                condition: d.weather[0].main,
                icon: d.weather[0].icon
            })),
            past: yesterdayData
        };

        // Cache result
        cache.set(cacheKey, { data: result, timestamp: Date.now() });

        return NextResponse.json(result);

    } catch (error) {
        console.error("Weather API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
