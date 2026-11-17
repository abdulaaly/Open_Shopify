import crypto from "crypto";
import { WebhookPayload } from "@vendr/types";

export interface WebhookSubscriber {
  id: string;
  tenantId: string;
  topic: string;
  endpoint: string;
  secret: string;
}

export class WebhookDispatcher {
  private static subscribers: WebhookSubscriber[] = [];

  static register(sub: WebhookSubscriber) {
    this.subscribers.push(sub);
  }

  static async dispatch<T>(topic: string, tenantId: string, data: T): Promise<void> {
    const matching = this.subscribers.filter(
      (s) => s.tenantId === tenantId && (s.topic === topic || s.topic === "*")
    );

    const payload: WebhookPayload<T> = {
      id: `evt_${crypto.randomUUID()}`,
      topic,
      tenantId,
      apiVersion: "2026-10",
      createdAt: new Date().toISOString(),
      data,
    };

    const bodyString = JSON.stringify(payload);

    for (const sub of matching) {
      try {
        const hmac = crypto
          .createHmac("sha256", sub.secret)
          .update(bodyString, "utf8")
          .digest("base64");

        // Fire HTTP POST webhook event
        fetch(sub.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Vendr-Topic": topic,
            "X-Vendr-Hmac-Sha256": hmac,
            "X-Vendr-Tenant-Id": tenantId,
          },
          body: bodyString,
        }).catch((err) => {
          console.error(`[Webhook Dispatcher] Failed to deliver ${topic} to ${sub.endpoint}:`, err.message);
        });
      } catch (err) {
        console.error(`[Webhook Dispatcher] Error signing webhook:`, err);
      }
    }
  }
}
