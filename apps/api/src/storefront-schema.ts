import { createSchema } from "graphql-yoga";
import { initialProducts } from "./sample-data.js";
import { CheckoutService } from "./checkout.js";

const typeDefs = /* GraphQL */ `
  type Query {
    shop: Shop!
    products(first: Int = 20): [Product!]!
    productByHandle(handle: String!): Product
    product(id: ID!): Product
    cart(id: ID!): Cart
  }

  type Mutation {
    cartCreate(input: CartInput): CartPayload!
    cartLinesAdd(cartId: ID!, lines: [CartLineInput!]!): CartPayload!
    cartLinesRemove(cartId: ID!, lineIds: [ID!]!): CartPayload!
    cartDiscountCodesUpdate(cartId: ID!, discountCodes: [String!]): CartPayload!
    checkoutComplete(cartId: ID!, email: String!, shippingAddress: AddressInput!): CheckoutPayload!
  }

  type Shop {
    name: String!
    primaryDomain: String!
    currencyCode: String!
  }

  type Product {
    id: ID!
    title: String!
    handle: String!
    description: String!
    descriptionHtml: String
    vendor: String!
    productType: String!
    status: String!
    tags: [String!]!
    images: [String!]!
    variants: [ProductVariant!]!
    totalInventory: Int!
  }

  type ProductVariant {
    id: ID!
    productId: ID!
    title: String!
    sku: String!
    price: Float!
    compareAtPrice: Float
    requiresShipping: Boolean!
    selectedOptions: [SelectedOption!]!
    inventoryQuantity: Int!
    image: String
  }

  type SelectedOption {
    name: String!
    value: String!
  }

  type Cart {
    id: ID!
    lines: [CartLine!]!
    subtotalAmount: Float!
    totalTaxAmount: Float!
    totalShippingAmount: Float!
    totalDiscountAmount: Float!
    totalAmount: Float!
    currencyCode: String!
    discountCodes: [String!]!
  }

  type CartLine {
    id: ID!
    merchandiseId: ID!
    quantity: Int!
    variant: ProductVariant!
  }

  type CartPayload {
    cart: Cart
    userErrors: [UserError!]!
  }

  type CheckoutPayload {
    orderNumber: Int
    orderId: ID
    totalAmount: Float
    status: String
    userErrors: [UserError!]!
  }

  type UserError {
    field: [String!]
    message: String!
  }

  input CartInput {
    lines: [CartLineInput!]
    discountCodes: [String!]
  }

  input CartLineInput {
    merchandiseId: ID!
    quantity: Int!
  }

  input AddressInput {
    firstName: String
    lastName: String
    address1: String!
    city: String!
    country: String!
    zip: String!
  }
`;

export function createStorefrontSchema(tenantId: string) {
  return createSchema({
    typeDefs,
    resolvers: {
      Query: {
        shop: () => ({
          name: "Apex Apparel Co.",
          primaryDomain: "apex-apparel.vendr.local",
          currencyCode: "USD",
        }),
        products: () => initialProducts,
        productByHandle: (_: unknown, { handle }: { handle: string }) =>
          initialProducts.find((p) => p.handle === handle),
        product: (_: unknown, { id }: { id: string }) =>
          initialProducts.find((p) => p.id === id),
        cart: (_: unknown, { id }: { id: string }) => CheckoutService.getCart(id),
      },
      Mutation: {
        cartCreate: async (_: unknown, { input }: any) => {
          try {
            const lines: { variant: any; quantity: number }[] = [];
            if (input?.lines) {
              for (const l of input.lines) {
                const foundVariant = initialProducts
                  .flatMap((p) => p.variants)
                  .find((v) => v.id === l.merchandiseId);
                if (foundVariant) {
                  lines.push({ variant: foundVariant, quantity: l.quantity });
                }
              }
            }
            const cart = await CheckoutService.createCart(tenantId, lines);
            if (input?.discountCodes) {
              for (const code of input.discountCodes) {
                await CheckoutService.applyDiscountCode(cart.id, code);
              }
            }
            return { cart, userErrors: [] };
          } catch (err: any) {
            return { cart: null, userErrors: [{ field: ["cart"], message: err.message }] };
          }
        },
        cartLinesAdd: async (_: unknown, { cartId, lines }: any) => {
          try {
            const mappedLines: { variant: any; quantity: number }[] = [];
            for (const l of lines) {
              const foundVariant = initialProducts
                .flatMap((p) => p.variants)
                .find((v) => v.id === l.merchandiseId);
              if (foundVariant) {
                mappedLines.push({ variant: foundVariant, quantity: l.quantity });
              }
            }
            const cart = await CheckoutService.addLines(cartId, mappedLines);
            return { cart, userErrors: [] };
          } catch (err: any) {
            return { cart: null, userErrors: [{ field: ["lines"], message: err.message }] };
          }
        },
        cartLinesRemove: async (_: unknown, { cartId, lineIds }: any) => {
          try {
            const cart = await CheckoutService.removeLines(cartId, lineIds);
            return { cart, userErrors: [] };
          } catch (err: any) {
            return { cart: null, userErrors: [{ field: ["lineIds"], message: err.message }] };
          }
        },
        cartDiscountCodesUpdate: async (_: unknown, { cartId, discountCodes }: any) => {
          try {
            let updatedCart;
            for (const code of discountCodes) {
              updatedCart = await CheckoutService.applyDiscountCode(cartId, code);
            }
            return { cart: updatedCart, userErrors: [] };
          } catch (err: any) {
            return { cart: null, userErrors: [{ field: ["discountCodes"], message: err.message }] };
          }
        },
        checkoutComplete: async (_: unknown, { cartId, email, shippingAddress }: any) => {
          try {
            const order = await CheckoutService.completeCheckout(cartId, email, shippingAddress);
            return {
              orderNumber: order.orderNumber,
              orderId: order.id,
              totalAmount: order.totalPrice,
              status: order.financialStatus,
              userErrors: [],
            };
          } catch (err: any) {
            return {
              orderNumber: null,
              orderId: null,
              totalAmount: null,
              status: null,
              userErrors: [{ field: ["checkout"], message: err.message }],
            };
          }
        },
      },
    },
  });
}
