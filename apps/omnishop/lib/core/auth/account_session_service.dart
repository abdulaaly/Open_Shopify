import 'dart:async';

enum DevicePlatform { ios, android, windows, macos, linux }

class UserAccount {
  final String id;
  final String name;
  final String email;
  final String storeId;
  final String storeName;
  final String role;
  final String token;

  const UserAccount({
    required this.id,
    required this.name,
    required this.email,
    required this.storeId,
    required this.storeName,
    required this.role,
    required this.token,
  });
}

class ConnectedDevice {
  final String deviceId;
  final String name;
  final DevicePlatform platform;
  final String ipAddress;
  final DateTime lastSync;
  final bool isCurrent;
  final bool isOnline;

  const ConnectedDevice({
    required this.deviceId,
    required this.name,
    required this.platform,
    required this.ipAddress,
    required this.lastSync,
    this.isCurrent = false,
    this.isOnline = true,
  });

  String get platformName {
    switch (platform) {
      case DevicePlatform.ios:
        return "Apple iOS";
      case DevicePlatform.android:
        return "Google Android";
      case DevicePlatform.windows:
        return "Windows Desktop";
      case DevicePlatform.macos:
        return "macOS Desktop";
      case DevicePlatform.linux:
        return "Linux Terminal";
    }
  }
}

class AccountSessionService {
  static final AccountSessionService _instance = AccountSessionService._internal();
  factory AccountSessionService() => _instance;
  AccountSessionService._internal();

  final UserAccount _currentAccount = const UserAccount(
    id: "usr_elena_01",
    name: "Elena Rostova",
    email: "elena@apexretail.store",
    storeId: "store_apex_flagship",
    storeName: "Apex Retail Flagship",
    role: "Store Owner & Merchant Admin",
    token: "jwt_token_openshopify_884920",
  );

  final List<ConnectedDevice> _devices = [
    ConnectedDevice(
      deviceId: "dev_ios_15pro",
      name: "iPhone 15 Pro Max (Elena's Mobile)",
      platform: DevicePlatform.ios,
      ipAddress: "192.168.1.104",
      lastSync: DateTime.now().subtract(const Duration(seconds: 14)),
      isCurrent: true,
      isOnline: true,
    ),
    ConnectedDevice(
      deviceId: "dev_android_scanner",
      name: "Pixel 8 POS Scanner (Warehouse floor)",
      platform: DevicePlatform.android,
      ipAddress: "192.168.1.118",
      lastSync: DateTime.now().subtract(const Duration(seconds: 42)),
      isCurrent: false,
      isOnline: true,
    ),
    ConnectedDevice(
      deviceId: "dev_win_pos01",
      name: "Windows Desktop POS Terminal #01",
      platform: DevicePlatform.windows,
      ipAddress: "192.168.1.201",
      lastSync: DateTime.now().subtract(const Duration(seconds: 5)),
      isCurrent: false,
      isOnline: true,
    ),
    ConnectedDevice(
      deviceId: "dev_mac_office",
      name: "MacBook Pro M3 Max (Back Office)",
      platform: DevicePlatform.macos,
      ipAddress: "192.168.1.55",
      lastSync: DateTime.now().subtract(const Duration(minutes: 2)),
      isCurrent: false,
      isOnline: true,
    ),
    ConnectedDevice(
      deviceId: "dev_linux_edge",
      name: "Linux Edge Server (K8s Ingress)",
      platform: DevicePlatform.linux,
      ipAddress: "10.0.0.12",
      lastSync: DateTime.now().subtract(const Duration(seconds: 1)),
      isCurrent: false,
      isOnline: true,
    ),
  ];

  UserAccount get currentAccount => _currentAccount;
  List<ConnectedDevice> get connectedDevices => List.unmodifiable(_devices);

  Future<void> syncAllDevices() async {
    await Future.delayed(const Duration(milliseconds: 300));
  }
}
