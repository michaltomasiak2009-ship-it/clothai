"use client";

import { ArrowRight, Sparkles, Star } from "lucide-react";

interface HeroSectionProps {
  onLaunchApp: () => void;
}

export default function HeroSection({ onLaunchApp }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-100 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-full mb-8 animate-fade-up">
          <Sparkles size={13} className="text-blue-500" />
          <span className="text-[12px] font-medium text-zinc-600 tracking-wide">
            Nowe — Tryb Modelka/Model już dostępny
          </span>
          <div className="w-px h-3 bg-zinc-300" />
          <span className="text-[12px] text-blue-600 font-semibold">Beta</span>
        </div>

        {/* Headline */}
        <h1
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight text-zinc-900 mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", fontFamily: "var(--font-display)" }}
        >
          Zdjęcia ubrań
          <br />
          <em className="not-italic gradient-text-blue">godne studia</em>
          <br />
          <span className="text-zinc-400">w kilka sekund.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Wgraj zdjęcie ubrania, a AI usunie tło lub umieści je na profesjonalnej
          modelce. Zero Photoshopa. Zero sesji zdjęciowych.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={onLaunchApp}
            className="group flex items-center gap-2 h-12 px-6 bg-zinc-900 text-white text-[15px] font-medium rounded-lg hover:bg-zinc-700 transition-all shadow-lg shadow-zinc-900/10"
          >
            Zacznij za darmo
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button className="flex items-center gap-2 h-12 px-6 text-[15px] font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
            Zobacz demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex -space-x-2">
            {["bg-blue-400", "bg-violet-400", "bg-pink-400", "bg-amber-400", "bg-emerald-400"].map(
              (color, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${color} border-2 border-white`}
                />
              )
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-[13px] text-zinc-500">
              <strong className="text-zinc-800">4.9</strong> · 2 400+ sklepów
            </span>
          </div>
        </div>

        {/* Preview mockup */}
        <div className="mt-16 relative animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
          <div className="max-w-4xl mx-auto bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden card-shadow-lg">
            {/* Mock toolbar */}
            <div className="h-11 bg-white border-b border-zinc-100 flex items-center gap-2 px-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-200" />
                <div className="w-3 h-3 rounded-full bg-zinc-200" />
                <div className="w-3 h-3 rounded-full bg-zinc-200" />
              </div>
              <div className="flex-1 h-6 bg-zinc-100 rounded-md mx-8" />
            </div>
            {/* Mock app UI */}
            <div className="p-8 grid grid-cols-2 gap-6">
              <div className="aspect-[3/4] bg-white border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-zinc-400" />
                </div>
                <span className="text-[12px] text-zinc-400 font-medium">Przeciągnij zdjęcie tutaj</span>
              </div>
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 shimmer-bg" />
                  <div className="absolute bottom-3 right-3">
                    <div className="h-6 px-3 bg-white/80 backdrop-blur rounded-md text-[11px] font-medium text-zinc-600 flex items-center">
                      Przetwarzanie...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
