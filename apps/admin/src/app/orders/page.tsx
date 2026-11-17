"use client";

import React, { useState, useEffect } from "react";
import { Card, IndexTable, Badge, Button } from "@vendr/ui";
import { Order } from "@vendr/types";
import { Search, Filter, CheckCircle2, Truck, Check } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedTab, setSelectedTab] = useState<"ALL" | "UNFULFILLED" | "FULFILLED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [fulfillingId, setFulfillingId] = useState<string | null>(null);

  const fetchOrders = () => {
    const tenantSlug = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tenant") || "apex-apparel"
      : "apex-apparel";

    fetch(`http://localhost:4000/api/v1/orders?tenant=${tenantSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.orders) {
          setOrders(data.orders);
        }
      })
      .catch((err) => console.log("Orders fetch error:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFulfillOrder = async (orderId: string) => {
    setFulfillingId(orderId);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/orders/${orderId}/fulfill`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: "FULFILLED" } : o))
        );
      }
    } catch (err) {
      console.error("Fulfill error:", err);
      // Local optimistic update
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: "FULFILLED" } : o))
      );
    } finally {
      setFulfillingId(null);
    }
  };

  const handleFulfillSelected = async () => {
    for (const id of selectedIds) {
      await handleFulfillOrder(id);
    }
    setSelectedIds([]);
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedTab === "UNFULFILLED" && o.fulfillmentStatus !== "UNFULFILLED") return false;
    if (selectedTab === "FULFILLED" && o.fulfillmentStatus !== "FULFILLED") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        (o.shippingAddress?.firstName && o.shippingAddress.firstName.toLowerCase().includes(q)) ||
        (o.shippingAddress?.lastName && o.shippingAddress.lastName.toLowerCase().includes(q))
      );
    }
    return true;
  });

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
          {new Date(o.createdAt).toLocaleDateString()} {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
    {
      id: "actions",
      header: "Actions",
      accessor: (o: Order) => (
        <div className="flex justify-end">
          {o.fulfillmentStatus === "UNFULFILLED" ? (
            <button
              onClick={() => handleFulfillOrder(o.id)}
              disabled={fulfillingId === o.id}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
            >
              <Truck className="w-3 h-3" />
              <span>{fulfillingId === o.id ? "Shipping..." : "Fulfill"}</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <Check className="w-3 h-3" />
              <span>Shipped</span>
            </span>
          )}
        </div>
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
            Manage shipments, issue fulfillments, and track customer deliveries
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
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter orders..."
                className="h-8 pl-8 pr-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-slate-100"
              />
            </div>
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
