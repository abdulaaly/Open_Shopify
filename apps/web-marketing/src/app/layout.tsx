import React from "react";
import "./globals.css";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { MarketingFooter } from "../components/MarketingFooter";

export const metadata = {
  title: "VENDR — Open-Source Enterprise Commerce Engine (Shopify Alternative)",
  description:
    "Zero transaction fees. Sandboxed sub-millisecond WASM functions. Unified Web Admin, Storefront, and Flutter Mobile/POS in one single codebase.",
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
