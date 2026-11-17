"use client";

import React from "react";
import { DollarSign, Percent, Zap, Smartphone, Database, Shield } from "lucide-react";

export function MetricsTicker() {
  const metrics = [
    {
      label: "Platform Subscription",
      value: "$0 / mo",
      subtext: "Self-hosted open source forever",
      comparison: "vs $2,300/mo Shopify Plus",
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      label: "Gateway Surcharge",
      value: "0.00%",
      subtext: "Zero transaction cut on any gateway",
      comparison: "vs 2.0% Shopify penalty tax",
      icon: Percent,
      color: "text-teal-400",
    },
    {
      label: "WASM Function Latency",
      value: "0.56ms",
      subtext: "Deterministic sandboxed execution",
      comparison: "vs closed Ruby/V8 micro-tasks",
      icon: Zap,
      color: "text-cyan-400",
    },
    {
      label: "Cross-Platform Targets",
      value: "5 OS Targets",
      subtext: "iOS, Android, Windows, macOS, Linux",
      comparison: "1 unified Flutter Riverpod app",
      icon: Smartphone,
      color: "text-indigo-400",
    },
    {
      label: "Merchant Sovereignty",
      value: "100%",
      subtext: "Your Postgres DB, your customers",
      comparison: "No platform deplatforming risk",
      icon: Database,
      color: "text-purple-400",
    },
  ];

  return (
    <section className="py-12 border-y border-white/10 bg-zinc-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="space-y-2 p-4 rounded-xl border border-white/5 bg-zinc-900/40 hover:border-emerald-500/30 transition-all hover:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className={`text-2xl sm:text-3xl font-black tracking-tight ${item.color}`}>
                  {item.value}
                </div>
                <p className="text-xs text-zinc-300 font-medium">{item.subtext}</p>
                <div className="text-[11px] font-mono text-zinc-500 pt-1 border-t border-zinc-800">
                  {item.comparison}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
