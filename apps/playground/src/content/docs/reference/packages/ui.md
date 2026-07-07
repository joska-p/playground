---
title: UI Components
description: Shared atomic UI components for the Creative Playground. Built with **React 19**, **CVA**, and styled with the **Gruvbox** design system.
tags:
  - reference
  - ui
order: 20
---

# @repo/ui

## Quick Start

```bash
pnpm add @repo/ui
```

```tsx
import { Button, Sidebar, Card } from '@repo/ui';

export function MyComponent() {
  return (
    <Card variant="primary">
      <Button variant="accent">Creative Action</Button>
    </Card>
  );
}
```

## Available Components

| Component         | Export Subpath             | Description                               |
| ----------------- | -------------------------- | ----------------------------------------- |
| `Button`          | `@repo/ui/Button`          | Actions, links, form submits              |
| `Input`           | `@repo/ui/Input`           | Text input with label and helper text     |
| `Select`          | `@repo/ui/Select`          | Dropdown selection                        |
| `Slider`          | `@repo/ui/Slider`          | Range input with label and unit display   |
| `Switch`          | `@repo/ui/Switch`          | Toggle switch                             |
| `Card`            | `@repo/ui/Card`            | Content container                         |
| `Badge`           | `@repo/ui/Badge`           | Small label/tag                           |
| `Label`           | `@repo/ui/Label`           | Form label                                |
| `DefaultFallback` | `@repo/ui/DefaultFallback` | Pre-styled error fallback UI              |
| `ErrorBoundary`   | `@repo/ui/ErrorBoundary`   | Error boundary wrapper with variants      |
| `ColorPalette`    | `@repo/ui/ColorPalette`    | Color swatch display                      |
| `Sidebar`         | `@repo/ui/Sidebar`         | Collapsible sidebar with panel/main areas |

Each component also exports its CVA variants (e.g. `@repo/ui/buttonVariants`, `@repo/ui/defaultFallbackVariants`) and types (e.g. `@repo/ui/Button`, `@repo/ui/ErrorBoundary`).

## Variants

Most components support these variants:

| Variant       | Usage                  |
| ------------- | ---------------------- |
| `primary`     | Main action (default)  |
| `secondary`   | Alternative action     |
| `accent`      | Highlight, emphasis    |
| `destructive` | Delete, reset, danger  |
| `outline`     | Secondary with border  |
| `ghost`       | Minimal, no background |

## Sizes

| Size            | Usage             |
| --------------- | ----------------- |
| `small` / `sm`  | Compact UI        |
| `medium` / `md` | Default           |
| `large` / `lg`  | Emphasis          |
| `icon`          | Square, icon-only |

## Import Pattern

All components are imported via subpath exports, not from a root barrel:

```typescript
import { Button } from '@repo/ui/Button';
import { Input } from '@repo/ui/Input';
import { Sidebar } from '@repo/ui/Sidebar';

import type { ButtonProps } from '@repo/ui/Button';
import { buttonVariants } from '@repo/ui/buttonVariants';
```

The public API is declared in `package.json` under the `exports` field — one subpath per component.

## Usage Examples

### Button

```typescript
import { Button } from "@repo/ui/Button";

<Button variant="primary" size="medium">
  Click me
</Button>

<Button variant="destructive" isLoading={false}>
  Delete
</Button>
```

### Input with Label

```typescript
import { Input } from "@repo/ui/Input";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>;
```

### Slider

```typescript
import { Slider } from "@repo/ui/Slider";

<Slider
  label="Volume"
  value={50}
  min={0}
  max={100}
  unit="%"
  onChange={(v) => console.log(v)}
/>;
```

### Sidebar

```typescript
import { Sidebar } from "@repo/ui/Sidebar";

<Sidebar variant="primary" desktopPosition="left">
  <Sidebar.Panel>
    <Sidebar.Toggle />
    <p>Controls</p>
  </Sidebar.Panel>
  <Sidebar.Main>
    <p>Content</p>
  </Sidebar.Main>
</Sidebar>;
```

### ErrorBoundary

```typescript
import { ErrorBoundary } from "@repo/ui/ErrorBoundary";

<ErrorBoundary variant="destructive">
  <MyComponent />
</ErrorBoundary>

<ErrorBoundary variant="primary">
  <MyComponent />
</ErrorBoundary>
```

The `ErrorBoundary` wraps `react-error-boundary` and renders a `DefaultFallback` on error. The `variant` prop controls the fallback's background tint. Supports the same variant set as other components: `primary`, `secondary`, `accent`, `destructive`, `outline`, `ghost`.

## Design Tokens

Full design token reference (colors, typography, spacing, radii) is available at:

**→ [Design Tokens & Theme](/docs/reference/design-tokens/)**

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
