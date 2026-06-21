---
title: "Mosaic Maker"
description: "Procedural pattern generation engine. Transforms color palettes into complex mosaic grids using CSS Grid and optimized React rendering."
category: "reference"
tags:
  - reference
  - mosaic-maker
order: 20
---

# @repo/mosaic-maker

## Quick Start

```bash
pnpm add @repo/mosaic-maker
```

```tsx
import { MosaicMaker } from '@repo/mosaic-maker';

export default function Patterns() {
  return <MosaicMaker />;
}
```

## Architecture

```
main.tsx
  └─ App.tsx
      └─ MosaicMaker.tsx
          ├─ MosaicDisplay.tsx          ← resize observer, palette init, tile rendering
          │   ├─ Tile.tsx                ← SVG renderer per tile
          │   ├─ TILE_REGISTRY.ts        ← 8 shape definitions
          │   ├─ constants.ts            ← defaults (size, gap, rotations)
          │   ├─ cssVars.ts              ← CSS custom property names
          │   ├─ initialPalette.ts       ← grayscale fallback
          │   └─ stores/mosaic/
          │       ├─ actions.ts          ← store mutations
          │       └─ selectors.ts        ← reactive store reads
          └─ controls/
              ├─ Controls.tsx            ← orchestrator
              ├─ SliderControls.tsx       ← tile size / gap sliders
              ├─ PaletteControls.tsx      ← palette picker grid
              └─ TileSetControls.tsx      ← checkbox grid of tile types

stores/mosaic/
  ├─ store.ts        ← Zustand store (unexported)
  ├─ types.ts        ← MosaicState, TileInstance
  ├─ actions.ts      ← all state mutations
  └─ selectors.ts    ← reactive hooks (drop domain prefix)

utils/
  ├─ updateElementStyles.ts   ← batch-set CSS vars on HTMLElement
  ├─ random/                  ← getRandom, shuffleArray, shuffleObject
  ├─ tiles/                   ← computeNumberOfTiles, computeInitialTiles,
  │                             generateTileColors, generateTileRotation
  └─ palettes/                ← fetchPalettes, Zod schemas, cache logic

core/
  ├─ constants.ts          ← DEFAULT_TILE_SIZE (64), DEFAULT_GAP_SIZE (0), rotations
  ├─ cssVars.ts            ← CSS_VARS map { size, gap }
  ├─ TILE_REGISTRY.ts      ← 8 tile definitions (shapes with colorIndex)
  ├─ palette.schema.ts     ← Palette Zod schema + inferred type
  ├─ initialPalette.ts     ← grayscale fallback
  └─ initialTileSet.ts     ← ordered list of all 8 tile names
```

## Initialization

When `MosaicDisplay` mounts, two independent effects fire.

### 1. Palette fetch (one-shot)

`initPalettes()` checks localStorage cache (`"palettes"`, v2, 7-day TTL).
On miss: fetches `unpkg.com/nice-color-palettes@3.0.0/1000.json` → Zod validates
→ transforms to `--color-N` CSS var map → caches → sets store.
On hit: returns cached.
The UI renders immediately with a grayscale fallback; the palette swap happens asynchronously.

### 2. Resize + tile generation (continuous)

`useResizeObserver` binds a `ResizeObserver` to the mosaic `<div>`.
Dimension changes pass through a 150ms debounce, then call `setRef()`
which persists the ref and triggers `regenerateTiles()`.

```
dimensions change
  → 150 ms debounce
    → setRef(ref)
      → computeInitialTiles(element, tileSet)
        ├─ computeNumberOfTiles()   ← CSS grid math
        └─ Array.from({length: N}) → TileInstance[]
```

### What triggers regeneration

| Trigger                   | Fires `regenerateTiles`? |
| ------------------------- | ------------------------ |
| Window / container resize | Yes (debounced 150 ms)   |
| Tile set checkbox toggle  | Yes                      |
| "New tiles" button        | Yes                      |
| Tile size / gap slider    | Yes (debounced 150 ms)   |
| Palette / color change    | No — CSS variables only  |

React `<StrictMode>` double-fires the init chain in dev; production runs once.

## Tile Counting

`computeNumberOfTiles.ts` mirrors CSS Grid's `auto-fill` arithmetic exactly:

```ts
tilesPerRow = Math.floor((width + gap) / (tileSize + gap));
tilesPerColumn = Math.floor((height + gap) / (tileSize + gap));
return tilesPerRow * tilesPerColumn;
```

Derivation: `n` tiles × `tileSize` + `(n - 1)` gaps ≤ `width` → `n × (tileSize + gap) ≤ width + gap`.
The `+ gap` in the numerator accounts for the last tile having no trailing gap.
The grid's CSS declaration `grid-template-columns: repeat(auto-fill, var(--tile-size))`
uses the same arithmetic, so JS count and CSS grid always agree.

## Tile System

### Registry (8 definitions)

Each tile in `TILE_REGISTRY.ts` is a `TileDefinition` with an array of `Shape` objects:

```ts
type Shape =
  | { type: 'circle'; cx: number; cy: number; r: number; colorIndex: number }
  | {
      type: 'rect';
      x: number;
      y: number;
      width: number;
      height: number;
      colorIndex: number;
    }
  | { type: 'path'; d: string; colorIndex: number }
  | { type: 'polygon'; points: string; colorIndex: number };
```

`colorIndex` maps into the 5-element `--color-N` array. Tiles use subsets of indices 0–4.

### Instance generation (`computeInitialTiles.ts`)

Each tile instance gets:

- `id`: `"${i}"` — stable index-based key (preserves DOM nodes across regenerations)
- `name`: random pick from active `tileSet`
- `colors`: shuffled copy of CSS var key array
- `rotation`: random rotation variable key

### Renderer (`Tile.tsx`)

Looks up `name` in registry → renders SVG primitives with `fill: var(--color-N)`
and CSS transitions → applies rotation via `transform: rotate(var(--rotation-N))`.

## Palette System

### Fetch pipeline

```
fetchPalettes()
  └─ getCachedPalettes()     ← localStorage.getItem("palettes")
      └─ isCacheValid()      ← checks expiration + version
          ├─ valid  → return cached
          └─ stale  → fetch unpkg
                      └─ Zod parse (array of 5 hex strings)
                      └─ transform (map to Palette with --color-N keys)
                      └─ cachePalettes() → localStorage.setItem
```

### Data shape

```ts
type Palette = {
  '--color-0': '#333333';
  '--color-1': '#555555';
  // ... up to --color-4
};
```

### Cycling

`cyclePalettes()` slides a window of 33 over `paletteStock`.
When it reaches the end it wraps to 0.

## State Management

Uses Zustand with an unexported store. Consumers interact only through exported
getter hooks and setter functions.

```ts
type MosaicState = {
  mosaicRef: RefObject<HTMLDivElement | null>;
  paletteStock: Palette[]; // full fetched list
  currentPalettesIndex: number; // window start in paletteStock
  currentPalette: Palette; // actively displayed
  currentPalettes: Palette[]; // window of 33
  tileSet: TileSet; // active tile names
  tiles: TileInstance[]; // current rendered tiles
};
```

Fine-grained Zustand selectors (`useTiles`, `useCurrentPalette`, etc.) isolate re-renders — sidebar controls don't repaint on tile regeneration and vice versa.

## CSS Strategy

| Property  | Mechanism                                                    |
| --------- | ------------------------------------------------------------ |
| Tile size | CSS var `--tile-size`, set via JS on the mosaic div          |
| Gap       | CSS var `--mosaicGap`, set via JS                            |
| Colors    | CSS vars `--color-0` through `--color-4`                     |
| Rotations | CSS vars `--rotation-0` through `--rotation-3`               |
| Grid      | `grid-template-columns: repeat(auto-fill, var(--tile-size))` |
| Theme     | Tailwind v4 with gruvbox theme from `@repo/ui`               |

High-frequency updates (slider drags) write CSS custom properties directly via
`style.setProperty()` — no React re-render. Palette changes use
`updateElementStyles()` to batch-set all `--color-N` vars at once.
SVG shapes use `transition-all duration-500` for smooth cross-fades.

## Performance

| Concern               | Notes                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **Resize thrashing**  | Debounced at 150ms — fires once after stabilization                                                   |
| **Tile identity**     | IDs are random per regeneration → React unmounts/remounts all SVGs. Acceptable for ~50–200 tile grids |
| **Color transitions** | CSS `transition-all duration-500` on SVG shapes                                                       |
| **Palette caching**   | localStorage with 7-day TTL, version-bumped key                                                       |
| **Zustand isolation** | Per-slice selectors prevent cascade re-renders                                                        |
| **Slider updates**    | Direct DOM — no React overhead during drag                                                            |

## Patterns & Gotchas

- **`setRef` doubles as regeneration trigger** — persists the ref **and**
  calls `regenerateTiles()` internally.
- **`shuffleObject`** preserves insertion order of keys but shuffles values.
  Used for both color and rotation shuffling.
- **`getPaletteId`** sorts hex values alphabetically and joins with `-` for
  order-independent palette comparison.
- **Palette fetch is fire-and-forget** — UI mounts with grayscale fallback;
  palette loads asynchronously causing a brief grayscale flash on first load.
- **Identity instability** — tile IDs use random suffixes (`${i}-${randomStr}`),
  preventing React reconciliation across regenerations. Stable property-derived
  IDs would fix this but add complexity.
- **Dev-mode double fire** — React StrictMode unmounts and remounts every
  component. Init chain runs twice in development.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

