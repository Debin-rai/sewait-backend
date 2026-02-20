"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";

export default function AIChatHistory() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalSessions: 0, messagesToday: 0 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/chat");
            const data = await res.json();
            setSessions(data.sessions || []);
            setStats(data.stats || { totalSessions: 0, messagesToday: 0 });
        } catch (error) {
            console.error("Failed to fetch chat sessions:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSessionDetails = async (sessionId: string) => {
        setLoadingMessages(true);
        try {
            const res = await fetch(`/api/sewait-portal-99/chat/${sessionId}`);
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (error) {
            console.error("Failed to fetch session messages:", error);
        } finally {
            setLoadingMessages(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleSessionClick = (session: any) => {
        setSelectedSession(session);
        fetchSessionDetails(session.id);
    };

    const handleDelete = async (sessionId?: string, all = false) => {
        if (!confirm(`Are you sure you want to ${all ? 'DELETE ALL' : 'delete this'} chat history?`)) return;

        try {
            const res = await fetch("/api/sewait-portal-99/chat", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId, deleteAll: all }),
            });
            if (res.ok) {
                if (sessionId === selectedSession?.id) setSelectedSession(null);
                fetchSessions();
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const filteredSessions = sessions.filter(s =>
        s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 min-h-screen pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Chat History</h2>
                    <p className="text-slate-500 text-sm">Monitor and manage Sewa AI assistant conversations.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleDelete(undefined, true)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">delete_sweep</span>
                        Clear All History
                    </button>
                    <button
                        onClick={fetchSessions}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Sessions</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalSessions}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Messages Today</p>
                    <p className="text-3xl font-black text-emerald-500">{stats.messagesToday}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active AI</p>
                    <p className="text-3xl font-black text-primary">Gemini 2.0</p>
                </div>
            </div>

            {!selectedSession ? (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Search sessions by ID or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 text-sm pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-40 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : filteredSessions.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">forum</span>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No chat sessions found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => handleSessionClick(session)}
                                    className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary transition-all text-left flex flex-col gap-4 relative overflow-hidden active:scale-[0.98]"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                                            <span className="text-[11px] font-mono font-black text-slate-500 dark:text-slate-400 tracking-tighter">
                                                USER #{session.id.substring(session.id.length - 8).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
                                            <span className="material-symbols-outlined text-[10px] text-primary">chat</span>
                                            <span className="text-[10px] font-black text-primary">{session.messageCount}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-slate-800 dark:text-white line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                            {session.title || "New Conversation"}
                                        </h4>
                                        <p className="text-[10px] text-slate-400 font-medium">
                                            {new Date(session.createdAt).toLocaleDateString()} • {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary">View Chat</span>
                                        <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <FadeIn className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[70vh]">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <div>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white">
                                    USER #{selectedSession.id.substring(selectedSession.id.length - 8).toUpperCase()}
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedSession.title}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(selectedSession.id)}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/30 dark:bg-slate-900/50">
                        {loadingMessages ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-3">
                                        <div className="size-8 rounded-lg bg-slate-200 animate-pulse" />
                                        <div className="h-10 w-48 bg-slate-100 animate-pulse rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-20 text-slate-400 text-xs font-bold uppercase tracking-widest">No messages found</div>
                        ) : (
                            messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`size-8 rounded-xl flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary"
                                            }`}>
                                            <span className="material-symbols-outlined text-sm">
                                                {m.role === "user" ? "person" : "smart_toy"}
                                            </span>
                                        </div>
                                        <div>
                                            <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${m.role === "user"
                                                    ? "bg-primary text-white font-medium rounded-tr-none"
                                                    : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-tl-none shadow-sm"
                                                }`}>
                                                {m.content}
                                            </div>
                                            <span className="text-[8px] font-black text-slate-400 mt-1 block uppercase tracking-tighter">
                                                {m.role === "user" ? "User" : "Sewa AI"} • {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </FadeIn>
            )}
        </div>
    );
}
