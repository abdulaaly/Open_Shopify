"use client";

import React, { useState, use } from "react";
import { useCart } from "../../../components/CartContext";
import { Product } from "@vendr/types";
import { ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const allProducts: Record<string, Product> = {
  "heavyweight-boxy-tee-washed-slate": {
    id: "prod_1",
    tenantId: "ten_apex_apparel",
    title: "Heavyweight Boxy Tee in Washed Slate",
    handle: "heavyweight-boxy-tee-washed-slate",
    description:
      "Crafted from 280 GSM custom combed cotton jersey. Cut with relaxed dropped shoulders and a dense 1.25-inch ribbed collar. Pre-shrunk and garment-washed for a vintage patina.",
    vendor: "Apex Apparel",
    productType: "Tops",
    status: "ACTIVE",
    tags: ["cotton", "basics", "apparel"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    ],
    options: [{ name: "Size", values: ["S", "M", "L", "XL"] }],
    variants: [
      {
        id: "var_tee_s",
        productId: "prod_1",
        title: "S / Washed Slate",
        sku: "APX-TEE-SLT-S",
        price: 58.0,
        compareAtPrice: 70.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        inventoryQuantity: 34,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
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
      {
        id: "var_tee_l",
        productId: "prod_1",
        title: "L / Washed Slate",
        sku: "APX-TEE-SLT-L",
        price: 58.0,
        compareAtPrice: 70.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "L" }],
        inventoryQuantity: 41,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
    ],
    totalInventory: 137,
    createdAt: "2026-11-16T00:00:00Z",
    updatedAt: "2026-11-16T00:00:00Z",
  },
  "double-weave-architect-overshirt": {
    id: "prod_2",
    tenantId: "ten_apex_apparel",
    title: "Double-Weave Architect Overshirt",
    handle: "double-weave-architect-overshirt",
    description:
      "Structured utilitarian jacket constructed with Japanese double-weave cotton canvas. Features dual oversized patch chest pockets and matte black horn buttons.",
    vendor: "Apex Apparel",
    productType: "Outerwear",
    status: "ACTIVE",
    tags: ["jacket", "canvas", "menswear"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    ],
    options: [{ name: "Size", values: ["M", "L"] }],
    variants: [
      {
        id: "var_shir_m",
        productId: "prod_2",
        title: "M / Charcoal",
        sku: "APX-OVS-CHR-M",
        price: 185.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        inventoryQuantity: 18,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
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
  "14oz-selvedge-straight-leg-denim": {
    id: "prod_3",
    tenantId: "ten_apex_apparel",
    title: "14oz Selvedge Straight-Leg Denim",
    handle: "14oz-selvedge-straight-leg-denim",
    description:
      "Unsanforized 14.5oz Japanese selvedge denim woven on vintage shuttle looms in Okayama. Deep indigo warp with natural ring-spun ecru weft.",
    vendor: "Apex Apparel",
    productType: "Bottoms",
    status: "ACTIVE",
    tags: ["denim", "selvedge", "japan"],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
    ],
    options: [{ name: "Waist", values: ["30", "32"] }],
    variants: [
      {
        id: "var_denim_30",
        productId: "prod_3",
        title: "30 / Raw Indigo",
        sku: "APX-DNM-IND-30",
        price: 210.0,
        requiresShipping: true,
        selectedOptions: [{ name: "Waist", value: "30" }],
        inventoryQuantity: 15,
        createdAt: "2026-11-16T00:00:00Z",
        updatedAt: "2026-11-16T00:00:00Z",
      },
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
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = use(params);
  const product = allProducts[resolvedParams.handle] || allProducts["heavyweight-boxy-tee-washed-slate"];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const variant = product.variants[selectedVariantIndex] || product.variants[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to collections</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/5 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">
              {product.vendor}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-mono text-xl font-bold text-slate-900">
                ${variant.price.toFixed(2)}
              </span>
              {variant.compareAtPrice && (
                <span className="font-mono text-sm text-slate-400 line-through">
                  ${variant.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Option Selectors */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-slate-900 block">
              Select Variant:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v, idx) => {
                const isSelected = idx === selectedVariantIndex;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`h-9 px-4 text-xs font-medium rounded-md border transition-all ${
                      isSelected
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {v.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex gap-4">
              <div className="inline-flex items-center border border-slate-200 rounded-md text-xs font-mono">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="px-3 py-2 font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addItem(product, variant, quantity)}
                className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Add to Cart • ${(variant.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In stock — ready to ship ({variant.inventoryQuantity} units available)</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" />
              <span>Free standard express shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>30-day effortless return window and lifetime craft guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
