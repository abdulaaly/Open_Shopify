"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Menu, X, GitBranch, ChevronDown } from "lucide-react";
import { TrialModal } from "./TrialModal";

export function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/branding/openshopify-icon.svg"
                    alt="Open Shopify"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Open<span className="text-emerald-400">Shopify</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OmniShop Native
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
              <a href="#omnichannel" className="hover:text-white transition-colors flex items-center gap-1">
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#omnichannel" className="hover:text-white transition-colors">
                OmniShop POS
              </a>
              <a href="#developer" className="hover:text-white transition-colors">
                Developer &amp; WASM
              </a>
              <a
                href="https://github.com/abdulaaly/Open_Shopify"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span>GitHub</span>
                <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[11px] font-mono">
                  Open_Shopify
                </span>
              </a>
            </div>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                Log in
              </a>
              <button
                onClick={() => setTrialModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all font-medium hover:scale-105"
              >
                <span>Start free trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
            <a
              href="#omnichannel"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-zinc-300 hover:text-white"
            >
              Solutions &amp; POS
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-zinc-300 hover:text-white"
            >
              Pricing &amp; ROI
            </a>
            <a
              href="#developer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-zinc-300 hover:text-white"
            >
              Developer &amp; WASM
            </a>
            <div className="pt-4 flex flex-col gap-2">
              <a
                href="http://localhost:3001"
                className="w-full text-center py-2 text-xs font-semibold rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200"
              >
                Log in to Admin
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTrialModalOpen(true);
                }}
                className="w-full text-center py-2 text-xs font-semibold rounded-full bg-emerald-500 text-black font-medium"
              >
                Start free trial
              </button>
            </div>
          </div>
        )}
      </nav>

      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
      />
    </>
  );
}
