"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, ShoppingBag } from "lucide-react";
import { useCart } from "../components/CartContext";
import { Product } from "@vendr/types";

const fallbackCatalog: Product[] = [
  {
    id: "prod_heavyweight_tee",
    tenantId: "ten_apex_apparel",
    title: "Heavyweight Boxy Tee in Washed Slate",
    handle: "heavyweight-boxy-tee-washed-slate",
    description: "Crafted from 280 GSM custom combed cotton jersey. Cut with relaxed dropped shoulders and a dense 1.25-inch ribbed collar.",
    vendor: "Apex Apparel",
    productType: "Tops",
    status: "ACTIVE",
    tags: ["cotton", "basics", "apparel"],
    images: ["/assets/products/heavyweight-tee.svg"],
    options: [{ name: "Size", values: ["S", "M", "L"] }],
    variants: [
      {
        id: "var_tee_m",
        productId: "prod_heavyweight_tee",
        title: "M / Washed Slate",
        sku: "APX-TEE-SLT-M",
        price: 58.0,
        compareAtPrice: 70.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        inventoryQuantity: 62,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    totalInventory: 137,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_architect_overshirt",
    tenantId: "ten_apex_apparel",
    title: "Double-Weave Architect Overshirt",
    handle: "double-weave-architect-overshirt",
    description: "Structured utilitarian jacket constructed with Japanese double-weave cotton canvas.",
    vendor: "Apex Apparel",
    productType: "Outerwear",
    status: "ACTIVE",
    tags: ["jacket", "canvas", "menswear"],
    images: ["/assets/products/architect-overshirt.svg"],
    options: [{ name: "Size", values: ["M", "L"] }],
    variants: [
      {
        id: "var_shir_l",
        productId: "prod_architect_overshirt",
        title: "L / Charcoal",
        sku: "APX-OVS-CHR-L",
        price: 185.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "L" }],
        inventoryQuantity: 24,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    totalInventory: 42,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_raw_denim",
    tenantId: "ten_apex_apparel",
    title: "14oz Selvedge Straight-Leg Denim",
    handle: "14oz-selvedge-straight-leg-denim",
    description: "Unsanforized 14.5oz Japanese selvedge denim woven on vintage shuttle looms in Okayama.",
    vendor: "Apex Apparel",
    productType: "Bottoms",
    status: "ACTIVE",
    tags: ["denim", "selvedge", "japan"],
    images: ["/assets/products/selvedge-denim.svg"],
    options: [{ name: "Waist", values: ["30", "32"] }],
    variants: [
      {
        id: "var_denim_32",
        productId: "prod_raw_denim",
        title: "32 / Raw Indigo",
        sku: "APX-DNM-IND-32",
        price: 210.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Waist", value: "32" }],
        inventoryQuantity: 28,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    totalInventory: 43,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function StorefrontHomePage() {
  const { addItem, setIsOpen } = useCart();
  const [products, setProducts] = useState<Product[]>(fallbackCatalog);
  const [storeName, setStoreName] = useState("Apex Apparel Co.");
  const [tenantSlug, setTenantSlug] = useState("apex-apparel");
  const [themeHeadline, setThemeHeadline] = useState("Architectural Essentials for Modern Pioneers.");
  const [themeAnnouncement, setThemeAnnouncement] = useState("FALL / WINTER 2026 COLLECTION • FREE EXPRESS SHIPPING OVER $100");

  useEffect(() => {
    const slug = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tenant") || "apex-apparel"
      : "apex-apparel";
    setTenantSlug(slug);

    // Fetch store info
    fetch(`http://localhost:4000/api/v1/store?tenant=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) setStoreName(data.name);
      })
      .catch(() => {});

    // Fetch theme settings
    fetch(`http://localhost:4000/api/v1/theme-config?tenant=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.config) {
          if (data.config.headline) setThemeHeadline(data.config.headline);
          if (data.config.announcement) setThemeAnnouncement(data.config.announcement);
        }
      })
      .catch(() => {});

    // Fetch catalog products
    fetch(`http://localhost:4000/api/v1/products?tenant=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-emerald-400 text-center py-2 px-4 text-xs font-mono font-medium tracking-wide">
        {themeAnnouncement}
      </div>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-24 px-6 md:px-12 border-b border-slate-800">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPEN SHOPIFY SOVEREIGN COMMERCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            {themeHeadline}
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Direct-from-maker sovereign goods. Powered by Next.js 15, zero transaction fees, and instant real-time POS inventory synchronization.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <a
              href="#catalog"
              className="h-11 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`http://localhost:3001?tenant=${tenantSlug}`}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-6 border border-slate-700 bg-slate-900 text-slate-200 hover:text-white rounded-full font-semibold text-xs flex items-center gap-2 transition-all"
            >
              <span>Merchant Admin</span>
            </a>
          </div>
        </div>
      </section>

      {/* Value Badges */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Sub-50ms Global Edge</h4>
              <p className="text-[11px] text-slate-500">Instantaneous storefront hydration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Zero Transaction Fees</h4>
              <p className="text-[11px] text-slate-500">100% merchant direct revenue</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">OmniShop POS Sync</h4>
              <p className="text-[11px] text-slate-500">Live inventory across iOS, Android & POS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalog Grid */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {storeName} Catalog
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select verified items crafted with lifetime durability
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono font-bold">
            {products.length} PRODUCTS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const variant = product.variants[0] || {
              id: "var_default",
              price: 99.0,
              title: "Default",
              sku: "SKU-DEF",
            };

            return (
              <div key={product.id} className="group flex flex-col space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
                  <img
                    src={product.images[0] || "/assets/products/heavyweight-tee.svg"}
                    alt={product.title}
                    className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {variant.compareAtPrice && (
                    <span className="absolute top-3 right-3 bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Sale
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-start pt-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {product.vendor} • {product.totalInventory} in stock
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-black text-slate-900">
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
                  onClick={() => {
                    addItem(product, variant as any, 1);
                    setIsOpen(true);
                  }}
                  className="w-full h-10 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add to Cart</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
