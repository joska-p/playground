---
title: "Palette Generator"
description: "A color-picking experience that renders four color spaces as interactive canvases — tap a pixel, pick a base color, apply a harmony rule, and watch a palette accumulate in the display."
category: "reference"
tags:
  - reference
  - palette-generator
order: 20
---

---
title: 'Palette Generator'
coordinates: '/visuals/color'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/palette-generator

---

## Essence

Palette Generator is the React UI layer of a two-package color palette
system. It takes the pure generation logic from
[`@repo/palette-engine`](/docs/reference/packages/palette-engine) and
gives it a body: four `<canvas>` elements each rendering a different
color space, a slider for the third dimension, buttons for each harmony
rule, and a display that shows every palette you've generated stacked as
rows of swatches.

The interesting tension is between _exploration_ and _precision_. The
color-space canvases are maps — each pixel is a color, and clicking
anywhere on the map picks that color as the new base. This is fast and
intuitive: you navigate by sight, not by entering coordinates. But the
canvas is finite and quantized, so fine-grained selection comes from the
slider (the z-axis) and the ability to switch between color spaces. OKLCh
lets you explore hue and chroma while holding lightness steady; sRGB lets
you dial in exact channel values. The same base color lives at different
coordinates in each space, and the canvas makes those relationships
visible.

The control panel renders a `ColorSpaceControls` for each of the four
color spaces — each one a canvas plus a slider. Clicking on a canvas
pixel updates the shared base color in the Zustand store. The harmony
rule buttons read the current base color and call `generatePalette` from
the engine, appending the result to a growing list of palettes. The
display area renders these as stacked rows: the base color swatch first,
then one row per generated palette, each color a 40×40 square.

State lives in a global Zustand store. Two selector hooks
(`usePaletteBaseColor`, `usePalettePalettes`) let components subscribe
to exactly the slice they needs; two mutation functions
(`setPaletteBaseColor`, `addPalette`) handle updates. The component tree
is small: `PaletteGenerator` wraps a `Sidebar` with `Controls` in the
panel and `Display` in the main area.

## Quick Launch

```bash
pnpm dev --filter @repo/palette-generator
```

Or install it into your own project:

```bash
pnpm add @repo/palette-generator
```

```tsx
import { PaletteGenerator } from '@repo/palette-generator';

export default function Palettes() {
  return <PaletteGenerator />;
}
```

```tsx
import '@repo/palette-generator/styles';
```

## Field Notes

- **The Catalyst:** The question of what a color "is" from a user's
  perspective. In HSL, a warm orange and a cool blue differ mainly in
  hue. In sRGB, they differ across all three channels. In OKLCh, they
  sit at different angles but similar chroma. The four-canvas layout
  makes these differences tangible — you see the same region of color
  space rendered four ways, and the differences between the spaces become
  part of the experience. The engine's rules operate in OKLCh regardless
  of which canvas you picked from, which means the harmonies are always
  perceptually balanced even if the picking was intuitive rather than
  precise.

- **Quirks & Anomalies:** The `ColorSpaceCanvas` renders by iterating
  over every pixel, calling `getColor(x, y, zValue)` for each one, and
  writing the result into an `ImageData` — no WebGL, no OffscreenCanvas,
  no optimization beyond the browser's native canvas rendering. For the
  default 200×200 size this is fine; at larger sizes the per-frame cost
  becomes noticeable, especially when the slider is dragging and the
  canvas redraws on every value change. The `addPalette` function reads
  the current palettes array via `getState()` rather than from a
  Zustand selector, which means it always sees the latest state even if
  the component hasn't re-rendered. This is correct but unusual — most
  Zustand mutations go through the setter, not the getter.

- **Future Horizons:** Palette export — CSS variables, Tailwind config,
  JSON, or a shareable URL encoding the base color and rule. Animated
  transitions when switching color spaces, so the canvas morphs from one
  space to another instead of snapping. A "history" timeline showing
  every base color you've picked, letting you rewind to an earlier
  exploration. Per-palette locking: pin specific colors in a palette
  while regenerating the rest with a different rule. A color-blindness
  simulator that previews how the generated palettes look through
  different vision models.

---

## Architecture

```
@repo/palette-engine                        # Pure color math + rules
  └─ @repo/palette-generator               # React UI
       ├─ Sidebar
       │   ├─ Sidebar.Panel
       │   │   └─ Controls
       │   │       ├─ ColorSpaceControls (×4)
       │   │       │   ├─ ColorSpaceCanvas   — 2D pixel map of a color space
       │   │       │   └─ Slider            — third-axis control (from @repo/ui)
       │   │       └─ Button[]              — one per harmony rule
       │   └─ Sidebar.Main
       │       └─ Display                   — stacked rows of palette swatches
       └─ Zustand Store
           ├─ usePaletteBaseColor()         — selector: current Color
           ├─ usePalettePalettes()          — selector: Palette[]
           ├─ setPaletteBaseColor(color)    — mutation
           └─ addPalette(palette)           — mutation
```

## State Management

The Zustand store holds two pieces of state: the current base color and
the accumulated list of generated palettes. Initial base color is an
OKLCh teal (`[0.7, 0.1, 196]`).

| Hook / Function              | Type     | Effect                        |
| :--------------------------- | :------- | :---------------------------- |
| `usePaletteBaseColor()`      | Selector | Returns the current `Color`   |
| `usePalettePalettes()`       | Selector | Returns `Palette[]`           |
| `setPaletteBaseColor(color)` | Mutation | Replaces the base color       |
| `addPalette(palette)`        | Mutation | Appends a palette to the list |

---

_See [@repo/palette-engine](/docs/reference/packages/palette-engine) for the pure color math engine, color space definitions, and harmony rules._

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

