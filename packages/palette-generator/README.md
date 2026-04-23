# @repo/palette-generator

> Generate color palettes using color theory—complementary, analogous, monochromatic, and more.

---

## 🚀 Quick Start

```bash
pnpm add @repo/palette-generator
```

```tsx
import { PaletteGenerator } from "@repo/palette-generator";

export default function MyPalette() {
  return <PaletteGenerator />;
}
```

## 🎨 Generator Types

| Type | Description |
|------|-------------|
| **Analogous** | Colors next to each other on the wheel |
| **Complementary** | Opposite colors |
| **Monochromatic** | Same hue, different saturation |
| **Triadic** | Three colors evenly spaced |
| **Xadic** | Four colors (x pattern) |

## 🧩 Context

```tsx
import { usePalette } from "@repo/palette-generator";

const { palette, setPalette } = usePalette();
```

---

## 🎯 Live Example

See it in action at [joska-p.github.io/playground/colors/palette-generator](https://joska-p.github.io/playground/colors/palette-generator)

---

*Part of @repo/playground*