"use client";

import React, { useState } from "react";
import { X, Sparkles, ArrowRight, CheckCircle2, Store, Lock, Mail, Loader2 } from "lucide-react";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export function TrialModal({ isOpen, onClose, defaultEmail = "" }: TrialModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setStoreName(name);
    setSlug(name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !storeName) {
      setError("Please provide both email and store name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: password || "openshopify123",
          storeName,
          storeSlug: slug || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to provision store.");
      }

      setSuccessData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check if API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!successData ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Instant Cloud & Self-Host Provisioning
              </span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              Launch Your Open Shopify Store
            </h2>
            <p className="text-xs text-zinc-400 mt-1 mb-6">
              Zero credit card required. 100% open source. Ready in &lt; 2 seconds.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Business / Store Name
                </label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={handleNameChange}
                    placeholder="e.g. Karachi Artisans & Tech"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Store Subdomain
                </label>
                <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                    placeholder="store-slug"
                    className="flex-1 bg-transparent text-emerald-400 font-mono focus:outline-none text-sm placeholder-zinc-600"
                  />
                  <span className="text-zinc-500 font-mono text-xs">.openshopify.local</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Merchant Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="merchant@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••••••• (default: openshopify123)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Provisioning Multi-Tenant DB &amp; Themes...</span>
                  </>
                ) : (
                  <>
                    <span>Create Store &amp; Access Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">
              Store Provisioned Successfully!
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Your multi-tenant store <span className="text-emerald-400 font-semibold">{successData.store.name}</span> is live with starter catalog, theme configs, and OmniShop sync enabled.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Store Domain:</span>
                <span className="text-zinc-200">{successData.store.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tenant ID:</span>
                <span className="text-emerald-400">{successData.store.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Admin Account:</span>
                <span className="text-zinc-200">{successData.user.email}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`http://localhost:3001?tenant=${successData.store.slug}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Open Merchant Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={`http://localhost:3000?tenant=${successData.store.slug}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all"
              >
                View Live Storefront
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
