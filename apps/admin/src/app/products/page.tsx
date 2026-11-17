"use client";

import React, { useState, useEffect } from "react";
import { Card, IndexTable, Badge, Button } from "@vendr/ui";
import { Product } from "@vendr/types";
import { Search, Plus, X, Check, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";

const availableLocalAssets = [
  { label: "Heavyweight Boxy Tee (Apparel)", value: "/assets/products/heavyweight-tee.svg" },
  { label: "Double-Weave Overshirt (Outerwear)", value: "/assets/products/architect-overshirt.svg" },
  { label: "14oz Selvedge Denim (Bottoms)", value: "/assets/products/selvedge-denim.svg" },
  { label: "Lumina ANC Studio Headphones (Audio)", value: "/assets/products/lumina-headphones.svg" },
  { label: "Keyvox Pro 75% Keyboard (Peripherals)", value: "/assets/products/mechanical-keyboard.svg" },
  { label: "OmniShop Hardware POS Terminal (Hardware)", value: "/assets/products/smart-touch-pos.svg" },
];

const fallbackProducts: Product[] = [
  {
    id: "prod_heavyweight_tee",
    tenantId: "ten_apex_apparel",
    title: "Heavyweight Boxy Tee in Washed Slate",
    handle: "heavyweight-boxy-tee-washed-slate",
    description: "280 GSM combed cotton jersey with dropped shoulders.",
    vendor: "Apex Apparel",
    productType: "Tops",
    status: "ACTIVE",
    tags: ["cotton", "basics", "apparel"],
    images: ["/assets/products/heavyweight-tee.svg"],
    options: [{ name: "Size", values: ["S", "M", "L"] }],
    variants: [
      {
        id: "v_1",
        productId: "prod_heavyweight_tee",
        title: "M / Washed Slate",
        sku: "APX-TEE-SLT-M",
        price: 58.0,
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
    description: "Japanese double-weave cotton canvas utilitarian jacket.",
    vendor: "Apex Apparel",
    productType: "Outerwear",
    status: "ACTIVE",
    tags: ["jacket", "canvas", "menswear"],
    images: ["/assets/products/architect-overshirt.svg"],
    options: [{ name: "Size", values: ["M", "L"] }],
    variants: [
      {
        id: "v_2",
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
    description: "Unsanforized Japanese selvedge denim woven on shuttle looms.",
    vendor: "Apex Apparel",
    productType: "Bottoms",
    status: "ACTIVE",
    tags: ["denim", "selvedge", "japan"],
    images: ["/assets/products/selvedge-denim.svg"],
    options: [{ name: "Waist", values: ["30", "32"] }],
    variants: [
      {
        id: "v_3",
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New product form states
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("95.00");
  const [newSku, setNewSku] = useState("APX-NEW-01");
  const [newStock, setNewStock] = useState("40");
  const [newCategory, setNewCategory] = useState("Apparel");
  const [selectedImage, setSelectedImage] = useState("/assets/products/heavyweight-tee.svg");

  useEffect(() => {
    // Fetch live products from backend
    const tenantSlug = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tenant") || "apex-apparel"
      : "apex-apparel";

    fetch(`http://localhost:4000/api/v1/products?tenant=${tenantSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.log("Using cached/fallback products:", err));
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    setIsSubmitting(true);
    const tenantSlug = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tenant") || "apex-apparel"
      : "apex-apparel";

    try {
      const res = await fetch(`http://localhost:4000/api/v1/products?tenant=${tenantSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vendr-tenant": tenantSlug,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          price: parseFloat(newPrice),
          sku: newSku,
          inventoryQuantity: parseInt(newStock, 10),
          category: newCategory,
          image: selectedImage,
        }),
      });

      const data = await res.json();
      if (data.product) {
        setProducts([data.product, ...products]);
      } else {
        // Fallback local append
        const localProd: Product = {
          id: `prod_${Date.now()}`,
          tenantId: `ten_${tenantSlug}`,
          title: newTitle,
          handle: newTitle.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          description: newDescription,
          vendor: "Open Shopify Merchant",
          productType: newCategory,
          status: "ACTIVE",
          tags: [newCategory.toLowerCase()],
          images: [selectedImage],
          options: [{ name: "Default", values: ["Default"] }],
          variants: [
            {
              id: `v_${Date.now()}`,
              productId: `prod_${Date.now()}`,
              title: "Standard",
              sku: newSku,
              price: parseFloat(newPrice),
              requiresShipping: true,
              selectedOptions: [{ name: "Default", value: "Default" }],
              inventoryQuantity: parseInt(newStock, 10),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          totalInventory: parseInt(newStock, 10),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProducts([localProd, ...products]);
      }

      setIsAddModalOpen(false);
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.productType && p.productType.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const productColumns = [
    {
      id: "product",
      header: "Product",
      accessor: (p: Product) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shrink-0 flex items-center justify-center">
            <img
              src={p.images[0] || "/assets/products/heavyweight-tee.svg"}
              alt={p.title}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 hover:text-emerald-600 cursor-pointer">
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
          className={`font-mono text-xs font-medium ${
            p.totalInventory > 20 ? "text-slate-700 dark:text-slate-300" : "text-amber-600 dark:text-amber-400 font-bold"
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
        <span className="text-xs text-slate-500">{p.productType || "General"}</span>
      ),
    },
    {
      id: "price",
      header: "Price",
      accessor: (p: Product) => (
        <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
          ${p.variants[0]?.price ? p.variants[0].price.toFixed(2) : "0.00"}
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
            Manage your store catalog, variants, pricing, and real-time inventory
          </p>
        </div>

        <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>Add product</span>
        </Button>
      </div>

      <Card padding="none">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative w-80">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, vendor, or category..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-slate-100"
            />
          </div>
          <span className="text-xs font-mono text-slate-400">
            {filteredProducts.length} items
          </span>
        </div>

        <IndexTable
          columns={productColumns}
          data={filteredProducts}
          keyExtractor={(p) => p.id}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </Card>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Add New Product
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lumina Hi-Fi Acoustic Cable"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detailed craft specifications..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Audio">Audio</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Bottoms">Bottoms</option>
                  </select>
                </div>
              </div>

              {/* Local Asset Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Product Visual Media (Local High-Craft Asset)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableLocalAssets.map((asset) => (
                    <button
                      type="button"
                      key={asset.value}
                      onClick={() => setSelectedImage(asset.value)}
                      className={`p-2 rounded-lg border text-left flex flex-col items-center gap-1.5 transition-all ${
                        selectedImage === asset.value
                          ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300"
                      }`}
                    >
                      <div className="w-10 h-10 rounded bg-slate-950 p-1 flex items-center justify-center overflow-hidden">
                        <img src={asset.value} alt={asset.label} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] text-center text-slate-600 dark:text-slate-300 truncate w-full">
                        {asset.label.split(" (")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Save Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
