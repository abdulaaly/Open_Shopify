"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductVariant, Product } from "@vendr/types";

export interface CartItem {
  id: string;
  variant: ProductVariant;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  discountCode: string;
  applyDiscountCode: (code: string) => void;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  total: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variant.id === variant.id);
      if (existing) {
        return prev.map((i) =>
          i.variant.id === variant.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: `item_${variant.id}`,
          product,
          variant,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const next = i.quantity + delta;
            return next > 0 ? { ...i, quantity: next } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode("");
  };

  const applyDiscountCode = (code: string) => {
    setDiscountCode(code.trim().toUpperCase());
  };

  const subtotal = items.reduce((acc, i) => acc + i.variant.price * i.quantity, 0);
  const discountAmount = discountCode === "VIP20" ? subtotal * 0.2 : 0;
  const shippingAmount = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount);
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        discountCode,
        applyDiscountCode,
        subtotal,
        discountAmount,
        shippingAmount,
        total,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
