"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CalendarClient() {
    const { language } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Placeholder data for Panchang (Dynamic in real app)
    const panchangData = [
        { label: "Tithi", value: "Panchami", icon: "dark_mode" },
        { label: "Nakshatra", value: "Chitra", icon: "star" },
        { label: "Yoga", value: "Shubha", icon: "self_improvement" },
        { label: "Karana", value: "Bava", icon: "work" },
        { label: "Rashi", value: "Kumbha", icon: "stars" },
    ];

    const upcomingEvents = [
        { date: "Falgun 19", title: "Maha Shivaratri", desc: "Hindu festival celebrated annually in honour of Lord Shiva.", holiday: true },
        { date: "Falgun 24", title: "Int'l Women's Day", desc: "Nari Diwas - Celebrating achievements of women.", holiday: false },
        { date: "Chaitra 3", title: "Fagu Purnima (Holi)", desc: "The festival of colors celebrated on the full moon day.", holiday: true },
    ];

    const days = [
        { en: "Sun", np: "आइत" }, { en: "Mon", np: "सोम" }, { en: "Tue", np: "मंगल" },
        { en: "Wed", np: "बुध" }, { en: "Thu", np: "बिही" }, { en: "Fri", np: "शुक्र" }, { en: "Sat", np: "शनि" }
    ];

    // Generate Calendar Grid (Mock for visual as per design)
    // Starting from 27th of previous month equivalent
    const calendarGrid = Array(35).fill(null).map((_, i) => {
        // Mock logic to match the visual provided
        // We want 27, 28, 29 (prev month) then 1..16+

        let npDate;
        let enDay;
        let isPrevMonth = false;

        if (i < 3) {
            npDate = 27 + i;
            isPrevMonth = true;
            enDay = ""; // No English date shown for prev month in design
        } else {
            npDate = i - 2;
            enDay = i + 10; // Mock english date mapping
        }

        const isToday = npDate === 15 && !isPrevMonth;
        const isHoliday = (npDate === 4 || npDate === 11) && !isPrevMonth; // Mocking red dates from design (4, 11)

        return {
            np: npDate,
            en: enDay,
            isPrevMonth,
            isToday,
            isHoliday
        };
    });

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 pb-12 font-sans">
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Sub Header Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-sans">Nepali Calendar 2080</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium font-sans">Phagun - Chaitra | Bikram Sambat</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 font-sans active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-primary">event_note</span>
                            Today: 15 Phagun
                        </button>
                        <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all font-sans">
                            Add Event
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Panchang */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/5 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary font-bold">flare</span>
                                <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs font-sans">Daily Panchang</h3>
                            </div>
                            <div className="p-0">
                                {panchangData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <span className="text-sm text-slate-500 font-medium font-sans">{item.label}</span>
                                        <span className="text-sm text-slate-900 dark:text-white font-bold font-sans">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                    <span className="text-xs font-bold uppercase text-slate-500 tracking-wider font-sans">Auspicious Time</span>
                                </div>
                                <p className="text-lg font-bold text-primary dark:text-primary-light font-sans">11:45 AM - 12:30 PM</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary to-slate-800 rounded-xl p-5 text-white shadow-xl">
                            <h4 className="font-bold mb-2 flex items-center gap-2 font-sans">
                                <span className="material-symbols-outlined">lightbulb</span>
                                Did you know?
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-200 font-sans">
                                The Bikram Sambat (B.S.) calendar is approximately 56.7 years ahead of the Gregorian Calendar (A.D.). It was founded by King Bikramaditya.
                            </p>
                        </div>
                    </div>

                    {/* Center Column: Calendar Grid */}
                    <div className="lg:col-span-6">
                        <div className="flex flex-col items-center mb-8 text-center">
                            <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 font-sans">आज : TODAY</span>
                            <h2 className="text-6xl font-black text-slate-800 dark:text-white mb-2 font-sans">१५ फागुन २०८०</h2>
                            <p className="text-slate-500 font-semibold font-sans">Tuesday, 27 February 2024</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-7 mb-6">
                                {days.map((day, i) => (
                                    <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">
                                        {language === "np" ? day.np : day.en}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {calendarGrid.map((date, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 font-sans relative
                                            ${date.isPrevMonth ? "text-slate-300 dark:text-slate-600" : ""}
                                            ${!date.isPrevMonth && !date.isToday ? "border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 hover:shadow-sm cursor-pointer" : ""}
                                            ${date.isToday ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 font-bold scale-105" : "text-slate-800 dark:text-white"}
                                        `}
                                    >
                                        <span className={`text-lg font-bold ${date.isHoliday && !date.isToday ? "text-red-500" : ""}`}>
                                            {date.np}
                                        </span>
                                        {!date.isPrevMonth && (
                                            <span className={`text-[10px] ${date.isToday ? "opacity-90" : "text-slate-400"}`}>
                                                {date.en}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                <div className="bg-orange-50 p-3 rounded-xl">
                                    <span className="material-symbols-outlined text-orange-500">wb_sunny</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Sunrise</p>
                                    <p className="text-lg font-black text-slate-800 dark:text-white font-sans">06:42 AM</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                <div className="bg-orange-50 p-3 rounded-xl">
                                    <span className="material-symbols-outlined text-orange-500">wb_twilight</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Sunset</p>
                                    <p className="text-lg font-black text-slate-800 dark:text-white font-sans">06:12 PM</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                <div className="bg-orange-50 p-3 rounded-xl">
                                    <span className="material-symbols-outlined text-orange-500">stars</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Tithi / Pakshya</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white font-sans">Magh Shukla Pakshya, Panchami</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Upcoming Events */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 dark:text-white font-sans">Upcoming Events</h3>
                                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-sans">Falgun</span>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {upcomingEvents.map((event, i) => (
                                    <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer block">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors font-sans">{event.date}</span>
                                            {event.holiday && (
                                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 font-sans">Public Holiday</span>
                                            )}
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans group-hover:text-primary transition-colors">{event.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1 font-sans">{event.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-slate-100 dark:border-slate-800 uppercase tracking-widest font-sans">
                                View All Events
                            </button>
                        </div>
                        {/* Ad or Secondary Feature */}
                        <div className="mt-6 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-dashed border-slate-300 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">cloud</span>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Weather - Kathmandu</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-white font-sans">18°C / 4°C · Sunny</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Trivia Section */}
                <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        <div className="col-span-1">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic font-sans">Calendar Trivia</h3>
                            <div className="h-1 w-12 bg-primary rounded-full"></div>
                        </div>
                        <div className="col-span-2">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium font-sans">
                                Did you know that Nepal uses the Bikram Sambat system as its official calendar? While most of the world operates on the Gregorian calendar, Nepal's lunar-solar calendar features 12 months with the number of days in each month ranging from 29 to 32, determined by astrological calculations. The new year begins in mid-April (Baisakh 1st).
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
