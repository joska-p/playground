---
title: "UI Components"
description: "Shared components in @repo/ui."
type: "reference"
---

# UI Components

Shared atomic components for the playground. Full interactive docs with live examples:

**→ [Storybook](/storybook/)**

---

## Available Components

| Component      | Description                               |
| -------------- | ----------------------------------------- |
| `Button`       | Actions, links, form submits              |
| `Input`        | Text input with label and helper text     |
| `Select`       | Dropdown selection                        |
| `Slider`       | Range input with label and unit display   |
| `Switch`       | Toggle switch                             |
| `Card`         | Content container                         |
| `Badge`        | Small label/tag                           |
| `Label`        | Form label                                |
| `ColorPalette` | Color swatch display                      |
| `Sidebar`      | Collapsible sidebar with panel/main areas |

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

## Patterns

### Button

```tsx
import { Button } from "@repo/ui";

<Button variant="primary" size="medium">
  Click me
</Button>

<Button variant="destructive" isLoading={false}>
  Delete
</Button>
```

### Input with Label

```tsx
import { Input } from "@repo/ui";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>;
```

### Slider

```tsx
import { Slider } from "@repo/ui";

<Slider label="Volume" value={50} min={0} max={100} unit="%" onChange={(v) => console.log(v)} />;
```

### Sidebar

```tsx
import { Sidebar } from "@repo/ui";

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

Components live in `packages/ui/src/components/`.
