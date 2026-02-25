"use client";

import FadeIn from "@/components/animations/FadeIn";
import DocumentGenerator from "@/components/docs/DocumentGenerator";
import SewaITAssistant from "@/components/SewaITAssistant";

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
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                                Official Document <span className="text-primary">Generator with SewaIT AI.</span>
                            </h1>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-3xl shadow-lg h-[600px] overflow-hidden mx-2 md:mx-0">
                        <SewaITAssistant />
                    </div>
                </div>
            </FadeIn>
        </>
    );
}
