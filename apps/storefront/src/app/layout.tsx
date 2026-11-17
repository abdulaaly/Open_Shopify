import React from "react";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import { StorefrontHeader } from "../components/StorefrontHeader";
import { CartDrawer } from "../components/CartDrawer";

export const metadata = {
  title: "Apex Apparel Co. | Powered by VENDR",
  description: "Modern minimalist apparel powered by the sovereign VENDR commerce engine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 min-h-screen flex flex-col">
        <CartProvider>
          <StorefrontHeader />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-100 py-12 px-6 bg-slate-50 text-slate-500 text-xs text-center">
            <p>© 2026 Apex Apparel Co. Powered by <strong>VENDR</strong> Open-Source Commerce Engine.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
