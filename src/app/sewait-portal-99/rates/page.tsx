"use client";

import React, { useState, useEffect } from "react";

export default function RefinedRatesPage() {
    const [loading, setLoading] = useState(false);
    const [gold24, setGold24] = useState("");
    const [gold22, setGold22] = useState("");
    const [silver, setSilver] = useState("");

    // NEPSE State
    const [nepseIndex, setNepseIndex] = useState("");
    const [nepseChange, setNepseChange] = useState("");
    const [nepsePercent, setNepsePercent] = useState("");
    const [nepseTurnover, setNepseTurnover] = useState("");
    const [nepseStatus, setNepseStatus] = useState("Open");

    const [historicalRates, setHistoricalRates] = useState<any[]>([]);

    useEffect(() => {
        fetchCurrentRates();
    }, []);

    const fetchCurrentRates = async () => {
        try {
            const goldRes = await fetch("/api/sewait-portal-99/rates/gold");
            const goldData = await goldRes.json();
            if (goldData.id) {
                setGold24(goldData.gold24.toString());
                setGold22(goldData.gold22?.toString() || "");
                setSilver(goldData.silver.toString());
            }

            const nepseRes = await fetch("/api/sewait-portal-99/rates/nepse");
            const nepseData = await nepseRes.json();
            if (nepseData.id) {
                setNepseIndex(nepseData.index.toString());
                setNepseChange(nepseData.change.toString());
                setNepsePercent(nepseData.percentChange.toString());
                setNepseTurnover(nepseData.turnover?.toString() || "");
                setNepseStatus(nepseData.status);
            }
        } catch (error) {
            console.error("Failed to fetch current rates", error);
        }
    };

    const handleGoldSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/rates/gold", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gold24, gold22, silver }),
            });
            if (res.ok) alert("Gold & Silver rates updated!");
            else alert("Failed to update gold rates.");
        } catch (err) {
            alert("Error updating gold rates.");
        } finally {
            setLoading(false);
        }
    };

    const handleNepseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/rates/nepse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    index: nepseIndex,
                    change: nepseChange,
                    percentChange: nepsePercent,
                    turnover: nepseTurnover,
                    status: nepseStatus
                }),
            });
            if (res.ok) alert("NEPSE data updated!");
            else alert("Failed to update NEPSE data.");
        } catch (err) {
            alert("Error updating NEPSE data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Market Rates Management</h2>
                <p className="text-slate-500 mt-1">Update and monitor daily market prices and stock indicators.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Gold Update Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gold & Silver Rates</h3>
                    </div>

                    <form onSubmit={handleGoldSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gold (24 Carat) / Tola</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                                    <input
                                        type="number"
                                        value={gold24}
                                        onChange={(e) => setGold24(e.target.value)}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Silver / Tola</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                                    <input
                                        type="number"
                                        value={silver}
                                        onChange={(e) => setSilver(e.target.value)}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-amber-500 text-white font-black rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">sync</span>
                            Update Bullion Rates
                        </button>
                    </form>
                </div>

                {/* NEPSE Update Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">NEPSE Stock Summary</h3>
                    </div>

                    <form onSubmit={handleNepseSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Index Value</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={nepseIndex}
                                    onChange={(e) => setNepseIndex(e.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-sm font-bold outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Total Turnover (CR)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={nepseTurnover}
                                    onChange={(e) => setNepseTurnover(e.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-sm font-bold outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Points Change</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={nepseChange}
                                    onChange={(e) => setNepseChange(e.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-sm font-bold outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Percent Change (%)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={nepsePercent}
                                    onChange={(e) => setNepsePercent(e.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-sm font-bold outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-2">
                            <label className="text-xs font-bold text-slate-500">Market Status:</label>
                            <div className="flex gap-4">
                                {["Open", "Closed"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setNepseStatus(s)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${nepseStatus === s
                                                ? (s === "Open" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200")
                                                : "bg-slate-100 text-slate-400 border border-transparent"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            <span className="material-symbols-outlined text-xl">upload</span>
                            Publish NEPSE Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
