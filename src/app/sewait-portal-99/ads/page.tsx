"use client";

import React, { useState, useEffect, useRef } from "react";

// Categorized placements for granular control
const PLACEMENT_CATEGORIES = {
    "HOME": [
        { id: "HOME_HERO", name: "Hero Banner (Top)", size: "1200x400" },
        { id: "HOME_SIDEBAR", name: "Sidebar Widget", size: "400x400" },
        { id: "HOME_FOOTER", name: "Footer Strip", size: "1200x200" }
    ],
    "CALENDAR": [
        { id: "CALENDAR_TOP", name: "Top Banner", size: "1200x200" },
        { id: "CALENDAR_SIDEBAR", name: "Sidebar Widget", size: "400x400" }
    ],
    "NEPSE": [
        { id: "NEPSE_TOP", name: "Top Info Bar", size: "1200x150" }
    ],
    "GOLD_SILVER": [
        { id: "GOLD_HEADER", name: "Header Banner", size: "1200x300" }
    ],
    "SERVICES": [
        { id: "GOV_LIST", name: "List Interstitial", size: "800x200" }
    ],
    "WEATHER": [
        { id: "WEATHER_BOTTOM", name: "Widget Bottom", size: "400x200" }
    ]
};

import Link from "next/link";

export default function AdsManagementPage() {
    const [loading, setLoading] = useState(false);
    const [ads, setAds] = useState<any[]>([]);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/ads");
            const data = await res.json();
            if (Array.isArray(data)) setAds(data);
        } catch (error) {
            console.error("Failed to fetch ads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Permanently remove campaign: "${name}"?`)) return;
        try {
            await fetch(`/api/sewait-portal-99/ads?id=${id}`, { method: "DELETE" });
            setAds(ads.filter(ad => ad.id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">Campaign Center</h2>
                    <p className="text-slate-500 font-medium">Manage and monitor all active ad placements.</p>
                </div>
                <Link
                    href="/sewait-portal-99/ads/launch"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">add_circle</span>
                    Launch New Campaign
                </Link>
            </header>

            {/* Ads List Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-8 py-5">Campaign & Client</th>
                                <th className="px-8 py-5">Position</th>
                                <th className="px-8 py-5">Performance</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ads.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <span className="material-symbols-outlined text-6xl">campaign</span>
                                            <p className="font-black uppercase tracking-widest text-xs">No active campaigns</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden shadow-inner border border-slate-100 dark:border-slate-700">
                                                <img src={ad.imageUrl} alt={ad.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white leading-tight">{ad.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{ad.client || 'Direct Client'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full w-fit uppercase">{ad.position.split('_')[0]}</span>
                                            <span className="text-xs font-bold text-slate-500">{ad.position.split('_').slice(1).join(' ').toLowerCase()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800 dark:text-white">{ad.clicks || 0} Clicks</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Lifetime Interaction</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ad.status === 'ACTIVE' ? 'bg-[#07883b]/10 text-[#07883b]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                            {ad.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 rounded-xl transition-all"
                                                title="View Details"
                                            >
                                                <span className="material-symbols-outlined text-xl">analytics</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ad.id, ad.name)}
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-all"
                                                title="Delete Campaign"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
