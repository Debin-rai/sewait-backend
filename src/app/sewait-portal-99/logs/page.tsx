"use client";

import React, { useEffect, useState } from "react";

interface AuditLog {
    id: string;
    action: string;
    details: string;
    ipAddress: string;
    status: string;
    createdAt: string;
    admin: {
        name: string;
        role: string;
    };
}

export default function SystemLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await fetch("/api/sewait-portal-99/logs?limit=50");
            const data = await res.json();
            if (data.logs) {
                setLogs(data.logs);
                setTotal(data.pagination.total);
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (action: string) => {
        switch (action) {
            case 'LOGIN': return 'login';
            case 'LOGOUT': return 'logout';
            case 'AUTH_FAILURE': return 'security';
            case 'CREATE': return 'add_circle';
            case 'UPDATE': return 'edit';
            case 'DELETE': return 'delete';
            default: return 'info';
        }
    };

    const getColor = (status: string) => {
        return status === 'SUCCESS' ? 'text-green-600' : 'text-red-600';
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            {/* Header Section */}
            <header className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-6 flex-shrink-0 mb-6 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">System Audit Logs</h2>
                        <p className="text-slate-500 text-base mt-1">Monitor administrative activity and security events across the platform</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Logs</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-primary dark:text-blue-400">{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Table Section */}
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1a355b] text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Time</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Admin User</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Action</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-center">IP Address</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="material-symbols-outlined animate-spin text-4xl">sync</span>
                                            <span className="font-bold">Loading system logs...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No logs recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group text-slate-900 dark:text-white">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="font-bold">{new Date(log.createdAt).toLocaleDateString()}</div>
                                            <div className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-black">
                                                    {log.admin?.name?.charAt(0) || "S"}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold">{log.admin?.name || "System"}</div>
                                                    <div className="text-xs text-slate-500">{log.admin?.role || "Automated"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`material-symbols-outlined text-[18px] ${log.status === 'FAILED' ? 'text-red-600' : 'text-primary'}`}>
                                                    {getIcon(log.action)}
                                                </span>
                                                <span className="text-sm font-bold uppercase tracking-tight">{log.action}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">{log.details}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <code className="text-[10px] font-mono px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400">
                                                {log.ipAddress}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest border ${log.status === 'SUCCESS'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
