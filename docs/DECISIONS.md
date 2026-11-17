# Open Shopify Architectural Decision Records (ADRs)

## ADR-001: Multi-Tenancy Architecture (PostgreSQL RLS vs. Schema-per-tenant)
- **Status:** Accepted
- **Decision:** Use a single database schema with PostgreSQL Row-Level Security (RLS) driven by `SET LOCAL app.current_tenant_id` per connection.

## ADR-002: Fastify + GraphQL Yoga + Prisma Core Backend
- **Status:** Accepted
- **Decision:** Standardize on Node.js/TypeScript with Fastify for the HTTP layer, GraphQL Yoga + Envelop for GraphQL execution, and Prisma / Kysely for type-safe database queries.

## ADR-003: Liquid Engine & Online Store 2.0 JSON Templates
- **Status:** Accepted
- **Decision:** Implement a dual-engine parser: a high-speed Liquid parser for server-side template rendering, combined with a React-based Split-Screen Theme Editor (`apps/theme-editor`).

## ADR-004: Sandboxed WebAssembly (WASM) for Shopify Functions Parity
- **Status:** Accepted
- **Decision:** Embed a WASM runtime in the checkout service. Functions compile to standard WASI / WASM binaries, receive JSON inputs, and return deterministic JSON mutations within 5ms.

## ADR-005: Unified Omni-Platform Client via Flutter (OmniShop)
- **Status:** Accepted
- **Decision:** Build `apps/omnishop` as a single Flutter codebase with Clean Architecture and Riverpod, delivering native binaries for all 5 platforms (iOS, Android, Windows, macOS, Linux) synchronized via unified account authentication.
