export const metadata = {
  title: "Apex Apparel Co. | Powered by Open Shopify",
  description: "Modern minimalist apparel powered by the sovereign Open Shopify commerce engine and OmniShop POS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 min-h-screen flex flex-col">
        <header className="border-b border-slate-100 py-4 px-6 flex items-center justify-between">
          <span className="font-bold text-lg">Apex Apparel Co.</span>
          <span className="text-xs text-emerald-600 font-mono">⚡ Open Shopify High-Performance Storefront</span>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-100 py-12 px-6 bg-slate-50 text-slate-500 text-xs text-center">
          <p>© 2026 Apex Apparel Co. Powered by <strong>Open Shopify</strong> Open-Source Commerce Engine.</p>
        </footer>
      </body>
    </html>
  );
}
