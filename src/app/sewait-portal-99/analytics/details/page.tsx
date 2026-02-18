"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function AnalyticsDetailsPage() {
    const [fetching, setFetching] = useState(true);
    const [stats, setStats] = useState({
        devices: [
            { name: "Mobile", percentage: 65, icon: "smartphone" },
            { name: "Desktop", percentage: 30, icon: "desktop_windows" },
            { name: "Tablet", percentage: 5, icon: "tablet_mac" },
        ],
        locations: [
            { city: "Kathmandu", sessions: "12.4k", trend: "+12%" },
            { city: "Pokhara", sessions: "3.2k", trend: "+5%" },
            { city: "Lalitpur", sessions: "2.8k", trend: "+8%" },
            { city: "Biratnagar", sessions: "1.5k", trend: "-2%" },
        ],
        userRetention: "78%",
        avgSessionDuration: "4m 32s",
    });

    useEffect(() => {
        // Simulation of fetching deeper data
        const timer = setTimeout(() => setFetching(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <FadeIn direction="up">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/sewait-portal-99/analytics"
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline mb-2"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Analytics Overview
                        </Link>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Deep Dive Metrics</h2>
                        <p className="text-slate-500">Exploration of user behavior, device distribution, and geographic reach.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Device Distribution */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 className="font-bold text-slate-800 dark:text-white mb-6">Device Distribution</h4>
                        <div className="space-y-6">
                            {stats.devices.map((device) => (
                                <div key={device.name} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-slate-400">{device.icon}</span>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{device.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-primary">{device.percentage}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${device.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Geography */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 className="font-bold text-slate-800 dark:text-white mb-6">Top Locations (Sessions)</h4>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {stats.locations.map((loc) => (
                                <div key={loc.city} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{loc.city}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-black text-slate-900 dark:text-white">{loc.sessions}</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${loc.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {loc.trend}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 p-8 rounded-3xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 mb-1">User Retention</p>
                            <h3 className="text-4xl font-black text-emerald-900 dark:text-emerald-100">{stats.userRetention}</h3>
                        </div>
                        <span className="material-symbols-outlined text-5xl text-emerald-200 dark:text-emerald-800/50">person_check</span>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-8 rounded-3xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 mb-1">Avg. Session Time</p>
                            <h3 className="text-4xl font-black text-blue-900 dark:text-blue-100">{stats.avgSessionDuration}</h3>
                        </div>
                        <span className="material-symbols-outlined text-5xl text-blue-200 dark:text-blue-800/50">timer</span>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
