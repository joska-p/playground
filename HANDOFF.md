# HANDOFF — UI Refonte

Template source: `drafts/ui-design/HANDOFF-template.md`. Report reference: `drafts/ui-design/ui-library-usage-report.md`.

## Phase 1 — Purge, Fixes & Handoff Setup

### Build status

- `pnpm check-types` → **29/29 tasks OK** (incl. `astro check` 0 errors).
- Lint (`@repo/ui`, `@repo/storybook`, `@repo/playground`) → clean.
- No test broken, no `TODO(refactor-ui)` bypass needed.

### Tasks accomplished

1. **Purged dead-weight components/hooks** from `packages/ui` (no importers outside storybook), with their stories and exports:

   - `data-entry`: `HelperText`, `Radio`
   - `data-display`: `Carousel`/`CarouselSlide`, `ChangelogItem`, `MenuItem`, `Popover`
   - `feedback`: `Alert`, `Dialog` (+Actions/Body/Description/Footer/Title), `ToastProvider`/`ToastViewport`/`useToast`
   - `widgets`: `EdgeFieldCanvas`, `EdgeFieldMask`, `EdgeFieldSvg` (+ orphaned edge-field images)
   - `cards`: `CategoryCard`, `ProjectCard`
   - hooks: `useToastQueue`, `useFloatingNavState`, `useTabsState` (orphans — unused even by their components)
   - stories: `HelperText`, `Radio`, `Carousel`, `ChangelogItem`, `MenuItem`, `Popover`, `Alert`, `Dialog`, `Toast`, `CategoryCard`, `ProjectCard`
   - removed `./dialog` deep export from `packages/ui/package.json`

2. **Fixed turbo template** `turbo/generators/templates/new-package/src/components/Demo.tsx`: `Card` now from `@repo/ui/data-display`, `CardDescription`/`CardTitle` from `@repo/ui/cards`, `CardFooter` removed (kept the Reset button).

3. **Fixed `NavLinks.astro`**: `--primar` → `--primary`; `hover:text--glow-color)` → `hover:text-[var(--glow-color)]`.

4. **Fixed `Switch.tsx`**: knob spinner `text-white` → `text-primary-foreground`.

### Architecture learnings (important for Phase 2)

- The usage report counts consumers **outside** `packages/ui` only. It missed that the lib's **own Atlas showcase** (`packages/ui/src/atlas`, live at `/discoveries/ui` via `@repo/ui/ui`) uses several "dead weight" components. Per user decision (same rule as Sidebar: *keep anything with real usage*), these are **KEPT**:
  - `FloatingNav` → `atlas/AtlasNav.tsx`
  - `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger` → `atlas/CartographerStats.tsx`
  - `NotificationItem` → `atlas/AtlasFooter.tsx`
  - `SvgExportPanel`, `EdgeFieldOriginal` → `atlas/index.tsx`
  - `DefaultFallback` → `ErrorBoundary.tsx`; `CardBody`, `CardLink` → `DocCard.tsx`; `CardDescription`, `CardTitle` → turbo template
  - `Sidebar` (+ `Sidebar.Main/Panel/Toggle`) → `graph-viz`, `palette-generator`, `pixel` (user confirmed KEEP)
  - `Spinner` → internal use in `Switch.tsx` (kept in `widgets/index.ts`)
- `packages/ui` has **no root `index.ts`** — every consumer imports a deep-path submodule mapped in `package.json` `exports`.
- Edge-field images (`edge-field.png/webp`, `edge-field-mask.webp`) were only used by the deleted components.

### Tests / code temporarily bypassed

- None.

## Next session — Phase 2: Migrate off-theme Tailwind colors to OKLCH tokens

Reference: report §3 (67 off-token Tailwind classes + 33 hardcoded hex/oklch). Theme tokens: `gruvbox` (Tailwind v4): semantic (`background`, `surface`, `surface-raised`, `foreground*`, `border`, `primary*`, `secondary*`, `destructive*`, `accent*`, `warning*`), palette (`red`, `green`, `yellow`, `blue`, `purple`, `aqua`, `orange`), `tags-*`, fonts `sans`/`mono`.

1. **Hotspots first**: `packages/art-canvas/src/modules/atlas/controls/AtlasControls.tsx` (slate/teal), `apps/playground/src/layouts/nav-bar/NavLogo.astro` (oklch literals duplicating `--surface-raised`/`--glow-color`), `packages/radu-machine-learning/src/components/chart/Xaxis.tsx` + `Yaxis.tsx` (gray), `ChannelTabs.tsx` in `randomart` + `randomart-next` (amber-500/blue-400), `ValueCanvasCPU/GPU.tsx` (red/black overlays).
2. **Promote a "glow" utility** for the ~20 `var(--glow-color)` arbitrary classes in the nav (`NavLinks`, `NavLogo`, `NavActions`, `MobileMenu`, `NavBar`) + `SciFiCard.tsx` (`drop-shadow-[0_0_6px_var(--variant-color)]`) — e.g. `--shadow-glow` / `--glow-border` theme tokens.
3. White/black: `bg-black/70` overlays (canvas/lightbox) and `text-white` canvas views are intentional; consider an `overlay`/`on-canvas` token.
4. `SvgExportPanel.tsx` hardcoded hex (#fff/#555/…) is SVG export output — document, don't tokenize.

### Notes

- Re-check storybook stories when migrating classes: stories render components, keep them token-consistent.
- If Phase 2 decides the Atlas showcase itself is to be redesigned/replaced, purge the kept showcase-only components (`FloatingNav`, `Tabs`, `NotificationItem`, `SvgExportPanel`, `EdgeFieldOriginal`) together with `packages/ui/src/atlas`.
