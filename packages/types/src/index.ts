export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY" | "PKR" | "INR";

export interface Money {
  amount: number;
  currencyCode: CurrencyCode;
}

export type ProductStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  sku: string;
  barcode?: string;
  price: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: string;
  requiresShipping: boolean;
  selectedOptions: SelectedOption[];
  inventoryQuantity: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  tenantId: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  productType: string;
  status: ProductStatus;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  options: { name: string; values: string[] }[];
  totalInventory: number;
  createdAt: string;
  updatedAt: string;
}

export type OrderFinancialStatus =
  | "PENDING"
  | "AUTHORIZED"
  | "PAID"
  | "PARTIALLY_PAID"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "VOIDED";

export type OrderFulfillmentStatus =
  | "UNFULFILLED"
  | "PARTIALLY_FULFILLED"
  | "FULFILLED"
  | "RESTOCKED";

export interface Address {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface Customer {
  id: string;
  tenantId: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  phone?: string;
  ordersCount: number;
  totalSpent: number;
  tags: string[];
  defaultAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderLineItem {
  id: string;
  orderId: string;
  variantId?: string;
  productId?: string;
  title: string;
  variantTitle?: string;
  sku?: string;
  quantity: number;
  price: number;
  totalDiscount: number;
  fulfillmentStatus: string;
}

export interface Fulfillment {
  id: string;
  orderId: string;
  status: string;
  trackingCompany?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  tenantId: string;
  orderNumber: number;
  name: string;
  email: string;
  financialStatus: OrderFinancialStatus;
  fulfillmentStatus: OrderFulfillmentStatus;
  currencyCode: CurrencyCode;
  subtotalPrice: number;
  totalTax: number;
  totalShipping: number;
  totalDiscounts: number;
  totalPrice: number;
  customer?: Customer;
  shippingAddress?: Address;
  billingAddress?: Address;
  lineItems: OrderLineItem[];
  fulfillments: Fulfillment[];
  note?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartLine {
  id: string;
  merchandiseId: string;
  quantity: number;
  variant: ProductVariant;
  attributes?: Record<string, string>;
}

export interface Cart {
  id: string;
  tenantId: string;
  lines: CartLine[];
  subtotalAmount: number;
  totalTaxAmount: number;
  totalShippingAmount: number;
  totalDiscountAmount: number;
  totalAmount: number;
  currencyCode: CurrencyCode;
  discountCodes: string[];
  email?: string;
  shippingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  domain: string;
  currencyCode: CurrencyCode;
  timezone: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookPayload<T = unknown> {
  id: string;
  topic: string;
  tenantId: string;
  apiVersion: string;
  createdAt: string;
  data: T;
}
