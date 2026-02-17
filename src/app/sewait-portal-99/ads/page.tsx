"use client";

import React, { useState, useEffect } from "react";

const PLACEMENTS = [
    { id: "HOME_HERO", name: "Home Page - Hero Banner", size: "1200x400" },
    { id: "SIDEBAR", name: "Sidebar - Square Widget", size: "400x400" },
    { id: "FOOTER", name: "Footer - Wide Strip", size: "1200x200" },
    { id: "UTILITY_TOP", name: "Utility Page - Top Banner", size: "800x150" },
];

export default function AdsManagementPage() {
    const [loading, setLoading] = useState(false);
    const [ads, setAds] = useState<any[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        client: "",
        position: "HOME_HERO",
        imageUrl: "",
        link: "",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/ads");
            const data = await res.json();
            if (Array.isArray(data)) {
                setAds(data);
            }
        } catch (error) {
            console.error("Failed to fetch ads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/ads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsCreateModalOpen(false);
                fetchAds();
                setFormData({ name: "", client: "", position: "HOME_HERO", imageUrl: "", link: "", startDate: "", endDate: "" });
            }
        } catch (error) {
            console.error("Failed to create ad", error);
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
                    <h2 className="text-3xl font-black text-primary dark:text-blue-400 tracking-tight">Campaign Center</h2>
                    <p className="text-slate-500 font-medium">Schedule, place, and monitor high-performance ads.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">add_circle</span>
                    Launch Campaign
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Ads</p>
                    <h3 className="text-3xl font-black mt-2">{ads.filter(a => a.status === 'ACTIVE').length}</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Impressions</p>
                    <h3 className="text-3xl font-black mt-2 text-blue-500">
                        {ads.reduce((acc, curr) => acc + curr.impressions, 0).toLocaleString()}
                    </h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Clicks</p>
                    <h3 className="text-3xl font-black mt-2 text-[#07883b]">
                        {ads.reduce((acc, curr) => acc + curr.clicks, 0).toLocaleString()}
                    </h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Revenue (est.)</p>
                    <h3 className="text-3xl font-black mt-2 text-orange-500">
                        NPR {ads.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
                    </h3>
                </div>
            </div>

            {/* Ads List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-8 py-4">Campaign & Placement</th>
                                <th className="px-8 py-4">Reach (Imp/Clk)</th>
                                <th className="px-8 py-4">Schedule</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden shadow-inner">
                                                <img src={ad.imageUrl} alt={ad.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white leading-tight">{ad.name}</p>
                                                <p className="text-xs font-bold text-primary mt-1 uppercase tracking-tighter">{ad.position}</p>
                                                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{ad.client || 'Direct Client'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-700 dark:text-slate-300">{ad.impressions.toLocaleString()} views</span>
                                            <span className="text-[10px] font-bold text-slate-400">{ad.clicks.toLocaleString()} clicks</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-black text-slate-500 uppercase">Starts: {ad.startDate ? new Date(ad.startDate).toDateString() : 'ASAP'}</span>
                                            <span className="text-[10px] font-black text-red-400 uppercase">Ends: {ad.endDate ? new Date(ad.endDate).toDateString() : 'NEVER'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ad.status === 'ACTIVE' ? 'bg-[#07883b]/10 text-[#07883b]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                            }`}>
                                            {ad.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                                            <button onClick={() => handleDelete(ad.id, ad.name)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-red-500 transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Ad Modal (Standardized form as per design assets) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Create New Campaign</h3>
                                <p className="text-sm text-slate-500 font-medium">Configure placements and scheduling rules.</p>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-slate-500">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateAd} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Campaign Title</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                        placeholder="e.g. Summer Festival 2024"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Client / Brand</label>
                                    <input
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                        placeholder="e.g. Ncell Axiata"
                                        value={formData.client}
                                        onChange={e => setFormData({ ...formData, client: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Placement Position</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {PLACEMENTS.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => setFormData({ ...formData, position: p.id })}
                                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.position === p.id
                                                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                                                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                                                }`}
                                        >
                                            <p className="font-bold text-xs text-slate-800 dark:text-white">{p.name}</p>
                                            <p className="text-[10px] text-slate-400 mt-1 font-black uppercase">Spec: {p.size}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Graphic Asset (URL)</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                    placeholder="https://content.sewait.com/ads/banner1.jpg"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Destination Link</label>
                                <input
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                    placeholder="https://client-landing-page.com"
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                        value={formData.endDate}
                                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Launch Campaign Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
