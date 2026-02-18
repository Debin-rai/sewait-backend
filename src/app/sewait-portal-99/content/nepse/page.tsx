"use client";

import React from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function NepseDataPage() {
    return (
        <FadeIn direction="up">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/sewait-portal-99/content"
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline mb-2"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Content Directory
                        </Link>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">NEPSE Data Feed</h2>
                        <p className="text-slate-500">Monitor and manage the real-time stock market data feed.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">tune</span>
                            Feed Config
                        </button>
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">sync</span>
                            Manual Sync
                        </button>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Feed Connection</p>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">STABLE</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Last Update</p>
                        <p className="text-xl font-black text-slate-800 dark:text-white">12:35 PM NPT</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Sync Errors (24h)</p>
                        <p className="text-xl font-black text-emerald-500">0</p>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 p-8 rounded-3xl">
                    <div className="flex items-start gap-4">
                        <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-2xl text-amber-600 dark:text-amber-400">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-amber-900 dark:text-amber-100">Live Feed Management</h4>
                            <p className="text-sm text-amber-800/70 dark:text-amber-200/50 leading-relaxed">
                                NEPSE data is automatically synced every minute during market hours (11:00 AM - 3:00 PM, Sunday to Thursday). Manual sync should only be used if the automated feed lags significantly behind the official exchange data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
