"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function NewGuidePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        department: "",
        content: "",
        status: "Draft",
        icon: "description",
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/guides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/sewait-portal-99/guides");
            } else {
                alert("Failed to create guide");
            }
        } catch (error) {
            alert("Error creating guide");
        } finally {
            setLoading(false);
        }
    };

    const updateSlug = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
        setFormData({ ...formData, title, slug });
    };

    return (
        <FadeIn direction="up">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/sewait-portal-99/guides"
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline mb-2"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Guides
                        </Link>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create New Guide</h2>
                        <p className="text-slate-500">Add a new government service procedure or manual.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/sewait-portal-99/guides"
                            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </Link>
                        <button
                            form="guide-form"
                            disabled={loading}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Guide"}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form id="guide-form" onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Guide Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold text-lg border-2 border-transparent focus:border-primary/20 transition-all"
                                    placeholder="Enter guide name..."
                                    value={formData.title}
                                    onChange={(e) => updateSlug(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Slug (URL Permanent Link)</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-xs font-medium">sewait.com/guides/</span>
                                    <input
                                        required
                                        type="text"
                                        className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-mono text-xs border border-transparent focus:border-primary/10 transition-all"
                                        placeholder="url-friendly-slug"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Guide Content (Markdown Supported)</label>
                                <textarea
                                    required
                                    rows={15}
                                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-medium text-sm border-2 border-transparent focus:border-primary/20 transition-all resize-none"
                                    placeholder="Describe the procedure, required documents, and steps..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Meta Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">info</span>
                                Metadata
                            </h4>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm"
                                    placeholder="e.g. Identity"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Department</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm"
                                    placeholder="e.g. Home Ministry"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Icon Name (Material Symbol)</label>
                                <div className="flex gap-2">
                                    <input
                                        required
                                        type="text"
                                        className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm"
                                        placeholder="e.g. description"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    />
                                    <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">{formData.icon}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Publication Status</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm appearance-none cursor-pointer"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Publishing Tip</h5>
                            <p className="text-xs text-primary/70 leading-relaxed">
                                Use clear, descriptive headings (##) in the content. This helps users quickly find information and improves SEO.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </FadeIn>
    );
}
