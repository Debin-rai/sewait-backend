"use client";

export default function Hero() {
    return (
        <section className="hero-formal text-white">
            <div className="container mx-auto px-4 lg:px-10 py-10 md:py-16 text-center relative z-10">
                <div className="flex flex-col items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-2 text-slate-300 mb-1">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Nepali Samvat <span className="nepali-font">नेपाली सम्वत्</span></span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white mb-1 md:mb-2">
                        <span className="nepali-font">२०८० कार्तिक १५,</span> <span className="text-white/90 nepali-font">बुधबार</span>
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-2 md:mt-4">
                        <div className="px-3 md:px-4 py-1 md:py-1.5 bg-slate-100/10 border border-white/20 rounded text-xs md:text-sm font-semibold text-white/90">
                            Ekadashi Tithi <span className="nepali-font">एकादशी तिथि</span>
                        </div>
                        <div className="h-4 w-px bg-white/20 hidden md:block"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm font-medium text-slate-300">5 days left for Dashain <span className="nepali-font">(घटस्थापना)</span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black/10 backdrop-blur-sm py-2 md:py-2.5 border-t border-white/5">
                <div className="container mx-auto px-4 lg:px-10 flex items-center justify-between gap-4 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-xs font-bold text-white/80 shrink-0">
                        <div className="flex items-center gap-1.5 md:gap-2 pr-3 md:pr-6 border-r border-white/10">
                            <span className="material-symbols-outlined text-white/60 text-sm md:text-lg">sunny</span>
                            <span>22°C</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                            <span className="material-symbols-outlined text-white/60 text-sm md:text-lg">schedule</span>
                            <span>10:45 AM</span>
                        </div>
                    </div>
                    <div className="flex-1 ticker-wrap text-[10px] md:text-xs font-medium tracking-wide text-white/70 overflow-hidden">
                        <div className="ticker">
                            <span className="mx-4 md:mx-8">NEPSE: 2,045.63 <span className="text-green-400">▲ 0.45%</span></span>
                            <span className="mx-4 md:mx-8">Gold (24K): NPR 1,18,000 <span className="text-red-400">▼ 0.2%</span></span>
                            <span className="mx-4 md:mx-8">USD/NPR: 132.40 <span className="text-green-400">▲ 0.05%</span></span>
                            <span className="mx-4 md:mx-8 font-bold text-white">New notice published regarding National ID distribution.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
