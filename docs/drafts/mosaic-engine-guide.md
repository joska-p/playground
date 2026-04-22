# Mosaic Engine Architecture Guide

This document explains the architecture of the `@repo/mosaic-maker` package, which generates customizable mosaic patterns from color palettes.

---

## 🏗️ Core Philosophy

The Mosaic Maker uses:

- **Tile Registry**: Data definitions for tile shapes (not React components)
- **Zustand Store**: Centralized state management
- **Canvas Rendering**: Efficient grid rendering via CSS Grid

---

## 🗄️ State Management

Store is in `src/store/useMosaicStore.tsx`:

```typescript
const { tileSet, tiles, currentPalette, mosaicRef } = useMosaicStore();
```

Actions are atomic and handle their own side effects:

```typescript
export const setMosaicRef = (ref) => {
  useMosaicStore.setState({ mosaicRef: ref });
  _updateTiles(); // atomic: update tiles after ref is set
};
```

---

## 🗄️ Tile Registry

Tiles are defined in `src/components/tiles/tile-registry.ts` as shape arrays:

```typescript
export const TILE_REGISTRY = {
  CornerCircles: {
    shapes: [
      { type: "circle", cx: 0, cy: 0, r: 50, colorIndex: 0 },
    ],
  },
};
```

Supported shapes: `circle`, `rect`, `polygon`, `path`

---

## 🔄 Data Flow

1. **ResizeObserver**: Tracks container dimensions
2. **Store Action**: Updates `mosaicRef` → computes tile count → generates tiles
3. **MosaicDisplay**: Renders tiles via CSS Grid

---

## 🔧 Key Actions

- `setMosaicRef(ref)` - Initialize, computes tile count
- `updateTiles()` - Regenerate all tiles
- `updateTileSet(name)` - Toggle tile type
- `updatePalette(palette)` - Apply color palette
- `updateCurrentPalettes()` - Cycle through palette pages

---

## 🎨 Adding a New Tile

1. Add entry to `src/components/tiles/tile-registry.ts`
2. Add name to `initialTileSet` in `src/core/config.ts`

UI automatically picks it up.