"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";
import { X, Trash2, ArrowRight, Tag, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingAmount,
    total,
    discountCode,
    applyDiscountCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop scrim */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
              Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-emerald-50/60 px-6 py-2.5 border-b border-emerald-100">
            {subtotal >= 100 ? (
              <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>You unlocked <strong>Free Global Shipping!</strong></span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800">
                Add <strong>${(100 - subtotal).toFixed(2)}</strong> more to get Free Shipping
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <p className="text-sm">Your cart is currently empty.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-16 h-20 rounded bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={item.product.images[0] || "/assets/products/heavyweight-tee.svg"}
                      alt={item.product.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.variant.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Stepper */}
                      <div className="inline-flex items-center border border-slate-200 rounded text-xs font-mono">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-slate-500 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-slate-900 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-slate-500 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold text-slate-900">
                        ${(item.variant.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50 space-y-3.5">
              {/* Promo input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (try VIP20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 h-8 px-3 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase font-mono"
                />
                <button
                  onClick={() => {
                    applyDiscountCode(promoInput);
                    setPromoInput("");
                  }}
                  className="h-8 px-3 text-xs font-medium bg-slate-800 text-white rounded hover:bg-slate-900"
                >
                  Apply
                </button>
              </div>

              {discountCode && (
                <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Code: {discountCode} (WASM Function)
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Cost breakdown */}
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-slate-900">
                    {shippingAmount === 0 ? "Free" : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-semibold text-slate-900">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
