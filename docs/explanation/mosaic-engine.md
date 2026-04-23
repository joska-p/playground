# Mosaic Engine

> How the mosaic maker works—tiles, colors, and all the fun.

---

## 🏗️ Core Philosophy

Three main pieces make this work:

1. **Tile Registry** — Shape definitions (not React components!)
2. **Zustand Store** — Centralized state
3. **CSS Grid** — Efficient rendering

## 🗄️ State Management

```typescript
const { tileSet, tiles, currentPalette, mosaicRef } = useMosaicStore();
```

### Key Actions

| Action | What It Does |
|--------|-----------|
| `setMosaicRef(ref)` | Initialize, calculates tile count |
| `updateTiles()` | Regenerate all tiles |
| `updateTileSet(name)` | Toggle a tile type |
| `updatePalette(palette)` | Apply new colors |
| `updateCurrentPalettes()` | Cycle through palettes |

## 🧱 Tile Registry

Tiles live in `src/components/tiles/tile-registry.ts`:

```typescript
export const TILE_REGISTRY = {
  CornerCircles: {
    shapes: [
      { type: "circle", cx: 0, cy: 0, r: 50, colorIndex: 0 },
    ],
  },
};
```

### Supported Shapes

- `circle` — Filled circles
- `rect` — Rectangle
- `polygon` — Custom polygon
- `path` — SVG path

## 🎨 Palette System

Colors come from CSS custom properties:

```css
--color-0  /* First color */
--color-1  /* Second */
--color-2  /* ... */
--color-3
--color-4
```

> Tip: Switch palettes in the sidebar—they're stored in state!

## 🔄 Data Flow

```
1. ResizeObserver detects container size
2. Store action: setMosaicRef(ref)
3. Calculate: how many tiles fit?
4. Generate: random tiles from registry
5. Render: CSS Grid displays them
```

## ➕ Add a New Tile

1. Add to `src/components/tiles/tile-registry.ts`
2. Add name to `initialTileSet` in `src/core/config.ts`
3. Done—it just works!

---

## 📚 Learn More

| Topic | Where |
|-------|-------|
| Architecture | [architecture](./architecture.md) |
| Component API | [reference/component-api](../reference/component-api.md) |