---
title: Palette Generator
description: Color palette generation and manipulation tool. Pick, edit, and preview color schemes using colorjs.io.
tags:
  - reference
  - palette-generator
order: 20
---

# @repo/palette-generator

Relies on [`@repo/palette-engine`](../engines/palette-engine/) for color space math and harmony rules.

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
@repo/palette-engine                        # Pure color math + rules
  └─ @repo/palette-generator               # React UI
       ├─ Controls
       │   └─ ColorSpaceControls (×4)
       │       ├─ ColorSpaceCanvas
       │       └─ Slider
       └─ Display
```

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

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_
