"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { useCart } from "../components/CartContext";
import { Product } from "@vendr/types";

const catalogProducts: Product[] = [
  {
    id: "prod_1",
    tenantId: "ten_apex_apparel",
    title: "Heavyweight Boxy Tee in Washed Slate",
    handle: "heavyweight-boxy-tee-washed-slate",
    description: "Crafted from 280 GSM custom combed cotton jersey. Cut with relaxed dropped shoulders and a dense 1.25-inch ribbed collar.",
    vendor: "Apex Apparel",
    productType: "Tops",
    status: "ACTIVE",
    tags: ["cotton", "basics", "apparel"],
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"],
    options: [{ name: "Size", values: ["S", "M", "L"] }],
    variants: [
      {
        id: "var_tee_m",
        productId: "prod_1",
        title: "M / Washed Slate",
        sku: "APX-TEE-SLT-M",
        price: 58.0,
        compareAtPrice: 70.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        inventoryQuantity: 62,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
    ],
    totalInventory: 137,
    createdAt: "2026-11-16T00:00:00Z",
    updatedAt: "2026-11-16T00:00:00Z",
  },
  {
    id: "prod_2",
    tenantId: "ten_apex_apparel",
    title: "Double-Weave Architect Overshirt",
    handle: "double-weave-architect-overshirt",
    description: "Structured utilitarian jacket constructed with Japanese double-weave cotton canvas.",
    vendor: "Apex Apparel",
    productType: "Outerwear",
    status: "ACTIVE",
    tags: ["jacket", "canvas", "menswear"],
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"],
    options: [{ name: "Size", values: ["M", "L"] }],
    variants: [
      {
        id: "var_shir_l",
        productId: "prod_2",
        title: "L / Charcoal",
        sku: "APX-OVS-CHR-L",
        price: 185.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "L" }],
        inventoryQuantity: 24,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
    ],
    totalInventory: 42,
    createdAt: "2026-11-16T00:00:00Z",
    updatedAt: "2026-11-16T00:00:00Z",
  },
  {
    id: "prod_3",
    tenantId: "ten_apex_apparel",
    title: "14oz Selvedge Straight-Leg Denim",
    handle: "14oz-selvedge-straight-leg-denim",
    description: "Unsanforized 14.5oz Japanese selvedge denim woven on vintage shuttle looms in Okayama.",
    vendor: "Apex Apparel",
    productType: "Bottoms",
    status: "ACTIVE",
    tags: ["denim", "selvedge", "japan"],
    images: ["https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80"],
    options: [{ name: "Waist", values: ["30", "32"] }],
    variants: [
      {
        id: "var_denim_32",
        productId: "prod_3",
        title: "32 / Raw Indigo",
        sku: "APX-DNM-IND-32",
        price: 210.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Waist", value: "32" }],
        inventoryQuantity: 28,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
    ],
    totalInventory: 43,
    createdAt: "2026-11-16T00:00:00Z",
    updatedAt: "2026-11-16T00:00:00Z",
  },
];

export default function StorefrontHomePage() {
  const { addItem } = useCart();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 px-6 md:px-12">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FALL / WINTER 2026 COLLECTION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            Architectural Uniforms for Modern Pioneers.
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Constructed with heavyweight custom yarns and Japanese artisanal weaves. Engineered for perpetual utility and lifetime durability.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <a
              href="#catalog"
              className="h-11 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs flex items-center gap-2 transition-colors shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Value Badges */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-slate-100 rounded-xl p-6 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900">Sub-50ms Global Edge</h4>
              <p className="text-[11px] text-slate-500">Instantaneous storefront hydration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900">Zero Transaction Fees</h4>
              <p className="text-[11px] text-slate-500">100% merchant direct payments</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900">WASM Discount Engine</h4>
              <p className="text-[11px] text-slate-500">Pure sandbox code execution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalog Grid */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Curated Releases
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select items crafted for the contemporary wardrobe
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">3 ITEMS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogProducts.map((product) => {
            const variant = product.variants[0];

            return (
              <div key={product.id} className="group flex flex-col space-y-3">
                <Link
                  href={`/products/${product.handle}`}
                  className="relative aspect-4/5 overflow-hidden rounded-lg bg-slate-100 border border-slate-200"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {variant.compareAtPrice && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Sale
                    </span>
                  )}
                </Link>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      <Link href={`/products/${product.handle}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {product.vendor}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      ${variant.price.toFixed(2)}
                    </span>
                    {variant.compareAtPrice && (
                      <span className="font-mono text-[11px] text-slate-400 line-through ml-1.5">
                        ${variant.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addItem(product, variant, 1)}
                  className="w-full h-9 bg-slate-900 hover:bg-emerald-600 text-white rounded font-medium text-xs transition-colors shadow-sm"
                >
                  Quick Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
