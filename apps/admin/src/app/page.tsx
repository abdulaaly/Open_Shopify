"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Percent,
  Plus,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { StatCard, Card, Button, IndexTable, Badge } from "@vendr/ui";
import { Order } from "@vendr/types";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [storeName, setStoreName] = useState("Apex Apparel Co.");
  const [tenantSlug, setTenantSlug] = useState("apex-apparel");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    const slug = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tenant") || "apex-apparel"
      : "apex-apparel";
    setTenantSlug(slug);

    // Fetch store details
    fetch(`http://localhost:4000/api/v1/store?tenant=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) setStoreName(data.name);
      })
      .catch((err) => console.log("Store fetch error:", err));

    // Fetch live orders
    fetch(`http://localhost:4000/api/v1/orders?tenant=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.orders) setOrders(data.orders);
      })
      .catch((err) => console.log("Orders fetch error:", err));
  }, []);

  const totalGMV = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  const orderColumns = [
    {
      id: "order",
      header: "Order",
      accessor: (o: Order) => (
        <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 hover:text-emerald-600 cursor-pointer">
          {o.name}
        </span>
      ),
      sortable: true,
      width: "90px",
    },
    {
      id: "date",
      header: "Date",
      accessor: (o: Order) => (
        <span className="text-xs text-slate-500">
          {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      accessor: (o: Order) => (
        <div className="flex flex-col">
          <span className="font-medium text-xs text-slate-800 dark:text-slate-200">
            {o.shippingAddress?.firstName} {o.shippingAddress?.lastName}
          </span>
          <span className="text-[11px] text-slate-400">{o.email}</span>
        </div>
      ),
    },
    {
      id: "payment",
      header: "Payment",
      accessor: (o: Order) => (
        <Badge tone={o.financialStatus === "PAID" ? "success" : "warning"} dot>
          {o.financialStatus}
        </Badge>
      ),
    },
    {
      id: "fulfillment",
      header: "Fulfillment",
      accessor: (o: Order) => (
        <Badge tone={o.fulfillmentStatus === "FULFILLED" ? "info" : "neutral"}>
          {o.fulfillmentStatus}
        </Badge>
      ),
    },
    {
      id: "total",
      header: "Total",
      accessor: (o: Order) => (
        <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
          ${o.totalPrice.toFixed(2)}
        </span>
      ),
      align: "right" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Store Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {storeName} Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-tenant telemetry and order processing • Active Tenant: <code className="text-emerald-600 dark:text-emerald-400 font-mono">{tenantSlug}</code>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open(`http://localhost:3000?tenant=${tenantSlug}`, "_blank")}
          >
            <span>Live Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>

          <Button
            size="sm"
            onClick={() => (window.location.href = `/products?tenant=${tenantSlug}`)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add product</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total GMV Sales"
          value={totalGMV > 0 ? `$${totalGMV.toFixed(2)}` : "$142,850.00"}
          delta={{ value: "+18.4%", trend: "up", label: "vs last 30 days" }}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard
          title="Total Orders"
          value={orders.length > 0 ? `${orders.length}` : "1,420"}
          delta={{ value: "+9.2%", trend: "up", label: "vs last 30 days" }}
          icon={<ShoppingBag className="w-4 h-4" />}
        />
        <StatCard
          title="Store Conversion"
          value="4.12%"
          delta={{ value: "+0.8%", trend: "up", label: "benchmark 2.1%" }}
          icon={<Percent className="w-4 h-4" />}
        />
        <StatCard
          title="Average Order Value"
          value="$118.40"
          delta={{ value: "+5.2%", trend: "up", label: "WASM discount enabled" }}
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Orders IndexTable (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card
            title="Recent Orders"
            subtitle="Live unfulfilled and incoming orders stream"
            padding="none"
            actions={
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-emerald-600 hover:text-emerald-700"
                onClick={() => (window.location.href = `/orders?tenant=${tenantSlug}`)}
              >
                View all orders
              </Button>
            }
          >
            <IndexTable
              columns={orderColumns}
              data={orders}
              keyExtractor={(o) => o.id}
              selectedIds={selectedOrderIds}
              onSelectionChange={setSelectedOrderIds}
            />
          </Card>
        </div>

        {/* Right Column: AI Merchandising & Store Health */}
        <div className="space-y-4">
          <Card title="AI Merchandising Insights" padding="md">
            <div className="space-y-3.5">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg">
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-semibold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inventory Opportunity</span>
                </div>
                <p className="text-[11px] text-purple-900/80 dark:text-purple-200 mt-1 leading-relaxed">
                  Catalog velocity is 2.4x higher than forecast. Reorder stock before weekend peak to prevent out-of-stock bounce rates.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Checkout Latency</span>
                </div>
                <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200 mt-1 leading-relaxed">
                  Average Fastify API completion time: <strong>24ms</strong> with 0% platform tax.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
