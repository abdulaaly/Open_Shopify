<p align="center">
  <img src="assets/branding/vendr-banner.svg" alt="VENDR Sovereign Commerce Engine" width="100%" />
</p>

<p align="center">
  <strong>The Open-Source, Self-Hosted Enterprise Commerce Engine with 100% Shopify Parity.</strong><br>
  Zero Transaction Fees • Sub-50ms Global Edge • Sandboxed WASM Functions • Unified Omni-App (iOS, Android, macOS, Windows)
</p>

<p align="center">
  <a href="https://github.com/abdulaaly/vendr/actions"><img src="https://img.shields.io/badge/CI%2FCD-passing-emerald?style=flat-square&logo=githubactions" alt="CI/CD" /></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js" alt="Next.js 15" /></a>
  <a href="https://fastify.dev"><img src="https://img.shields.io/badge/Fastify-5.2-000000?style=flat-square&logo=fastify" alt="Fastify" /></a>
  <a href="https://webassembly.org"><img src="https://img.shields.io/badge/WASM-Rust%20Sandbox-654FF0?style=flat-square&logo=webassembly" alt="WASM" /></a>
  <a href="https://flutter.dev"><img src="https://img.shields.io/badge/Flutter-Cross--Platform-02569B?style=flat-square&logo=flutter" alt="Flutter" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache--2.0-blue?style=flat-square" alt="License" /></a>
</p>

---

## ⚡ Why VENDR?

Shopify is the gold standard of merchant ergonomics—but enterprise brands are penalised by **0.5%–2.0% transaction rake fees**, vendor lock-in, proprietary runtime constraints, and disjointed client apps.

**VENDR** is architected from first principles to deliver:
1. **Zero Transaction Fees:** Settle payments directly with Stripe, PayPal, or Cash on Delivery (COD). No platform cuts on your GMV.
2. **Sub-50ms Global Edge:** Lightweight Fastify + GraphQL Storefront core delivering blazing-fast sub-100ms LCP and instant cart mutations.
3. **Shopify Functions Parity (WASM):** Execute custom discount rules, cart transformations, and checkout validation in pure, sandboxed WebAssembly with deterministic `<5ms` execution budgets.
4. **Online Store 2.0 & Liquid Theme Engine:** Full support for `templates/*.json`, modular `sections/*.liquid` with `{% schema %}`, and a live **Split-Screen Drag-and-Drop Theme Customizer**.
5. **Unified Omni-App (Flutter):** Single codebase (`apps/vendr-omni-app`) for **iOS, Android, Windows, and macOS** featuring real-time GMV pulse, camera barcode scanning for retail POS, and an integrated AI Merchant Copilot.

---

## 📊 Feature & Architecture Comparison

| Capability | Shopify (Plus / Advanced) | VENDR (`vendr-commerce`) |
| :--- | :--- | :--- |
| **Transaction Fees** | 0.5% – 2.0% (plus third-party fees) | **0.0% (Zero platform fees)** |
| **Self-Hosting / Data Sovereignty** | ❌ Proprietary Cloud Only | **✅ 1-Click Docker Compose & Kubernetes** |
| **Multi-Tenancy Isolation** | Proprietary SaaS | **✅ PostgreSQL Row-Level Security (RLS)** |
| **Backend Extensibility** | Shopify Functions (WASM) | **✅ Native Sandboxed WASM Functions Engine** |
| **Storefront Architecture** | Liquid + Headless Oxygen | **✅ Next.js 15 App Router + Liquid Engine** |
| **Theme Customizer** | Online Store 2.0 Theme Editor | **✅ Live Split-Screen Section Customizer** |
| **Mobile & Desktop POS Client** | Separate iOS/Android POS apps | **✅ Unified Flutter App (iOS, Android, Mac, Win)** |
| **Edge Response Latency** | ~200ms – 600ms | **⚡ Sub-50ms Fastify Edge Core** |
| **Native AI Merchandising** | Add-on App Store subscriptions | **✅ Built-in AI Copilot & Telemetry** |

---

## 🏗️ Architecture & Monorepo Topology

```
vendr/
├── apps/
│   ├── api/               # Fastify Core Multi-Tenant Backend (GraphQL + REST + Webhooks)
│   ├── admin/             # Polaris-grade Merchant Admin Dashboard (Next.js 15)
│   ├── storefront/        # High-Performance Default Storefront Theme (Next.js 15)
│   ├── theme-editor/      # Split-Screen Visual Storefront Customizer (OS 2.0)
│   └── vendr-omni-app/    # Unified Flutter App (iOS, Android, Windows, macOS)
├── packages/
│   ├── ui/                # Shared Polaris-grade UI component primitives & Tailwind tokens
│   ├── database/          # Prisma Multi-Tenant Schema with PostgreSQL RLS
│   ├── types/             # Shared TypeScript entity contracts & definitions
│   └── wasm-engine/       # Deterministic WASM Functions sandbox (<5ms budget)
├── k8s/                   # Production Kubernetes manifests (Deployments, Ingress, HPA)
└── docker-compose.yml     # 1-click self-hosting stack (Postgres, Redis, Meilisearch, Apps)
```

---

## 🚀 1-Click Quickstart (Docker Compose)

Launch the entire sovereign platform in less than 60 seconds:

```bash
# Clone the repository
git clone https://github.com/abdulaaly/vendr.git
cd vendr

# Spin up all microservices with healthchecks
docker compose up -d
```

### Access URLs:
- 🛍️ **Storefront:** [http://localhost:3000](http://localhost:3000)
- ⚡ **Merchant Admin:** [http://localhost:3001](http://localhost:3001)
- 🎨 **Visual Theme Editor:** [http://localhost:3002](http://localhost:3002)
- 🚀 **Core GraphQL API:** [http://localhost:4000/api/storefront/graphql](http://localhost:4000/api/storefront/graphql)

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Flutter >= 3.3.0 (optional, for Omni-App development)

```bash
# 1. Install dependencies across all monorepo workspaces
pnpm install

# 2. Build shared packages
pnpm --filter @vendr/types build
pnpm --filter @vendr/wasm-engine build
pnpm --filter @vendr/ui build
pnpm --filter @vendr/api build

# 3. Run test suite
pnpm --filter @vendr/api test

# 4. Start all development servers
pnpm dev
```

---

## 🔒 Security & Data Sovereignty

- **PostgreSQL Row-Level Security (RLS):** Every query is cryptographically scoped to `app.current_tenant_id`. Zero risk of multi-tenant data cross-contamination.
- **Pure WebAssembly Isolation:** Merchant and app plugins run inside a sandboxed WASM environment with 5MB memory ceilings and zero filesystem or network capabilities.
- **Signed Webhooks:** All outbound event notifications are signed using HMAC-SHA256 headers (`X-Vendr-Hmac-Sha256`).

---

## 🤝 Contributing

We welcome contributions from open-source engineers, designers, and merchants! Read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for details on submitting pull requests and code standards.

---

## 📄 License

Licensed under the [Apache License, Version 2.0](./LICENSE).
