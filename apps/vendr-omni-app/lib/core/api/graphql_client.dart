import 'dart:convert';
import 'package:http/http.dart' as http;

class VendrApiClient {
  final String baseUrl;
  final String tenantSlug;

  VendrApiClient({
    this.baseUrl = "http://localhost:4000",
    this.tenantSlug = "apex-apparel",
  });

  Future<Map<String, dynamic>> queryAdmin(String query, [Map<String, dynamic>? variables]) async {
    final response = await http.post(
      Uri.parse("$baseUrl/api/admin/graphql"),
      headers: {
        "Content-Type": "application/json",
        "X-Vendr-Tenant": tenantSlug,
      },
      body: jsonEncode({
        "query": query,
        "variables": variables ?? {},
      }),
    );

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception("API Error: ${response.statusCode} - ${response.body}");
    }
  }

  Future<Map<String, dynamic>> fetchStorePulse() async {
    const pulseQuery = """
      query GetStorePulse {
        shop {
          name
          domain
          currencyCode
        }
        analyticsOverview {
          totalSales
          ordersCount
          conversionRate
          averageOrderValue
        }
        orders(first: 5) {
          id
          name
          financialStatus
          fulfillmentStatus
          totalPrice
          createdAt
        }
      }
    """;

    try {
      final res = await queryAdmin(pulseQuery);
      return res["data"] as Map<String, dynamic>;
    } catch (_) {
      // Offline / fallback mock telemetry
      return {
        "shop": {
          "name": "Apex Apparel Co.",
          "domain": "apex-apparel.vendr.local",
          "currencyCode": "USD"
        },
        "analyticsOverview": {
          "totalSales": 142850.0,
          "ordersCount": 1420,
          "conversionRate": 3.84,
          "averageOrderValue": 100.60
        },
        "orders": [
          {
            "id": "ord_1001",
            "name": "#1001",
            "financialStatus": "PAID",
            "fulfillmentStatus": "FULFILLED",
            "totalPrice": 242.44,
            "createdAt": "2026-11-16T18:40:00Z"
          },
          {
            "id": "ord_1002",
            "name": "#1002",
            "financialStatus": "PAID",
            "fulfillmentStatus": "UNFULFILLED",
            "totalPrice": 137.28,
            "createdAt": "2026-11-16T19:15:00Z"
          }
        ]
      };
    }
  }
}
