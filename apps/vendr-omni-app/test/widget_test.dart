import 'package:flutter_test/flutter_test.dart';
import 'package:vendr_omni_app/main.dart';

void main() {
  testWidgets('VENDR Omni App initial smoke test and navigation verification', (WidgetTester tester) async {
    await tester.pumpWidget(const VendrOmniApp());
    await tester.pumpAndSettle();

    // Verify Title and Navigation Bar exist
    expect(find.text("Apex Apparel Pulse"), findsOneWidget);
    expect(find.text("Store Pulse"), findsOneWidget);
    expect(find.text("POS Scanner"), findsOneWidget);
    expect(find.text("AI Copilot"), findsOneWidget);
  });
}
