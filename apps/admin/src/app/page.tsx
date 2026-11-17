"use client";

import React, { useState } from "react";
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

const mockOrders: Order[] = [
  {
    id: "ord_1001",
    tenantId: "ten_apex_apparel",
    orderNumber: 1001,
    name: "#1001",
    email: "elena.rostova@designlab.co",
    financialStatus: "PAID",
    fulfillmentStatus: "FULFILLED",
    currencyCode: "USD",
    subtotalPrice: 243.0,
    totalTax: 19.44,
    totalShipping: 0,
    totalDiscounts: 20.0,
    totalPrice: 242.44,
    shippingAddress: {
      firstName: "Elena",
      lastName: "Rostova",
      address1: "742 Evergreen Terrace",
      city: "Springfield",
      country: "United States",
      zip: "97477",
    },
    lineItems: [
      {
        id: "li_1",
        orderId: "ord_1001",
        title: "Double-Weave Architect Overshirt",
        quantity: 1,
        price: 185.0,
        totalDiscount: 0,
        fulfillmentStatus: "FULFILLED",
      },
    ],
    fulfillments: [],
    tags: ["vip", "express"],
    createdAt: "2026-11-16T18:40:00Z",
    updatedAt: "2026-11-16T18:40:00Z",
  },
  {
    id: "ord_1002",
    tenantId: "ten_apex_apparel",
    orderNumber: 1002,
    name: "#1002",
    email: "marcus.v@atelier-nord.se",
    financialStatus: "PAID",
    fulfillmentStatus: "UNFULFILLED",
    currencyCode: "USD",
    subtotalPrice: 116.0,
    totalTax: 9.28,
    totalShipping: 12.0,
    totalDiscounts: 0,
    totalPrice: 137.28,
    shippingAddress: {
      firstName: "Marcus",
      lastName: "Vance",
      address1: "Kungsgatan 44",
      city: "Stockholm",
      country: "Sweden",
      zip: "111 35",
    },
    lineItems: [
      {
        id: "li_2",
        orderId: "ord_1002",
        title: "Heavyweight Boxy Tee x2",
        quantity: 2,
        price: 58.0,
        totalDiscount: 0,
        fulfillmentStatus: "UNFULFILLED",
      },
    ],
    fulfillments: [],
    tags: ["international"],
    createdAt: "2026-11-16T19:15:00Z",
    updatedAt: "2026-11-16T19:15:00Z",
  },
  {
    id: "ord_1003",
    tenantId: "ten_apex_apparel",
    orderNumber: 1003,
    name: "#1003",
    email: "sarah.chen@studio-minimal.io",
    financialStatus: "PAID",
    fulfillmentStatus: "UNFULFILLED",
    currencyCode: "USD",
    subtotalPrice: 210.0,
    totalTax: 16.8,
    totalShipping: 0,
    totalDiscounts: 0,
    totalPrice: 226.8,
    shippingAddress: {
      firstName: "Sarah",
      lastName: "Chen",
      address1: "550 Battery St",
      city: "San Francisco",
      country: "United States",
      zip: "94111",
    },
    lineItems: [
      {
        id: "li_3",
        orderId: "ord_1003",
        title: "14oz Selvedge Straight-Leg Denim",
        quantity: 1,
        price: 210.0,
        totalDiscount: 0,
        fulfillmentStatus: "UNFULFILLED",
      },
    ],
    fulfillments: [],
    tags: ["first-time"],
    createdAt: "2026-11-16T19:42:00Z",
    updatedAt: "2026-11-16T19:42:00Z",
  },
];

export default function AdminDashboardPage() {
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  const orderColumns = [
    {
      id: "order",
      header: "Order",
      accessor: (o: Order) => (
        <span className="font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 cursor-pointer">
          {o.name}
        </span>
      ),
      sortable: true,
      width: "100px",
    },
    {
      id: "date",
      header: "Date",
      accessor: (o: Order) => (
        <span className="text-slate-500">
          {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      accessor: (o: Order) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 dark:text-slate-200">
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
        <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
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
            Apex Apparel Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-tenant telemetry and order processing
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open("http://localhost:3000", "_blank")}
          >
            <span>Live Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>

          <Button
            size="sm"
            onClick={() => alert("Product creator modal launched.")}
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
          value="$142,850.00"
          delta={{ value: "+18.4%", trend: "up", label: "vs last 30 days" }}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard
          title="Total Orders"
          value="1,420"
          delta={{ value: "+9.2%", trend: "up", label: "vs last 30 days" }}
          icon={<ShoppingBag className="w-4 h-4" />}
        />
        <StatCard
          title="Online Store Conversion"
          value="3.84%"
          delta={{ value: "+0.4%", trend: "up", label: "industry benchmark 2.1%" }}
          icon={<Percent className="w-4 h-4" />}
        />
        <StatCard
          title="Average Order Value"
          value="$100.60"
          delta={{ value: "+3.1%", trend: "up", label: "WASM discount enabled" }}
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
                onClick={() => (window.location.href = "/orders")}
              >
                View all orders
              </Button>
            }
          >
            <IndexTable
              columns={orderColumns}
              data={mockOrders}
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
                  "Double-Weave Architect Overshirt" velocity is 2.4x higher than forecast. Reorder 30 units before Friday to avoid stockout.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Checkout Latency</span>
                </div>
                <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200 mt-1 leading-relaxed">
                  Average checkout completion time: <strong>38ms</strong> (12x faster than standard hosted commerce engines).
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
