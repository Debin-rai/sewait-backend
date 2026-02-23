"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/sewa-ai");
                    router.refresh();
                }, 1500);
            } else {
                setError(data.error || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-20 bg-[#F8FAFC] flex items-center justify-center">
            <div className="container mx-auto px-4">
                <FadeIn direction="up">
                    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="p-8 md:p-10">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
                                <p className="text-sm text-slate-500 font-medium">Join Sarkari AI to generate and save documents</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm font-medium flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                    Account created! Redirecting...
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-slate-700 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-slate-700 font-medium"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-slate-700 font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || success}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <span className="material-symbols-outlined rotate-45 text-sm">send</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center pt-8 border-t border-slate-50">
                                <p className="text-sm text-slate-500 font-medium">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-primary hover:underline font-bold">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
