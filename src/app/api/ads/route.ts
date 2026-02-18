import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const position = searchParams.get('position');

        if (!position) {
            return NextResponse.json({ error: 'Position required' }, { status: 400 });
        }

        const now = new Date();
        const bufferNow = new Date(now.getTime() + 1000 * 60 * 5); // 5 min buffer for clock drift

        // Fetch active ads for the specified position
        const ads = await prisma.advertisement.findMany({
            where: {
                position,
                status: 'ACTIVE',
                OR: [
                    { startDate: null },
                    { startDate: { lte: bufferNow } }
                ],
                AND: [
                    {
                        OR: [
                            { endDate: null },
                            { endDate: { gte: now } }
                        ]
                    }
                ]
            }
        });

        // Optionally record an impression here? 
        // For now, just return the ads. Let the client pick or return a random one if multiple.

        return NextResponse.json(ads);
    } catch (error) {
        console.error("Fetch ads error:", error);
        return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { adId } = await request.json();
        if (!adId) return NextResponse.json({ error: 'Ad ID required' }, { status: 400 });

        // Increment click count
        await prisma.advertisement.update({
            where: { id: adId },
            data: { clicks: { increment: 1 } }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to record click' }, { status: 500 });
    }
}
