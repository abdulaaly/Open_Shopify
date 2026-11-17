import { Cart, CartLine, ProductVariant, Order } from "@vendr/types";
import { VendrWasmEngine } from "@vendr/wasm-engine";
import crypto from "crypto";

const cartsMemoryStore = new Map<string, Cart>();
const wasmEngine = new VendrWasmEngine();

export class CheckoutService {
  /**
   * Get or initialize a cart
   */
  static getCart(cartId: string): Cart | undefined {
    return cartsMemoryStore.get(cartId);
  }

  /**
   * Create a new shopping cart
   */
  static async createCart(tenantId: string, lines: { variant: ProductVariant; quantity: number }[]): Promise<Cart> {
    const id = `cart_${crypto.randomUUID()}`;
    const cartLines: CartLine[] = lines.map((l) => ({
      id: `line_${crypto.randomUUID()}`,
      merchandiseId: l.variant.id,
      quantity: l.quantity,
      variant: l.variant,
    }));

    const cart: Cart = {
      id,
      tenantId,
      lines: cartLines,
      subtotalAmount: 0,
      totalTaxAmount: 0,
      totalShippingAmount: 0,
      totalDiscountAmount: 0,
      totalAmount: 0,
      currencyCode: "USD",
      discountCodes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.recalculateCart(cart);
    cartsMemoryStore.set(id, cart);
    return cart;
  }

  /**
   * Add lines to existing cart
   */
  static async addLines(cartId: string, lines: { variant: ProductVariant; quantity: number }[]): Promise<Cart> {
    const cart = cartsMemoryStore.get(cartId);
    if (!cart) throw new Error("Cart not found");

    for (const item of lines) {
      const existing = cart.lines.find((l) => l.merchandiseId === item.variant.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        cart.lines.push({
          id: `line_${crypto.randomUUID()}`,
          merchandiseId: item.variant.id,
          quantity: item.quantity,
          variant: item.variant,
        });
      }
    }

    await this.recalculateCart(cart);
    cart.updatedAt = new Date().toISOString();
    cartsMemoryStore.set(cartId, cart);
    return cart;
  }

  /**
   * Remove lines from cart
   */
  static async removeLines(cartId: string, lineIds: string[]): Promise<Cart> {
    const cart = cartsMemoryStore.get(cartId);
    if (!cart) throw new Error("Cart not found");

    cart.lines = cart.lines.filter((l) => !lineIds.includes(l.id));
    await this.recalculateCart(cart);
    cart.updatedAt = new Date().toISOString();
    cartsMemoryStore.set(cartId, cart);
    return cart;
  }

  /**
   * Apply discount code via WASM Functions Engine
   */
  static async applyDiscountCode(cartId: string, code: string): Promise<Cart> {
    const cart = cartsMemoryStore.get(cartId);
    if (!cart) throw new Error("Cart not found");

    if (!cart.discountCodes.includes(code)) {
      cart.discountCodes.push(code);
    }

    await this.recalculateCart(cart);
    cart.updatedAt = new Date().toISOString();
    cartsMemoryStore.set(cartId, cart);
    return cart;
  }

  /**
   * Recalculate totals, taxes, and WASM discount allocations
   */
  private static async recalculateCart(cart: Cart): Promise<void> {
    let subtotal = 0;
    for (const line of cart.lines) {
      subtotal += line.variant.price * line.quantity;
    }

    // Run WASM discount function
    const wasmResult = await wasmEngine.runCartDiscountFunction({ cart });
    let totalDiscount = 0;

    for (const disc of wasmResult.discounts) {
      if (disc.value.percentage) {
        totalDiscount += subtotal * (disc.value.percentage / 100);
      } else if (disc.value.fixedAmount) {
        totalDiscount += disc.value.fixedAmount.amount;
      }
    }

    totalDiscount = Math.min(totalDiscount, subtotal);
    const taxRate = 0.08; // 8% standard tax
    const shipping = subtotal > 100 ? 0 : 12; // Free shipping over $100
    const taxableSubtotal = Math.max(0, subtotal - totalDiscount);
    const tax = Math.round(taxableSubtotal * taxRate * 100) / 100;

    cart.subtotalAmount = subtotal;
    cart.totalDiscountAmount = totalDiscount;
    cart.totalShippingAmount = shipping;
    cart.totalTaxAmount = tax;
    cart.totalAmount = Math.max(0, subtotal - totalDiscount + tax + shipping);
  }

  /**
   * Complete checkout and generate confirmed order
   */
  static async completeCheckout(cartId: string, email: string, shippingAddress: any): Promise<Order> {
    const cart = cartsMemoryStore.get(cartId);
    if (!cart) throw new Error("Cart not found");
    if (cart.lines.length === 0) throw new Error("Cannot checkout empty cart");

    // Run checkout validation rules
    const validation = await wasmEngine.runCheckoutValidationFunction({ cart });
    if (validation.errors.length > 0) {
      throw new Error(validation.errors[0].localizedMessage);
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const order: Order = {
      id: `ord_${crypto.randomUUID()}`,
      tenantId: cart.tenantId,
      orderNumber,
      name: `#${orderNumber}`,
      email,
      financialStatus: "PAID",
      fulfillmentStatus: "UNFULFILLED",
      currencyCode: cart.currencyCode,
      subtotalPrice: cart.subtotalAmount,
      totalTax: cart.totalTaxAmount,
      totalShipping: cart.totalShippingAmount,
      totalDiscounts: cart.totalDiscountAmount,
      totalPrice: cart.totalAmount,
      shippingAddress,
      lineItems: cart.lines.map((l) => ({
        id: `item_${crypto.randomUUID()}`,
        orderId: `ord_${orderNumber}`,
        variantId: l.variant.id,
        title: l.variant.title,
        sku: l.variant.sku,
        quantity: l.quantity,
        price: l.variant.price,
        totalDiscount: 0,
        fulfillmentStatus: "UNFULFILLED",
      })),
      fulfillments: [],
      tags: ["online", "web"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Clean up cart after checkout
    cartsMemoryStore.delete(cartId);
    return order;
  }
}
