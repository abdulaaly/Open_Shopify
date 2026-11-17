# VENDR Design System & Brand Constitution

## 1. Brand Identity & Visual Philosophy
**VENDR** is the Sovereign Enterprise Commerce Engine. The design aesthetic is founded on **Precision Engineering & Swiss Editorial Craft**:
- **Zero AI Slop:** No generic gradients, no cartoonish illustrations, no wasted whitespace.
- **Razor-Sharp Merchant Ergonomics:** Extreme information density without visual clutter, inspired by Shopify Polaris and Bloomberg Terminal speed, elevated to Awwwards Site-of-the-Day polish.
- **Tactile Feedback & Micro-Interactions:** Subtle state indicators, instantaneous optimistic UI updates, and organic spring motion.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Surfaces & Canvas
| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| `surface-canvas` | `#F8FAFC` (Slate 50) | `#090D16` (Deep Obsidian) | Application viewport background |
| `surface-card` | `#FFFFFF` (Pure White) | `#111726` (Midnight Card) | Primary content containers, cards |
| `surface-elevated`| `#FFFFFF` | `#1A2234` | Modals, Popovers, Flyout Drawers |
| `surface-subtle` | `#F1F5F9` (Slate 100) | `#172033` | Table headers, secondary card areas |
| `surface-hover` | `#E2E8F0` (Slate 200) | `#1E293B` | Interactive row and button hovers |

### 2.2 Borders & Dividers
| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| `border-subtle` | `#E2E8F0` (Slate 200) | `#1E293B` (Slate 800) | Card borders, table dividers |
| `border-strong` | `#CBD5E1` (Slate 300) | `#334155` (Slate 700) | Form input outlines, active tabs |
| `border-focus` | `#059669` (Emerald 600) | `#10B981` (Emerald 500) | Keyboard focus ring (offset 2px) |

### 2.3 Brand Accents & State Colors
| Semantic Role | Primary Hex | Dark Variant | Badges / Background |
| :--- | :--- | :--- | :--- |
| **Primary Brand (Emerald)** | `#059669` | `#10B981` | `#ECFDF5` (Emerald 50) / `#064E3B` |
| **Information (Sky)** | `#0284C7` | `#38BDF8` | `#F0F9FF` (Sky 50) / `#082F49` |
| **Success (Green)** | `#16A34A` | `#22C55E` | `#F0FDF4` (Green 50) / `#14532D` |
| **Warning (Amber)** | `#D97706` | `#F59E0B` | `#FFFBEB` (Amber 50) / `#78350F` |
| **Critical / Destructive** | `#DC2626` | `#EF4444` | `#FEF2F2` (Red 50) / `#7F1D1D` |

---

## 3. Typography & Scale
Font Family:
- **Primary Interface:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Monospace & Financials:** `JetBrains Mono`, `ui-monospace`, `monospace` (Tabular numbers enabled `font-feature-settings: 'tnum' 1`)

| Style Name | Size | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| `display-lg` | 32px (2rem) | 700 Bold | 1.2 | -0.025em |
| `heading-lg` | 24px (1.5rem) | 600 SemiBold | 1.3 | -0.02em |
| `heading-md` | 18px (1.125rem) | 600 SemiBold | 1.4 | -0.015em |
| `heading-sm` | 14px (0.875rem) | 600 SemiBold | 1.4 | -0.01em |
| `body-md` | 14px (0.875rem) | 400 Regular | 1.5 | normal |
| `body-sm` | 13px (0.8125rem) | 400 Regular | 1.45 | normal |
| `caption` | 11px (0.6875rem) | 500 Medium | 1.4 | +0.01em |
| `badge` | 11px (0.6875rem) | 600 SemiBold | 1.0 | +0.02em |

---

## 4. Spatial Grid & Geometry
- **Base Grid:** 4px baseline (`p-1` = 4px, `p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-6` = 24px).
- **Corner Radii:**
  - Badges & Buttons: `rounded-md` (6px)
  - Cards & Containers: `rounded-lg` (8px)
  - Modals & Drawers: `rounded-xl` (12px)
  - Search & Inputs: `rounded-md` (6px)
- **Shadows & Depth:**
  - `shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)` (cards, buttons)
  - `shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)` (dropdowns, flyouts)
  - `shadow-xl`: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` (modals)

---

## 5. Micro-Interactions & Spring Physics
All UI transitions follow physics-based spring curves:
- **Hover/Tap Transitions:** Duration `150ms`, Easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Framer Motion Preset (Drawer & Modal Entrance):**
  ```typescript
  export const springTransition = {
    type: "spring",
    stiffness: 380,
    damping: 30,
    mass: 0.8
  };
  ```
- **Cart Slide-out Drawer:** Enters from `translateX(100%)` to `0` with backdrop blur (`backdrop-blur-sm bg-black/40`).

---

## 6. Core Component Patterns

### 6.1 Merchant Header & Global Navigation
- Fixed Top Bar: Search input (`Cmd+K` trigger), store switcher dropdown, notifications bell with unread badge, merchant avatar.
- Collapsible Left Sidebar: Primary navigation links (Home, Orders, Products, Customers, Analytics, Discounts, Online Store, Settings).

### 6.2 Data Tables (`IndexTable`)
- Bulk select checkbox row with floating action menu on selection.
- Column headers with sorting arrows and hover filters.
- Truncated cells with tooltip previews.
- Paginated footer with items-per-page selector.

### 6.3 Storefront Checkout & Cart Drawer
- 2-Column Desktop Layout: Left column for buyer steps (Email, Shipping Address, Delivery Method, Payment), right sticky column for order summary and live discount application.
- Mobile Layout: Collapsible order summary at top, single flowing accordion checkout below.
