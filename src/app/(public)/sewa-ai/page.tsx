
import type { Metadata } from "next";

import DocumentGeneratorSection from "@/components/docs/DocumentGeneratorSection";

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
    return (
        <main className="min-h-screen pt-24 pb-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 lg:px-10">
                <div className="flex flex-col gap-12">
                    <DocumentGeneratorSection />
                </div>
            </div>
        </main>
    );
}



