"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function EditGuidePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        slug: "",
        category: "",
        department: "",
        content: "",
        status: "Draft",
        icon: "description",
    });

    useEffect(() => {
        if (id) {
            fetchGuide();
        }
    }, [id]);

    const fetchGuide = async () => {
        try {
            const res = await fetch(`/api/sewait-portal-99/guides?id=${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData(data);
            } else {
                alert("Guide not found");
                router.push("/sewait-portal-99/guides");
            }
        } catch (error) {
            console.error("Failed to fetch guide", error);
        } finally {
            setFetching(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/guides", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/sewait-portal-99/guides");
            } else {
                alert("Failed to update guide");
            }
        } catch (error) {
            alert("Error updating guide");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

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
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Edit Guide</h2>
                        <p className="text-slate-500">Update guide details or modify content.</p>
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
                            {loading ? "Saving Changes..." : "Save Changes"}
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
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Slug (URL Permanent Link)</label>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="text-xs font-medium">sewait.com/guides/</span>
                                    <input
                                        required
                                        type="text"
                                        className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl outline-none font-mono text-xs border border-transparent cursor-not-allowed opacity-70"
                                        placeholder="url-friendly-slug"
                                        value={formData.slug}
                                        readOnly
                                    />
                                    <span className="material-symbols-outlined text-xs">lock</span>
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
                                Editing existing content will update the information live for all users. Ensure the departmental details are accurate before saving.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </FadeIn>
    );
}
