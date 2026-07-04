# Component Migration Prompt

Use this prompt each time you bring a component from `packages/ui` into `packages/ui-v2`.

## Context

- **Source:** `packages/ui/src/` — old component library (reference only, not copy)
- **Target:** `packages/ui-v2/src/` — new component library (indexed by CodeGraph)
- **Stack:** React 19, Tailwind v4, CVA (`class-variance-authority`), `cn()` (clsx + tailwind-merge), `lucide-react`
- **Verify:** `pnpm --filter @repo/ui-v2 check-types` (tsc --noEmit) then `pnpm --filter @repo/ui-v2 lint`

## ⚠️ This is a redesign, not a copy-paste

The old component is reference only. Rewrite it from scratch to match the v2 design language below. If the old component has a concept that doesn't fit v2's patterns, re-architect it — don't force it in.

## v2 design language (what differs from old ui)

| Aspect               | Old `packages/ui`                       | New `packages/ui-v2`                                                             |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| **Typography**       | Mixed stacks (sans/serif/mono)          | **JetBrains Mono** — single voice                                                |
| **Surfaces**         | Borders, `bg-card`, opacity layers      | **Flat surfaces** separated by spacing/color, subtle shadows, no visible borders |
| **Buttons**          | `hover:bg-X/80` fade                    | `hover:brightness-110 active:scale-[.97]` — tactile snap                         |
| **Form inputs**      | Bordered inputs, label + helper pattern | `:focus-within` glow via `--_ring`, no border, wrapper pattern                   |
| **Color system**     | CVA per-component color variants        | Shared `ColorVariant` type + `--_color` CSS variable pattern                     |
| **Switch**           | `<button role="switch">` with JS state  | Pure CSS `.toggle` via `appearance:none` on checkbox                             |
| **Card interaction** | `interactive` prop → cursor-pointer     | `:has()` glow on child hover — zero JS                                           |
| **Tabs**             | JS-driven tab switching                 | CSS-only via hidden radio + `:has()`                                             |
| **Accordion**        | JS-driven                               | Native `<details>` + `@starting-style` animation                                 |
| **Dialog**           | JS-driven open/close                    | Native `<dialog>` + `@starting-style`                                            |
| **Popover**          | JS + portal                             | CSS-only hover groups                                                            |
| **Tooltip**          | JS + positioning lib                    | CSS `::after` pseudo-element via `data-tooltip`                                  |
| **Theming**          | CSS variables                           | Same (oklch gruvbox tokens)                                                      |

## Remaining components to port (in order)

| #   | Component          | Source path                                                           | Target directory                  | Notes                                        |
| --- | ------------------ | --------------------------------------------------------------------- | --------------------------------- | -------------------------------------------- |
| 1   | SectionHeading     | `packages/ui/src/components/stylistic/atoms/SectionHeading.tsx`       | `data-display/section-heading/`   | Simple label + title + description           |
| 2   | ColorSwatch        | `packages/ui/src/components/stylistic/atoms/ColorSwatch.tsx`          | `data-display/color-swatch/`      | Color box + name + token                     |
| 3   | NotificationItem   | `packages/ui/src/components/stylistic/molecules/NotificationItem.tsx` | `data-display/notification-item/` | Icon + title + timestamp row                 |
| 4   | ChangelogItem      | `packages/ui/src/components/stylistic/molecules/ChangelogItem.tsx`    | `data-display/changelog-item/`    | Version + content row                        |
| 5   | MenuItem           | `packages/ui/src/components/stylistic/molecules/MenuItem.tsx`         | `data-display/menu-item/`         | Icon + label button, optional destructive    |
| 6   | Hero               | `packages/ui/src/components/stylistic/organisms/Hero.tsx`             | `data-display/hero/`              | Full hero section with grid bg               |
| 7   | SectionHeader      | `packages/ui/src/components/stylistic/organisms/SectionHeader.tsx`    | `data-display/section-header/`    | Title + optional icon, link, category accent |
| 8   | FloatingNav        | `packages/ui/src/components/stylistic/organisms/FloatingNav.tsx`      | `navigation/floating-nav/`        | Fixed pill nav, auto-hides on scroll         |
| 9   | ScrollReveal       | `packages/ui/src/components/stylistic/organisms/ScrollReveal.tsx`     | `data-display/scroll-reveal/`     | IntersectionObserver fade-in wrapper         |
| 10  | ColorPalette       | `packages/ui/src/components/widgets/color-palette/ColorPalette.tsx`   | `widgets/color-palette/`          | Radio-based color swatch picker              |
| 11  | Sidebar (compound) | `packages/ui/src/components/widgets/sidebar/`                         | `widgets/sidebar/`                | Responsive sidebar with panel/main/toggle    |
| 12  | useResizeObserver  | `packages/ui/src/hooks/useResizeObserver.ts`                          | `hooks/`                          | Debounced resize observer hook               |

## Migration rules (from GUIDELINES.md)

1. **React 19 ref-as-prop** — no `forwardRef`. Add `ref?: Ref<TElement>` to the props interface, destructure it, forward it to the underlying DOM node.
2. **No `forwardRef`** — never use it.
3. **No `useState`/`useReducer` inside components** — if state is needed, extract into a `useXState()` hook in `src/hooks/`. Components are pure functions of props.
4. **Color, if any** — use the shared `ColorVariant` type from `lib/colorVariant.ts`. Don't invent parallel color enums.
   - **Full color change (bg + text + ring):** use `cva()` variants in a `*.variants.ts` file
   - **Single accent (ring, glow, accent-color):** use `colorVar(variant)` / `colorVarStyle(variant)` from `lib/colorVariant.ts`, no variants file needed
5. **Imports:** Use `../../lib/cn` and `../../lib/colorVariant` for components 2 levels deep in the category dirs.
6. **Prefer native elements** — `<details>`, `<dialog>`, `<input type="checkbox|radio|range">`, etc.
7. **`cn()`** — always use `cn()` for className composition.
8. **Exports from barrel** — update the category's `index.ts` AND `src/index.ts`.
9. **TypeScript `type` only** — use `type` not `interface` for type definitions.
10. **Mobile-first** — base classes are the complete experience; `landscape:`/`sm:` only add refinements.
11. removed.
12. **CSS class name mapping** from old → new:
    - `text-muted-foreground` → `text-foreground-muted`
    - `bg-card` / `bg-surface` → `bg-surface` (v2 uses `bg-surface-raised` for elevated)
    - `text-card-foreground` → `text-foreground`
    - `border-border` → `border-border` (same)
    - `shadow-sm/md/lg` → inline `style={{ boxShadow: 'var(--shadow-...)' }}`
13. **No arbitrary bracket metrics** — use Tailwind scale (`text-sm`, `text-xs`), not `text-[13px]` unless the existing v2 components already use it (check neighboring files for precedent).

## Import map for moved files

```
data-entry/*/Component.tsx:     ../../lib/cn, ../../lib/colorVariant
data-display/*/Component.tsx:   ../../lib/cn, ../../lib/colorVariant
navigation/*/Component.tsx:     ../../lib/cn, ../../lib/colorVariant
feedback/*/Component.tsx:       ../../lib/cn, ../../lib/colorVariant
widgets/*/Component.tsx:        ../../lib/cn, ../../lib/colorVariant
hooks/*.ts:                     (no relative lib imports)
```

Cross-component imports:

```
../../data-entry/button/Button
../../data-display/card/Card
../../feedback/alert/Alert  (etc.)
```

## Already-existing components (do NOT re-port)

| Component            | Location in ui-v2          |
| -------------------- | -------------------------- |
| Button               | `data-entry/button/`       |
| Input                | `data-entry/input/`        |
| Select               | `data-entry/select/`       |
| Checkbox             | `data-entry/checkbox/`     |
| Radio                | `data-entry/radio-group/`  |
| Switch               | `data-entry/switch/`       |
| Textarea             | `data-entry/textarea/`     |
| Label                | `data-entry/label/`        |
| HelperText           | `data-entry/helper-text/`  |
| Slider               | `data-entry/slider/`       |
| Card                 | `data-display/card/`       |
| Badge                | `data-display/badge/`      |
| Tooltip              | `data-display/tooltip/`    |
| Accordion            | `data-display/accordion/`  |
| Carousel             | `data-display/carousel/`   |
| Popover              | `data-display/popover/`    |
| Tabs                 | `navigation/tabs/`         |
| Dialog               | `feedback/dialog/`         |
| Alert                | `feedback/alert/`          |
| Toast                | `feedback/toast/`          |
| ErrorBoundary        | `feedback/error-boundary/` |
| DefaultFallback      | `feedback/error-boundary/` |
| ThemeProvider        | `theme/`                   |
| ControlPanel         | `components/ControlPanel/` |
| Cards (app-specific) | `components/Cards/`        |
| Icons                | `components/icons/`        |

## How to adapt (redesign checklist)

For each component, go through this checklist:

1. Read the old component for **concept/API reference only**
2. Does the component need color? → use `ColorVariant`, decide between `cva()` (§5.1) or `--_color` (§5.2)
3. Does the component need state? → extract to `useXState()` hook in `src/hooks/`
4. Does a native HTML element already do this? → use it (`<details>`, `<dialog>`, `<input type="range">`, etc.)
5. Replace `from '../../../utils/cn'` → `from '../../lib/cn'`
6. Replace `createVariant()` wrapper → direct `cva()` call
7. Replace old `Icon` usage with `lucide-react` equivalents
8. Replace old CSS color classes (see mapping above)
9. Convert `interface` → `type`
10. Match the v2 design language (flat surfaces, `:focus-within` glow, no borders, brightness/scale interactions)
11. Create the component file in its target directory
12. Update the category barrel `index.ts`
13. Update `src/index.ts` to re-export

## Verification

```bash
pnpm --filter @repo/ui-v2 check-types
pnpm --filter @repo/ui-v2 lint
```
