# Variant Consolidation Plan

## Goal

Remove the dual `--_color` / CVA variant systems. Unify everything on CVA + `COLOR_CLASSES` in `colorVariant.ts` as the single source of truth.

The consumer-facing `--_color` override feature is removed. Components use Tailwind classes driven by CVA variant configs. `colorVar()` and `colorVarStyle()` are deleted.

---

## Phase A — Rewrite `colorVariant.ts`

**File:** `packages/ui/src/lib/colorVariant.ts`

**What changes:**

- Delete `colorVar()` function
- Delete `colorVarStyle()` function
- Delete `import type { CSSProperties } from 'react'`
- Add `COLOR_CLASSES: Record<ColorVariant, string>` — canonical bg+text Tailwind classes per variant:

```ts
export const COLOR_CLASSES: Record<ColorVariant, string> = {
  default: 'bg-surface-raised text-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  ghost: 'text-foreground',
  outline: 'text-foreground-dim border border-border bg-transparent'
};
```

- Keep `ColorVariant` type and `COLOR_VARIANTS` array unchanged
- Update JSDoc to document `COLOR_CLASSES` instead of `colorVar` / `colorVarStyle`

---

## Phase B — Migrate `colorVarStyle()` consumers (components that set `--_color`)

Each of these currently calls `colorVarStyle(variant)` to set `--_color` on a DOM element, then CSS reads `--_color` to apply visual styles. Replace with a CVA variant axis using Tailwind classes directly.

### B1 — Simple accent color (text-only)

These use `--_color` only for text color. Replace with `text-{variant}` in a CVA variant axis.

| Component          | Current                                                      | Migration                                                  |
| ------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| **SectionHeader**  | `colorVarStyle(variant)` → `color: var(--_color)`            | Add CVA `variant` axis: `{ primary: 'text-primary', ... }` |
| **SectionHeading** | `colorVarStyle(variant)` → `text-(--_color)`                 | Same as above                                              |
| **FloatingNav**    | `colorVarStyle(variant)` → `color: var(--_color)`            | Same as above                                              |
| **ChangelogItem**  | `colorVarStyle(variant)` → uses `--_color` for version label | Same as above                                              |

These don't have a `variants.ts` yet. Create one with a CVA `variant` axis.

**Pattern:**

```ts
// component/variants.ts
import { cva } from 'class-variance-authority';

export const componentVariants = cva('', {
  variants: {
    variant: { ...COLOR_CLASSES /* override if needed */ }
  },
  defaultVariants: { variant: 'default' }
});
```

```tsx
// Component.tsx
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { componentVariants } from './variants';

// in JSX:
className={cn(componentVariants({ variant }), className)}
```

### B2 — Tinted background + text

These use `--_color` for a soft tinted background and matching text.

| Component            | Current                                                                  | Migration                                             |
| -------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| **MenuItem**         | `colorVarStyle(variant)` → `bg: color-mix(15%)` + `color: var(--_color)` | CVA: `{ primary: 'bg-primary/15 text-primary', ... }` |
| **NotificationItem** | Same pattern as MenuItem                                                 | Same as above                                         |
| **Hero**             | `colorVarStyle(variant)` → bg tint + text + gradient                     | CVA with compound variants if needed                  |

### B3 — Badge (complex — appearance + variant)

**Current:** `colorVarStyle(variant)` drives badge-soft/solid/outline via CSS `var(--_color)`. Badge CVA already handles `appearance` and `dot` axes.

**Migration:** Replace the CSS-driven styles with CVA compound variants:

```ts
// badge/variants.ts
export const badgeVariants = cva(
  'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: COLOR_CLASSES,
      appearance: {
        soft: '', // COLOR_CLASSES already provides bg + text
        solid: 'text-background', // override text color
        outline: 'bg-transparent border'
      },
      dot: {
        true: 'before:mr-1 before:size-1.5 before:rounded-full before:shrink-0 before:bg-current',
        false: ''
      }
    },
    compoundVariants: [
      // Solid: override text to background, no bg
      { appearance: 'solid', variant: 'default', class: 'bg-surface-raised text-foreground' },
      { appearance: 'solid', variant: 'primary', class: 'bg-primary text-primary-foreground' },
      // ... etc
      // Outline: transparent bg, border
      {
        appearance: 'outline',
        variant: 'default',
        class: 'bg-transparent border border-foreground-dim text-foreground-dim'
      },
      {
        appearance: 'outline',
        variant: 'primary',
        class: 'bg-transparent border border-primary text-primary'
      }
      // ... etc
    ],
    defaultVariants: { variant: 'default', appearance: 'soft', dot: false }
  }
);
```

This eliminates the need for `.badge-soft`, `.badge-solid`, `.badge-outline`, `.badge-dot` CSS classes.

### B4 — Switch (toggle)

**Current:** `colorVarStyle(variant)` → CSS `.toggle:checked { background: var(--_color) }`

**Migration:** Replace with CVA variant axis for the checked-state background. Switch already has a custom CSS toggle. Replace the CSS with a variant-aware class that sets background directly.

### B5 — Tabs (underline)

**Current:** `colorVarStyle(variant)` → CSS `.tab-trigger::after { background: var(--_color) }`

**Migration:** The underline is a pseudo-element; can't Tailwind it directly. Options:

- Add a child `<span>` element styled with CVA variant classes
- Or keep a small CSS rule set per variant

### B6 — Accordion (arrow)

**Current:** `colorVarStyle(variant)` → CSS `.accordion-trigger::after { border-color: var(--_color) }`

**Migration:** Same problem as Tabs (pseudo-element). Options:

- Use a child element for the arrow icon
- Or keep small CSS rule

### B7 — Card (interactive glow)

**Current:** `colorVarStyle(variant)` → CSS `.card-interactive:has(...) { box-shadow: ... var(--_color) ... }`

**Migration:** The glow uses `color-mix` and `var(--_color)` in a complex `:has()` selector. Options:

- Replace with a CVA variant axis that sets variant-specific shadow classes
- Or define variant CSS in a component-level CSS file

### B8 — Sidebar / SidebarPanel / SidebarToggle

**Current:** `colorVarStyle(variant)` → CSS for panel accent

**Migration:** Add CVA variant axis with `bg-{variant} text-{variant}-foreground` or similar.

### B9 — ColorPalette (selection ring)

**Current:** `colorVarStyle(variant)` → CSS `has-checked:shadow-[0_0_0_2px_var(--_color)]`

**Migration:** Replace `shadow-[0_0_0_2px_var(--_color)]` with variant-specific shadow or ring classes in the CVA.

### B10 — ControlSection

**Current:** `colorVarStyle(variant)` → header/border accent

**Migration:** Add variant to its CVA.

---

## Phase C — Migrate `colorVar()` consumers (raw CSS var ref)

### C1 — `accentColor` (Radio, Checkbox, Slider)

**Current:** `style={{ accentColor: colorVar(variant) }}`

`accent-color` is a CSS property with NO Tailwind equivalent. It must be set via inline style.

**Migration options:**

- **Option 1:** Keep a mapping function in a local utility or in `colorVariant.ts` (renamed, not as `colorVar`). This is the cleanest since `accentColor` fundamentally needs a CSS var reference.
- **Option 2:** Inline the mapping per component (duplication, but small — only 3 variants that actually get used: primary, warning, destructive).

**Recommendation:** Add a minimal `VARIANT_CSS_VARS: Record<ColorVariant, string>` export to `colorVariant.ts` that returns the CSS var names — NOT as `var(--primary)` but just for the cases where you truly need a CSS value at runtime (accentColor). This is separate from `--_color`.

Actually simplest: just inline a small `accentColorMap` in each of Radio, Checkbox, Slider. It's just a few lines per component.

### C2 — `--_ring` (Input, Select, Textarea)

**Current:** `style={{ '--_ring': colorVar(variant) }}` → CSS reads `--_ring` for focus ring color.

**Migration:** Replace with Tailwind focus ring classes via CVA: `focus-visible:ring-{variant}`. Need to check if `ring-{variant}` (e.g., `ring-primary`) classes exist or use `focus-visible:ring-[var(--primary)]`.

If Tailwind's ring color utilities are set up for the theme, `focus-visible:ring-primary` should work directly. If not, create a CVA that outputs the right class.

### C3 — Popover (borderTopColor)

**Current:** `style={{ borderTopColor: colorVar(variant) }}`

**Migration:** Replace with a CVA variant class like `border-t-primary` etc.

### C4 — Carousel (icon color)

**Current:** `const iconColor = colorVar(variant)` → used as SVG fill color.

**Migration:** Replace with CVA variant that sets `text-{variant}` on the parent, and SVG uses `fill-current` or `text-current`.

---

## Phase D — Migrate card components (direct `--_color` in JSX)

These components DON'T import `colorVarStyle`. They receive `--_color` value via a parent component's inline style and use Tailwind arbitrary values to read it.

| Component        | Usage                                                                     |
| ---------------- | ------------------------------------------------------------------------- |
| **ProjectCard**  | `text-(--_color)`, `linear-gradient(... var(--_color) ...)`               |
| **DocCard**      | `borderColor: 'transparent var(--_color)...'`, `text-(--_color)`, bg tint |
| **CategoryCard** | `text-(--_color)`, `bg-(--_color)/10`                                     |
| **CardLink**     | Complex: `bg-(--_color)/10`, `shadow-[...var(--_color)...]`, glow effects |

**Migration:** Pass `variant` prop directly to these card components. Each gets a CVA variant axis that renders the correct Tailwind classes instead of reading `--_color` from a CSS var.

Alternatively, for cards that receive `accent` as a raw color value (not a variant name), they need a different mechanism. Let me check...

Let me look at CardLink specifically — it receives `accent: string` (a raw color) and uses it directly:

```tsx
style={{ '--_color': accent, ...style } as CSSProperties}
```

This is a different pattern: the consumer passes an actual color value (like `#ff0000`), not a variant name. This is the true consumer-override use case.

**For CardLink:** This IS the `--_color` consumer-override feature. If we're removing it, CardLink needs a `variant` prop instead of an `accent` string prop. Or the parent component that renders CardLink needs to compute classes.

Let me check how CardLink is used.

---

## Phase E — Remove `--_color` from CSS

**File:** `packages/ui/src/styles/gruvbox-theme.css`

Remove or replace these `--_color` rules:

| Lines   | CSS Class                    | Replacement                                                    |
| ------- | ---------------------------- | -------------------------------------------------------------- |
| 378-379 | `.toggle:checked`            | Replace with variant-aware Tailwind in Switch                  |
| 386-390 | `.card-interactive:has(...)` | Replace with variant-aware shadow classes                      |
| 407-408 | `.accordion-trigger::after`  | Replace with child element or variant CSS                      |
| 446     | `.tab-trigger::after`        | Replace with child element or variant CSS                      |
| 538     | `.tooltip::after`            | Tooltip uses `--_color` as fallback — replace with fixed value |
| 575-597 | `.badge-*`                   | Replace with CVA compound variants in Badge                    |

---

## Phase F — Update showcase / docs

- `packages/ui/src/showcase/sections/VariantSystemSection.tsx` — remove §5.2 (`--_color` section), update table
- `packages/ui/src/showcase/references/ContributingSection.tsx` — update guidance
- `packages/ui/src/showcase/references/ChecklistSection.tsx` — update checklist
- `packages/ui/src/showcase/components/BadgeGallery.tsx` — update intro text

---

## Execution order (recommended)

```
Phase A: Rewrite colorVariant.ts (add COLOR_CLASSES, remove colorVar/colorVarStyle)
  ↓
Phase B: Migrate colorVarStyle consumers
  ├── B1: Simple accent (SectionHeader, SectionHeading, FloatingNav, ChangelogItem)
  ├── B2: Tinted bg + text (MenuItem, NotificationItem, Hero)
  ├── B3: Badge (complex — appearance + variant compound)
  ├── B4: Switch
  ├── B5: Tabs (underline)
  ├── B6: Accordion (arrow)
  ├── B7: Card (glow)
  ├── B8: Sidebar / SidebarPanel / SidebarToggle
  ├── B9: ColorPalette
  └── B10: ControlSection
  ↓
Phase C: Migrate colorVar consumers
  ├── C1: accentColor (Radio, Checkbox, Slider)
  ├── C2: --_ring (Input, Select, Textarea)
  ├── C3: Popover borderTopColor
  └── C4: Carousel icon color
  ↓
Phase D: Migrate card components (ProjectCard, DocCard, CategoryCard, CardLink)
  ↓
Phase E: Clean up CSS (gruvbox-theme.css)
  ↓
Phase F: Update showcase / docs
  ↓
Phase G: Build + verify
```

---

## Checklist (per component)

```
Component: ___________

[Before — understand current state]
☐ Does it use colorVarStyle()? → What does --_color affect?
☐ Does it use colorVar()? → Which CSS property?
☐ Does it use --_color directly in JSX/CSS?

[Migration]
☐ Does it need a new variants.ts? (create if yes)
☐ Does the variant pattern match canon (bg + text)?
    ☐ Yes → spread COLOR_CLASSES, override extras
    ☐ No → define own variant→class mapping
☐ Does it use accentColor and need a local mapping? (Radio, Checkbox, Slider)
☐ Remove imports of colorVar / colorVarStyle
☐ Add import of COLOR_CLASSES if spreading
☐ Remove any inline style that sets --_color or reads colorVar(variant)
☐ Update component JSX to use CVA class instead of inline style

[After]
☐ Build passes with no type errors
```

---

## Full component inventory

| #   | Phase | Component        | File                                          | Current variant mechanism                                                     | Strategy                                                     |
| --- | ----- | ---------------- | --------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | A     | colorVariant.ts  | `lib/colorVariant.ts`                         | Defines colorVar + colorVarStyle                                              | Add COLOR_CLASSES, remove colorVar/colorVarStyle             |
| 2   | B1    | SectionHeader    | `data-display/section-header/`                | colorVarStyle → `color: var(--_color)`                                        | CVA variant axis with COLOR_CLASSES                          |
| 3   | B1    | SectionHeading   | `data-display/section-heading/`               | colorVarStyle → `text-(--_color)`                                             | CVA variant axis with COLOR_CLASSES                          |
| 4   | B1    | FloatingNav      | `navigation/floating-nav/`                    | colorVarStyle → `color: var(--_color)`                                        | CVA variant axis                                             |
| 5   | B1    | ChangelogItem    | `data-display/changelog-item/`                | colorVarStyle → label color                                                   | CVA variant axis                                             |
| 6   | B2    | MenuItem         | `data-display/menu-item/`                     | colorVarStyle → bg tint + text                                                | CVA variant axis                                             |
| 7   | B2    | NotificationItem | `data-display/notification-item/`             | colorVarStyle → bg tint + text                                                | CVA variant axis                                             |
| 8   | B2    | Hero             | `data-display/hero/`                          | colorVarStyle → bg tint + text + gradient                                     | CVA variant axis                                             |
| 9   | B3    | Badge            | `data-display/badge/`                         | colorVarStyle → soft/solid/outline/dot via CSS                                | CVA compound variants (variant × appearance)                 |
| 10  | B4    | Switch           | `data-entry/switch/`                          | colorVarStyle → checked bg                                                    | CVA variant axis                                             |
| 11  | B5    | Tabs             | `navigation/tabs/`                            | colorVarStyle → underline                                                     | CVA variant axis + child element                             |
| 12  | B6    | Accordion        | `data-display/accordion/`                     | colorVarStyle → arrow border                                                  | CVA variant axis + child element                             |
| 13  | B7    | Card             | `data-display/card/`                          | colorVarStyle → :has() glow                                                   | CVA variant axis                                             |
| 14  | B8    | Sidebar          | `widgets/sidebar/Sidebar.tsx`                 | colorVarStyle → accent                                                        | CVA variant axis                                             |
| 15  | B8    | SidebarPanel     | `widgets/sidebar/SidebarPanel.tsx`            | colorVarStyle → accent                                                        | CVA variant axis                                             |
| 16  | B8    | SidebarToggle    | `widgets/sidebar/SidebarToggle.tsx`           | colorVarStyle → accent                                                        | CVA variant axis                                             |
| 17  | B9    | ColorPalette     | `widgets/color-palette/`                      | colorVarStyle → selection ring                                                | CVA variant axis                                             |
| 18  | B10   | ControlSection   | `control-panel/control-section/`              | colorVarStyle → accent                                                        | Add variant to existing CVA                                  |
| 19  | C1    | Radio            | `data-entry/radio/`                           | colorVar → accentColor                                                        | Inline accentColor map                                       |
| 20  | C1    | Checkbox         | `data-entry/checkbox/`                        | colorVar → accentColor                                                        | Inline accentColor map                                       |
| 21  | C1    | Slider           | `data-entry/slider/`                          | colorVar → accentColor                                                        | Inline accentColor map                                       |
| 22  | C2    | Input            | `data-entry/input/`                           | colorVar → --_ring                                                            | CVA focus ring classes                                       |
| 23  | C2    | Select           | `data-entry/select/`                          | colorVar → --_ring                                                            | CVA focus ring classes                                       |
| 24  | C2    | Textarea         | `data-entry/textarea/`                        | colorVar → --_ring                                                            | CVA focus ring classes                                       |
| 25  | C3    | Popover          | `data-display/popover/`                       | colorVar → borderTopColor                                                     | CVA variant axis                                             |
| 26  | C4    | Carousel         | `data-display/carousel/`                      | colorVar → icon fill                                                          | CVA variant axis                                             |
| 27  | D     | ProjectCard      | `components/cards/project-card/`              | Direct `--_color` in JSX                                                      | CVA variant axis                                             |
| 28  | D     | DocCard          | `components/cards/doc-card/`                  | Direct `--_color` in JSX                                                      | CVA variant axis                                             |
| 29  | D     | CategoryCard     | `components/cards/category-card/`             | Direct `--_color` in JSX                                                      | CVA variant axis                                             |
| 30  | D     | CardLink         | `components/cards/card-link/`                 | Direct `--_color` in JSX + raw `accent` prop                                  | Change prop from `accent: string` to `variant: ColorVariant` |
| 31  | E     | CSS cleanup      | `styles/gruvbox-theme.css`                    | `.badge-*`, `.toggle`, `.card-interactive`, `.accordion`, `.tabs`, `.tooltip` | Remove or inline variant-aware rules                         |
| 32  | F     | Showcase         | `showcase/sections/VariantSystemSection.tsx`  | Documents --_color                                                            | Remove §5.2, update                                          |
| 33  | F     | Showcase         | `showcase/references/ContributingSection.tsx` | References --_color                                                           | Update                                                       |
| 34  | F     | Showcase         | `showcase/references/ChecklistSection.tsx`    | References --_color                                                           | Update                                                       |
| 35  | F     | Showcase         | `showcase/components/BadgeGallery.tsx`        | --_color intro                                                                | Update                                                       |

---

## Resume prompt

Copy-paste the entire block below into a fresh CLI session to resume:

```
I am consolidating the variant system in my UI library by removing --_color
and unifying on CVA + COLOR_CLASSES. The plan is at variant-consolidation-plan.md.

Current state:
- Phase A (rewrite colorVariant.ts): DONE
- Phase B1 (simple accent text): DONE
- Phase B2 (tinted bg+text): DONE
- Phase B3 (Badge compound variants): DONE
- Phase B4 (Switch): DONE
- Phase B5 (Tabs): DONE
- Phase B6 (Accordion): DONE
- Phase B7 (Card glow): DONE
- Phase B8 (Sidebar): DONE
- Phase B9 (ColorPalette): DONE
- Phase B10 (ControlSection): SKIP — do not touch control-panel
- Phase C1 (accentColor — Radio, Checkbox, Slider): DONE
- Phase C2 (--_ring — Input, Select, Textarea): DONE
- Phase C3 (Popover borderTopColor): DONE
- Phase C4 (Carousel icon color): DONE
- Phase D (card components): SKIP — do not touch cards
- Phase E (CSS cleanup): DONE — zero --_color remaining in CSS
- Phase F (showcase/docs): DONE
- Phase G (build verify): DONE — tsc + lint pass

Everything that can be done without touching control-panel/ or cards/ is done.
If you want to audit the remaining --_color references in those two directories,
check: packages/ui/src/components/control-panel/ and packages/ui/src/components/cards/

The plan file is at packages/ui/variant-consolidation-plan.md.
```
