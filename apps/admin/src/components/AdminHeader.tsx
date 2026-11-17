"use client";

import React from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import { Button } from "@vendr/ui";

export const AdminHeader: React.FC = () => {
  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Global Search & Command Palette */}
      <div className="flex items-center gap-2 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="w-full h-8 pl-9 pr-14 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1 rounded text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          className="relative p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1" />
        </button>

        <Button
          size="sm"
          variant="secondary"
          className="text-xs h-8 gap-1.5"
          onClick={() => alert("VENDR AI Copilot initialized. What would you like to update?")}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>AI Copilot</span>
        </Button>
      </div>
    </header>
  );
};
