"use client";

import React, { useState } from "react";
import { Check, X, DollarSign, TrendingUp, Sparkles, HelpCircle } from "lucide-react";

export function PricingComparison() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(75000); // Default $75,000/mo

  // Calculate Shopify estimated costs:
  // For revenue <= $25k: Basic ($25 + 2.0% gateway surcharge = $25 + $500 = $525/mo)
  // For $25k < rev <= $100k: Grow ($65 + 1.0% gateway surcharge + $200 apps = $65 + $750 + $200 = $1,015/mo)
  // For $100k < rev <= $250k: Advanced ($399 + 0.5% gateway surcharge + $400 apps = $399 + $875 + $400 = $1,674/mo)
  // For rev > $250k: Plus ($2,300 + 0.2% surcharge + $600 apps = $2,300 + $800 + $600 = $3,700/mo)

  let shopifyBasePlan = 65;
  let shopifyTaxRate = 0.01; // 1%
  let shopifyPlanName = "Shopify Grow";
  let appStoreFees = 200;

  if (monthlyRevenue <= 25000) {
    shopifyBasePlan = 25;
    shopifyTaxRate = 0.02;
    shopifyPlanName = "Shopify Basic";
    appStoreFees = 100;
  } else if (monthlyRevenue <= 100000) {
    shopifyBasePlan = 65;
    shopifyTaxRate = 0.01;
    shopifyPlanName = "Shopify Grow";
    appStoreFees = 250;
  } else if (monthlyRevenue <= 250000) {
    shopifyBasePlan = 399;
    shopifyTaxRate = 0.005;
    shopifyPlanName = "Shopify Advanced";
    appStoreFees = 500;
  } else {
    shopifyBasePlan = 2300;
    shopifyTaxRate = 0.002;
    shopifyPlanName = "Shopify Plus";
    appStoreFees = 800;
  }

  const shopifyTransactionTax = monthlyRevenue * shopifyTaxRate;
  const shopifyTotalMonthly = shopifyBasePlan + shopifyTransactionTax + appStoreFees;
  const shopifyTotalYearly = shopifyTotalMonthly * 12;

  // VENDR self-hosted cost: $0 platform fee, 0% gateway tax. Optional VPS hosting ~$40/mo.
  const vendrYearlySavings = shopifyTotalYearly;

  const comparisonRows = [
    {
      feature: "Monthly Platform Fee",
      basic: "$25 / mo",
      grow: "$65 / mo",
      advanced: "$399 / mo",
      plus: "$2,300 / mo",
      vendr: "$0 / mo (Free)",
      highlight: true,
    },
    {
      feature: "Third-Party Gateway Surcharge",
      basic: "2.0% tax",
      grow: "1.0% tax",
      advanced: "0.5% tax",
      plus: "0.15% - 0.2%",
      vendr: "0.00% (Zero Tax)",
      highlight: true,
    },
    {
      feature: "Staff Accounts",
      basic: "2 accounts",
      grow: "5 accounts",
      advanced: "15 accounts",
      plus: "Unlimited",
      vendr: "Unlimited",
      highlight: false,
    },
    {
      feature: "Inventory Locations",
      basic: "10 locations",
      grow: "10 locations",
      advanced: "10 locations",
      plus: "200 locations",
      vendr: "Unlimited",
      highlight: false,
    },
    {
      feature: "Custom WASM Functions & Cart Logic",
      basic: "No (Closed)",
      grow: "No (Closed)",
      advanced: "No (Closed)",
      plus: "Yes ($2.3k/mo)",
      vendr: "Yes (Built-in)",
      highlight: true,
    },
    {
      feature: "Full Checkout Customization",
      basic: "No",
      grow: "No",
      advanced: "No",
      plus: "Yes",
      vendr: "100% Unlocked",
      highlight: true,
    },
    {
      feature: "Enterprise B2B Wholesale & Net Terms",
      basic: "No",
      grow: "No",
      advanced: "No",
      plus: "Yes",
      vendr: "Included",
      highlight: true,
    },
    {
      feature: "Unified Native Mobile & Desktop POS",
      basic: "Add-on fee",
      grow: "Add-on fee",
      advanced: "Add-on fee",
      plus: "20 included",
      vendr: "1 Flutter Codebase",
      highlight: false,
    },
    {
      feature: "Data Sovereignty & Self-Hosting",
      basic: "No",
      grow: "No",
      advanced: "No",
      plus: "No",
      vendr: "100% Postgres RLS",
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative bg-zinc-950/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Interactive ROI Calculator
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop Paying the &ldquo;Shopify Tax&rdquo;.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            See exactly how much your brand saves every year by switching to open-source VENDR.
          </p>
        </div>

        {/* Interactive Slider & Live Savings Display */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900 to-black p-8 sm:p-12 shadow-2xl mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="space-y-8 relative z-10">
            {/* Slider Control */}
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <label htmlFor="monthly-rev-slider" className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                  Your Monthly Store Gross Merchandise Value (GMV):
                </label>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  ${monthlyRevenue.toLocaleString()} / mo
                </div>
              </div>
              <input
                id="monthly-rev-slider"
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs font-mono text-zinc-500">
                <span>$5,000/mo</span>
                <span>$100,000/mo</span>
                <span>$250,000/mo</span>
                <span>$500,000+/mo</span>
              </div>
            </div>

            {/* Calculations Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Shopify Cost Breakdown */}
              <div className="p-6 rounded-2xl border border-red-500/20 bg-red-950/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Shopify Platform Cost
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    Tier: {shopifyPlanName}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span>Base Subscription:</span>
                    <span className="font-mono">${shopifyBasePlan}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gateway Surcharge ({shopifyTaxRate * 100}%):</span>
                    <span className="font-mono font-semibold text-red-400">
                      +${shopifyTransactionTax.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>App Store Add-ons:</span>
                    <span className="font-mono">+${appStoreFees}/mo</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-red-500/20 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-zinc-300 uppercase">Total Shopify Annual Cost</span>
                  <span className="text-2xl font-black text-red-400 font-mono">
                    ${Math.round(shopifyTotalYearly).toLocaleString()} / yr
                  </span>
                </div>
              </div>

              {/* VENDR Savings Card */}
              <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      VENDR Annual Savings
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      100% Free &amp; Open
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span>Platform Subscription:</span>
                      <span className="font-mono text-emerald-400">$0.00 / mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gateway Penalty Tax:</span>
                      <span className="font-mono text-emerald-400">0.00% ($0.00)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WASM Extensions &amp; Functions:</span>
                      <span className="font-mono text-emerald-400">$0.00 (Included)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-500/30 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-zinc-200 uppercase">You Keep in Margin</span>
                  <span className="text-3xl font-black text-emerald-400 font-mono">
                    +${Math.round(vendrYearlySavings).toLocaleString()} / yr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Full Architecture &amp; Feature Comparison Matrix
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Comparing official Shopify plans against self-hosted VENDR
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-800 bg-zinc-900/60 text-xs uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-4 font-semibold">Shopify Basic</th>
                  <th className="py-4 px-4 font-semibold">Shopify Grow</th>
                  <th className="py-4 px-4 font-semibold">Shopify Adv.</th>
                  <th className="py-4 px-4 font-semibold">Shopify Plus</th>
                  <th className="py-4 px-6 font-bold text-emerald-400 bg-emerald-950/30 border-l border-emerald-500/20">
                    VENDR
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-white flex items-center gap-2">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-400">{row.basic}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-400">{row.grow}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-400">{row.advanced}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-300">{row.plus}</td>
                    <td className="py-3.5 px-6 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/20 border-l border-emerald-500/20">
                      {row.vendr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
