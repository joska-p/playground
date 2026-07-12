---
title: "UI Components"
description: "UI Components package"
category: "reference"
tags:
  - reference
  - ui
order: 20
---

# @repo/ui

React component library — Tailwind CSS v4, CVA variants, Gruvbox theme.

---

## Quick Start

```bash
pnpm --filter @repo/ui dev
```

Import by category or individual component:

```tsx
import { Button, Input } from '@repo/ui/data-entry';
import { Badge, Card } from '@repo/ui/data-display';
import { Alert, Dialog } from '@repo/ui/feedback';
```

## Directory Structure

```
src/
  components/
    cards/            # ProjectCard, EdgeCard, DocCard, CategoryCard…
    control-panel/    # ControlPanel, ControlRow, ControlSection…
    data-display/     # Badge, Card, Accordion, Hero, Popover…
    data-entry/       # Button, Input, Select, Slider, Switch…
    feedback/         # Alert, Dialog, Toast, ErrorBoundary…
    icons/            # Icon component + createIcon factory
    navigation/       # FloatingNav, Tabs
    widgets/          # Sidebar, Spinner, ColorPalette, EdgeField
  hooks/              # useSidebarState, useResizeObserver, useThemeState…
  lib/                # cn() utility
  styles/             # Gruvbox theme CSS
  theme/              # ThemeProvider, useTheme
```

## Component Guidelines

| Rule              | Convention                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **File naming**   | Kebab-case directories (`button/`), PascalCase component files (`Button.tsx`)                    |
| **Variants**      | Co-located `variants.ts` using CVA. Export `<name>Variants` (function) + `<Name>Variants` (type) |
| **Props**         | `interface` extending native HTML attrs + variant type. Named `<Component>Props`                 |
| **Refs**          | React 19 style — `ref` as a destructured prop, no `forwardRef`                                   |
| **Styling**       | `cn(variantsFn({ variant }), className)` — always wrap with `cn()` for consumer overrides        |
| **CSS tokens**    | No hardcoded colors/radii. Use Tailwind scale values. `style` only for dynamic CSS vars          |
| **Exports**       | Named exports only. No `export default`. No root barrel                                          |
| **Barrels**       | Per-category `index.ts` — explicit named re-exports, no `export *`                               |
| **Loading**       | `loading` prop → inject `<Spinner />`, set `disabled` + `aria-busy`                              |
| **Accessibility** | `:focus-visible` outlines, `active:scale-[.97]`, `disabled:pointer-events-none`                  |
| **Layout**        | CSS Grid by default. Flexbox for single-axis only. Intrinsic over breakpoints                    |

## Adding a Component

1. Create `src/components/<category>/<component-name>/ComponentName.tsx`
2. Add `variants.ts` with CVA recipe if the component has visual variants
3. Export props interface: `export interface ComponentNameProps extends HTMLAttributes<HTMLElement>, Variants`
4. Use named export: `export function ComponentName({ ... }: ComponentNameProps)`
5. Add barrel re-exports in `src/components/<category>/index.ts`
6. Add `package.json` export entry if it should be individually importable

## Conventions

This package follows [project conventions](/docs/conventions/01-overview.md):

- [Package Structure](/docs/conventions/02-package-structure/)
- [CSS Tokens](/docs/conventions/09-ui-css-tokens/)
- [Responsive Layout](/docs/conventions/10-ui-responsive-layout/)
- [Dynamic Tailwind Colors](/docs/conventions/11-dynamic-tailwind-colors/)
- [Imports & Exports](/docs/conventions/13-imports-exports/)
- [TypeScript Style](/docs/conventions/15-typescript-style/)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

