# Design System Specification: WebStore PPOB & Digital Goods

## 1. Brand Identity & Visual Philosophy
- **Identity**: Professional Indonesian PPOB (Payment Point Online Bank) and Game Voucher platform.
- **Visual Stance**: Bank-Grade Reliability, Executive Precision, Ultra-Clear Information Hierarchy.
- **Design Mode**: **Operate & Transact** — optimized for high task-completion velocity, zero ambiguity in pricing/fees, and rock-solid transaction integrity.
- **Anti-Patterns Avoided**: 
  - No purple/neon AI slop or unnecessary glassmorphism blur that hinders legibility.
  - No raw emojis as UI icons (strictly standardized Lucide SVG icons).
  - No unformatted currencies or hidden admin fees.
  - No fake success states without verifiable invoice data.

## 2. Color System & Semantic Tokens
- **Surface & Backgrounds**:
  - `bg-canvas`: `#F8FAFC` (Slate 50) — soft, glare-free neutral background.
  - `bg-surface`: `#FFFFFF` — crisp white card containers with sharp legibility.
  - `bg-surface-subtle`: `#F1F5F9` (Slate 100) — input backgrounds, pill containers, table stripes.
  - `bg-dark-surface`: `#0F172A` (Slate 900) to `#0B132B` — high-contrast dark accents for trust banners and footer.
- **Primary / Brand Action**:
  - `brand-primary`: `#2563EB` (Blue 600) / Active `#1D4ED8` (Blue 700) / Focus ring `#93C5FD` (Blue 300).
  - High-contrast text on white: `#1E3A8A` / `#0F172A`.
- **Status & Feedback**:
  - `success`: `#059669` (Emerald 600) — verified status, lunas stamp, instant badges.
  - `warning`: `#D97706` (Amber 600) — payment countdown timer, pending status.
  - `danger`: `#DC2626` (Red 600) — expired order, validation error, cancel.
  - `info`: `#0284C7` (Sky 600) — guide tooltips, provider details.
- **Borders & Dividers**:
  - `border-subtle`: `#E2E8F0` (Slate 200) — clean card borders.
  - `border-active`: `#2563EB` (Blue 600) — selected denomination/method with 2px ring.

## 3. Typography & Numerical Formatting
- **Font Family**: Plus Jakarta Sans (`'Plus Jakarta Sans', sans-serif`).
- **Tabular / Monospace**: `ui-monospace, monospace` for:
  - Currency amounts: `Rp 20.000`
  - Invoices: `INV-20261024-XXXXX`
  - Serial Numbers: `SN20261024XXXXXXXX`
  - Phone numbers & Player IDs.
- **Hierarchy**:
  - Page Titles: 24px - 32px (`text-2xl` - `text-3xl`), font-extrabold (`font-extrabold`).
  - Section Headings: 18px - 20px (`text-lg` - `text-xl`), font-bold.
  - Card & Item Titles: 14px - 16px (`text-sm` - `text-base`), font-bold.
  - Body / Subtitles: 13px - 14px (`text-xs` - `text-sm`), font-normal / medium.
  - Captions & Microcopy: 11px - 12px (`text-[11px]` - `text-xs`), font-semibold.

## 4. Layout Architecture & Responsive Breakpoints
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Purchase Page**:
  - Desktop (≥1024px): 2-Column layout. Left column (7 cols) for interactive steps (1-5), Right column (5 cols) for sticky live checkout summary card.
  - Mobile (<1024px): Sequential vertical flow with a sticky bottom bar displaying total price + "Beli Sekarang" CTA.
- **Receipt & Verification**:
  - Single centered container (`max-w-3xl`) with high printability (`@media print` clean invoice format).

## 5. Security & Form Integrity (OWASP / PPOB Standard)
- All user inputs sanitized to eliminate script injection / HTML markup.
- Strict input masks (Numeric for User ID, Zone ID, Phone, E-Wallet account; Alphanumeric for Riot ID & Promo).
- No speculative transaction commits.
- Full receipt persistence into `webstore_order_history` with duplicate check.
