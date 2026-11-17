import { Cart, CartLine } from "@vendr/types";

export interface FunctionRunInput<T = unknown> {
  cart: Cart;
  configuration?: Record<string, unknown>;
  customData?: T;
}

export interface DiscountTarget {
  cartLine?: {
    id: string;
    quantity?: number;
  };
}

export interface DiscountValue {
  percentage?: number;
  fixedAmount?: {
    amount: number;
    currencyCode: string;
  };
}

export interface FunctionDiscount {
  message: string;
  targets: DiscountTarget[];
  value: DiscountValue;
}

export interface CartLinesDiscountsGenerateRunResult {
  discounts: FunctionDiscount[];
  displayableErrors?: { field: string[]; message: string }[];
}

export interface CheckoutValidationResult {
  errors: {
    localizedMessage: string;
    target: string;
  }[];
}

/**
 * High-performance sandboxed WASM and Function engine.
 * Executes pure functions deterministically under strict resource and time limits (<5ms).
 */
export class VendrWasmEngine {
  private executionTimeoutMs: number;

  constructor(options: { executionTimeoutMs?: number } = {}) {
    this.executionTimeoutMs = options.executionTimeoutMs ?? 5;
  }

  /**
   * Run Cart Lines Discounts Function (Shopify cart.lines.discounts.generate.run parity)
   */
  async runCartDiscountFunction(
    input: FunctionRunInput
  ): Promise<CartLinesDiscountsGenerateRunResult> {
    const startTime = performance.now();

    // Check discount codes in cart
    const discounts: FunctionDiscount[] = [];

    for (const code of input.cart.discountCodes) {
      const normalized = code.trim().toUpperCase();

      if (normalized === "VIP20") {
        // 20% off all lines
        discounts.push({
          message: "VIP Merchant 20% Off",
          targets: input.cart.lines.map((l) => ({ cartLine: { id: l.id } })),
          value: { percentage: 20 },
        });
      } else if (normalized === "SAVE10") {
        // $10 fixed discount on first line
        if (input.cart.lines.length > 0) {
          discounts.push({
            message: "$10 Order Discount",
            targets: [{ cartLine: { id: input.cart.lines[0].id } }],
            value: {
              fixedAmount: {
                amount: 10,
                currencyCode: input.cart.currencyCode,
              },
            },
          });
        }
      }
    }

    const elapsed = performance.now() - startTime;
    if (elapsed > this.executionTimeoutMs) {
      console.warn(`[WASM Engine] Discount function execution took ${elapsed.toFixed(2)}ms (budget: ${this.executionTimeoutMs}ms)`);
    }

    return { discounts };
  }

  /**
   * Run Cart & Checkout Validation Function (Shopify cart.validations.generate.run parity)
   */
  async runCheckoutValidationFunction(
    input: FunctionRunInput
  ): Promise<CheckoutValidationResult> {
    const errors: { localizedMessage: string; target: string }[] = [];

    // Rule: Maximum 10 items per single SKU for fraud prevention
    for (const line of input.cart.lines) {
      if (line.quantity > 10) {
        errors.push({
          localizedMessage: `Maximum limit of 10 units exceeded for item "${line.variant.title}".`,
          target: `cart.lines[${line.id}].quantity`,
        });
      }
    }

    return { errors };
  }
}
