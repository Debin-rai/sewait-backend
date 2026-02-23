"use client";

import Link from "next/link";

export default function ServicesGrid() {
    const services = [
        {
            href: "/guides/passport",
            icon: "travel",
            title: "Passport",
            titleNp: "राहदानी",
            desc: "Generate application forms and fee letters instantly.",
        },
        {
            href: "/guides/license",
            icon: "badge",
            title: "Driving License",
            titleNp: "सवारी चालक अनुमति",
            desc: "Draft renewal and new license request letters.",
        },
        {
            href: "/guides/pan",
            icon: "payments",
            title: "Permanent Account (PAN)",
            titleNp: "स्थायी लेखा नम्बर",
            desc: "AI assistance for online PAN documentation.",
        },
        {
            href: "/guides/nid",
            icon: "badge",
            title: "National Identity Card",
            titleNp: "राष्ट्रिय परिचयपत्र",
            desc: "Instant NID application drafting.",
        },
    ];

    return (
        <section className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-slate-100 pb-4 gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-primary relative inline-block">
                    Government Guides & Services <span className="nepali-font text-base md:text-lg text-primary/60">सरकारी गाइड</span>
                    <div className="absolute -bottom-4 left-0 w-20 h-1 bg-primary rounded-full"></div>
                </h2>
                <Link href="/guides" className="text-sm font-bold text-primary hover:text-primary-light flex items-center gap-1 transition-colors">
                    View all services
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <Link
                        key={index}
                        href={service.href}
                        className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                    >
                        {/* Premium Gradient Background on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-3 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20">
                                <span className="material-symbols-outlined text-3xl font-light">{service.icon}</span>
                            </div>

                            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors text-lg">
                                {service.title}
                            </h3>
                            <p className="text-xs text-primary/50 nepali-font mb-4 font-bold tracking-wide">{service.titleNp}</p>

                            <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6 flex-1">
                                {service.desc}
                            </p>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                                <span className="text-[10px] font-black uppercase tracking-widest">Guide Details</span>
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
