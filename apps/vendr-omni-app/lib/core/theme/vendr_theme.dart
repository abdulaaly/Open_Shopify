import 'package:flutter/material.dart';

class VendrTheme {
  // Brand Accents
  static const Color primaryEmerald = Color(0xFF059669);
  static const Color primaryEmeraldLight = Color(0xFF10B981);
  static const Color primaryEmeraldBg = Color(0xFFECFDF5);

  // Surfaces & Neutral Scale
  static const Color surfaceCanvasLight = Color(0xFFF8FAFC);
  static const Color surfaceCardLight = Color(0xFFFFFFFF);
  static const Color borderSubtleLight = Color(0xFFE2E8F0);
  static const Color textMainLight = Color(0xFF0F172A);
  static const Color textMutedLight = Color(0xFF64748B);

  static const Color surfaceCanvasDark = Color(0xFF090D16);
  static const Color surfaceCardDark = Color(0xFF111726);
  static const Color borderSubtleDark = Color(0xFF1E293B);
  static const Color textMainDark = Color(0xFFF8FAFC);
  static const Color textMutedDark = Color(0xFF94A3B8);

  // Semantic Status Tones
  static const Color statusSuccess = Color(0xFF16A34A);
  static const Color statusWarning = Color(0xFFD97706);
  static const Color statusCritical = Color(0xFFDC2626);
  static const Color statusInfo = Color(0xFF0284C7);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: primaryEmerald,
      scaffoldBackgroundColor: surfaceCanvasLight,
      colorScheme: const ColorScheme.light(
        primary: primaryEmerald,
        surface: surfaceCardLight,
        onSurface: textMainLight,
        outline: borderSubtleLight,
      ),
      cardTheme: CardTheme(
        color: surfaceCardLight,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: borderSubtleLight, width: 1),
          borderRadius: BorderRadius.circular(10),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: surfaceCardLight,
        elevation: 0,
        scrolledUnderElevation: 0,
        titleTextStyle: TextStyle(
          color: textMainLight,
          fontSize: 16,
          fontWeight: FontWeight.w640,
          letterSpacing: -0.2,
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: primaryEmeraldLight,
      scaffoldBackgroundColor: surfaceCanvasDark,
      colorScheme: const ColorScheme.dark(
        primary: primaryEmeraldLight,
        surface: surfaceCardDark,
        onSurface: textMainDark,
        outline: borderSubtleDark,
      ),
      cardTheme: CardTheme(
        color: surfaceCardDark,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: borderSubtleDark, width: 1),
          borderRadius: BorderRadius.circular(10),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: surfaceCardDark,
        elevation: 0,
        scrolledUnderElevation: 0,
        titleTextStyle: TextStyle(
          color: textMainDark,
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: -0.2,
        ),
      ),
    );
  }
}
