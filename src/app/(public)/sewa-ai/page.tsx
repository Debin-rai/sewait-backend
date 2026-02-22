import type { Metadata } from "next";
import SewaAIClient from "./SewaAIClient";

export const metadata: Metadata = {
    title: "Sewa AI - Your Nepali Assistant | SewaIT",
    description: "Ask Sewa AI anything about Nepal — gold rates, weather, calendar, government services, and more. Powered by AI.",
    keywords: ["sewa ai", "nepal ai assistant", "nepali chatbot", "sewait ai", "nepal help"],
    openGraph: {
        title: "Sewa AI - Your Nepali Assistant",
        description: "AI-powered assistant for everything Nepal. Ask about gold rates, weather, festivals, government services and more.",
    }
};

export default function SewaAIPage() {
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'Sewa AI',
            'operatingSystem': 'Any',
            'applicationCategory': 'UtilityApplication',
            'description': 'AI-powered assistant providing Nepali gold prices, weather, and government service guides.',
            'creator': {
                '@type': 'Organization',
                'name': 'SewaIT'
            },
            'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'NPR'
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://sewait.up.railway.app'
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Sewa AI',
                    'item': 'https://sewait.up.railway.app/sewa-ai'
                }
            ]
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SewaAIClient />
        </>
    );
}
