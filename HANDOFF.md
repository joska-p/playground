# HANDOFF — UI Refonte

## Phase 1 — Purge, Fixes & Handoff Setup ✅ COMPLETED

### Architecture learnings

- `packages/ui` has **no root `index.ts`** — every consumer imports a deep-path submodule via `package.json` `exports`.
- The lib's own **Atlas showcase** (`packages/ui/src/atlas`) uses several "dead weight" components — these were **KEPT** per user decision: `FloatingNav`, `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger`, `NotificationItem`, `SvgExportPanel`, `EdgeFieldOriginal`, `DefaultFallback`, `CardBody`, `CardLink`, `CardDescription`, `CardTitle`, `Sidebar` (+subcomponents), `Spinner`.
- If the Atlas showcase is redesigned later, purge its showcase-only components together with `packages/ui/src/atlas`.

---

## Phase 2 — Migrate off-theme colors to OKLCH tokens 🔄 PLANNED

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

### Lot 2 — `text-white` → tokens in `packages/pixel`

**Files**:

- `SwaggerSidebar.tsx`: 6× `text-white` → `text-background`
- `PipelineView.tsx`: `text-white` → `text-background` + fix `bg-accent)` malformed
- `ManipView.tsx`: `text-white` → `text-background` + fix `bg-accent)` malformed

### Lot 3 — Tokens in `packages/ui` + storybook

**Files**:

- `apps/storybook/src/stories/widgets/Sidebar.stories.tsx`: `hover:bg-white/5` → `hover:bg-surface-raised/50`
- `apps/storybook/src/stories/icons/Icon.stories.tsx`: `hover:bg-white/5` → `hover:bg-surface-raised/50`
- `packages/image-to-particles/src/components/ImageToParticles.tsx`: `bg-black` → `bg-background`

### Lot 4 — Shared particle palette + `ProjectsList`

**Files**:

- `EdgeFieldHero.astro` + `BackgroundCanvas.astro`: extract duplicated 8-color particle palette into shared constant or CSS custom properties.
- `ProjectsList.astro`: extract `CARD_COLORS` into shared constant with OKLCH equivalents.

### What is NOT migrated (by design)

| Category                          | Reason                                                |
| --------------------------------- | ----------------------------------------------------- |
| Hex in GLSL/shaders               | GPU-side, not CSS                                     |
| Hex in `three-stage` (3D lights)  | THREE.js defaults, user-controlled via leva           |
| Hex in storybook demo data        | Intentional palette showcase                          |
| `<meta theme-color>` hex          | Browser chrome, not rendering                         |
| Hex in `SvgExportPanel`           | SVG export output, not UI                             |
| Canvas API draw hex (glaze demos) | Out of scope (not `packages/ui` or `apps/playground`) |

### Bugs discovered during Phase 2 audit (to fix in Lots 1-2)

| File               | Line | Bug                                                 |
| ------------------ | ---- | --------------------------------------------------- |
| `NavActions.astro` | 10   | `hover:text--glow-color)` — missing opening `[var(` |
| `NavActions.astro` | 25   | Same malformation                                   |
| `MobileMenu.astro` | 38   | Stray backtick + missing `[var(`                    |
| `PipelineView.tsx` | 52   | `bg-accent)` — missing opening `(`                  |
| `ManipView.tsx`    | 57   | `bg-accent)` — same malformation                    |

---

## Phase 3 — UI Primitives Alignment ⏳ NOT STARTED

Typographic grid overhaul for `ControlPanel` and `Card` (monospace, uppercase, normalized sizes). Extend `accentColor` injection system (validated on `SciFiCard`) to all components needing dynamic color variation, constrained to OKLCH hues only.

_Detailed plan to be defined after Phase 2 completion._

---

## Instructions for next session

1. Start by reading this `HANDOFF.md` file.
2. Verify build is still green: `pnpm check-types` and `pnpm lint`.
3. Begin with **Lot 1** (glow consolidation in nav-bar).
4. After each lot, run `pnpm check-types` to validate.
5. Update this HANDOFF after each validated lot.
6. If context gets too heavy, create a fresh HANDOFF entry and recommend a new session.
