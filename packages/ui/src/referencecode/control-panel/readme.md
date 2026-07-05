# ControlPanel API Documentation

_A responsive, high-performance control panel built for creative coding in React 19 and Tailwind CSS._

It maximizes canvas space by rendering as a **fixed side panel in landscape** and a **slide-up drawer triggered by a FAB in portrait**[cite: 26]. It requires zero external UI dependencies and includes highly interactive, inline-editable inputs optimized for rapid iteration[cite: 26].

## Table of Contents

- [Philosophy](#philosophy)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference: `<ControlPanel />`](#api-reference-controlpanel-)
- [API Reference: Sections](#api-reference-controlsection)
- [API Reference: Controls](#api-reference-controls)
- [Layout Integration](#layout-integration)
- [Theming](#theming)
- [Accessibility](#accessibility)

---

## Philosophy

Creative tools demand maximum viewport space[cite: 26]. Instead of forcing a single layout to morph between orientations (which leads to cramped controls or hidden labels), `ControlPanel` uses two distinct, native-feeling patterns[cite: 26]:

- **Landscape (`orientation: landscape`):** A fixed right-hand sidebar. Always visible, scrollable, full labels[cite: 26].
- **Portrait (`orientation: portrait`):** The canvas takes 100% of the screen[cite: 26]. A Floating Action Button (FAB) appears in the bottom right[cite: 26]. Tapping it opens a slide-up drawer with an overlay[cite: 26].

---

## Prerequisites

This component uses standard semantic Tailwind CSS classes (commonly found in shadcn/ui or similar setups)[cite: 26]. Ensure your `tailwind.config.js` defines these colors in your `cssVariables` or theme extension[cite: 26]:

- `surface` (background)[cite: 26]
- `foreground`, `muted-foreground` (text)[cite: 26]
- `border` (borders)[cite: 26]
- `primary`, `primary-foreground` (accents, FAB, sliders)[cite: 26]

---

## Installation

Add `@repo/ui` to the project[cite: 26]:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

---

## Quick Start

```tsx
import { useState } from 'react';
import { ControlPanel } from '@repo/ui/ControlPanel';
import type { ControlSection } from '@repo/ui/ControlPanel';

const sections: ControlSection[] = [
  {
    id: 'transform',
    label: 'Transform',
    defaultOpen: true,
    controls: [
      {
        id: 'scale',
        type: 'slider',
        label: 'Scale',
        value: 1.0,
        min: 0,
        max: 5,
        step: 0.01,
        onChange: (v) => console.log(v)
      },
      {
        id: 'visible',
        type: 'toggle',
        label: 'Visible',
        value: true,
        onChange: (v) => console.log(v)
      }
    ]
  }
];

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background h-dvh w-dvw overflow-hidden">
      {/* Your Canvas Wrapper */}
      <div className="h-full transition-[padding] duration-300 landscape:pr-72">
        <MyCanvas />
      </div>

      {/* Control the drawer declaratively via standard state hooks */}
      <ControlPanel
        onOpenChange="{setIsOpen}"
        open="{isOpen}"
        sections="{sections}"
      />
    </div>
  );
}
```

---

## API Reference: `<ControlPanel />`

### Props

| Prop       | Type               | Default        | Description                          |
| ---------- | ------------------ | -------------- | ------------------------------------ |
| `sections` | `ControlSection[]` | **(Required)** | Array of control sections to render. |

|
| `width` | `string` | `'w-72'` | Tailwind width class for the landscape sidebar.

|
| `accordion` | `boolean` | `true` | If true, opening a section closes all other sections.

|
| `defaultOpenSections` | `string[]` | `[]` | Array of section IDs that should be open on initial render. If empty, defaults to opening the first section.

|
| `open` | `boolean` | `undefined` | Declarative controlled open state for the portrait drawer toggle. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback triggered when the portrait drawer open state changes (e.g., clicking the FAB or backdrop).

|
| `header` | `ReactNode` | `undefined` | Custom header slot. Renders at the top of the panel/drawer.

|
| `footer` | `ReactNode` | `undefined` | Custom footer slot. Renders at the bottom of the panel/drawer.

|
| `className` | `string` | `undefined` | Additional classes applied to the landscape `<aside>` element.

|

---

## API Reference: `ControlSection`

Used to group controls together.

| Prop | Type     | Default        | Description                        |
| ---- | -------- | -------------- | ---------------------------------- |
| `id` | `string` | **(Required)** | Unique identifier for the section. |

|
| `label` | `string` | **(Required)** | Display text in the section header.

|
| `icon` | `ComponentType<{ className?: string }>` | `undefined` | Optional Lucide-style icon component.

|
| `controls` | `Control[]` | **(Required)** | Array of controls to render inside this section.

|
| `defaultOpen` | `boolean` | `undefined` | Hint for initial open state (overridden by `defaultOpenSections` prop on panel).

|
| `flow` | `'horizontal' | 'vertical'` | `'vertical'` | Layout orientation distribution direction structure for inner controls. |

---

## API Reference: Controls

All controls extend the `ControlBase` interface:

```typescript
interface ControlBase {
  id: string; // Required
  label: string; // Required
  disabled?: boolean;
  hidden?: boolean; // If true, control is not rendered
  tooltip?: string; // Reserved for future use
}
```

### `SliderControl`

Continuous value selection. Click the value display to type an exact number.

```typescript
{
  type: 'slider',
  value: number,         // Required
  min?: number,          // default: 0
  max?: number,          // default: 1
  step?: number,         // default: 0.01
  onChange: (v: number) => void
}

```

### `ColorControl`

Color picker. Renders a swatch. Clicking the hex code allows inline text editing.

```typescript
{
  type: 'color',
  value: string,         // Required (hex format, e.g., '#ff6600')
  onChange: (v: string) => void
}

```

### `ColorPaletteControl`

Radio matrix selection layout grouping for predefined styling color hex charts.

```typescript
{
  type: 'color-palette',
  name: string,          // Required input group identity key
  value: string,         // Required current selected choice color string
  checked: boolean,      // Required boolean flag tracking selection
  colors: string[],      // Required choice string list mapping color blocks
  orientation?: 'horizontal' | 'vertical', // default: 'horizontal'
  size?: 'small' | 'medium' | 'large',     // default: 'medium'
  onChange?: (v: string) => void
}

```

### `ToggleControl`

Boolean switch.

```typescript
{
  type: 'toggle',
  value: boolean,        // Required
  onChange: (v: boolean) => void
}

```

### `SelectControl`

Dropdown selection.

```typescript
{
  type: 'select',
  value: string,                          // Required
  options: { label: string; value: string }[], // Required
  onChange: (v: string) => void
}

```

### `NumberControl`

Discrete numeric input with stepper buttons. Click the number to type.

```typescript
{
  type: 'number',
  value: number,         // Required
  min?: number,          // default: -Infinity
  max?: number,          // default: Infinity
  step?: number,         // default: 1
  onChange: (v: number) => void
}

```

### `Vec2Control` & `Vec3Control`

Multi-axis numeric inputs. Rendered with color-coded labels (`x` = red, `y` = green, `z` = blue). Click any axis value to edit.

```typescript
// Vec3 Example
{
  type: 'vec3',
  value: [number, number, number], // Required
  min?: number,          // default: -Infinity
  max?: number,          // default: Infinity
  step?: number,         // default: 0.1
  labels?: ['x', 'y', 'z'], // Optional custom labels
  onChange: (v: [number, number, number]) => void
}

```

### `ButtonControl`

Action trigger.

```typescript
{
  type: 'button',
  label: string,         // Required
  variant?: 'default' | 'primary' | 'danger', // default: 'default'
  icon?: ComponentType,
  onClick: () => void
}

```

---

## Layout Integration

Because the landscape sidebar is `position: fixed`, your canvas or main content **must** be offset to prevent overlap.

Use Tailwind's `landscape:` variant to apply padding only when the sidebar is visible. The component handles a smooth CSS transition for this padding.

```tsx
<div className="/* Must match the 'width' prop on ControlPanel */ h-full w-full transition-[padding] duration-300 landscape:pr-72">
  <Canvas />
</div>
```

Note: In portrait mode, the canvas naturally takes up 100% of the screen because the panel is a drawer.

---

## Theming

The component uses standard Tailwind semantic classes. If you are using a theme setup like shadcn/ui, it will inherit your theme automatically.

Key classes used:

- **Backgrounds:** `bg-surface` (Panel), `bg-muted` (Inputs/Sections hover)

- **Text:** `text-foreground`, `text-muted-foreground`

- **Borders:** `border-border`

- **Accents:** `bg-primary`, `text-primary-foreground`, `accent-primary` (Range sliders)

### Customizing the FAB (Portrait Trigger)

If you need to change the FAB color, size, or shadow, you can modify the hardcoded classes inside `ControlPanel.tsx`. In a future iteration, this could be exposed as a `fabClassName` prop.

---

## Accessibility

- **Keyboard Navigation:**
- `Escape` closes the portrait drawer panel context.
- `Tab` hooks into a native circular focus trap loop container while portrait view sheets are active.
- `Enter` commits inline keyboard text configurations (Number, Vec, Slider values).

- **ARIA Attributes:**
- Landscape panel uses `role="region" aria-label="Controls"`.

- Portrait drawer uses `role="dialog" aria-modal="true"` or dynamic context evaluations.

- Toggle controls use `role="switch" aria-checked={value}`.

- Collapsible sections use `aria-expanded={isOpen}`.

- **Focus Management:** When inline-editing an input value, the resulting input field automatically targets active browser focus and selects text ranges instantly for clean overwriting.
