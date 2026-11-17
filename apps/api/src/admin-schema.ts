import { createSchema } from "graphql-yoga";
import { initialProducts, initialOrders, initialCustomers } from "./sample-data.js";
import { WebhookDispatcher } from "./webhooks.js";
import crypto from "crypto";

const typeDefs = /* GraphQL */ `
  type Query {
    shop: AdminShop!
    products(first: Int = 50): [Product!]!
    product(id: ID!): Product
    orders(first: Int = 50): [Order!]!
    order(id: ID!): Order
    customers(first: Int = 50): [Customer!]!
    analyticsOverview: AnalyticsOverview!
  }

  type Mutation {
    productCreate(input: ProductInput!): ProductPayload!
    productUpdate(id: ID!, input: ProductInput!): ProductPayload!
    productDelete(id: ID!): DeletePayload!
    orderCreate(input: OrderCreateInput!): OrderPayload!
    fulfillmentCreate(orderId: ID!, trackingCompany: String, trackingNumber: String): OrderPayload!
  }

  type AdminShop {
    id: ID!
    name: String!
    domain: String!
    plan: String!
    currencyCode: String!
    timezone: String!
  }

  type Product {
    id: ID!
    title: String!
    handle: String!
    description: String!
    vendor: String!
    productType: String!
    status: String!
    tags: [String!]!
    images: [String!]!
    variants: [ProductVariant!]!
    totalInventory: Int!
    createdAt: String!
  }

  type ProductVariant {
    id: ID!
    productId: ID!
    title: String!
    sku: String!
    price: Float!
    compareAtPrice: Float
    inventoryQuantity: Int!
  }

  type Order {
    id: ID!
    orderNumber: Int!
    name: String!
    email: String!
    financialStatus: String!
    fulfillmentStatus: String!
    currencyCode: String!
    subtotalPrice: Float!
    totalTax: Float!
    totalShipping: Float!
    totalDiscounts: Float!
    totalPrice: Float!
    lineItems: [OrderLineItem!]!
    shippingAddress: Address
    createdAt: String!
  }

  type OrderLineItem {
    id: ID!
    title: String!
    sku: String
    quantity: Int!
    price: Float!
    fulfillmentStatus: String!
  }

  type Address {
    firstName: String
    lastName: String
    address1: String!
    city: String!
    country: String!
    zip: String!
  }

  type Customer {
    id: ID!
    displayName: String!
    email: String!
    phone: String
    ordersCount: Int!
    totalSpent: Float!
    tags: [String!]!
    createdAt: String!
  }

  type AnalyticsOverview {
    totalSales: Float!
    ordersCount: Int!
    conversionRate: Float!
    averageOrderValue: Float!
    sessionsCount: Int!
  }

  type ProductPayload {
    product: Product
    userErrors: [UserError!]!
  }

  type OrderPayload {
    order: Order
    userErrors: [UserError!]!
  }

  type DeletePayload {
    deletedId: ID
    userErrors: [UserError!]!
  }

  type UserError {
    field: [String!]
    message: String!
  }

  input ProductInput {
    title: String!
    handle: String
    description: String
    vendor: String
    productType: String
    status: String
    tags: [String!]
    price: Float
    sku: String
  }

  input OrderCreateInput {
    email: String!
    lineItems: [OrderLineItemInput!]!
  }

  input OrderLineItemInput {
    variantId: ID!
    quantity: Int!
  }
`;

export function createAdminSchema(tenantId: string) {
  const products = [...initialProducts];
  const orders = [...initialOrders];
  const customers = [...initialCustomers];

  return createSchema({
    typeDefs,
    resolvers: {
      Query: {
        shop: () => ({
          id: tenantId,
          name: "Apex Apparel Co.",
          domain: "apex-apparel.vendr.local",
          plan: "ENTERPRISE",
          currencyCode: "USD",
          timezone: "UTC",
        }),
        products: () => products,
        product: (_: unknown, { id }: { id: string }) => products.find((p) => p.id === id),
        orders: () => orders,
        order: (_: unknown, { id }: { id: string }) => orders.find((o) => o.id === id),
        customers: () => customers,
        analyticsOverview: () => {
          const totalSales = orders.reduce((acc, o) => acc + o.totalPrice, 0);
          const ordersCount = orders.length;
          const aov = ordersCount > 0 ? totalSales / ordersCount : 0;
          return {
            totalSales: Math.round(totalSales * 100) / 100,
            ordersCount,
            conversionRate: 3.84,
            averageOrderValue: Math.round(aov * 100) / 100,
            sessionsCount: 14250,
          };
        },
      },
      Mutation: {
        productCreate: async (_: unknown, { input }: any) => {
          const id = `prod_${crypto.randomUUID().slice(0, 8)}`;
          const handle =
            input.handle ||
            input.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

          const newProduct = {
            id,
            tenantId,
            title: input.title,
            handle,
            description: input.description || "",
            descriptionHtml: `<p>${input.description || ""}</p>`,
            vendor: input.vendor || "Apex Apparel",
            productType: input.productType || "General",
            status: input.status || "ACTIVE",
            tags: input.tags || [],
            images: [
              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
            ],
            options: [{ name: "Title", values: ["Default"] }],
            variants: [
              {
                id: `var_${crypto.randomUUID().slice(0, 8)}`,
                productId: id,
                title: "Default",
                sku: input.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                price: input.price || 45.0,
                requiresShipping: true,
                selectedOptions: [{ name: "Title", value: "Default" }],
                inventoryQuantity: 50,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
            totalInventory: 50,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          products.unshift(newProduct);
          await WebhookDispatcher.dispatch("products/create", tenantId, newProduct);
          return { product: newProduct, userErrors: [] };
        },
        productDelete: async (_: unknown, { id }: { id: string }) => {
          const index = products.findIndex((p) => p.id === id);
          if (index !== -1) {
            const [deleted] = products.splice(index, 1);
            await WebhookDispatcher.dispatch("products/delete", tenantId, { id: deleted.id });
            return { deletedId: id, userErrors: [] };
          }
          return { deletedId: null, userErrors: [{ field: ["id"], message: "Product not found" }] };
        },
        orderCreate: async (_: unknown, { input }: any) => {
          const orderNumber = Math.floor(1000 + Math.random() * 9000);
          const newOrder = {
            id: `ord_${orderNumber}`,
            tenantId,
            orderNumber,
            name: `#${orderNumber}`,
            email: input.email,
            financialStatus: "PAID" as const,
            fulfillmentStatus: "UNFULFILLED" as const,
            currencyCode: "USD" as const,
            subtotalPrice: 120.0,
            totalTax: 9.6,
            totalShipping: 0,
            totalDiscounts: 0,
            totalPrice: 129.6,
            lineItems: input.lineItems.map((li: any) => ({
              id: `item_${crypto.randomUUID().slice(0, 6)}`,
              title: "Product Item",
              sku: "SKU-AUTO",
              quantity: li.quantity,
              price: 60.0,
              fulfillmentStatus: "UNFULFILLED",
            })),
            shippingAddress: {
              firstName: "Store",
              lastName: "Customer",
              address1: "123 Commerce Way",
              city: "New York",
              country: "United States",
              zip: "10001",
            },
            fulfillments: [],
            tags: ["online", "web"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          orders.unshift(newOrder);
          await WebhookDispatcher.dispatch("orders/create", tenantId, newOrder);
          return { order: newOrder, userErrors: [] };
        },
        fulfillmentCreate: async (_: unknown, { orderId, trackingCompany, trackingNumber }: any) => {
          const order = orders.find((o) => o.id === orderId);
          if (!order) {
            return { order: null, userErrors: [{ field: ["orderId"], message: "Order not found" }] };
          }

          order.fulfillmentStatus = "FULFILLED";
          order.fulfillments.push({
            id: `ful_${crypto.randomUUID().slice(0, 6)}`,
            orderId: order.id,
            status: "SHIPPED",
            trackingCompany: trackingCompany || "UPS Ground",
            trackingNumber: trackingNumber || `1Z9999999999999999`,
            trackingUrl: `https://ups.com/track`,
            createdAt: new Date().toISOString(),
          });

          await WebhookDispatcher.dispatch("orders/fulfilled", tenantId, order);
          return { order, userErrors: [] };
        },
      },
    },
  });
}
