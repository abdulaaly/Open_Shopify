import Fastify from "fastify";
import cors from "@fastify/cors";
import { resolveTenant } from "./tenant.js";
import { createStorefrontSchema } from "./storefront-schema.js";
import { createAdminSchema } from "./admin-schema.js";
import { createYoga } from "graphql-yoga";
import { initialProducts, initialOrders } from "./sample-data.js";
import { WebhookDispatcher } from "./webhooks.js";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
  });

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  // Health check endpoint
  app.get("/api/v1/health", async () => {
    return {
      status: "ok",
      version: "1.0.0",
      engine: "VENDR Sovereign Commerce Engine",
      timestamp: new Date().toISOString(),
    };
  });

  // REST Store summary
  app.get("/api/v1/store", async (req) => {
    const tenant = resolveTenant(req);
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      currencyCode: tenant.currencyCode,
      domain: tenant.domain || `${tenant.slug}.vendr.local`,
    };
  });

  // REST Products listing
  app.get("/api/v1/products", async () => {
    return {
      products: initialProducts,
      count: initialProducts.length,
    };
  });

  // REST Orders listing
  app.get("/api/v1/orders", async () => {
    return {
      orders: initialOrders,
      count: initialOrders.length,
    };
  });

  // Register Webhook Subscription
  app.post("/api/v1/webhooks/subscribe", async (req, reply) => {
    const tenant = resolveTenant(req);
    const { topic, endpoint, secret } = req.body as any;

    if (!topic || !endpoint || !secret) {
      return reply.status(400).send({ error: "Missing required webhook parameters" });
    }

    WebhookDispatcher.register({
      id: `sub_${Date.now()}`,
      tenantId: tenant.id,
      topic,
      endpoint,
      secret,
    });

    return { success: true, topic, endpoint };
  });

  // Mount Storefront GraphQL API Yoga handler
  app.route({
    url: "/api/storefront/graphql",
    method: ["GET", "POST", "OPTIONS"],
    handler: async (req, reply) => {
      const tenant = resolveTenant(req);
      const yoga = createYoga({
        schema: createStorefrontSchema(tenant.id),
        graphqlEndpoint: "/api/storefront/graphql",
      });

      const response = await yoga.handleNodeRequestAndResponse(req.raw, reply.raw, {
        req,
        reply,
        tenant,
      } as any);

      reply.sent = true;
      return response;
    },
  });

  // Mount Admin GraphQL API Yoga handler
  app.route({
    url: "/api/admin/graphql",
    method: ["GET", "POST", "OPTIONS"],
    handler: async (req, reply) => {
      const tenant = resolveTenant(req);
      const yoga = createYoga({
        schema: createAdminSchema(tenant.id),
        graphqlEndpoint: "/api/admin/graphql",
      });

      const response = await yoga.handleNodeRequestAndResponse(req.raw, reply.raw, {
        req,
        reply,
        tenant,
      } as any);

      reply.sent = true;
      return response;
    },
  });

  return app;
}

export async function start() {
  const app = await buildApp();
  const PORT = parseInt(process.env.PORT || "4000", 10);
  const HOST = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`🚀 VENDR Core Multi-Tenant API running at http://${HOST}:${PORT}`);
    console.log(`🛍️ Storefront GraphQL: http://${HOST}:${PORT}/api/storefront/graphql`);
    console.log(`⚡ Admin GraphQL: http://${HOST}:${PORT}/api/admin/graphql`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Start if executed directly
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  start();
}
