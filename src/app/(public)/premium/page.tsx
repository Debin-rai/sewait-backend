"use client";

import React, { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function PremiumPage() {
    const { theme } = useTheme();
    const [transactionId, setTransactionId] = useState("");
    const [selectedPlanId, setSelectedPlanId] = useState<string>("PRO");
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState<any>(null);
    const [step, setStep] = useState<1 | 2>(1);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setUser(data.user);
                }
            });
    }, []);

    const plans = [
        {
            id: "FREE",
            name: "Free Citizen",
            price: "Rs. 0",
            period: "Forever",
            features: [
                "3 AI Units per day",
                "Nepali Calendar & Tithi",
                "Standard Gov Guides",
                "Basic AI Support",
                "Ad-supported"
            ],
            button: "Default Plan",
            current: !user || user.plan === "FREE",
        },
        {
            id: "PRO",
            name: "Monthly Pro",
            price: "Rs. 400",
            period: "per month",
            features: [
                "120 AI Units per month",
                "Ad-free Experience",
                "Document History & Saving",
                "1 AI Revision per doc",
                "Priority Assistance"
            ],
            button: "Upgrade to Pro",
            premium: true,
            highlight: "Most Popular",
            current: user?.plan === "PRO",
        },
        {
            id: "BUSINESS",
            name: "Business / Yearly",
            price: "Rs. 3600",
            period: "per year",
            features: [
                "800 AI Units per year",
                "Bulk Document Drafting",
                "Priority Processing Queue",
                "Dedicated Account Support",
                "Premium Formatting"
            ],
            button: "Get Business Plan",
            premium: true,
            current: user?.plan === "BUSINESS",
        }
    ];

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transactionId || submitting) return;
        if (!user) {
            alert("Please sign in to upgrade your account.");
            return;
        }

        setSubmitting(true);
        setErrorMessage("");

        try {
            const res = await fetch("/api/premium/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transactionId,
                    planRequested: selectedPlanId
                }),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setTransactionId("");
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Failed to submit request.");
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage("Connection error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const selectedPlan = plans.find(p => p.id === selectedPlanId);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 md:py-24">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 max-w-2xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            SewaIT Premium
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
                            Select Your <span className="text-primary italic">Plan</span>
                        </h1>
                        <p className="text-slate-500 font-bold max-w-lg mx-auto leading-relaxed">
                            Unlock professional government tools and unlimited AI capabilities. Choose a plan a step closer to digital excellence.
                        </p>
                    </FadeIn>
                </header>

                {step === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto items-stretch">
                        {plans.map((plan, i) => (
                            <FadeIn key={i} delay={i * 0.1} className="h-full">
                                <div className={`
                                    h-full p-10 rounded-[3rem] border-2 flex flex-col transition-all duration-500 hover:shadow-2xl group
                                    ${plan.current ? 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80' : 'bg-white dark:bg-slate-900 border-white dark:border-slate-800'}
                                    ${!plan.current && selectedPlanId === plan.id ? 'border-primary ring-8 ring-primary/5 shadow-2xl shadow-primary/10' : ''}
                                `}>
                                    {plan.highlight && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl animate-bounce">
                                            {plan.highlight}
                                        </div>
                                    )}

                                    <div className="mb-10">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{plan.period}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-5 mb-12 flex-1">
                                        {plan.features.map((feat, j) => (
                                            <div key={j} className="flex items-start gap-4 text-sm font-bold text-slate-600 dark:text-slate-400">
                                                <div className="size-5 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
                                                    <div className="size-2 bg-green-500 rounded-full" />
                                                </div>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => !plan.current && setSelectedPlanId(plan.id)}
                                        disabled={plan.current}
                                        className={`
                                            w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all
                                            ${plan.current
                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                                                : selectedPlanId === plan.id
                                                    ? 'bg-primary text-white shadow-xl shadow-primary/30'
                                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary'}
                                        `}
                                    >
                                        {plan.current ? 'Current Plan' : (selectedPlanId === plan.id ? 'Selected' : 'Select Plan')}
                                    </button>
                                </div>
                            </FadeIn>
                        ))}

                        <div className="md:col-span-3 flex justify-center mt-12">
                            <button
                                onClick={() => setStep(2)}
                                disabled={!selectedPlanId || plans.find(p => p.id === selectedPlanId)?.current}
                                className="group flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-6 rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-primary dark:hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed active:scale-95"
                            >
                                Continue to Payment
                                <div className="p-2 bg-white/10 dark:bg-slate-900/10 rounded-xl group-hover:translate-x-1 transition-transform">
                                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    <FadeIn>
                        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl border-2 border-slate-100 dark:border-slate-800 overflow-hidden mb-24 transition-all hover:border-primary/20">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Instructions & QR Side */}
                                <div className="p-10 md:p-20 bg-slate-50 dark:bg-slate-800/50 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-12 hover:gap-4 transition-all"
                                    >
                                        <svg className="size-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        Change Plan
                                    </button>

                                    <h2 className="text-3xl font-black mb-10 tracking-tighter text-slate-900 dark:text-white">Secure Payment</h2>

                                    <div className="space-y-12">
                                        <div className="flex gap-8 group">
                                            <div className="size-20 shrink-0 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex items-center justify-center font-black text-[10px] text-center text-primary group-hover:border-primary transition-all">
                                                eSewa <br /> QR
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Scan with eSewa / Khalti</h4>
                                                <p className="text-sm font-medium text-slate-500 leading-relaxed">Pay the exact amount <strong>{selectedPlan?.price}</strong> to our merchant account using any Wallet / Mobile Banking.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-8 group">
                                            <div className="size-20 shrink-0 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex items-center justify-center font-black text-[10px] text-center text-slate-500 group-hover:border-primary transition-all">
                                                Verify <br /> ID
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Submit Reference ID</h4>
                                                <p className="text-sm font-medium text-slate-500 leading-relaxed">After successful payment, copy the unique <strong>Transaction ID</strong> and paste it in the form.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-20 p-8 bg-primary/5 rounded-3xl border border-primary/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="size-2 bg-primary rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Service Guarantee</span>
                                        </div>
                                        <p className="text-[13px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                            "Our team manually verifies every transaction to ensure the highest security. Upgrades are usually processed within 2-4 hours."
                                        </p>
                                    </div>
                                </div>

                                {/* Form Side */}
                                <div className="p-10 md:p-20 flex flex-col justify-center">
                                    <h3 className="text-2xl font-black mb-12 tracking-tight text-slate-900 dark:text-white">Complete Upgrade</h3>

                                    <form onSubmit={handleVerify} className="space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Subscription Summary</label>
                                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-primary uppercase mb-1 tracking-tighter">{selectedPlan?.name}</span>
                                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{selectedPlan?.period}</span>
                                                </div>
                                                <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform">{selectedPlan?.price}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Payment Reference ID</label>
                                            <input
                                                type="text"
                                                value={transactionId}
                                                onChange={(e) => setTransactionId(e.target.value)}
                                                placeholder="e.g. 5X89AB22"
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-8 py-6 text-lg font-black focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale"
                                        >
                                            {submitting ? "Verifying Transaction..." : "Submit Upgrade Request"}
                                        </button>

                                        {status === "success" && (
                                            <div className="flex items-center gap-5 p-8 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-3xl border-2 border-emerald-100 dark:border-emerald-900/50 animate-in zoom-in-95">
                                                <div className="size-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest mb-1">Request Received</p>
                                                    <p className="text-sm font-bold opacity-80 leading-relaxed">Payment is in verification queue. We've notified our admins.</p>
                                                </div>
                                            </div>
                                        )}

                                        {status === "error" && (
                                            <div className="flex items-center gap-5 p-8 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-3xl border-2 border-red-100 dark:border-red-900/50 animate-in zoom-in-95">
                                                <div className="size-12 bg-red-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest mb-1">Verification Failed</p>
                                                    <p className="text-sm font-bold opacity-80 leading-relaxed">{errorMessage}</p>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}
