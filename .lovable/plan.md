
# MyGarden — Full Frontend Build

A complete, mock-data frontend for an agricultural plot rental platform in Moldova, styled like a vintage botanical journal: cream paper, olive line-art, script titles, scalloped frames.

## Visual identity

**Colors** (HSL tokens in `index.css`)
- `background` cream `#F5EDD8`
- `primary` olive `#6B8E4E`
- `foreground` forest `#3F5A2E`
- `accent` pale sage `#C8D4A8`
- `muted` muted brown `#8B6F47`
- White reserved for inputs and contrast cards

**Typography** (Google Fonts)
- Script (hero / section titles): **Caveat Brush**
- Rounded subheads: **Quicksand**
- Body: **Inter**

**Decorative system**
- Cropped PNG/SVG assets from your 9 uploaded mood-board images (vegetables, tools, bouquets, wreaths, bows, scalloped frames). Stored in `src/assets/illustrations/` and imported as ES modules.
- Reusable React components: `ScallopedFrame`, `WavyDivider`, `BotanicalWreath`, `BowRibbon`, `HandDrawnButton`, `VeggieIcon`.
- Cards: 14px radius, soft shadow, optional faint paper-grain SVG overlay on body.
- Hover: `scale-[1.02]` + small bow fade-in via Tailwind transition.
- Active nav link: wavy SVG underline in olive.

## Pages

```text
/                  Landing
/lands             Lands grid + Leaflet map toggle
/lands/:id         Land detail + plot picker
/reserve/:id       3-step reservation wizard
/dashboard         Client dashboard (My Plot, services, timeline)
/farmer            Farmer dashboard (stats, tasks, calendar, lands)
/login  /register  Auth (mock)
/marketplace       Products + categories + cart
```

1. **Landing** — Hero with "MyGarden" in Caveat Brush inside scalloped oval frame surrounded by scattered veg/tool illustrations; CTA "Găsește lotul tău"; 3-step "Cum funcționează" in framed cards; 3 featured land cards; testimonials inside wavy ovals; cream footer with wreath + bow.
2. **Lands** — Left filter sidebar (region, price, plot size) as small framed cards; right grid of land cards (photo in scalloped frame, name in script, pin icon location, price, "Loturi disponibile: 8/15"); toggle Grid / Hartă (Leaflet with Moldova-centered pins).
3. **Land detail** — Gallery in scalloped frame, info column with botanical decoration, plot picker grid (L1…Ln squares: olive=available, brown faded=reserved, selected=bow ribbon), big "Rezervă acest lot" CTA.
4. **Reservation wizard** — 3 connected step circles with veg icons. Step 1 confirm plot, Step 2 culture grid with drag-to-allocate area on a mini plot canvas, Step 3 services (irrigare, săpat, plantare) + scalloped order summary + mock checkout.
5. **Client dashboard** — Sidebar with hand-drawn icons; "Lotul meu" page with 5-stage timeline (seed → sprout → plant → fruit → basket); planted-cultures cards; active services list with olive status badges.
6. **Farmer dashboard** — Stats cards decorated with veg illustrations; "Sarcini astăzi" checklist with tool icons; calendar view with botanical edge decoration; land management table.
7. **Auth** — Centered card with scalloped olive border, watering-can illustration, script "MyGarden" title, rounded inputs, olive submit with leaf icon. Mock login stores a fake user in localStorage.
8. **Marketplace** — Category pills with veg icons (Răsaduri, Semințe, Unelte, Îngrășăminte), product cards in hand-drawn frames, basket icon in navbar with item counter, mock cart in local state.

## Navigation & shell

- Top navbar: cream, "MyGarden" script logo left, Quicksand menu items, avatar dropdown with botanical decoration on the right.
- Mobile: hamburger opens a sheet drawer styled with the same scalloped border.
- All routes wrapped by a layout that includes the navbar + footer; dashboards use shadcn `Sidebar` with custom theming.

## Interactions & micro-states

- Buttons: subtle press (`active:scale-95`).
- Form errors: small hand-drawn warning illustration + olive helper text.
- Success toasts (Sonner) restyled cream + bow icon.
- Empty states: "Încă nu ai rezervări" with sleeping watering can.
- Loading: rotating watering can SVG.

## Content & tone

All copy in Romanian, warm and journal-like ("Bine ai venit în grădina ta", "Hai să alegem ce plantăm", "Mulțumim, lotul tău te așteaptă").

## Technical notes

- React + Vite + Tailwind, design tokens in `index.css`, semantic Tailwind classes only.
- Mock data in `src/mocks/` (lands, plots, cultures, services, products, tasks, user).
- Mock auth via a tiny `useAuth` hook backed by localStorage; route guards redirect unauthenticated users from `/dashboard` and `/farmer`.
- Wizard state held in a `ReservationContext`.
- Map: `react-leaflet` + `leaflet`, bounded to Moldova, custom olive teardrop pin SVG.
- Illustration assets cropped from your 9 uploads and saved into `src/assets/illustrations/` (vegetables, tools, frames, wreath, bow, thank-you scallop). Imported per-component for tree-shaking.
- Fully responsive (mobile-first), keyboard-accessible focus rings tinted olive, AA contrast on all text.
- No backend, no Supabase — pure client state as you requested.

## Out of scope (can add later)

- Real auth / database / payments
- Image uploads by users
- Real farmer ↔ client messaging
- i18n switcher (site is Romanian-only for now)
