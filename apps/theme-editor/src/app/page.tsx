"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Undo2,
  Redo2,
  Layers,
  ChevronRight,
  GripVertical,
  Plus,
  Eye,
  Settings2,
} from "lucide-react";

interface SectionConfig {
  id: string;
  name: string;
  type: string;
  settings: Record<string, string | number>;
}

const defaultSections: SectionConfig[] = [
  {
    id: "sec_announcement",
    name: "Announcement Bar",
    type: "announcement-bar",
    settings: {
      message: "Free global shipping on all orders over $100",
      backgroundColor: "#064e3b",
    },
  },
  {
    id: "sec_hero",
    name: "Hero Banner",
    type: "hero-banner",
    settings: {
      heading: "Architectural Uniforms for Modern Pioneers.",
      subheading: "Constructed with heavyweight custom yarns and Japanese artisanal weaves.",
      buttonLabel: "Explore Collection",
      tag: "FALL / WINTER 2026",
    },
  },
  {
    id: "sec_values",
    name: "Value Propositions",
    type: "value-props",
    settings: {
      columns: 3,
    },
  },
  {
    id: "sec_featured",
    name: "Curated Releases",
    type: "featured-collection",
    settings: {
      title: "Curated Releases",
      collection: "all",
      maxProducts: 3,
    },
  },
  {
    id: "sec_footer",
    name: "Footer",
    type: "footer",
    settings: {
      copyright: "© 2026 Apex Apparel Co. Powered by VENDR.",
    },
  },
];

export default function ThemeEditorPage() {
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec_hero");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isDirty, setIsDirty] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home page (index.json)");

  const activeSection = sections.find((s) => s.id === activeSectionId);

  const handleSettingChange = (key: string, value: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSectionId
          ? { ...s, settings: { ...s.settings, [key]: value } }
          : s
      )
    );
    setIsDirty(true);
  };

  const handleSave = () => {
    setIsDirty(false);
    alert("Theme configuration saved directly to templates/index.json!");
  };

  const viewportWidths = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900 select-none">
      {/* Top Action Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between shrink-0 text-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-semibold text-xs text-white">
            <span className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center font-bold text-xs">
              V
            </span>
            <span>VENDR Theme Customizer</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Page Dropdown */}
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="h-8 px-2.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option>Home page (index.json)</option>
            <option>Product page (product.json)</option>
            <option>Collection page (collection.json)</option>
            <option>Cart page (cart.json)</option>
          </select>
        </div>

        {/* Center: Viewport Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-1.5 rounded ${
              viewport === "desktop"
                ? "bg-slate-800 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Desktop view (100%)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-1.5 rounded ${
              viewport === "tablet"
                ? "bg-slate-800 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Tablet view (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-1.5 rounded ${
              viewport === "mobile"
                ? "bg-slate-800 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Mobile view (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right: History & Save Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-slate-400">
            <button className="p-1.5 hover:text-slate-200" title="Undo">
              <Undo2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:text-slate-200" title="Redo">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`h-8 px-4 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isDirty
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Main Split-Screen Work Area */}
      <div className="flex flex-1 min-h-0">
        {/* Left Drawer: Section Tree & Settings (80 w) */}
        <aside className="w-80 border-r border-slate-800 bg-slate-950 flex flex-col shrink-0">
          {/* Header */}
          <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Page Sections</span>
            </div>
            <button
              onClick={() => alert("Add section picker.")}
              className="p-1 text-slate-400 hover:text-slate-100 rounded"
              title="Add section"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Sections Tree */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 border-b border-slate-800">
            {sections.map((sec) => {
              const isActive = sec.id === activeSectionId;
              return (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex items-center justify-between p-2 rounded text-xs cursor-pointer transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white font-medium border border-slate-700"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-3.5 h-3.5 text-slate-600" />
                    <span>{sec.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </div>
              );
            })}
          </div>

          {/* Settings Inspector Panel */}
          {activeSection && (
            <div className="p-4 bg-slate-900 space-y-4 overflow-y-auto max-h-72">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 border-b border-slate-800 pb-2">
                <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeSection.name} Settings</span>
              </div>

              {Object.entries(activeSection.settings).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400 capitalize block">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    value={value as string}
                    onChange={(e) => handleSettingChange(key, e.target.value)}
                    className="w-full h-7 px-2 text-xs bg-slate-950 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Canvas: Viewport Preview */}
        <main className="flex-1 bg-slate-900/60 p-6 flex items-center justify-center overflow-auto">
          <div
            className={`h-full transition-all duration-300 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col ${viewportWidths[viewport]}`}
          >
            {/* Browser preview chrome */}
            <div className="h-7 bg-slate-100 border-b border-slate-200 px-3 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                https://apex-apparel.vendr.local/preview
              </span>
              <Eye className="w-3.5 h-3.5 opacity-60" />
            </div>

            {/* Interactive Storefront Preview Frame */}
            <iframe
              src="http://localhost:3000"
              className="w-full flex-1 border-0"
              title="Storefront Live Preview"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
