"use client";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationPanel() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/github/notifications");
            const data = await res.json();
            if (Array.isArray(data)) {
                setNotifications(data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors"
            >
                <span className="material-symbols-outlined">notifications</span>
                {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-widest">Repository Alerts</h3>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            {notifications.length} Unread
                        </span>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {loading ? (
                            <div className="p-12 flex flex-col items-center justify-center gap-3">
                                <div className="size-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Checking GitHub...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-200 dark:text-slate-800 mb-2">notifications_off</span>
                                <p className="text-xs font-bold text-slate-400 uppercase">All caught up!</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50 dark:divide-slate-800">
                                {notifications.map((n) => (
                                    <a
                                        key={n.id}
                                        href={n.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <svg className="size-5 text-slate-500 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 flex items-center gap-1.5 uppercase tracking-tighter">
                                                        <svg className="size-2.5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                                        </svg>
                                                        GITHUB
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-400">{formatDistanceToNow(new Date(n.updatedAt))} ago</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
                                                    {n.title}
                                                </p>
                                                <p className="text-[10px] text-slate-500 font-medium mt-1 truncate">
                                                    {n.repo} • {n.type}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                        <button
                            onClick={fetchNotifications}
                            className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors"
                        >
                            Sync with GitHub
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
