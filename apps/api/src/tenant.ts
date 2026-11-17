import { FastifyRequest } from "fastify";

export interface TenantContext {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  currencyCode: "USD" | "EUR" | "GBP";
}

/**
 * Resolves the tenant context from the incoming HTTP request.
 * Supports subdomain extraction (e.g., apex-apparel.vendr.local),
 * custom domain headers, and explicit x-vendr-tenant override.
 */
export function resolveTenant(req: FastifyRequest): TenantContext {
  const customHeader = req.headers["x-vendr-tenant"] as string | undefined;
  if (customHeader) {
    return {
      id: `ten_${customHeader}`,
      name: customHeader.replace(/-/g, " ").toUpperCase(),
      slug: customHeader,
      currencyCode: "USD",
    };
  }

  const host = req.headers.host || "localhost";
  const parts = host.split(".");

  if (parts.length > 2 && parts[0] !== "www") {
    const slug = parts[0];
    return {
      id: `ten_${slug}`,
      name: slug.replace(/-/g, " ").toUpperCase(),
      slug,
      domain: host,
      currencyCode: "USD",
    };
  }

  // Default fallback store for standalone development
  return {
    id: "ten_apex_apparel",
    name: "Apex Apparel Co.",
    slug: "apex-apparel",
    domain: host,
    currencyCode: "USD",
  };
}
