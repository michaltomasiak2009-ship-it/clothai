import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-semibold text-zinc-900">
                Cloth<span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-[13px] text-zinc-400 leading-relaxed">
              Profesjonalne zdjęcia ubrań z AI. Bez fotografa. Bez studia.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Produkt",
                links: ["Funkcje", "Cennik", "API", "Changelog"],
              },
              {
                title: "Firma",
                links: ["O nas", "Blog", "Kariera", "Kontakt"],
              },
              {
                title: "Prawne",
                links: ["Regulamin", "Prywatność", "Cookies", "RODO"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold text-zinc-900 uppercase tracking-wide mb-3">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[13px] text-zinc-400 hover:text-zinc-700 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-zinc-400">
            © 2024 ClothAI. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-[12px] text-zinc-400">
            Made with ❤️ in Poland
          </p>
        </div>
      </div>
    </footer>
  );
}
