"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        // Only track once per path change
        const recordHit = async () => {
            try {
                // Detect device type
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const device = isMobile ? "mobile" : "desktop";

                await fetch("/api/sewait-portal-99/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: pathname,
                        device: device
                    }),
                });
            } catch (error) {
                // Silent fail for analytics tracking
                console.error("Analytics failed:", error);
            }
        };

        recordHit();
    }, [pathname]);

    return null; // This component doesn't render anything
}
