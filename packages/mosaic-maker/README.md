---
title: 'Mosaic Maker'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2024-03-10
---

# @repo/mosaic-maker

> A procedural engine that breathes color palettes into ordered grids of SVG
> shapes — each tile a small geometry, each mosaic a composition that never
> repeats the same way twice.

---

## Essence

Mosaic Maker sits at the intersection of declarative tile design and high-
frequency performance engineering. You hand it a color palette and a set of
tile shapes; it builds a CSS Grid mosaic where every cell is an SVG primitive —
circles, rectangles, paths, polygons — rendered with palette-driven fills and
animated transitions.

The interesting tension is between _what_ gets rendered and _how fast_ it can
change. The tile and palette system is fully declarative: a registry defines
eight tile geometries as composable SVG shape lists, and a palette is just five
CSS custom properties (`--color-0` through `--color-4`). The performance
strategy is fully imperative: during slider drags, `style.setProperty()` writes
tile sizes and gaps directly to the DOM, bypassing React entirely. The React
tree re-renders only when the _set_ of tiles or palettes changes — never during
continuous input.

The result is a mosaic engine that feels responsive at 60fps while keeping its
data model clean enough to reason about.

## Quick Launch

```bash
pnpm dev --filter @repo/playground
```

Or install it into your own project:

```bash
pnpm add @repo/mosaic-maker
```

```tsx
import { MosaicMaker } from '@repo/mosaic-maker';

export default function Patterns() {
  return <MosaicMaker />;
}
```

## Field Notes

- **The Catalyst:** The question of whether a React app could animate a
  full-screen grid at interactive frame rates without reaching for Canvas or
  WebGL. The answer turned out to be a split strategy — React for structure,
  CSS custom properties for the hot path — and a tile registry that treats SVG
  shapes as first-class composable primitives rather than bespoke components.

- **Quirks & Anomalies:** The palette fetch is fire-and-forget. On first load
  the mosaic renders with a grayscale fallback; a brief gray flash precedes the
  real palette arrival. This is intentional — the UI is immediately interactive
  even before the network responds. Also, `setRef` quietly doubles as the
  regeneration trigger: it persists the DOM ref _and_ kicks off tile
  recomputation, a dual role that keeps the resize-to-tile pipeline a single
  function call.

- **Future Horizons:** A tile composition language where shapes reference each
  other's color indices, palette interpolation that morphs between two palettes
  over time, and a tile-aware virtualization layer for mosaics that exceed a
  few hundred cells.

---

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

When `MosaicDisplay` mounts, two independent effects fire in parallel.

### Palette fetch (one-shot)

`initPalettes()` checks a localStorage cache (`"palettes"`, v2, 7-day TTL).
On miss: fetches `unpkg.com/nice-color-palettes@3.0.0/1000.json`, validates
through Zod, transforms into a `--color-N` CSS variable map, caches, and sets
the store. On hit: returns the cached data. The UI renders immediately with a
grayscale fallback; the real palette swaps in asynchronously.

### Resize + tile generation (continuous)

`useResizeObserver` binds a `ResizeObserver` to the mosaic `<div>`. Dimension
changes pass through a 150ms debounce, then call `setRef()` which persists the
ref and triggers `regenerateTiles()`:

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

Derivation: `n` tiles × `tileSize` + `(n - 1)` gaps ≤ `width` →
`n × (tileSize + gap) ≤ width + gap`. The `+ gap` in the numerator accounts
for the last tile having no trailing gap. The grid's CSS declaration
`grid-template-columns: repeat(auto-fill, var(--tile-size))` uses the same
arithmetic, so the JS count and CSS grid always agree.

## Tile System

### Registry (8 definitions)

Each tile in `TILE_REGISTRY.ts` is a `TileDefinition` containing an array of
`Shape` objects — the composable SVG primitives that make up one tile:

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

`colorIndex` maps into the 5-element `--color-N` array. Tiles use subsets of
indices 0–4, giving each shape its own palette slot while keeping the palette
itself small and manageable.

### Instance generation (`computeInitialTiles.ts`)

Each tile instance gets:

- `id`: `"${i}"` — stable index-based key (preserves DOM nodes across
  regenerations)
- `name`: random pick from the active `tileSet`
- `colors`: shuffled copy of the CSS variable key array
- `rotation`: random rotation variable key

### Renderer (`Tile.tsx`)

Looks up `name` in the registry, renders SVG primitives with
`fill: var(--color-N)` and CSS transitions, then applies rotation via
`transform: rotate(var(--rotation-N))`.

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

`cyclePalettes()` slides a window of 33 over `paletteStock`. When it reaches
the end it wraps to 0.

## State Management

The store is Zustand, deliberately unexported. Consumers interact only through
exported getter hooks and setter functions — the store is an implementation
detail, not a public API:

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

Fine-grained Zustand selectors (`useTiles`, `useCurrentPalette`, etc.) isolate
re-renders — sidebar controls don't repaint on tile regeneration and vice
versa.

## CSS Strategy

The performance split lives here. Everything that changes at human-interaction
frequency goes through CSS custom properties; everything that changes at
structural frequency goes through React.

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
`updateElementStyles()` to batch-set all `--color-N` vars at once. SVG shapes
use `transition-all duration-500` for smooth cross-fades.

## Performance Notes

| Concern               | Notes                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **Resize thrashing**  | Debounced at 150ms — fires once after stabilization                                                   |
| **Tile identity**     | IDs are random per regeneration → React unmounts/remounts all SVGs. Acceptable for ~50–200 tile grids |
| **Color transitions** | CSS `transition-all duration-500` on SVG shapes                                                       |
| **Palette caching**   | localStorage with 7-day TTL, version-bumped key                                                       |
| **Zustand isolation** | Per-slice selectors prevent cascade re-renders                                                        |
| **Slider updates**    | Direct DOM — no React overhead during drag                                                            |

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
