---
title: "UI Components"
description: "Shared components in @repo/ui."
category: "reference"
tags:
  - reference
---

# UI Components

Shared atomic components for the playground. Full interactive docs with live examples:

**→ [Storybook](/storybook/)**

---

## Available Components

| Component      | Export Subpath               | Description                               |
| -------------- | ---------------------------- | ----------------------------------------- |
| `Button`       | `@repo/ui/Button`            | Actions, links, form submits              |
| `Input`        | `@repo/ui/Input`             | Text input with label and helper text     |
| `Select`       | `@repo/ui/Select`            | Dropdown selection                        |
| `Slider`       | `@repo/ui/Slider`            | Range input with label and unit display   |
| `Switch`       | `@repo/ui/Switch`            | Toggle switch                             |
| `Card`         | `@repo/ui/Card`              | Content container                         |
| `Badge`        | `@repo/ui/Badge`             | Small label/tag                           |
| `Label`        | `@repo/ui/Label`             | Form label                                |
| `ColorPalette` | `@repo/ui/ColorPalette`      | Color swatch display                      |
| `Sidebar`      | `@repo/ui/Sidebar`           | Collapsible sidebar with panel/main areas |

Each component also exports its CVA variants (e.g. `@repo/ui/buttonVariants`) and types (e.g. `@repo/ui/Button`).

---

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

### Sizes

| Size            | Usage             |
| --------------- | ----------------- |
| `small` / `sm`  | Compact UI        |
| `medium` / `md` | Default           |
| `large` / `lg`  | Emphasis          |
| `icon`          | Square, icon-only |

---

## Import Pattern

All components are imported via subpath exports, not from a root barrel:

```typescript
import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";
import { Sidebar } from "@repo/ui/Sidebar";

// Import types from the same subpath
import type { ButtonProps } from "@repo/ui/Button";

// Import variants separately
import { buttonVariants } from "@repo/ui/buttonVariants";
```

The public API is declared in `packages/ui/package.json` under the `exports` field — one subpath per component.

---

## Patterns

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

The Button component uses `type` for its props definition and `function` declaration for the component itself. See [Adding Components](/docs/how-to/adding-components/) for the full pattern.

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

<Slider label="Volume" value={50} min={0} max={100} unit="%" onChange={(v) => console.log(v)} />;
```

### Sidebar

```typescript
import { Sidebar } from "@repo/ui/Sidebar";

<Sidebar variant="normal" desktopPosition="left">
  <Sidebar.Toggle />
  <Sidebar.Panel>
    <p>Controls</p>
  </Sidebar.Panel>
  <Sidebar.Main>
    <p>Content</p>
  </Sidebar.Main>
</Sidebar>;
```

---

Components live in `packages/ui/src/components/`. The public API surface is defined in `packages/ui/package.json` `exports`.
