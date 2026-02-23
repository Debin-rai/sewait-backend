"use client";

import FadeIn from "@/components/animations/FadeIn";
import DocumentGenerator from "@/components/docs/DocumentGenerator";
import SarkariAssistant from "@/components/SarkariAssistant";

export default function DocumentGeneratorSection() {
    return (
        <>
            {/* Document Generator Section */}
            <FadeIn direction="up">
                <section id="doc-generator">
                    <DocumentGenerator />
                </section>
            </FadeIn>

            {/* Simple Divider */}
            <div className="h-px bg-slate-200 w-full" />

            {/* Quick Helper Assistant Section */}
            <FadeIn delay={0.2} direction="up">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Need specific help?</h2>
                            <p className="text-xs text-slate-500">Ask Sarkari AI anything about the generation process.</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-3xl shadow-lg h-[600px] overflow-hidden mx-2 md:mx-0">
                        <SarkariAssistant />
                    </div>
                </div>
            </FadeIn>
        </>
    );
}
