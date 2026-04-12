"use client";

import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "zł/mies.",
    description: "Dla osób testujących produkt",
    features: [
      "30 zdjęć miesięcznie",
      "Usuwanie tła",
      "Eksport JPEG/PNG",
      "Czas przetwarzania ~10s",
    ],
    cta: "Zacznij za darmo",
    highlight: false,
  },
  {
    name: "Pro",
    price: "149",
    period: "zł/mies.",
    description: "Dla małych i średnich sklepów",
    features: [
      "500 zdjęć miesięcznie",
      "Usuwanie tła + Na Modelce",
      "Eksport do 4K",
      "Czas przetwarzania ~3s",
      "API dostęp",
      "Priorytetowe wsparcie",
    ],
    cta: "Rozpocznij Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Kontakt",
    period: "",
    description: "Dla dużych platform modowych",
    features: [
      "Nielimitowane zdjęcia",
      "Dedykowany model AI",
      "SLA 99.9%",
      "Integracja z ERP/PIM",
      "Account manager",
      "Custom white-label",
    ],
    cta: "Porozmawiajmy",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-32 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full mb-6">
            <span className="text-[12px] font-semibold text-zinc-600 tracking-wide uppercase">
              Cennik
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prosty, transparentny
            <br />
            <em className="not-italic text-zinc-400">cennik</em>
          </h2>
          <p className="text-[16px] text-zinc-500">
            Bez ukrytych opłat. Możesz anulować w dowolnym momencie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "bg-zinc-900 text-white"
                  : "bg-white border border-zinc-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500 text-white rounded-full text-[11px] font-semibold">
                    <Zap size={10} />
                    Najpopularniejszy
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p
                  className={`text-[13px] font-semibold mb-4 ${
                    plan.highlight ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlight ? "text-white" : "text-zinc-900"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-[14px] mb-1 ${
                        plan.highlight ? "text-zinc-400" : "text-zinc-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[13px] ${
                    plan.highlight ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlight ? "bg-blue-500" : "bg-zinc-100"
                      }`}
                    >
                      <Check
                        size={9}
                        className={plan.highlight ? "text-white" : "text-zinc-600"}
                        strokeWidth={3}
                      />
                    </div>
                    <span
                      className={`text-[13px] ${
                        plan.highlight ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full h-10 rounded-xl text-[14px] font-semibold transition-all ${
                  plan.highlight
                    ? "bg-white text-zinc-900 hover:bg-zinc-100"
                    : "bg-zinc-900 text-white hover:bg-zinc-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
