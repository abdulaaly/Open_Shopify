# Open Shopify Architecture Specification

## 1. Executive Summary & System Constitution
**Open Shopify** is an open-source, enterprise-grade, multi-tenant digital commerce engine designed to achieve 100% feature and developer ergonomics parity with Shopify while offering:
- **Zero Transaction Fees:** Self-hosted infrastructure with direct payment processor settlement.
- **Sub-50ms Global Response Time:** Edge-cached GraphQL Storefront and lightweight Fastify backend core.
- **Native WebAssembly Functions:** High-performance sandboxed plugin execution (Rust/WASM) for custom business logic, cart transformations, and discount calculation.
- **True Multi-Tenancy:** Single cluster supporting thousands of isolated merchant stores via PostgreSQL Row-Level Security (RLS) and dynamic domain routing.
- **Universal Omni-Platform Clients:** Next.js 15 Web Merchant Admin + Liquid Theme Engine alongside **OmniShop**, a unified Flutter Mobile (iOS/Android) and Desktop (Windows/macOS/Linux) POS & management application connected via unified account authentication.
