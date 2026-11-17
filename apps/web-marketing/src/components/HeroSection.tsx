"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, ArrowRight, Sparkles, Zap, ShieldCheck, RefreshCw, ShoppingBag } from "lucide-react";

type ThemePreset = "obsidian" | "nordic" | "brutalist";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>("obsidian");
  const [cartCount, setCartCount] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const command = "npx vendr-cli@latest init my-store";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setCartCount((c) => c + 1);
      setIsAdding(false);
    }, 300);
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background radial gradient halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>PROJECT VENDR 1.0 • OPEN-SOURCE ENTERPRISE COMMERCE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-400">0% Platform Fees</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            The World&apos;s Most Capable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Commerce Engine.
            </span>
            <br />
            100% Open Source.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate Shopify&apos;s 2% gateway penalties and $2,300/mo Plus paywalls. Built with Fastify, pure WASM functions, Next.js 15, and unified Flutter iOS/Android &amp; Desktop POS in a single repository.
          </p>

          {/* Action Row: CTAs & Terminal Copy */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Launch Self-Hosted Store</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Interactive Terminal Pill */}
            <div className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 rounded-full border border-zinc-700 bg-zinc-900/90 text-xs font-mono text-zinc-300 shadow-md">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">$</span>
                <span className="select-all">{command}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1 hover:text-white transition-colors"
                title="Copy command"
                aria-label="Copy command"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Live Store Builder Preview Mockup */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Top Bar / Theme Customizer Controller */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                https://store.vendr.local/products/lumina-anc-headphones
              </span>
            </div>

            {/* Theme Presets Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
              <span className="px-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                Theme:
              </span>
              <button
                onClick={() => setSelectedTheme("obsidian")}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedTheme === "obsidian"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Obsidian Dark
              </button>
              <button
                onClick={() => setSelectedTheme("nordic")}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedTheme === "nordic"
                    ? "bg-zinc-200 text-zinc-900 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Nordic Ivory
              </button>
              <button
                onClick={() => setSelectedTheme("brutalist")}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedTheme === "brutalist"
                    ? "bg-yellow-400 text-black font-mono shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Neo-Brutalist
              </button>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div
            className={`p-6 sm:p-10 transition-colors duration-500 ${
              selectedTheme === "obsidian"
                ? "bg-[#0A0A0E] text-white"
                : selectedTheme === "nordic"
                ? "bg-[#F7F7F5] text-zinc-900"
                : "bg-white text-black border-4 border-black"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Product Media */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-zinc-900/40 border border-white/5 flex items-center justify-center p-8 group">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-black shadow-md">
                    20% OFF (WASM Engine)
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 text-emerald-400 backdrop-blur-md border border-emerald-500/20">
                    ⚡ 0.56ms discount exec
                  </span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                  alt="Lumina ANC Headphones"
                  className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Details & Actions */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold">
                      Acoustic Flagship
                    </span>
                    <span className="text-xs text-zinc-500">•</span>
                    <span className="text-xs text-zinc-400 font-mono">SKU: VENDR-ANC-PRO</span>
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                      selectedTheme === "brutalist" ? "font-mono uppercase" : ""
                    }`}
                  >
                    Lumina Pro Noise-Cancelling Headphones
                  </h2>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-emerald-400">$239.20</span>
                    <span className="text-base line-through text-zinc-500">$299.00</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Save $59.80
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  Titanium 40mm dynamic acoustic drivers, active ambient hybrid cancellation, 45-hour battery reserve, and lossless low-latency Bluetooth 5.4.
                </p>

                {/* Color Variant Pills */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Select Finish:
                  </span>
                  <div className="flex items-center gap-3">
                    <button className="px-3.5 py-1.5 rounded-full text-xs font-medium border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400">
                      Space Obsidian
                    </button>
                    <button className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-zinc-700 hover:border-zinc-500 text-zinc-300">
                      Silver Mist
                    </button>
                    <button className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-zinc-700 hover:border-zinc-500 text-zinc-300">
                      Alpine White
                    </button>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 py-3.5 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      selectedTheme === "obsidian"
                        ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                        : selectedTheme === "nordic"
                        ? "bg-zinc-900 hover:bg-black text-white shadow-lg"
                        : "bg-black hover:bg-zinc-800 text-yellow-300 border-2 border-black font-mono uppercase"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAdding ? "Adding to Cart..." : "Add to Cart • $239.20"}</span>
                  </button>

                  <div className="p-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs font-mono flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Cart: {cartCount} items</span>
                  </div>
                </div>

                {/* Parity Specs Footer */}
                <div className="pt-4 border-t border-zinc-800/50 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Fastify TTFB: 24ms
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Checkout Fee: $0.00 (0%)
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                    Live POS Sync: Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
