# Mosaic Engine Architecture Guide

This document explains the data-driven "Engine + Ruleset" architecture used by the Mosaic Maker. This design replaces hundreds of lines of boilerplate JSX with a flexible, scalable system for generating generative art.

---

## 🏗️ Core Philosophy

Instead of treating each tile pattern (e.g., "Cube", "Rainbow") as a unique React component, we treat them as **data definitions**. 

- **The Engine (`Tile.tsx`)**: A single React component that acts as a "player." It knows how to render SVG shapes but doesn't know *what* to render until it receives a definition.
- **The Registry (`tile-registry.ts`)**: A centralized dictionary of "DNA" for every tile pattern. It defines the shapes, their coordinates, and which color index from the palette they should use.

---

## 🛠️ The Registry (`tile-registry.ts`)

A tile is defined as an array of `shapes`. Each shape has a `type`, coordinates, and a `colorIndex` (0–4).

### Example: Defining a "CornerCircles" Tile
```typescript
export const TILE_REGISTRY = {
  CornerCircles: {
    shapes: [
      { type: "circle", cx: 0,   cy: 0,   r: 50, colorIndex: 0 },
      { type: "circle", cx: 100, cy: 100, r: 50, colorIndex: 1 },
    ],
  },
  // ...
};
```

### Supported Shape Types:
- **`circle`**: `cx`, `cy`, `r`
- **`rect`**: `x`, `y`, `width`, `height`
- **`polygon`**: `points` (standard SVG points string)
- **`path`**: `d` (standard SVG path data)

---

## ⚙️ The Engine (`Tile.tsx`)

The engine performs several critical tasks to keep the individual patterns simple:

1.  **SVG Wrapper**: It provides the common `<svg viewBox="0 0 100 100">` and `preserveAspectRatio` for all tiles.
2.  **Rotation Logic**: It applies CSS rotations uniformly using the `transform` style.
3.  **Color Injection**: It maps the `colorIndex` from the registry to the actual CSS variables (`--color-0`, etc.) provided by the current palette.
4.  **Performance**: It uses a flat rendering loop, making it extremely efficient for grids with hundreds of tiles.

---

## 🔄 Data Flow

1.  **Context**: `MosaicMakerProvider` calculates how many tiles fit the screen.
2.  **Generation**: It generates a `TileInstance` for each slot. A `TileInstance` is a unique object containing:
    -   `id`: For stable React keys.
    -   `name`: The key to look up in the `TILE_REGISTRY`.
    -   `colors`: An array of 5 color indices chosen from the palette.
    -   `rotation`: A CSS variable for the chosen rotation.
3.  **Display**: `MosaicDisplay` maps over the instances and passes the data to the `Tile` engine.
4.  **Render**: The `Tile` engine looks up the "DNA" in the registry and draws the shapes.

---

## 🚀 Adding a New Tile

To add a new pattern, you **no longer need to create a new file**. Simply:
1.  Open `packages/mosaic-maker/src/components/tiles/tile-registry.ts`.
2.  Add a new entry to the `TILE_REGISTRY` object.
3.  Add the new name to the `defaultTileSet` in `config.ts`.

The UI (TileSetControls) and the Engine will automatically pick up the new pattern.

---

*This architecture ensures that the Mosaic Maker remains performant and easy to extend as the project grows.*
