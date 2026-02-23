"use client";

import React, { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PremiumPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (data.authenticated) {
                setUser(data.user);
            }
        };
        checkAuth();
    }, []);

    const handleUpgrade = async () => {
        if (!user) {
            router.push("/login?callbackUrl=/premium");
            return;
        }

        setLoading(true);
        setStatus("verifying");

        try {
            const res = await fetch("/api/subscription/upgrade", { method: "POST" });
            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                // Refresh session/local state
                const userRes = await fetch("/api/auth/me");
                const userData = await userRes.json();
                if (userData.authenticated) setUser(userData.user);
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 lg:px-10">

                {/* Header Section */}
                <FadeIn direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-6">
                            <span className="material-symbols-outlined text-base">workspace_premium</span>
                            Sarkari AI Premium
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Generate <span className="text-primary">Formal Nepali Documents</span> Without Limits
                        </h1>
                        <p className="text-lg text-slate-600">
                            Upgrade to Premium to unlock unlimited generation of high-quality government letters, applications, and documents using advanced AI.
                        </p>
                    </div>
                </FadeIn>

                {/* Pricing Card */}
                <FadeIn delay={0.2} direction="up">
                    <div className="max-w-md mx-auto relative group">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                        <div className="relative bg-white/80 backdrop-blur-xl border border-white p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 text-center">

                            {status === "success" ? (
                                <div className="py-10">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-5xl font-bold">check</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Upgrade Successful!</h2>
                                    <p className="text-slate-600 mb-8 font-medium">You are now a Premium Member. Enjoy unlimited document generation.</p>
                                    <Link href="/sewa-ai" className="inline-flex bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                        Go to Generator
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Monthly Plan</h2>
                                        <div className="flex items-end justify-center gap-1">
                                            <span className="text-4xl md:text-5xl font-extrabold text-primary">Rs. 400</span>
                                            <span className="text-slate-500 font-medium mb-1">/month</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-10 text-left">
                                        {[
                                            "Unlimited document generation",
                                            "Access to all formal document templates",
                                            "Save and manage your document history",
                                            "Premium PDF formatting & downloads",
                                            "Priority AI response times",
                                            "Ad-free experience"
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                                                </div>
                                                <span className="text-slate-700 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={handleUpgrade}
                                        disabled={loading || user?.subscriptionStatus === 'PREMIUM'}
                                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : user?.subscriptionStatus === 'PREMIUM' ? (
                                            <>
                                                <span>Active Subscription</span>
                                                <span className="material-symbols-outlined">verified</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{user ? 'Pay with eSewa / Khalti' : 'Login to Upgrade'}</span>
                                                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-slate-400 mt-4 font-medium italic">
                                        {status === "error" ? "Transaction failed. Please try again." : "Secure payments handled by eSewa / Khalti (Mock Simulation)."}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </FadeIn>

                {/* Trust Badges */}
                <FadeIn delay={0.4} direction="up">
                    <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">verified_user</span>
                            <span className="font-bold text-slate-900">Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">support_agent</span>
                            <span className="font-bold text-slate-900">24/7 Priority Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">description</span>
                            <span className="font-bold text-slate-900">Government Standard</span>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </main>
    );
}

