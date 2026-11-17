import React from "react";
import "./globals.css";

export const metadata = {
  title: "VENDR Visual Storefront Customizer (Online Store 2.0)",
  description: "Live Split-Screen Theme Customizer with Drag-and-Drop Sections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-slate-100 flex flex-col">{children}</body>
    </html>
  );
}
