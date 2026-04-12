"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

interface NavbarProps {
  onLaunchApp: () => void;
}

export default function Navbar({ onLaunchApp }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-semibold text-zinc-900 text-[15px] tracking-tight">
            Cloth<span className="text-blue-600">AI</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {["Funkcje", "Cennik", "API", "Dokumentacja"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-[13px] font-medium text-zinc-600 hover:text-zinc-900 transition-colors hidden sm:block"
          >
            Zaloguj się
          </a>
          <button
            onClick={onLaunchApp}
            className="h-8 px-4 bg-zinc-900 text-white text-[13px] font-medium rounded-md hover:bg-zinc-700 transition-colors"
          >
            Wypróbuj za darmo
          </button>
        </div>
      </nav>
    </header>
  );
}
