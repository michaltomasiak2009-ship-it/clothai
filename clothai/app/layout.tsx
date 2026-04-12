import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClothAI — Studio-Quality Fashion Photos with AI",
  description:
    "Transform clothing photos into studio-quality images or on-model shots in seconds. Powered by AI.",
  openGraph: {
    title: "ClothAI — Studio-Quality Fashion Photos with AI",
    description: "Transform clothing photos instantly with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
