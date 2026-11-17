# VENDR Architectural Decision Records (ADRs)

## ADR-001: Multi-Tenancy Architecture (PostgreSQL RLS vs. Schema-per-tenant)
- **Status:** Accepted
- **Context:** An open-source Shopify alternative must handle thousands of stores on single-node self-hosted setups as well as enterprise Kubernetes clusters without operational database migration sprawl.
- **Decision:** Use a single database schema with PostgreSQL Row-Level Security (RLS) driven by `SET LOCAL app.current_tenant_id` per connection.
- **Consequences:**
  - Simplified database migrations across all tenants simultaneously.
  - Zero cross-tenant data leakage guaranteed at the database engine level.
  - Seamless scalability from local docker-compose to multi-node PostgreSQL clusters.

---

## ADR-002: Fastify + GraphQL Yoga + Prisma Core Backend
- **Status:** Accepted
- **Context:** The backend must handle high-throughput storefront traffic (<50ms latency) while supporting complex Admin relational queries.
- **Decision:** Standardize on Node.js/TypeScript with Fastify for the HTTP layer, GraphQL Yoga + Envelop for GraphQL execution, and Prisma / Kysely for type-safe database queries with RLS extensions.
- **Consequences:**
  - 3x to 4x throughput compared to Express/Apollo.
  - Low memory footprint suitable for containerization.
  - Full GraphQL type safety from database schema to client SDKs.

---

## ADR-003: Liquid Engine & Online Store 2.0 JSON Templates
- **Status:** Accepted
- **Context:** Parity with Shopify requires compatibility with themes structured around `templates/*.json` and `sections/*.liquid` with `{% schema %}` blocks.
- **Decision:** Implement a dual-engine parser: a high-speed Liquid parser for server-side template rendering, combined with a React-based Split-Screen Theme Editor (`apps/theme-editor`) communicating via `postMessage`.
- **Consequences:**
  - Merchants can use Shopify theme structure (sections, blocks, presets).
  - Live visual customizer provides instant real-time WYSIWYG feedback without reloading the entire page.

---

## ADR-004: Sandboxed WebAssembly (WASM) for Shopify Functions Parity
- **Status:** Accepted
- **Context:** Shopify Functions allow merchants and developers to inject custom business logic into cart and checkout calculation without hosting external webhook services that introduce latency and downtime.
- **Decision:** Embed a WASM runtime (Wasmtime / V8 WebAssembly engine) in the checkout service. Functions compile to standard WASI / WASM binaries, receive JSON inputs, and return deterministic JSON mutations within 5ms.
- **Consequences:**
  - Zero latency impact on checkout (<5ms execution).
  - Safe multi-tenant code execution with memory isolation (5MB limit) and zero network/filesystem access.

---

## ADR-005: Unified Omni-Platform Client via Flutter
- **Status:** Accepted
- **Context:** Merchants require mobile apps (iOS & Android) for store monitoring, push notifications, and barcode scanning, plus desktop apps (Windows & macOS) for high-volume POS and warehouse operations.
- **Decision:** Build `apps/vendr-omni-app` as a single Flutter codebase with Clean Architecture and Riverpod, delivering native binaries for all 4 platforms from one repository.
- **Consequences:**
  - 100% UI and business logic reuse across iOS, Android, Windows, and macOS.
  - Direct hardware access (camera barcode scanning, receipt printers).
  - High rendering performance (60/120 FPS Impeller engine).

---

## ADR-006: Headless Checkout Pipeline & Optimistic Concurrency
- **Status:** Accepted
- **Context:** Flash sales and high-concurrency checkout can cause race conditions and inventory overselling.
- **Decision:** Implement Redis-backed atomic cart sessions with optimistic concurrency control on inventory decrement in PostgreSQL (`UPDATE inventory_levels SET available = available - $qty WHERE id = $id AND available >= $qty`).
- **Consequences:**
  - Eliminates overselling under flash sale load.
  - Supports 1-page checkout and 3-step checkout flows with instant cart drawer previews.
