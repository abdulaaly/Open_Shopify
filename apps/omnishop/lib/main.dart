import 'package:flutter/material.dart';
import 'core/theme/vendr_theme.dart';
import 'features/dashboard/presentation/screens/dashboard_screen.dart';
import 'features/pos/presentation/screens/pos_scanner_screen.dart';
import 'features/account/presentation/screens/connected_devices_screen.dart';
import 'features/copilot/presentation/screens/copilot_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const OmniShopApp());
}

class OmniShopApp extends StatelessWidget {
  const OmniShopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "OmniShop — Open Shopify",
      debugShowCheckedModeBanner: false,
      theme: VendrTheme.lightTheme,
      darkTheme: VendrTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    DashboardScreen(),
    PosScannerScreen(),
    ConnectedDevicesScreen(),
    CopilotScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        indicatorColor: VendrTheme.primaryEmeraldBg,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon: Icon(Icons.dashboard, color: VendrTheme.primaryEmerald),
            label: "Store Pulse",
          ),
          NavigationDestination(
            icon: Icon(Icons.qr_code_scanner_outlined),
            selectedIcon: Icon(Icons.qr_code_scanner, color: VendrTheme.primaryEmerald),
            label: "POS Scanner",
          ),
          NavigationDestination(
            icon: Icon(Icons.hub_outlined),
            selectedIcon: Icon(Icons.hub, color: Color(0xFF10B981)),
            label: "Devices & Sync",
          ),
          NavigationDestination(
            icon: Icon(Icons.auto_awesome_outlined),
            selectedIcon: Icon(Icons.auto_awesome, color: Colors.purpleAccent),
            label: "AI Copilot",
          ),
        ],
      ),
    );
  }
}
