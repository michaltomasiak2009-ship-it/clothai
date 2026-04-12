"use client";

import { Wand2, User, Zap, ShieldCheck, Download, Layers } from "lucide-react";

const features = [
  {
    icon: <Wand2 size={20} />,
    title: "Usuwanie tła",
    description:
      "Automatycznie usuwa tło i zastępuje je czystą, studyjną bielą. Idealne dla sklepów e-commerce.",
  },
  {
    icon: <User size={20} />,
    title: "Tryb Na Modelce",
    description:
      "AI generuje profesjonalną fotografię z modelem lub modelką — bez kosztownej sesji zdjęciowej.",
  },
  {
    icon: <Zap size={20} />,
    title: "Błyskawiczne przetwarzanie",
    description:
      "Wyniki w 3–5 sekund. Przetwarzaj setki zdjęć dziennie bez czekania.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Prywatność danych",
    description:
      "Twoje zdjęcia są usuwane po 24 godzinach. Nigdy nie trafiają do treningu modeli.",
  },
  {
    icon: <Download size={20} />,
    title: "Eksport w wysokiej jakości",
    description:
      "Pobieraj gotowe zdjęcia w rozdzielczości do 4K, gotowe do publikacji.",
  },
  {
    icon: <Layers size={20} />,
    title: "API dla deweloperów",
    description:
      "Integruj ClothAI z własnym systemem przez proste REST API. Pełna dokumentacja.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full mb-6">
            <span className="text-[12px] font-semibold text-zinc-600 tracking-wide uppercase">
              Funkcje
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wszystko czego
            <br />
            <em className="not-italic text-zinc-400">potrzebujesz</em>
          </h2>
          <p className="text-[16px] text-zinc-500 leading-relaxed">
            Jeden tool zastępuje fotografa, retuszera i sesję zdjęciową.
            Oszczędzasz czas i pieniądze.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-100">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-white p-8 hover:bg-zinc-50/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-5 text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-zinc-900 mb-2">
                {f.title}
              </h3>
              <p className="text-[14px] text-zinc-500 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
