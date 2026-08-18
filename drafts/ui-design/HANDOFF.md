# HANDOFF — UI Refonte

## Phase 1 — Purge, Fixes & Handoff Setup ✅ COMPLETED

### Architecture learnings

- `packages/ui` has **no root `index.ts`** — every consumer imports a deep-path submodule via `package.json` `exports`.
- The lib's own **Atlas showcase** (`packages/ui/src/atlas`) uses several "dead weight" components — these were **KEPT** per user decision: `FloatingNav`, `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger`, `NotificationItem`, `SvgExportPanel`, `EdgeFieldOriginal`, `DefaultFallback`, `CardBody`, `CardLink`, `CardDescription`, `CardTitle`, `Sidebar` (+subcomponents), `Spinner`.
- If the Atlas showcase is redesigned later, purge its showcase-only components together with `packages/ui/src/atlas`.

---

## Phase 2 — Migrate off-theme colors to OKLCH tokens ✅ COMPLETED

### Scope (strict)

- **In scope**: `packages/ui/` and `apps/playground/` only.
- **Out of scope**: All other packages (`glaze`, `pixel`, `randomart`, `sequence-renderer`, etc.), 3D defaults (`three-stage`), GLSL shaders, storybook demo data (ColorSwatch/ColorPalette), browser `<meta theme-color>`.

### Theme file — `gruvbox-theme.css` is the ONLY active theme

- **Active**: `packages/ui/src/styles/gruvbox-theme.css` (imported by 20+ packages via `@repo/ui/gruvbox-theme` export).
- **Dead artifacts (do not touch)**:
    - `gruvbox-theme-parametric.css` — zero imports, experimental calc()-based derivation.
    - `gruvbox-theme-original.css` — zero imports, earlier version with `@layer components`.
    - `gruvbox-theme-subdivided.css` — zero imports, experimental L/C/H channel split.
- `gruvbox-theme.css` already defines `--glow-color`, `--glow-strength-rest/hover`, `--overlay`, `--color-overlay`.

### Lot 1 — Glow consolidation (nav-bar) ✅ COMPLETED

Created Tailwind glow utilities in `gruvbox-theme.css` `@theme inline`: `shadow-glow-rest`, `shadow-glow-hover`, `shadow-glow-link`, `shadow-glow-btn`, `shadow-glow-logo`, `shadow-glow-logo-hover`, `shadow-glow-mobile`, `shadow-glow-active-link`. Added `--tw-shadow-color`, `--bg-glow-subtle`, and `@utility text-glow`. Rewrote all 5 nav components to use these utilities. Fixed 3 bugs (NavActions.astro lines 10/25, MobileMenu.astro line 38).

**Files modified**: `packages/ui/src/styles/gruvbox-theme.css`, `apps/playground/src/layouts/nav-bar/NavBar.astro`, `NavLogo.astro` (unchanged), `NavLinks.astro`, `NavActions.astro`, `MobileMenu.astro`.

### Lot 2 — `text-white` → tokens in `packages/pixel` ✅ COMPLETED

Replaced 8× `text-white` → `text-background` across SwaggerSidebar, PipelineView, ManipView. Fixed 7 malformed utility classes (`bg-accent)`, `border-l-accent)`, `border-b-accent)`) → correct Tailwind v4 syntax.

**Files modified**: `packages/pixel/src/components/SwaggerSidebar.tsx`, `packages/pixel/src/components/views/PipelineView.tsx`, `packages/pixel/src/components/views/ManipView.tsx`.

### Lot 3 — Tokens in `packages/ui` + storybook ✅ COMPLETED

Replaced 2× `hover:bg-white/5` → `hover:bg-surface-raised/50` in Sidebar.stories.tsx and Icon.stories.tsx. Replaced `bg-black` → `bg-background` in ImageToParticles.tsx.

**Files modified**: `apps/storybook/src/stories/widgets/Sidebar.stories.tsx`, `apps/storybook/src/stories/icons/Icon.stories.tsx`, `packages/image-to-particles/src/components/ImageToParticles.tsx`.

### Lot 4 — Shared particle palette + `ProjectsList` ✅ COMPLETED

Extracted duplicated 8-color particle palette from `EdgeFieldHero.astro` and `BackgroundCanvas.astro` into `apps/playground/src/utils/palettes.ts`. Extracted `CARD_COLORS` from `ProjectsList.astro` into the same shared file. Added OKLCH equivalents for both palettes. Canvas components receive palette via `define:vars` + `window.__PARTICLE_PALETTE` (inline scripts can't use ES imports).

**Files created**: `apps/playground/src/utils/palettes.ts`.
**Files modified**: `apps/playground/src/components/ui/features/EdgeFieldHero.astro`, `apps/playground/src/components/ui/features/BackgroundCanvas.astro`, `apps/playground/src/components/ProjectsList.astro`.

### Bugs discovered & fixed during Phase 2

| File               | Line | Bug                                                 | Fixed in |
| ------------------ | ---- | --------------------------------------------------- | -------- |
| `NavActions.astro` | 10   | `hover:text--glow-color)` — missing opening `[var(` | Lot 1    |
| `NavActions.astro` | 25   | Same malformation                                   | Lot 1    |
| `MobileMenu.astro` | 38   | Stray backtick + missing `[var(`                    | Lot 1    |
| `PipelineView.tsx` | 52   | `bg-accent)` — missing opening `(`                  | Lot 2    |
| `ManipView.tsx`    | 57   | `bg-accent)` — same malformation                    | Lot 2    |
| `PipelineView.tsx` | 105  | `border-l-accent)` — stray paren                    | Lot 2    |
| `PipelineView.tsx` | 123  | `border-b-accent)` — stray paren                    | Lot 2    |
| `ManipView.tsx`    | 65   | `border-l-accent)` — stray paren                    | Lot 2    |
| `ManipView.tsx`    | 78   | `border-b-accent)` — stray paren                    | Lot 2    |
| `ManipView.tsx`    | 94   | `border-b-accent)` — stray paren                    | Lot 2    |

### What is NOT migrated (by design)

| Category                          | Reason                                                |
| --------------------------------- | ----------------------------------------------------- |
| Hex in GLSL/shaders               | GPU-side, not CSS                                     |
| Hex in `three-stage` (3D lights)  | THREE.js defaults, user-controlled via leva           |
| Hex in storybook demo data        | Intentional palette showcase                          |
| `<meta theme-color>` hex          | Browser chrome, not rendering                         |
| Hex in `SvgExportPanel`           | SVG export output, not UI                             |
| Canvas API draw hex (glaze demos) | Out of scope (not `packages/ui` or `apps/playground`) |

---

## Phase 3 — UI Primitives Alignment ⏳ NOT STARTED

Typographic grid overhaul for `ControlPanel` and `Card` (monospace, uppercase, normalized sizes). Extend `accentColor` injection system (validated on `SciFiCard`) to all components needing dynamic color variation, constrained to OKLCH hues only.

_Detailed plan to be defined after Phase 2 completion._

---

## Instructions for next session

1. Start by reading this `HANDOFF.md` file.
2. Verify build is still green: `pnpm check-types` and `pnpm lint`.
3. Phase 2 is **complete** — all 4 lots are done. Begin **Phase 3** (UI Primitives Alignment).
4. After each lot, run `pnpm check-types` to validate.
5. Update this HANDOFF after each validated lot.
6. If context gets too heavy, create a fresh HANDOFF entry and recommend a new session.
