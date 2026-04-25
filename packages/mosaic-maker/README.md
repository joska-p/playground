# @repo/mosaic-maker

> Procedural pattern generation engine for the Creative Playground. Transforms color palettes into complex mosaics using CSS Grid and optimized React rendering.

---

## 🚀 Quick Start

```bash
pnpm add @repo/mosaic-maker
```

```tsx
import { MosaicMaker } from "@repo/mosaic-maker";

export default function Patterns() {
  return <MosaicMaker />;
}
```

## 🧠 Core Concepts

1. **Tile Registry:** Data-driven shape definitions (SVG/Path).
2. **State Engine:** Centralized Zustand store for real-time reactivity.
3. **Layout Logic:** Efficient tiling algorithms utilizing modern CSS.

---

## 📖 Documentation

Detailed engineering guides and architecture details:

- [**Architecture Overview**](https://joska-p.github.io/playground/docs/explanation/architecture)
- [**Adding Engines Guide**](https://joska-p.github.io/playground/docs/how-to/adding-pages)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
