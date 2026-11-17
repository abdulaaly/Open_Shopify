"use client";

import React, { useState } from "react";
import { Card, IndexTable, Badge, Button } from "@vendr/ui";
import { Order } from "@vendr/types";
import { Search, Filter, CheckCircle2 } from "lucide-react";

const initialOrdersList: Order[] = [
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrdersList);
  const [selectedTab, setSelectedTab] = useState<"ALL" | "UNFULFILLED" | "FULFILLED">("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredOrders = orders.filter((o) => {
    if (selectedTab === "UNFULFILLED") return o.fulfillmentStatus === "UNFULFILLED";
    if (selectedTab === "FULFILLED") return o.fulfillmentStatus === "FULFILLED";
    return true;
  });

  const handleFulfillSelected = () => {
    setOrders((prev) =>
      prev.map((o) => (selectedIds.includes(o.id) ? { ...o, fulfillmentStatus: "FULFILLED" } : o))
    );
    setSelectedIds([]);
  };

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
          {new Date(o.createdAt).toLocaleDateString()} {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
      id: "items",
      header: "Items",
      accessor: (o: Order) => (
        <span className="text-slate-600">
          {o.lineItems.reduce((acc, i) => acc + i.quantity, 0)} items
        </span>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage shipments, issue refunds, and track customer fulfillments
          </p>
        </div>

        {selectedIds.length > 0 && (
          <Button size="sm" onClick={handleFulfillSelected}>
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            <span>Mark {selectedIds.length} as Fulfilled</span>
          </Button>
        )}
      </div>

      <Card padding="none">
        {/* Filter bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1">
            {(["ALL", "UNFULFILLED", "FULFILLED"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedTab === tab
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter orders..."
                className="h-7 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
              <Filter className="w-3 h-3 mr-1" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <IndexTable
          columns={orderColumns}
          data={filteredOrders}
          keyExtractor={(o) => o.id}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </Card>
    </div>
  );
}
