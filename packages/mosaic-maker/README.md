# @repo/mosaic-maker

> Transform color palettes into beautiful mosaic patterns.

---

## 🚀 Quick Start

```bash
pnpm add @repo/mosaic-maker
```

```tsx
import { MosaicMaker } from "@repo/mosaic-maker";

export default function MyMosaic() {
  return <MosaicMaker />;
}
```

## 🧩 What's Included

| Export | Description |
|--------|-------------|
| `MosaicMaker` | Main component |
| `useMosaicStore` | Zustand store |
| `updatePalette` | Change colors |
| `updateTileSet` | Toggle tile types |
| `updateTiles` | Regenerate tiles |

## 🎨 Controls

| Control | What It Does |
|--------|-----------|
| Shuffle colors | Randomize palette |
| Shuffle rotations | Randomize tile rotation |
| New palettes | Load more palettes |
| New tiles | Regenerate all tiles |
| Tile size | Adjust tile dimensions |
| Gap size | Space between tiles |

## 🎭 Available Tiles

- CornerCircles
- Crosses
- Diagonals
- Xs
- Lines
- Dots
- Plus signs
- Triangles
- Halfcircles
- Rectangles

---

## 📖 Learn More

| Topic | Link |
|-------|------|
| Engine Deep Dive | [docs/explanation/mosaic-engine.md](../../docs/explanation/mosaic-engine.md) |
| Architecture | [docs/explanation/architecture.md](../../docs/explanation/architecture.md) |

---

*Part of @repo/playground*