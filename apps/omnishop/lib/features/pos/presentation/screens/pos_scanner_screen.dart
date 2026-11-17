import 'package:flutter/material.dart';
import '../../../../core/theme/vendr_theme.dart';

class PosScannerScreen extends StatefulWidget {
  const PosScannerScreen({super.key});

  @override
  State<PosScannerScreen> createState() => _PosScannerScreenState();
}

class _PosScannerScreenState extends State<PosScannerScreen> {
  final List<Map<String, dynamic>> _scannedCart = [];
  final TextEditingmanualBarcodeController = TextEditingController();

  final Map<String, Map<String, dynamic>> _barcodeDb = {
    "APX-TEE-SLT-M": {
      "title": "Heavyweight Boxy Tee (M)",
      "price": 58.00,
      "sku": "APX-TEE-SLT-M",
      "stock": 62,
    },
    "APX-OVS-CHR-L": {
      "title": "Architect Overshirt (L)",
      "price": 185.00,
      "sku": "APX-OVS-CHR-L",
      "stock": 24,
    },
    "APX-DNM-IND-32": {
      "title": "14oz Selvedge Denim (32)",
      "price": 210.00,
      "sku": "APX-DNM-IND-32",
      "stock": 28,
    },
  };

  void _scanBarcode(String code) {
    final item = _barcodeDb[code];
    if (item != null) {
      setState(() {
        _scannedCart.add(item);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Scanned: ${item["title"]} • \$${item["price"]}"),
          duration: const Duration(seconds: 1),
          backgroundColor: VendrTheme.primaryEmerald,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("SKU '$code' not found in store catalog"),
          backgroundColor: VendrTheme.statusCritical,
        ),
      );
    }
  }

  double get _cartTotal =>
      _scannedCart.fold(0.0, (acc, item) => acc + (item["price"] as double));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Point of Sale (POS) Scanner"),
      ),
      body: Column(
        children: [
          // Simulated Camera Viewport / Barcode Viewfinder
          Container(
            height: 180,
            width: double.infinity,
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: VendrTheme.primaryEmerald, width: 2),
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                const Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.qr_code_scanner, color: VendrTheme.primaryEmerald, size: 48),
                    SizedBox(height: 8),
                    Text(
                      "Point Camera at SKU Barcode",
                      style: TextStyle(color: Colors.white70, fontSize: 12),
                    ),
                  ],
                ),
                // Red laser scanline
                Positioned(
                  top: 90,
                  left: 40,
                  right: 40,
                  child: Container(
                    height: 2,
                    decoration: BoxDecoration(
                      color: Colors.redAccent,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.red.withOpacity(0.8),
                          blurRadius: 8,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Quick Scan Bar
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: TextEditingmanualBarcodeController,
                    decoration: const InputDecoration(
                      hintText: "Enter SKU or scan (e.g. APX-TEE-SLT-M)",
                      isDense: true,
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (val) {
                      if (val.isNotEmpty) {
                        _scanBarcode(val.trim());
                        TextEditingmanualBarcodeController.clear();
                      }
                    },
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {
                    final val = TextEditingmanualBarcodeController.text.trim();
                    if (val.isNotEmpty) {
                      _scanBarcode(val);
                      TextEditingmanualBarcodeController.clear();
                    } else {
                      _scanBarcode("APX-TEE-SLT-M");
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: VendrTheme.primaryEmerald,
                    foregroundColor: Colors.white,
                  ),
                  child: const Text("Scan"),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Cart Items List
          Expanded(
            child: _scannedCart.isEmpty
              ? const Center(
                  child: Text(
                    "No items scanned yet.",
                    style: TextStyle(color: VendrTheme.textMutedLight, fontSize: 12),
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: _scannedCart.length,
                  itemBuilder: (context, idx) {
                    final item = _scannedCart[idx];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        dense: true,
                        title: Text(item["title"], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        subtitle: Text("SKU: ${item["sku"]}"),
                        trailing: Text(
                          "\$${item["price"].toStringAsFixed(2)}",
                          style: const TextStyle(fontWeight: FontWeight.bold, fontFamily: "monospace"),
                        ),
                      ),
                    );
                  },
                ),
          ),

          // Bottom POS Charge Bar
          if (_scannedCart.isNotEmpty)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border(top: BorderSide(color: Colors.grey.shade200)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text("Total (${_scannedCart.length} items)", style: const TextStyle(fontSize: 11, color: Colors.grey)),
                      Text(
                        "\$${_cartTotal.toStringAsFixed(2)}",
                        style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: "monospace"),
                      ),
                    ],
                  ),
                  ElevatedButton.icon(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (ctx) => AlertDialog(
                          title: const Text("POS Payment Complete"),
                          content: Text("Captured payment of \$${_cartTotal.toStringAsFixed(2)} via Cash / Tap-to-Pay."),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.pop(ctx);
                                setState(() => _scannedCart.clear());
                              },
                              child: const Text("Close"),
                            ),
                          ],
                        ),
                      );
                    },
                    icon: const Icon(Icons.point_of_sale),
                    label: const Text("Charge Customer"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: VendrTheme.primaryEmerald,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
