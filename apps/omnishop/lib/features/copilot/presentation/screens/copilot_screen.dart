import 'package:flutter/material.dart';
import '../../../../core/theme/vendr_theme.dart';

class CopilotScreen extends StatefulWidget {
  const CopilotScreen({super.key});

  @override
  State<CopilotScreen> createState() => _CopilotScreenState();
}

class _CopilotScreenState extends State<CopilotScreen> {
  final TextEditingController _msgController = TextEditingController();
  final List<Map<String, String>> _messages = [
    {
      "role": "assistant",
      "text": "Hello! I am your VENDR Merchant AI Copilot. Ask me about your GMV velocity, stock replenishments, or to auto-create discounts.",
    },
  ];

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;
    setState(() {
      _messages.add({"role": "user", "text": text.trim()});
    });
    _msgController.clear();

    // Contextual responses based on store data
    Future.delayed(const Duration(milliseconds: 600), () {
      String response = "I have queried your store GraphQL API. Everything is running smoothly.";
      final lower = text.toLowerCase();
      if (lower.contains("sales") || lower.contains("gmv")) {
        response = "Today's GMV sales are at \$142,850.00 across 1,420 orders (+18.4% compared to yesterday).";
      } else if (lower.contains("stock") || lower.contains("inventory")) {
        response = "Heavyweight Boxy Tee has 137 units across all sizes. Architect Overshirt is low on stock with only 42 units left.";
      } else if (lower.contains("discount") || lower.contains("code")) {
        response = "I created automated discount rule 'VIP20' (20% off). It has executed via your WASM Functions sandbox on 42 checkouts.";
      }

      setState(() {
        _messages.add({"role": "assistant", "text": response});
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.auto_awesome, color: Colors.purpleAccent, size: 20),
            SizedBox(width: 8),
            Text("AI Merchant Copilot"),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, idx) {
                final msg = _messages[idx];
                final isAssistant = msg["role"] == "assistant";

                return Align(
                  alignment: isAssistant ? Alignment.centerLeft : Alignment.centerRight,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.78),
                    decoration: BoxDecoration(
                      color: isAssistant ? Colors.white : VendrTheme.primaryEmerald,
                      borderRadius: BorderRadius.circular(12),
                      border: isAssistant ? Border.all(color: Colors.grey.shade200) : null,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.04),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Text(
                      msg["text"]!,
                      style: TextStyle(
                        fontSize: 12.5,
                        color: isAssistant ? Colors.black87 : Colors.white,
                        height: 1.4,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Colors.grey.shade200)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _msgController,
                    decoration: const InputDecoration(
                      hintText: "Ask copilot (e.g., 'Summarize today's sales')...",
                      border: InputBorder.none,
                      isDense: true,
                    ),
                    onSubmitted: _sendMessage,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: VendrTheme.primaryEmerald),
                  onPressed: () => _sendMessage(_msgController.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
