# VENDR API Specification

## 1. Overview
VENDR provides two distinct GraphQL APIs alongside a backward-compatible REST API surface:
1. **Storefront GraphQL API (`/api/storefront/graphql`):** High-speed, public/unauthenticated or buyer-session scoped API designed for sub-50ms catalog browsing, cart mutations, and checkout flows.
2. **Admin GraphQL API (`/api/admin/graphql`):** Authenticated, merchant-scoped API supporting full store administration, inventory reconciliation, order processing, and analytics.
3. **Admin & Webhook REST API (`/api/v1/admin/*` and `/api/webhooks/*`):** Standard REST endpoints for legacy integrations and external event subscription callbacks.

---

## 2. Storefront GraphQL Schema Definition

```graphql
schema {
  query: StorefrontQuery
  mutation: StorefrontMutation
}

type StorefrontQuery {
  shop: Shop!
  products(first: Int = 20, after: String, query: String, sortKey: ProductSortKeys, reverse: Boolean): ProductConnection!
  productByHandle(handle: String!): Product
  product(id: ID!): Product
  collections(first: Int = 20, after: String): CollectionConnection!
  collectionByHandle(handle: String!): Collection
  cart(id: ID!): Cart
  search(query: String!, first: Int = 20): SearchResultConnection!
}

type StorefrontMutation {
  cartCreate(input: CartInput): CartPayload!
  cartLinesAdd(cartId: ID!, lines: [CartLineInput!]!): CartPayload!
  cartLinesUpdate(cartId: ID!, lines: [CartLineUpdateInput!]!): CartPayload!
  cartLinesRemove(cartId: ID!, lineIds: [ID!]!): CartPayload!
  cartDiscountCodesUpdate(cartId: ID!, discountCodes: [String!]): CartPayload!
  cartBuyerIdentityUpdate(cartId: ID!, buyerIdentity: CartBuyerIdentityInput!): CartPayload!
  checkoutCompleteWithCreditCard(checkoutId: ID!, paymentToken: String!): CheckoutCompletePayload!
}

type Shop {
  name: String!
  description: String
  primaryDomain: String!
  currencyCode: CurrencyCode!
  moneyFormat: String!
}

type Product {
  id: ID!
  title: String!
  handle: String!
  description: String!
  descriptionHtml: String!
  vendor: String!
  productType: String!
  featuredImage: Image
  images(first: Int = 10): [Image!]!
  variants(first: Int = 50): [ProductVariant!]!
  priceRange: ProductPriceRange!
  availableForSale: Boolean!
  tags: [String!]!
  metafields(identifiers: [HasMetafieldsIdentifier!]!): [Metafield]!
}

type ProductVariant {
  id: ID!
  title: String!
  sku: String
  barcode: String
  availableForSale: Boolean!
  price: MoneyV2!
  compareAtPrice: MoneyV2
  image: Image
  selectedOptions: [SelectedOption!]!
  quantityAvailable: Int
}

type SelectedOption {
  name: String!
  value: String!
}

type ProductPriceRange {
  minVariantPrice: MoneyV2!
  maxVariantPrice: MoneyV2!
}

type MoneyV2 {
  amount: Decimal!
  currencyCode: CurrencyCode!
}

enum CurrencyCode {
  USD
  EUR
  GBP
  CAD
  AUD
  JPY
  PKR
  INR
}

enum ProductSortKeys {
  TITLE
  PRICE
  CREATED_AT
  BEST_SELLING
  RELEVANCE
}

type Cart {
  id: ID!
  checkoutUrl: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  lines(first: Int = 50): CartLineConnection!
  cost: CartCost!
  discountCodes: [CartDiscountCode!]!
  totalQuantity: Int!
  buyerIdentity: CartBuyerIdentity
}

type CartLine {
  id: ID!
  quantity: Int!
  merchandise: ProductVariant!
  cost: CartLineCost!
  discountAllocations: [DiscountAllocation!]!
}

type CartCost {
  totalAmount: MoneyV2!
  subtotalAmount: MoneyV2!
  totalTaxAmount: MoneyV2
  totalDutyAmount: MoneyV2
}

type CartPayload {
  cart: Cart
  userErrors: [UserError!]!
}

type UserError {
  field: [String!]
  message: String!
  code: String
}

input CartInput {
  lines: [CartLineInput!]
  discountCodes: [String!]
  buyerIdentity: CartBuyerIdentityInput
}

input CartLineInput {
  merchandiseId: ID!
  quantity: Int!
  attributes: [AttributeInput!]
}

input CartBuyerIdentityInput {
  email: String
  phone: String
  countryCode: String
  deliveryAddressPreferences: [DeliveryAddressInput!]
}

input DeliveryAddressInput {
  firstName: String
  lastName: String
  company: String
  address1: String!
  address2: String
  city: String!
  province: String
  zip: String!
  country: String!
}
```

---

## 3. Admin GraphQL Schema Definition

```graphql
schema {
  query: AdminQuery
  mutation: AdminMutation
}

type AdminQuery {
  shop: AdminShop!
  product(id: ID!): AdminProduct
  products(first: Int = 50, after: String, query: String, status: ProductStatus): AdminProductConnection!
  order(id: ID!): Order
  orders(first: Int = 50, after: String, status: OrderStatus, query: String): OrderConnection!
  customer(id: ID!): Customer
  customers(first: Int = 50, after: String, query: String): CustomerConnection!
  locations: [Location!]!
  inventoryItem(id: ID!): InventoryItem
  analyticsOverview(dateRange: DateRangeInput!): AnalyticsOverview!
  metaobject(id: ID!): Metaobject
}

type AdminMutation {
  # Products & Variants
  productCreate(input: ProductCreateInput!): ProductCreatePayload!
  productUpdate(input: ProductUpdateInput!): ProductUpdatePayload!
  productDelete(id: ID!): ProductDeletePayload!
  productVariantCreate(productId: ID!, input: ProductVariantInput!): ProductVariantPayload!
  productVariantUpdate(id: ID!, input: ProductVariantInput!): ProductVariantPayload!
  
  # Inventory
  inventoryAdjustQuantity(input: InventoryAdjustQuantityInput!): InventoryAdjustQuantityPayload!
  
  # Orders & Fulfillment
  orderCreate(input: OrderCreateInput!): OrderCreatePayload!
  orderCancel(id: ID!, reason: OrderCancelReason!): OrderCancelPayload!
  fulfillmentCreate(orderId: ID!, lineItems: [FulfillmentLineItemInput!]!, trackingInfo: TrackingInfoInput): FulfillmentPayload!
  refundCreate(input: RefundCreateInput!): RefundPayload!
  
  # Customers
  customerCreate(input: CustomerInput!): CustomerPayload!
  customerUpdate(id: ID!, input: CustomerInput!): CustomerPayload!
  
  # Discounts
  discountCodeCreate(input: DiscountCodeInput!): DiscountCodePayload!
  discountAutomaticCreate(input: DiscountAutomaticInput!): DiscountAutomaticPayload!
  
  # Metafields & Metaobjects
  metafieldsSet(metafields: [MetafieldsSetInput!]!): MetafieldsSetPayload!
  metaobjectCreate(input: MetaobjectCreateInput!): MetaobjectPayload!
}

type AdminShop {
  id: ID!
  name: String!
  email: String!
  domain: String!
  plan: String!
  currencyCode: CurrencyCode!
  timezone: String!
  ianaTimezone: String!
}

type AdminProduct {
  id: ID!
  title: String!
  handle: String!
  bodyHtml: String
  vendor: String
  productType: String
  status: ProductStatus!
  tags: [String!]!
  variants(first: Int = 100): [AdminProductVariant!]!
  options: [ProductOption!]!
  totalInventory: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum ProductStatus {
  ACTIVE
  DRAFT
  ARCHIVED
}

type Order {
  id: ID!
  name: String!
  orderNumber: Int!
  createdAt: DateTime!
  processedAt: DateTime!
  financialStatus: OrderFinancialStatus!
  fulfillmentStatus: OrderFulfillmentStatus!
  customer: Customer
  lineItems(first: Int = 50): [OrderLineItem!]!
  currentTotalPrice: MoneyV2!
  currentSubtotalPrice: MoneyV2!
  currentTotalTax: MoneyV2!
  shippingAddress: Address
  billingAddress: Address
  fulfillments: [Fulfillment!]!
  refunds: [Refund!]!
  note: String
  tags: [String!]!
}

enum OrderFinancialStatus {
  PENDING
  AUTHORIZED
  PAID
  PARTIALLY_PAID
  REFUNDED
  PARTIALLY_REFUNDED
  VOIDED
}

enum OrderFulfillmentStatus {
  UNFULFILLED
  PARTIALLY_FULFILLED
  FULFILLED
  RESTOCKED
}

type OrderLineItem {
  id: ID!
  title: String!
  quantity: Int!
  variant: AdminProductVariant
  originalUnitPrice: MoneyV2!
  discountedUnitPrice: MoneyV2!
  sku: String
  fulfillmentStatus: String
}

type Customer {
  id: ID!
  firstName: String
  lastName: String
  displayName: String!
  email: String
  phone: String
  ordersCount: Int!
  totalSpent: MoneyV2!
  tags: [String!]!
  defaultAddress: Address
}

type AnalyticsOverview {
  totalSales: MoneyV2!
  ordersCount: Int!
  conversionRate: Float!
  averageOrderValue: MoneyV2!
  sessionsCount: Int!
  topSellingProducts: [TopProductStat!]!
}

type TopProductStat {
  product: AdminProduct!
  unitsSold: Int!
  revenue: MoneyV2!
}
```

---

## 4. Webhook Event Catalog

VENDR dispatches webhook payloads via signed HTTP POST requests with an HMAC-SHA256 signature in the `X-Vendr-Hmac-Sha256` header:

| Topic | Description | Trigger Moment |
| :--- | :--- | :--- |
| `products/create` | Product created | When a new product is saved to the catalog. |
| `products/update` | Product details mutated | Price, title, inventory, or variant modification. |
| `products/delete` | Product removed | When a product is soft-deleted or purged. |
| `orders/create` | New order placed | Customer completes checkout or merchant issues draft order. |
| `orders/paid` | Payment confirmed | Payment gateway confirms successful charge capture. |
| `orders/fulfilled`| Order fulfillment logged | Tracking number generated and items marked shipped. |
| `orders/cancelled`| Order voided | Merchant or customer initiates cancellation. |
| `inventory_levels/connect` | Inventory level changed | Warehouse stock adjustment or checkout depletion. |
| `customers/create`| New customer registered | Buyer completes checkout or registers account. |
| `app/uninstalled` | Merchant revokes integration | App removed from merchant store. |
