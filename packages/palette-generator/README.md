# @repo/palette-generator

> Color palette generation and manipulation tool. Pick, edit, and preview color schemes using colorjs.io.

## Quick Start

```bash
pnpm add @repo/palette-generator
```

```tsx
import { PaletteGenerator } from '@repo/palette-generator';

export default function Palettes() {
  return <PaletteGenerator />;
}
```

## Architecture

```
PaletteGenerator
  ├─ Sidebar (from @repo/ui)
  │   ├─ Controls
  │   │   └─ ColorSpaceControls (×4 — OKLab, OKLCh, HSL, sRGB)
  │   │       ├─ ColorSpaceCanvas    ← 2D slice rendered via ImageData
  │   │       └─ Slider              ← Z-axis value
  │   └─ Generate buttons (×4 — one per harmony rule)
  └─ Display
      ├─ Base color swatch
      └─ Generated palette rows
```

## Color Spaces

Each space defines a 2D slice with a Z-axis slider:

| Space     | X Axis        | Y Axis          | Z Slider  |
| --------- | ------------- | --------------- | --------- |
| **OKLab** | a (green–red) | b (blue–yellow) | Lightness |
| **OKLCh** | Chroma        | Hue             | Lightness |
| **HSL**   | Hue           | Saturation      | Lightness |
| **sRGB**  | Red           | Green           | Blue      |

`ColorSpaceCanvas` renders the slice by iterating every pixel and computing its RGB value via the space's `getColor(x, y, z)` function.

## Harmony Rules

Each rule takes a base `Color` and returns 6 palette colors:

| Rule              | Method                                                     |
| ----------------- | ---------------------------------------------------------- |
| **Analogous**     | Base ±30° hue, with a lighter variant each                 |
| **Complementary** | Base + 180° hue, with light/dark variants                  |
| **Monochromatic** | 6 lightness steps (0.95 → 0.2), chroma reduced at extremes |
| **Triadic**       | 0°, 120°, 240° apart, each with light/dark variant         |

## Exports

| Export             | Path                                       | Description                     |
| ------------------ | ------------------------------------------ | ------------------------------- |
| `PaletteGenerator` | `@repo/palette-generator/PaletteGenerator` | Main app component              |
| `Controls`         | `@repo/palette-generator/Controls`         | Color-picking and rule controls |
| `Display`          | `@repo/palette-generator/Display`          | Renders the generated palette   |
| `./styles`         | `@repo/palette-generator/styles`           | Component CSS                   |

## State Management

Uses Zustand with per-slice selectors:

```typescript
const baseColor = usePaletteBaseColor();
const palettes = usePalettePalettes();
setPaletteBaseColor(color);
addPalette(palette);
```

## Usage

```tsx
import { PaletteGenerator } from '@repo/palette-generator';

export default function Palettes() {
  return <PaletteGenerator />;
}
```

Uses `colorjs.io` for color math and Zustand for state management.

---

_Part of [Creative Playground](https://jpotin.gitlab.io/playground)_
