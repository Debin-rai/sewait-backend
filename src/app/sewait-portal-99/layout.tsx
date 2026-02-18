"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationPanel from "@/components/admin/NotificationPanel";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/sewait-portal-99/login";
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (isLoginPage) {
        return <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-display">{children}</div>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
