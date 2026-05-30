---
title: "Palette Generator"
description: "Color palette generation and manipulation tool."
category: "reference"
tags:
  - reference
  - palette-generator
order: 20
---

# @repo/palette-generator

> Color palette generation and manipulation tool. Pick, edit, and preview color schemes using colorjs.io.

## Exports

| Export | Path | Description |
|--------|------|-------------|
| `PaletteGenerator` | `@repo/palette-generator/PaletteGenerator` | Main app component |
| `Controls` | `@repo/palette-generator/Controls` | Color-picking and rule controls |
| `Display` | `@repo/palette-generator/Display` | Renders the generated palette |

## Usage

```tsx
import { PaletteGenerator } from "@repo/palette-generator";

export default function Palettes() {
  return <PaletteGenerator />;
}
```

Uses `colorjs.io` for color math and Zustand for state management.

## Architecture

`PaletteGenerator` composes a `Sidebar` layout with a `Controls` panel on the left and a `Display` area on the right.
