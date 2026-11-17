import 'package:flutter/material.dart';
import '../../../../core/theme/vendr_theme.dart';
import '../../../../core/api/graphql_client.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final VendrApiClient _client = VendrApiClient();
  bool _isLoading = true;
  Map<String, dynamic> _data = {};

  @override
  void initState() {
    super.initState();
    _loadPulse();
  }

  Future<void> _loadPulse() async {
    setState(() => _isLoading = true);
    final data = await _client.fetchStorePulse();
    setState(() {
      _data = data;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(color: VendrTheme.primaryEmerald),
        ),
      );
    }

    final analytics = _data["analyticsOverview"] as Map<String, dynamic>? ?? {};
    final orders = (_data["orders"] as List<dynamic>?) ?? [];

    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.bolt, color: VendrTheme.primaryEmerald, size: 20),
            SizedBox(width: 8),
            Text("Apex Apparel Pulse"),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, size: 20),
            onPressed: _loadPulse,
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadPulse,
        color: VendrTheme.primaryEmerald,
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            // Hero GMV Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        const Text(
                          "TODAY'S GMV SALES",
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: VendrTheme.textMutedLight,
                            letterSpacing: 0.8,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: VendrTheme.primaryEmeraldBg,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.trending_up, size: 14, color: VendrTheme.primaryEmerald),
                              SizedBox(width: 4),
                              Text(
                                "+18.4%",
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: VendrTheme.primaryEmerald,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      "\$${(analytics["totalSales"] ?? 0.0).toStringAsFixed(2)}",
                      style: const TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -1,
                        fontFamily: "monospace",
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      "Processed across 1,420 orders • Zero platform fee settlement",
                      style: TextStyle(fontSize: 12, color: VendrTheme.textMutedLight),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Secondary Metrics Row
            Row(
              children: [
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text("ORDERS", style: TextStyle(fontSize: 10, color: VendrTheme.textMutedLight, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 6),
                          Text(
                            "${analytics["ordersCount"] ?? 0}",
                            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: "monospace"),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text("CONVERSION", style: TextStyle(fontSize: 10, color: VendrTheme.textMutedLight, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 6),
                          Text(
                            "${analytics["conversionRate"] ?? 0}%",
                            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: "monospace"),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text("AOV", style: TextStyle(fontSize: 10, color: VendrTheme.textMutedLight, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 6),
                          Text(
                            "\$${(analytics["averageOrderValue"] ?? 0.0).toStringAsFixed(2)}",
                            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: "monospace"),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Recent Orders Header
            const Text(
              "Live Incoming Orders",
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),

            ...orders.map((o) {
              final isPaid = o["financialStatus"] == "PAID";
              final isFulfilled = o["fulfillmentStatus"] == "FULFILLED";

              return Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  title: Text(
                    "${o["name"]}",
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                  subtitle: Text(
                    "Total: \$${o["totalPrice"]} • ${isFulfilled ? "Fulfilled" : "Unfulfilled"}",
                    style: const TextStyle(fontSize: 11),
                  ),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: isPaid ? VendrTheme.primaryEmeraldBg : Colors.amber.shade50,
                      borderRadius: BorderRadius.circular(6),
                      border: Border.parse(isPaid ? "1px solid #10b981" : "1px solid #f59e0b"),
                    ),
                    child: Text(
                      isPaid ? "PAID" : "PENDING",
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: isPaid ? VendrTheme.primaryEmerald : Colors.amber.shade900,
                      ),
                    ),
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
