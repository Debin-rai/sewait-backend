"use client";

import React, { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";

export default function PremiumPage() {
    const [transactionId, setTransactionId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const plans = [
        {
            name: "Basic",
            price: "Free",
            period: "Forever",
            features: [
                "Nepali Calendar & Events",
                "Public Document Templates",
                "Basic AI Chat Help",
                "Community Access"
            ],
            button: "Current Plan",
            current: true,
        },
        {
            name: "Premium Pro",
            price: "Rs. 400",
            period: "per month",
            features: [
                "Full AI Document Generation",
                "Draft Formal Letters (Nibedan)",
                "Passport/License Assistance",
                "Priority Support",
                "No Ads"
            ],
            button: "Upgrade to Pro",
            premium: true,
            highlight: "Best Value"
        },
        {
            name: "Yearly Saver",
            price: "Rs. 3600",
            period: "per year",
            features: [
                "All Pro Features",
                "2 Months Free Savings",
                "Premium Support Line",
                "Early Access to Features",
                "Dedicated Assistant"
            ],
            button: "Get Yearly",
            premium: true
        }
    ];

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transactionId || submitting) return;

        setSubmitting(true);
        // This would call your manual verification API
        setTimeout(() => {
            setSubmitting(false);
            setStatus("success");
            setTransactionId("");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 max-w-2xl mx-auto">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">
                            Go Pro. Get <span className="text-accent-amber">Serious.</span>
                        </h1>
                        <p className="text-slate-600 font-medium">
                            Starting at just Rs. 13 per day—less than a cup of tea ☕.
                            Professional documents, faster results.
                        </p>
                    </FadeIn>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className={`
                                h-full p-8 rounded-3xl border bg-white relative flex flex-col
                                ${plan.premium ? 'border-primary shadow-xl shadow-primary/5' : 'border-slate-100 shadow-sm'}
                            `}>
                                {plan.highlight && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-amber text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {plan.highlight}
                                    </span>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-primary">{plan.price}</span>
                                        <span className="text-sm font-medium text-slate-400">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`
                                    w-full py-4 rounded-xl font-bold transition-all
                                    ${plan.current
                                        ? 'bg-slate-100 text-slate-400 cursor-default'
                                        : 'bg-primary text-white hover:bg-slate-800 hover:shadow-lg active:scale-95 shadow-md shadow-primary/10'}
                                `}>
                                    {plan.button}
                                </button>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Manual Payment Verification Section */}
                <FadeIn delay={0.4}>
                    <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-primary/5 border border-slate-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* QR Codes Side */}
                            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                                <h2 className="text-xl font-bold text-primary mb-6">How to Renew / Upgrade</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-bold text-primary">eSewa QR</div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">1. Scan eSewa QR</p>
                                            <p className="text-xs text-slate-500">Scan and pay the amount for your plan.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-bold text-[#612d91]">Khalti QR</div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">2. Scan Khalti QR</p>
                                            <p className="text-xs text-slate-500">Alternatively use Khalti for the same.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                    <p className="text-xs text-amber-700 font-medium">
                                        <strong>Note:</strong> Since we are focus on privacy and low-friction, we use manual verification. Your account will be upgraded within 2-4 hours of submitting the transaction ID.
                                    </p>
                                </div>
                            </div>

                            {/* Verification Form */}
                            <div className="p-8 md:p-12">
                                <h2 className="text-xl font-bold text-primary mb-6">Verify Payment</h2>
                                <form onSubmit={handleVerify} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Transaction ID</label>
                                        <input
                                            type="text"
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            placeholder="Enter eSewa/Khalti Transaction ID"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-accent-amber text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                                    >
                                        {submitting ? "Verifying..." : "Submit for Verification"}
                                    </button>

                                    {status === "success" && (
                                        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-100">
                                            <span className="material-symbols-outlined">check_circle</span>
                                            <p className="text-xs font-bold font-display">Verification submitted! We'll upgrade your account shortly.</p>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
