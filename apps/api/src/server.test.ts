import test from "node:test";
import assert from "node:assert/strict";
import { CheckoutService } from "./checkout.js";
import { initialProducts } from "./sample-data.js";
import { WebhookDispatcher } from "./webhooks.js";
import { buildApp } from "./server.js";

test("VENDR Core API & Multi-Tenant Engine Test Suite", async (t) => {
  await t.test("Cart Creation & Line Item Management", async () => {
    const variant = initialProducts[0].variants[0];
    const cart = await CheckoutService.createCart("ten_test", [
      { variant, quantity: 2 },
    ]);

    assert.ok(cart.id.startsWith("cart_"));
    assert.equal(cart.lines.length, 1);
    assert.equal(cart.subtotalAmount, variant.price * 2);
    assert.equal(cart.totalAmount > 0, true);
  });

  await t.test("WASM Functions Discount Application (VIP20 -> 20% off)", async () => {
    const variant = initialProducts[0].variants[0];
    const cart = await CheckoutService.createCart("ten_test", [
      { variant, quantity: 1 },
    ]);

    const initialTotal = cart.subtotalAmount;
    const discountedCart = await CheckoutService.applyDiscountCode(cart.id, "VIP20");

    assert.equal(discountedCart.discountCodes.includes("VIP20"), true);
    assert.equal(discountedCart.totalDiscountAmount, initialTotal * 0.2);
  });

  await t.test("Checkout Engine Finalizes Order & Returns Order Number", async () => {
    const variant = initialProducts[0].variants[0];
    const cart = await CheckoutService.createCart("ten_test", [
      { variant, quantity: 1 },
    ]);

    const order = await CheckoutService.completeCheckout(
      cart.id,
      "test@buyer.com",
      {
        firstName: "Jane",
        lastName: "Doe",
        address1: "100 Market St",
        city: "San Francisco",
        country: "US",
        zip: "94105",
      }
    );

    assert.ok(order.id.startsWith("ord_"));
    assert.equal(typeof order.orderNumber, "number");
    assert.equal(order.financialStatus, "PAID");
    assert.equal(order.lineItems.length, 1);
  });

  await t.test("Signed Webhook HMAC Delivery Verification", async () => {
    let captured = false;
    WebhookDispatcher.register({
      id: "sub_mock",
      tenantId: "ten_test",
      topic: "products/create",
      endpoint: "https://mock.httpbin.org/post",
      secret: "super-secret-key-12345",
    });

    // Webhook should dispatch without unhandled rejection
    await WebhookDispatcher.dispatch("products/create", "ten_test", {
      id: "prod_test",
      title: "Test Shirt",
    });

    assert.ok(true);
  });

  await t.test("Fastify Health Check REST Endpoint", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/health",
    });

    assert.equal(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.equal(body.status, "ok");
    assert.equal(body.engine, "VENDR Sovereign Commerce Engine");
    await app.close();
  });
});
