import { FastifyRequest } from "fastify";

export interface TenantContext {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  currencyCode: "USD" | "EUR" | "GBP" | "PKR";
}

// In-memory tenant registry populated with default demo stores
const tenantsRegistry = new Map<string, TenantContext>([
  [
    "apex-apparel",
    {
      id: "ten_apex_apparel",
      name: "Apex Apparel Co.",
      slug: "apex-apparel",
      domain: "apex-apparel.openshopify.local",
      currencyCode: "USD",
    },
  ],
  [
    "karachi-tech",
    {
      id: "ten_karachi_tech",
      name: "Karachi Tech Hub",
      slug: "karachi-tech",
      domain: "karachi-tech.openshopify.local",
      currencyCode: "USD",
    },
  ],
]);

export function listTenants(): TenantContext[] {
  return Array.from(tenantsRegistry.values());
}

export function getTenantBySlug(slug: string): TenantContext | undefined {
  return tenantsRegistry.get(slug);
}

export function registerTenant(name: string, slug: string, currencyCode: "USD" | "EUR" | "GBP" | "PKR" = "USD"): TenantContext {
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
  const tenant: TenantContext = {
    id: `ten_${cleanSlug.replace(/-/g, "_")}`,
    name,
    slug: cleanSlug,
    domain: `${cleanSlug}.openshopify.local`,
    currencyCode,
  };
  tenantsRegistry.set(cleanSlug, tenant);
  return tenant;
}

/**
 * Resolves the tenant context from the incoming HTTP request.
 * Supports query param (?tenant=...), custom headers (x-vendr-tenant / x-tenant-slug),
 * subdomain extraction, and default fallback store.
 */
export function resolveTenant(req: FastifyRequest): TenantContext {
  // 1. Query parameter override
  const queryTenant = (req.query as any)?.tenant as string | undefined;
  if (queryTenant && tenantsRegistry.has(queryTenant)) {
    return tenantsRegistry.get(queryTenant)!;
  }

  // 2. Custom header override
  const customHeader = (req.headers["x-vendr-tenant"] || req.headers["x-tenant-slug"]) as string | undefined;
  if (customHeader) {
    const slug = customHeader.replace(/^ten_/, "").replace(/_/g, "-");
    if (tenantsRegistry.has(slug)) {
      return tenantsRegistry.get(slug)!;
    }
    return {
      id: `ten_${slug.replace(/-/g, "_")}`,
      name: slug.replace(/-/g, " ").toUpperCase(),
      slug,
      domain: `${slug}.openshopify.local`,
      currencyCode: "USD",
    };
  }

  // 3. Subdomain extraction
  const host = req.headers.host || "localhost";
  const parts = host.split(".");
  if (parts.length > 2 && parts[0] !== "www") {
    const slug = parts[0];
    if (tenantsRegistry.has(slug)) {
      return tenantsRegistry.get(slug)!;
    }
    return {
      id: `ten_${slug.replace(/-/g, "_")}`,
      name: slug.replace(/-/g, " ").toUpperCase(),
      slug,
      domain: host,
      currencyCode: "USD",
    };
  }

  // 4. Default fallback store
  return tenantsRegistry.get("apex-apparel")!;
}
