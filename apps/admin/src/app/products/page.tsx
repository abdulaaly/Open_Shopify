"use client";

import React, { useState } from "react";
import { Card, IndexTable, Badge, Button } from "@vendr/ui";
import { Product } from "@vendr/types";
import { Search, Plus } from "lucide-react";

const initialProductsList: Product[] = [
  {
    id: "prod_1",
    tenantId: "ten_apex_apparel",
    title: "Heavyweight Boxy Tee in Washed Slate",
    handle: "heavyweight-boxy-tee-washed-slate",
    description: "280 GSM combed cotton jersey with dropped shoulders.",
    vendor: "Apex Apparel",
    productType: "Tops",
    status: "ACTIVE",
    tags: ["cotton", "basics", "apparel"],
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"],
    options: [{ name: "Size", values: ["S", "M", "L"] }],
    variants: [
      {
        id: "v_1",
        productId: "prod_1",
        title: "M / Washed Slate",
        sku: "APX-TEE-SLT-M",
        price: 58.0,
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
    description: "Japanese double-weave cotton canvas utilitarian jacket.",
    vendor: "Apex Apparel",
    productType: "Outerwear",
    status: "ACTIVE",
    tags: ["jacket", "canvas", "menswear"],
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"],
    options: [{ name: "Size", values: ["M", "L"] }],
    variants: [
      {
        id: "v_2",
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
    description: "Unsanforized Japanese selvedge denim woven on shuttle looms.",
    vendor: "Apex Apparel",
    productType: "Bottoms",
    status: "ACTIVE",
    tags: ["denim", "selvedge", "japan"],
    images: ["https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80"],
    options: [{ name: "Waist", values: ["30", "32"] }],
    variants: [
      {
        id: "v_3",
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProductsList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const productColumns = [
    {
      id: "product",
      header: "Product",
      accessor: (p: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={p.images[0]}
            alt={p.title}
            className="w-9 h-9 rounded object-cover border border-slate-200"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 cursor-pointer">
              {p.title}
            </span>
            <span className="text-[11px] text-slate-400">{p.vendor}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      accessor: (p: Product) => (
        <Badge tone={p.status === "ACTIVE" ? "success" : "neutral"} dot>
          {p.status}
        </Badge>
      ),
    },
    {
      id: "inventory",
      header: "Inventory",
      accessor: (p: Product) => (
        <span
          className={`font-medium ${
            p.totalInventory > 20 ? "text-slate-700" : "text-amber-600"
          }`}
        >
          {p.totalInventory} in stock
        </span>
      ),
    },
    {
      id: "category",
      header: "Category",
      accessor: (p: Product) => (
        <span className="text-slate-500">{p.productType}</span>
      ),
    },
    {
      id: "price",
      header: "Price",
      accessor: (p: Product) => (
        <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
          ${p.variants[0]?.price.toFixed(2)}
        </span>
      ),
      align: "right" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Products
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your store catalog, variants, pricing, and inventory
          </p>
        </div>

        <Button size="sm" onClick={() => alert("Add product modal.")}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>Add product</span>
        </Button>
      </div>

      <Card padding="none">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by title, sku, or tag..."
              className="w-full h-7 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <IndexTable
          columns={productColumns}
          data={products}
          keyExtractor={(p) => p.id}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </Card>
    </div>
  );
}
