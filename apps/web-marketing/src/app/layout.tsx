import React from "react";
import "./globals.css";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { MarketingFooter } from "../components/MarketingFooter";

export const metadata = {
  title: "Open Shopify — Open-Source Enterprise Commerce Engine (Shopify Alternative)",
  description:
    "Zero transaction fees. Sandboxed sub-millisecond WASM functions. Next.js 15 Storefront and OmniShop Unified POS (iOS, Android, Windows, macOS, Linux).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white min-h-screen flex flex-col selection:bg-emerald-500 selection:text-black">
        <MarketingNavbar />
        <main className="flex-1">{children}</main>
        <MarketingFooter />
      </body>
    </html>
  );
}
