# Contributing to VENDR

Thank you for your interest in contributing to **VENDR**! We are building the sovereign, open-source enterprise alternative to Shopify.

---

## 1. Code of Conduct
We are committed to providing a welcoming, inclusive, and harassment-free environment for all contributors.

---

## 2. Monorepo Organization
VENDR uses Turborepo with pnpm workspaces:
- `apps/api`: Fastify core backend (Storefront & Admin GraphQL).
- `apps/admin`: Merchant Admin dashboard (Next.js 15).
- `apps/storefront`: Default Storefront theme (Next.js 15).
- `apps/theme-editor`: Split-screen Visual Theme Customizer (Next.js 15).
- `apps/vendr-omni-app`: Flutter cross-platform mobile & desktop client.
- `packages/ui`: Shared Polaris-grade UI token and component library.
- `packages/database`: Prisma schema and migrations with RLS.
- `packages/types`: Shared TypeScript entity definitions.
- `packages/wasm-engine`: Sandboxed WebAssembly Functions engine.

---

## 3. Pull Request Guidelines
1. **Zero AI Slop:** Ensure all UI screens adhere strictly to the tokens in `DESIGN.md`. No placeholder gradients or dummy texts.
2. **Type Safety & Build Gates:** All PRs must compile cleanly with `pnpm run build` and pass all unit/integration tests with `pnpm --filter @vendr/api test`.
3. **Commit Messages:** Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `perf:`).
