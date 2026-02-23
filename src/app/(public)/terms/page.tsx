"use client";

import React from "react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        Terms of Service
                    </h1>
                    <div className="h-2 w-24 bg-amber-500 rounded-full mb-8"></div>
                </header>

                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-12 text-slate-700 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <p className="font-medium text-slate-500">By using SewaIT, you agree to the following terms designed to protect the "trust-first" nature of our utility platform:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-base">auto_awesome</span>
                                AI Document Generation
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90 font-medium">
                                Our AI Document Generator is designed to assist you in drafting official Nepali documents. While we strive for legal accuracy, these documents are templates and should be reviewed by a legal professional for specific legal cases.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-base">payments</span>
                                Subscription & Billing
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90 font-medium">
                                Premium features require an active subscription. Payments are processed securely via Khalti. Subscriptions are manual or auto-renew based on your selection; failure to renew will result in loss of premium access.
                            </p>
                        </section>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-base">verified_user</span>
                                License & Ownership
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90 font-medium">
                                You own the content of the documents you generate. SewaIT retains ownership of the underlying AI logic, templates, and platform infrastructure.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-base">description</span>
                                Official Context
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90 font-medium">
                                SewaIT is a private platform and is NOT affiliated with the Government of Nepal. Our tools are utility-focused implementations based on public document formats and guidelines.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
