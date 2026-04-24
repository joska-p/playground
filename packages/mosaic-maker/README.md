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

## 🏗️ Core Philosophy

Three main pieces make this work:

1.  **Tile Registry** — Shape definitions (not React components!)
2.  **Zustand Store** — Centralized state (`useMosaicStore`)
3.  **CSS Grid** — Efficient rendering

## 🗄️ State Management

```typescript
const { tileSet, tiles, currentPalette, mosaicRef } = useMosaicStore();
```

### Key Actions

| Action | What It Does |
| :--- | :--- |
| `setMosaicRef(ref)` | Initialize, calculates tile count |
| `updateTiles()` | Regenerate all tiles |
| `updateTileSet(name)` | Toggle a tile type |
| `updatePalette(palette)` | Apply new colors |
| `updateCurrentPalettes()` | Cycle through palettes |

## 🧱 Tile Registry

Tiles live in `src/components/tiles/tile-registry.ts`. They are defined as pure data:

```typescript
export const TILE_REGISTRY = {
  CornerCircles: {
    shapes: [{ type: "circle", cx: 0, cy: 0, r: 50, colorIndex: 0 }],
  },
};
```

### Supported Shapes
-   `circle` — Filled circles
-   `rect` — Rectangle
-   `polygon` — Custom polygon
-   `path` — SVG path

## 🔄 Data Flow

1.  `ResizeObserver` detects container size.
2.  Store action: `setMosaicRef(ref)`.
3.  Calculate: how many tiles fit?
4.  Generate: random tiles from registry.
5.  Render: CSS Grid displays them.

## ➕ Add a New Tile

1.  Add definition to `src/components/tiles/tile-registry.ts`.
2.  Add name to `initialTileSet` in `src/core/config.ts`.

---

## 🎨 Controls

| Control | What It Does |
| :--- | :--- |
| Shuffle colors | Randomize palette |
| Shuffle rotations | Randomize tile rotation |
| New palettes | Load more palettes |
| New tiles | Regenerate all tiles |
| Tile size | Adjust tile dimensions |
| Gap size | Space between tiles |

---

_Part of @repo/playground_
