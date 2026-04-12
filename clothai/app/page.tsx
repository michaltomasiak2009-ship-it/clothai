"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"landing" | "app">("landing");

  return (
    <main className="min-h-screen">
      <Navbar onLaunchApp={() => setActiveTab("app")} />
      {activeTab === "landing" ? (
        <>
          <HeroSection onLaunchApp={() => setActiveTab("app")} />
          <FeaturesSection />
          <PricingSection />
          <Footer />
        </>
      ) : (
        <AppSection />
      )}
    </main>
  );
}
