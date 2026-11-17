# Shopify Ecosystem Reverse-Engineering Map & Primitives

## 1. Domain Entities & Admin Schema Primitives
- **Products & Variants:**
  - `Product`: Title, Handle, Description/HTML, Vendor, ProductType, Status (`ACTIVE`, `DRAFT`, `ARCHIVED`), Tags, Options, Media/Images, Metafields.
  - `ProductVariant`: SKU, Barcode, Price, CompareAtPrice, Weight, Taxable, RequiresShipping, SelectedOptions, InventoryItem.
- **Inventory System:**
  - `InventoryLocation`: Multi-location fulfillment nodes (name, address, fulfillsOnlineOrders).
  - `InventoryItem`: Cost, tracked, countryCodeOfOrigin.
  - `InventoryLevel`: Available, onHand, committed, incoming quantities tied to `(inventoryItem_id, location_id)`.
- **Collections:**
  - Automated (rules based on title, type, vendor, price, tag, compare_at_price).
  - Manual (explicit product ordering and assortment).
- **Orders & Fulfillments:**
  - `Order`: Order number, financialStatus (`PENDING`, `AUTHORIZED`, `PAID`, `REFUNDED`), fulfillmentStatus (`UNFULFILLED`, `PARTIALLY_FULFILLED`, `FULFILLED`), totalPrices, taxLines, discounts, customer, addresses.
  - `LineItem`: Snapshot of variant details at purchase time, quantity, discounted prices, discount allocations.
  - `Fulfillment`: Tracking info, carrier, tracking URL, line item quantities.
  - `Refund`: Transaction reversals, line item restocking logic.
- **Metafields & Metaobjects:**
  - Typed key-value extension engine: `single_line_text_field`, `number_integer`, `json`, `reference` to products/collections/files.
  - Metaobjects: Custom data schemas with definitions and instances.
- **Shopify Functions (Rust/WASM):**
  - Compiled pure WebAssembly modules executing on cart/checkout steps.
  - Pure execution model: no network, no disk, deterministic JSON in / JSON out within 5ms.

---

## 2. Storefront & Checkout Flow UX (from mock.shop inspection)
1. **Catalog & Search:**
   - Faceted filtering: by availability, price range, product type, vendor.
   - Predictive search: instant title, tag, and product match with sub-100ms latency.
2. **Product Detail Page (PDP):**
   - Media gallery: zoomable hero image, variant thumbnail switching.
   - Option selectors: pill buttons for sizes, color swatches for colors, update URL with variant ID.
   - Dynamic inventory badge: "In stock - ready to ship" / "Only 3 left".
   - Quantity selector and instant "Add to Cart" with optimistic slide-out drawer trigger.
3. **Cart Drawer (AJAX Slide-Out):**
   - Slide-in from right edge with backdrop overlay.
   - Line items with thumbnail, title, selected variant options, quantity increment/decrement, and trash remove button.
   - Promo code input with immediate discount calculation.
   - Sticky footer with subtotal, free shipping progress bar, and "Checkout" CTA button.
4. **Checkout Engine (1-Page / 3-Step):**
   - Step 1 / Section 1: Customer Contact (Email or Mobile Phone).
   - Step 2 / Section 2: Delivery Details (Shipping Address with predictive auto-complete, Country selector).
   - Step 3 / Section 3: Shipping Method (Standard Free, Express Expedited).
   - Step 4 / Section 4: Payment (Credit Card via Stripe Elements, Cash-on-Delivery, or Custom Gateway).
   - Order Summary Panel (Sticky Right Column): Line item breakdown, promo code application, Subtotal, Shipping, Taxes, Total.

---

## 3. Polaris Design System Tokens & Merchant Admin Patterns
- **Layout:**
  - Fixed Collapsible Sidebar (`w-64`, `#1a1a1a` dark or `#f7f7f7` light), logo at top, search/command bar (`Cmd+K`).
  - Main Canvas (`bg-[#f1f2f4]` or `#09090b` in dark mode) with max-width content container (`max-w-6xl` or `1200px`).
  - Sticky Top Action Bar for page titles and primary/secondary button groups.
- **Typography:**
  - Modern sans-serif (`Inter` / system-ui), tabular figures for numbers/money.
  - High hierarchy: Display (28px bold), Heading (20px semi-bold), Subheading (14px medium), Body (13px regular), Caption (11px regular).
- **Surfaces & Cards:**
  - High-density white/slate cards (`rounded-lg border border-slate-200 shadow-sm`).
  - Table / IndexTable: Checkbox multi-select, sortable column headers, bulk action floating bar, responsive horizontal scrolling, pagination.
- **Interactive Badges & Status:**
  - Success/Paid: `bg-emerald-50 text-emerald-700 border-emerald-200`
  - Warning/Pending: `bg-amber-50 text-amber-700 border-amber-200`
  - Critical/Refunded: `bg-rose-50 text-rose-700 border-rose-200`
  - Info/Draft: `bg-sky-50 text-sky-700 border-sky-200`
