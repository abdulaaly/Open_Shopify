"use client";

import React, { useState } from "react";
import { Terminal, Code, Cpu, Play, Check, Copy, Zap, Lock, ShieldCheck } from "lucide-react";

type DevTab = "graphql" | "wasm" | "webhooks";

export function DeveloperPlayground() {
  const [activeTab, setActiveTab] = useState<DevTab>("graphql");
  const [wasmRunning, setWasmRunning] = useState(false);
  const [wasmLensTime, setWasmLensTime] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const graphqlQuery = `query GetStorefrontCatalog {
  products(first: 3) {
    edges {
      node {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            quantityAvailable
          }
        }
      }
    }
  }
}`;

  const graphqlResponse = `{
  "data": {
    "products": {
      "edges": [
        {
          "node": {
            "id": "prod_anc_01",
            "title": "Lumina Pro Headphones",
            "handle": "lumina-anc-headphones",
            "priceRange": {
              "minVariantPrice": { "amount": "239.20", "currencyCode": "USD" }
            },
            "variants": {
              "nodes": [{ "id": "var_anc_01", "availableForSale": true, "quantityAvailable": 140 }]
            }
          }
        }
      ]
    }
  },
  "extensions": {
    "cost": { "actualQueryCost": 2, "throttleStatus": { "maximumAvailable": 1000 } },
    "executionTimeMs": 14.2
  }
}`;

  const wasmRustCode = `// VENDR WASM Function (packages/wasm-engine)
// Target: wasm32-unknown-unknown | Strict memory isolation: 10MiB
#[no_mangle]
pub extern "C" fn run_discount_filter(input_ptr: *const u8, len: usize) -> u64 {
    let input: FunctionInput = deserialize_json(input_ptr, len);
    
    // Evaluate VIP Tier or quantity thresholds
    let discount_pct = if input.cart.lines.len() >= 2 { 0.20 } else { 0.0 };
    
    let output = FunctionOutput {
        discount_percentage: discount_pct,
        applied_promo: "VIP20".into(),
        message: "Applied 20% Volume Tier Discount".into()
    };
    serialize_and_return(output)
}`;

  const handleSimulateWasm = () => {
    setWasmRunning(true);
    setTimeout(() => {
      setWasmLensTime("0.54ms");
      setWasmRunning(false);
    }, 250);
  };

  const handleCopyCode = () => {
    const text = activeTab === "graphql" ? graphqlQuery : wasmRustCode;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Developer Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Developers. Built for Speed.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Shopify-compatible GraphQL schemas and pure WASM function execution in under 1 millisecond.
          </p>
        </div>

        {/* Developer Console Box */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Header & Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("graphql")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "graphql"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Storefront GraphQL
              </button>
              <button
                onClick={() => setActiveTab("wasm")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "wasm"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Rust WASM Functions
              </button>
              <button
                onClick={() => setActiveTab("webhooks")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "webhooks"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                HMAC Webhooks
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Source"}</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6">
            {activeTab === "graphql" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-mono text-zinc-400 mb-2 flex items-center justify-between">
                    <span>GraphQL Query (Storefront API)</span>
                    <span className="text-emerald-400">POST /graphql/storefront</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed h-80">
                    {graphqlQuery}
                  </pre>
                </div>

                <div>
                  <div className="text-xs font-mono text-zinc-400 mb-2 flex items-center justify-between">
                    <span>Live JSON Response</span>
                    <span className="text-emerald-400">⚡ 14.2ms</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed h-80">
                    {graphqlResponse}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "wasm" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-zinc-400">Sandboxed WebAssembly Engine: packages/wasm-engine</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">Binary: 28.4 KiB (Strict limit &lt;256 KiB)</span>
                    <button
                      onClick={handleSimulateWasm}
                      disabled={wasmRunning}
                      className="px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{wasmRunning ? "Benchmarking..." : "Execute WASM"}</span>
                    </button>
                  </div>
                </div>

                <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-cyan-300/90 overflow-x-auto leading-relaxed">
                  {wasmRustCode}
                </pre>

                {wasmLensTime && (
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      WASM Execution Complete: Deterministic Cart Output Verified
                    </span>
                    <span className="text-cyan-400 font-bold font-mono">
                      Latency: {wasmLensTime} (Budget: &lt; 5.0ms)
                    </span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "webhooks" && (
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Cryptographic HMAC-SHA256 Webhook Delivery</span>
                  <span className="text-purple-400">BullMQ Distributed Queue</span>
                </div>
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3 text-zinc-300">
                  <p className="text-zinc-500">{`// Outgoing Webhook Request Header`}</p>
                  <p className="text-purple-400">{`X-Vendr-Topic: orders/create`}</p>
                  <p className="text-purple-400">{`X-Vendr-Hmac-Sha256: dGhpcy1pcy1hLXZhbGlkLXNoYTI1Ni1obWFj`}</p>
                  <p className="text-purple-400">{`X-Vendr-Store-Id: store_apex_01`}</p>
                  <p className="pt-2 text-zinc-500">{`// Payload: Order #1001 Created ($239.20)`}</p>
                  <p>{`{ "id": "ord_1001", "total": "239.20", "status": "PAID", "items": [{ "sku": "VENDR-ANC-PRO" }] }`}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
