import { Metadata } from "next";
import CalendarClient from "./CalendarClient";

export const metadata: Metadata = {
    title: "नेपाली पात्रो २०८१ | चाडपर्व र तिथि | SewaIT",
    description: "आजको नेपाली मिति, तिथि, र दशैं तिहार जस्ता आउँदै गरेका चाडपर्वहरू हेर्नुहोस्। SewaIT को सही नेपाली पात्रो २०८०-२०८१।",
    keywords: ["Nepali Calendar 2081", "आजको मिती", "Today Nepali Date", "Tithi Today", "Nepali Festivals", "नेपाली पात्रो"],
};

export default function CalendarPage() {
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'Nepali Calendar 2081',
            'operatingSystem': 'Any',
            'applicationCategory': 'UtilityApplication',
            'description': 'Live Nepali Calendar with Tithi, festivals, and today\'s date in BS.',
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
                    'name': 'Nepali Calendar',
                    'item': 'https://sewait.up.railway.app/calendar'
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
            <CalendarClient />
        </>
    );
}
