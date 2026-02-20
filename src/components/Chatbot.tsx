"use client";

import { useEffect } from 'react';

export default function Chatbot({ id }: { id?: string }) {
    useEffect(() => {
        if (!id) return;

        // Tawk.to Script Injection
        var Tawk_API: any = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${id}/default`;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            if (s0 && s0.parentNode) {
                s0.parentNode.insertBefore(s1, s0);
            }
        })();
    }, [id]);

    return null;
}
