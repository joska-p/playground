# ControlPanel API Documentation

A responsive, high-performance control panel built for creative coding in React 19 and Tailwind CSS.

It maximizes canvas space by rendering as a **fixed side panel in landscape** and a **slide-up drawer triggered by a FAB in portrait**. It requires zero external UI dependencies and includes highly interactive, inline-editable inputs optimized for rapid iteration.

## Table of Contents

- [Philosophy](#philosophy)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference: `<ControlPanel />`](#api-reference-controlpanel-)
- [API Reference: `ControlPanelRef`](#api-reference-controlpanelref)
- [API Reference: Sections](#api-reference-controlsection)
- [API Reference: Controls](#api-reference-controls)
- [Layout Integration](#layout-integration)
- [Theming](#theming)
- [Accessibility](#accessibility)

---

## Philosophy

Creative tools demand maximum viewport space. Instead of forcing a single layout to morph between orientations (which leads to cramped controls or hidden labels), `ControlPanel` uses two distinct, native-feeling patterns:

- **Landscape (`orientation: landscape`):** A fixed right-hand sidebar. Always visible, scrollable, full labels.
- **Portrait (`orientation: portrait`):** The canvas takes 100% of the screen. A Floating Action Button (FAB) appears in the bottom right. Tapping it opens a slide-up drawer with an overlay.

---

## Prerequisites

This component uses standard semantic Tailwind CSS classes (commonly found in shadcn/ui or similar setups). Ensure your `tailwind.config.js` defines these colors in your `cssVariables` or theme extension:

- `surface` (background)
- `foreground`, `muted-foreground` (text)
- `border` (borders)
- `primary`, `primary-foreground` (accents, FAB, sliders)

---

## Installation

Add `@repo/ui` to the project:

```JSON
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

---

## Quick Start

```tsx
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
  return (
    <div className="bg-background h-dvh w-dvw overflow-hidden">
      {/* Your Canvas Wrapper */}
      <div className="h-full transition-[padding] duration-300 landscape:pr-72">
        <MyCanvas />
      </div>

      <ControlPanel sections={sections} />
    </div>
  );
}
```

---

## API Reference: `<ControlPanel />`

### Props

| Prop                  | Type                      | Default        | Description                                                                                                  |
| :-------------------- | :------------------------ | :------------- | :----------------------------------------------------------------------------------------------------------- |
| `sections`            | `ControlSection[]`        | **(Required)** | Array of control sections to render.                                                                         |
| `width`               | `string`                  | `'w-72'`       | Tailwind width class for the landscape sidebar.                                                              |
| `accordion`           | `boolean`                 | `true`         | If true, opening a section closes all other sections.                                                        |
| `defaultOpenSections` | `string[]`                | `[]`           | Array of section IDs that should be open on initial render. If empty, defaults to opening the first section. |
| `open`                | `boolean`                 | `undefined`    | Controlled state for the portrait drawer.                                                                    |
| `onOpenChange`        | `(open: boolean) => void` | `undefined`    | Callback when drawer open state changes.                                                                     |
| `header`              | `ReactNode`               | `undefined`    | Custom header slot. Renders at the top of the panel/drawer.                                                  |
| `footer`              | `ReactNode`               | `undefined`    | Custom footer slot. Renders at the bottom of the panel/drawer.                                               |
| `className`           | `string`                  | `undefined`    | Additional classes applied to the landscape `<aside>` element.                                               |
| `ref`                 | `Ref<ControlPanelRef>`    | `undefined`    | Imperative handle for programmatic control.                                                                  |

---

## API Reference: `ControlPanelRef`

Accessed via `useRef<ControlPanelRef>(null)`.

| Method   | Signature    | Description                                      |
| :------- | :----------- | :----------------------------------------------- |
| `open`   | `() => void` | Opens the portrait drawer. (No-op in landscape). |
| `close`  | `() => void` | Closes the portrait drawer.                      |
| `toggle` | `() => void` | Toggles the portrait drawer state.               |

---

## API Reference: `ControlSection`

Used to group controls together.

| Prop          | Type                                    | Default        | Description                                                                      |
| :------------ | :-------------------------------------- | :------------- | :------------------------------------------------------------------------------- |
| `id`          | `string`                                | **(Required)** | Unique identifier for the section.                                               |
| `label`       | `string`                                | **(Required)** | Display text in the section header.                                              |
| `icon`        | `ComponentType<{ className?: string }>` | `undefined`    | Optional Lucide-style icon component.                                            |
| `controls`    | `Control[]`                             | **(Required)** | Array of controls to render inside this section.                                 |
| `defaultOpen` | `boolean`                               | `undefined`    | Hint for initial open state (overridden by `defaultOpenSections` prop on panel). |

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

Continuous value selection. **Click the value display to type an exact number.**

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

Discrete numeric input with stepper buttons. **Click the number to type.**

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

Multi-axis numeric inputs. Rendered with color-coded labels (`x` = red, `y` = green, `z` = blue). **Click any axis value to edit.**

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

_Note: In portrait mode, the canvas naturally takes up 100% of the screen because the panel is a drawer._

---

## Theming

The component uses standard Tailwind semantic classes. If you are using a theme setup like shadcn/ui, it will inherit your theme automatically.

Key classes used:

- **Backgrounds:** `bg-surface` (Panel), `bg-muted` (Inputs/Sections hover)
- **Text:** `text-foreground`, `text-muted-foreground`
- **Borders:** `border-border`
- **Accents:** `bg-primary`, `text-primary-foreground`, `accent-primary` (Range sliders)

### Customizing the FAB (Portrait Trigger)

If you need to change the FAB color, size, or shadow, you can modify the hardcoded classes inside `ControlPanel.tsx` under the `{/* ─── Portrait: FAB trigger ───────────────────── */}` comment. In a future iteration, this could be exposed as a `fabClassName` prop.

---

## Accessibility

- **Keyboard Navigation:**
  - `Escape` closes the portrait drawer.
  - `Enter` commits inline text edits (Number, Vec, Slider values).
- **ARIA Attributes:**
  - Landscape panel uses `role="region" aria-label="Controls"`.
  - Portrait drawer uses `role="dialog" aria-modal="true"`.
  - Toggle controls use `role="switch" aria-checked={value}"`.
  - Collapsible sections use `aria-expanded={isOpen}`.
- **Focus Management:** When inline-editing a value (clicking a number), the resulting `<input>` is automatically focused and its contents selected for easy overwriting.
- **Scroll Lock:** When the portrait drawer is open, `document.body.style.overflow` is set to `hidden` to prevent background scrolling, and restored on unmount/close.
