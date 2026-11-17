import React from "react";
import "./globals.css";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

export const metadata = {
  title: "VENDR Merchant Admin",
  description: "Open-Source Sovereign Commerce Engine Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 flex h-screen overflow-hidden text-slate-900 dark:text-slate-100">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <AdminHeader />
          <main className="p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
