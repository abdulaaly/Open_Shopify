import 'package:flutter_test/flutter_test.dart';
import 'package:omnishop/main.dart';

void main() {
  testWidgets('OmniShop Open Shopify initial smoke test and cross-platform navigation', (WidgetTester tester) async {
    await tester.pumpWidget(const OmniShopApp());
    await tester.pumpAndSettle();

    // Verify Title and Navigation Bar exist
    expect(find.text("Apex Apparel Pulse"), findsOneWidget);
    expect(find.text("Store Pulse"), findsOneWidget);
    expect(find.text("POS Scanner"), findsOneWidget);
    expect(find.text("Devices & Sync"), findsOneWidget);
    expect(find.text("AI Copilot"), findsOneWidget);
  });
}
