import Fastify from "fastify";
import cors from "@fastify/cors";
import crypto from "crypto";
import { resolveTenant, listTenants, registerTenant, getTenantBySlug } from "./tenant.js";
import { createStorefrontSchema } from "./storefront-schema.js";
import { createAdminSchema } from "./admin-schema.js";
import { createYoga } from "graphql-yoga";
import { initialProducts, initialOrders, initialCustomers } from "./sample-data.js";
import { WebhookDispatcher } from "./webhooks.js";
import { CheckoutService } from "./checkout.js";
import { Product, Order } from "@vendr/types";

// In-memory runtime data stores (synchronized per tenant)
const productsStore: Product[] = [...initialProducts];
const ordersStore: Order[] = [...initialOrders];

// Theme configurations store per tenant
const themeConfigsStore = new Map<string, any>([
  [
    "ten_apex_apparel",
    {
      themeName: "Obsidian Tech & Apparel",
      headline: "Engineered Essentials. Zero Compromise.",
      announcement: "Free Express Worldwide Shipping on Orders Over $150",
      accentColor: "#10b981",
      buttonRadius: "9999px",
      heroImage: "/assets/products/architect-overshirt.svg",
    },
  ],
  [
    "ten_karachi_tech",
    {
      themeName: "Cyberpunk Studio",
      headline: "High-Performance Peripherals & POS Systems.",
      announcement: "Karachi Same-Day Delivery | OmniShop POS Hardware in Stock",
      accentColor: "#38bdf8",
      buttonRadius: "12px",
      heroImage: "/assets/products/smart-touch-pos.svg",
    },
  ],
]);

// Registered users store
const usersStore = [
  {
    id: "usr_admin_apex",
    tenantId: "ten_apex_apparel",
    email: "admin@apexapparel.co",
    name: "Elena Rostova",
    role: "OWNER",
  },
  {
    id: "usr_admin_karachi",
    tenantId: "ten_karachi_tech",
    email: "tariq@karachilabs.io",
    name: "Tariq Mehmood",
    role: "OWNER",
  },
];

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
      engine: "Open Shopify Commerce Engine",
      activeStores: listTenants().length,
      timestamp: new Date().toISOString(),
    };
  });

  // 1. List all available stores
  app.get("/api/v1/stores", async () => {
    const tenants = listTenants();
    return {
      stores: tenants.map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        domain: t.domain,
        currencyCode: t.currencyCode,
        productsCount: productsStore.filter((p) => p.tenantId === t.id).length,
        ordersCount: ordersStore.filter((o) => o.tenantId === t.id).length,
      })),
    };
  });

  // 2. Active store summary
  app.get("/api/v1/store", async (req) => {
    const tenant = resolveTenant(req);
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      currencyCode: tenant.currencyCode,
      domain: tenant.domain || `${tenant.slug}.openshopify.local`,
    };
  });

  // 3. User Signup & Instant Store Provisioning
  app.post("/api/v1/auth/signup", async (req, reply) => {
    const body = (req.body as any) || {};
    const { email, password, storeName, storeSlug } = body;

    if (!email || !storeName) {
      return reply.status(400).send({ error: "Missing required fields: email and storeName are required." });
    }

    const slug = (storeSlug || storeName).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
    const tenant = registerTenant(storeName, slug, "USD");

    const userId = `usr_${crypto.randomUUID()}`;
    const user = {
      id: userId,
      tenantId: tenant.id,
      email,
      name: storeName + " Admin",
      role: "OWNER",
    };
    usersStore.push(user);

    // Seed 2 default products for the new store
    const starterProduct1: Product = {
      id: `prod_${crypto.randomUUID()}`,
      tenantId: tenant.id,
      title: `${storeName} Signature Hoodie`,
      handle: `${slug}-signature-hoodie`,
      description: `Official heavyweight cotton merchandise for ${storeName}. Custom dyed fabric with reinforced seams.`,
      descriptionHtml: `<p>Official heavyweight merchandise for ${storeName}.</p>`,
      vendor: storeName,
      productType: "Apparel",
      status: "ACTIVE",
      tags: ["starter", "merch", "apparel"],
      images: ["/assets/products/heavyweight-tee.svg"],
      options: [{ name: "Size", values: ["S", "M", "L"] }],
      variants: [
        {
          id: `var_${crypto.randomUUID()}`,
          productId: `prod_${crypto.randomUUID()}`,
          title: "M / Black",
          sku: `${slug.toUpperCase()}-HD-BLK-M`,
          price: 75.0,
          requiresShipping: true,
          selectedOptions: [{ name: "Size", value: "M" }],
          inventoryQuantity: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      totalInventory: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const starterProduct2: Product = {
      id: `prod_${crypto.randomUUID()}`,
      tenantId: tenant.id,
      title: `${storeName} Smart Desk Mat`,
      handle: `${slug}-smart-desk-mat`,
      description: "Micro-textured vegan leather desk accessory designed for clean merchant workspace setup.",
      descriptionHtml: "<p>Micro-textured vegan leather desk accessory.</p>",
      vendor: storeName,
      productType: "Accessories",
      status: "ACTIVE",
      tags: ["starter", "desk", "accessories"],
      images: ["/assets/products/mechanical-keyboard.svg"],
      options: [{ name: "Color", values: ["Midnight"] }],
      variants: [
        {
          id: `var_${crypto.randomUUID()}`,
          productId: `prod_${crypto.randomUUID()}`,
          title: "Midnight Edition",
          sku: `${slug.toUpperCase()}-DM-MID`,
          price: 45.0,
          requiresShipping: true,
          selectedOptions: [{ name: "Color", value: "Midnight" }],
          inventoryQuantity: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      totalInventory: 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    productsStore.unshift(starterProduct1, starterProduct2);

    // Seed default theme configuration
    themeConfigsStore.set(tenant.id, {
      themeName: "Modern Minimalist",
      headline: `Welcome to ${storeName}`,
      announcement: "Grand Opening — Free Worldwide Shipping on All Orders!",
      accentColor: "#10b981",
      buttonRadius: "9999px",
      heroImage: "/assets/products/heavyweight-tee.svg",
    });

    const token = `sess_${crypto.randomBytes(24).toString("hex")}`;

    return reply.status(201).send({
      success: true,
      message: `Store ${storeName} provisioned successfully!`,
      token,
      user,
      store: tenant,
    });
  });

  // 4. User Login
  app.post("/api/v1/auth/login", async (req, reply) => {
    const body = (req.body as any) || {};
    const { email } = body;

    const user = usersStore.find((u) => u.email.toLowerCase() === (email || "").toLowerCase()) || usersStore[0];
    const tenants = listTenants();
    const tenant = tenants.find((t) => t.id === user.tenantId) || tenants[0];
    const token = `sess_${crypto.randomBytes(24).toString("hex")}`;

    return {
      success: true,
      token,
      user,
      store: tenant,
    };
  });

  // 5. REST Products listing (filtered by tenant)
  app.get("/api/v1/products", async (req) => {
    const tenant = resolveTenant(req);
    const storeProducts = productsStore.filter((p) => p.tenantId === tenant.id);
    return {
      tenantId: tenant.id,
      storeName: tenant.name,
      products: storeProducts,
      count: storeProducts.length,
    };
  });

  // 6. REST Create Product
  app.post("/api/v1/products", async (req, reply) => {
    const tenant = resolveTenant(req);
    const body = (req.body as any) || {};
    const { title, description, price, sku, inventoryQuantity, category, image } = body;

    if (!title || price === undefined) {
      return reply.status(400).send({ error: "Product title and price are required." });
    }

    const prodId = `prod_${crypto.randomUUID()}`;
    const handle = title.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
    const numPrice = parseFloat(price) || 0;
    const numStock = parseInt(inventoryQuantity, 10) || 50;

    const newProduct: Product = {
      id: prodId,
      tenantId: tenant.id,
      title,
      handle,
      description: description || `High quality ${title} from ${tenant.name}.`,
      descriptionHtml: `<p>${description || title}</p>`,
      vendor: tenant.name,
      productType: category || "General",
      status: "ACTIVE",
      tags: [category ? category.toLowerCase() : "general", "new"],
      images: [image || "/assets/products/heavyweight-tee.svg"],
      options: [{ name: "Standard", values: ["Default"] }],
      variants: [
        {
          id: `var_${crypto.randomUUID()}`,
          productId: prodId,
          title: "Default Variant",
          sku: sku || `${tenant.slug.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
          price: numPrice,
          compareAtPrice: Math.round(numPrice * 1.2 * 100) / 100,
          requiresShipping: true,
          selectedOptions: [{ name: "Standard", value: "Default" }],
          inventoryQuantity: numStock,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      totalInventory: numStock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    productsStore.unshift(newProduct);

    return reply.status(201).send({
      success: true,
      product: newProduct,
    });
  });

  // 7. REST Orders listing (filtered by tenant)
  app.get("/api/v1/orders", async (req) => {
    const tenant = resolveTenant(req);
    const storeOrders = ordersStore.filter((o) => o.tenantId === tenant.id);
    return {
      tenantId: tenant.id,
      orders: storeOrders,
      count: storeOrders.length,
    };
  });

  // 8. REST Order Fulfillment Action
  app.post("/api/v1/orders/:id/fulfill", async (req, reply) => {
    const { id } = req.params as { id: string };
    const order = ordersStore.find((o) => o.id === id || o.name === id || o.name === `#${id}`);

    if (!order) {
      return reply.status(404).send({ error: `Order ${id} not found.` });
    }

    order.fulfillmentStatus = "FULFILLED";
    order.updatedAt = new Date().toISOString();
    order.lineItems.forEach((li) => {
      li.fulfillmentStatus = "FULFILLED";
    });

    if (order.fulfillments.length === 0) {
      order.fulfillments.push({
        id: `ful_${crypto.randomUUID()}`,
        orderId: order.id,
        status: "DELIVERED",
        trackingCompany: "OmniShop Express Courier",
        trackingNumber: `OSH-${Math.floor(10000000 + Math.random() * 90000000)}`,
        trackingUrl: `https://openshopify.org/track`,
        createdAt: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: `Order ${order.name} marked as FULFILLED!`,
      order,
    };
  });

  // 9. REST Checkout / Order Placement
  app.post("/api/v1/checkout", async (req, reply) => {
    const tenant = resolveTenant(req);
    const body = (req.body as any) || {};
    const { items, email, discountCode, shippingAddress } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return reply.status(400).send({ error: "Cart is empty. Please provide items." });
    }

    let subtotal = 0;
    const orderLineItems: any[] = [];

    for (const item of items) {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 1;
      subtotal += price * quantity;

      // Find product variant and decrement inventory
      for (const p of productsStore) {
        const variant = p.variants.find((v) => v.id === item.variantId || v.title === item.title || p.title === item.title);
        if (variant) {
          variant.inventoryQuantity = Math.max(0, variant.inventoryQuantity - quantity);
          p.totalInventory = p.variants.reduce((acc, v) => acc + v.inventoryQuantity, 0);
          break;
        }
      }

      orderLineItems.push({
        id: `item_${crypto.randomUUID()}`,
        orderId: "",
        title: item.title || "Custom Item",
        sku: item.sku || "SKU-AUTO",
        quantity,
        price,
        totalDiscount: 0,
        fulfillmentStatus: "UNFULFILLED",
      });
    }

    let discountAmount = 0;
    if (discountCode && (discountCode.toUpperCase() === "VIP20" || discountCode.toUpperCase() === "OPEN20")) {
      discountAmount = Math.round(subtotal * 0.2 * 100) / 100; // 20% discount
    }

    const shipping = subtotal > 100 ? 0 : 12;
    const tax = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100;
    const total = Math.max(0, subtotal - discountAmount + tax + shipping);

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ord_${crypto.randomUUID()}`;

    orderLineItems.forEach((li) => {
      li.orderId = orderId;
    });

    const newOrder: Order = {
      id: orderId,
      tenantId: tenant.id,
      orderNumber,
      name: `#${orderNumber}`,
      email: email || "customer@openshopify.com",
      financialStatus: "PAID",
      fulfillmentStatus: "UNFULFILLED",
      currencyCode: tenant.currencyCode,
      subtotalPrice: subtotal,
      totalTax: tax,
      totalShipping: shipping,
      totalDiscounts: discountAmount,
      totalPrice: total,
      shippingAddress: shippingAddress || {
        firstName: "Verified",
        lastName: "Customer",
        address1: "100 Commerce Way",
        city: "Karachi",
        country: "Pakistan",
        zip: "75300",
      },
      lineItems: orderLineItems,
      fulfillments: [],
      tags: ["online", "web-checkout"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);

    return reply.status(201).send({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  });

  // 10. Theme Customizer Configuration Endpoints
  app.get("/api/v1/theme-config", async (req) => {
    const tenant = resolveTenant(req);
    const config = themeConfigsStore.get(tenant.id) || {
      themeName: "Modern Minimalist",
      headline: `Welcome to ${tenant.name}`,
      announcement: "Free Worldwide Shipping",
      accentColor: "#10b981",
      buttonRadius: "9999px",
      heroImage: "/assets/products/heavyweight-tee.svg",
    };
    return {
      tenantId: tenant.id,
      config,
    };
  });

  app.post("/api/v1/theme-config", async (req) => {
    const tenant = resolveTenant(req);
    const body = (req.body as any) || {};
    const existing = themeConfigsStore.get(tenant.id) || {};
    const updated = { ...existing, ...body };
    themeConfigsStore.set(tenant.id, updated);
    return {
      success: true,
      message: "Theme configuration updated!",
      config: updated,
    };
  });

  // 11. Register Webhook Subscription
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

  // 12. Mount Storefront GraphQL API Yoga handler
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

  // 13. Mount Admin GraphQL API Yoga handler
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
    console.log(`🚀 Open Shopify Core Multi-Tenant API running at http://${HOST}:${PORT}`);
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
