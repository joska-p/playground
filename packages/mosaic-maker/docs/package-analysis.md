# Package Analysis: `@repo/mosaic-maker`

## Overview

Mosaic-maker is a procedural pattern generation engine. It renders a grid of SVG tiles whose shape, color, and rotation are randomized per cell. Color palettes are fetched from an external source (`nice-color-palettes`) and cached in localStorage. The UI is a full-screen mosaic with a sidebar control panel.

---

## 1. File Map & Dependency Graph

```
main.tsx
  └─ App.tsx
      └─ MosaicMaker.tsx
          ├─ MosaicDisplay.tsx          ← core rendering
          │   ├─ Tile.tsx                ← SVG tile renderer
          │   ├─ TILE_REGISTRY.ts        ← shape definitions
          │   ├─ constants.ts            ← defaults (size, gap, rotations)
          │   ├─ cssVars.ts              ← CSS custom property names
          │   ├─ initialPalette.ts       ← fallback palette
          │   ├─ actions.ts              ← store mutations
          │   └─ selectors.ts            ← reactive reads from store
          │
          └─ controls/
              ├─ Controls.tsx            ← orchestrator
              ├─ SliderControls.tsx       ← tile size / gap sliders
              ├─ PaletteControls.tsx      ← palette picker grid
              └─ TileSetControls.tsx      ← checkbox grid of tile types
```

### Store / Utils (no UI, pure logic)

```
store/
  ├─ store.ts        ← Zustand store creation
  ├─ types.ts        ← MosaicState, TileInstance
  ├─ actions.ts      ← all state mutations (public API)
  └─ selectors.ts    ← hooks for reactive reads

utils/
  ├─ updateElementStyles.ts   ← batch set CSS vars on HTMLElement
  ├─ random/
  │   ├─ getRandom.ts          ← pick random item from array
  │   ├─ shuffleArray.ts       ← Fisher-Yates shuffle
  │   └─ shuffleObject.ts      ← shuffle values, keep keys
  ├─ tiles/
  │   ├─ computeNumberOfTiles.ts   ← container math → tile count
  │   ├─ computeInitialTiles.ts    ← generate all tile instances
  │   ├─ generateTileColors.ts     ← shuffle CSS var keys
  │   └─ generateTileRotation.ts   ← pick random rotation var
  └─ palettes/
      ├─ fetchPalettes.ts           ← cache-or-fetch logic
      ├─ fetchPalettes.schema.ts    ← Zod validation schema
      ├─ fetchWithValidation.ts     ← generic fetch + parse
      ├─ arePalettesEqual.ts        ← compare palettes by sorted values
      └─ getPaletteId.ts            ← derive stable key from palette
```

### Static

```
core/
  ├─ constants.ts          ← DEFAULT_TILE_SIZE (64), DEFAULT_GAP_SIZE (0), rotations
  ├─ cssVars.ts            ← CSS_VARS map { size, gap }
  ├─ TILE_REGISTRY.ts      ← 8 tile definitions (shapes with colorIndex)
  ├─ initialPalette.ts     ← grayscale fallback palette
  └─ initialTileSet.ts     ← ordered list of all 8 tile names
```

---

## 2. Data Flow

### 2.1 Initialization

```
MosaicDisplay mount
  ├─ initMosaicPalettes()          [one-shot, effect]
  │   ├─ localStorage check (key "palettes", v2, 7-day TTL)
  │   │   ├─ hit  → return cached
  │   │   └─ miss → fetch unpkg → Zod validate → transform → cache → return
  │   └─ setMosaicPaletteStock() → first 33 in currentPalettes
  │
  └─ useResizeObserver()           [every resize]
      └─ dimensions change
          └─ 150 ms debounce
              ├─ setMosaicRef(ref)      ← persists ref in store
              └─ regenerateMosaicTiles()
                  └─ computeInitialTiles(ref, tileSet)
                      ├─ computeNumberOfTiles()  ← CSS grid math
                      └─ Array.from({length: N}) → TileInstance[]
                          ├─ name:     getRandom(tileSet)
                          ├─ colors:   shuffleArray(CSS_VAR_KEYS)
                          ├─ rotation: getRandom(Object.keys(rotations))
                          └─ id:       `${i}-${randomStr}`
```

### 2.2 Runtime interactions

| Trigger | Mechanism | Effect |
|---|---|---|
| Resize container | `ResizeObserver` → debounce → `regenerateMosaicTiles()` | New tile instances (re-randomized) |
| "New tiles" button | `regenerateMosaicTiles()` | Same as above |
| Tile checkbox toggle | `toggleTileInSet()` → update store → `regenerateMosaicTiles()` | All tiles regenerated with new pool |
| Palette click | `applyMosaicPalette()` → set `currentPalette` + `updateElementStyles()` | CSS vars change, grid re-colors |
| "New palettes" button | `cycleMosaicPalettes()` → slide window of 33 over `paletteStock` | Palette grid swaps |
| "Shuffle colors" | `shuffleObject(currentPalette)` → `updateElementStyles()` | CSS vars shuffled in-place |
| "Shuffle rotations" | `shuffleObject(initialRotations)` → `updateElementStyles()` | Rotation vars shuffled in-place |
| Tile size slider | `mosaicRef.current.style.setProperty(CSS_VARS.size, ...)` | CSS grid reflows automatically |
| Gap slider | `mosaicRef.current.style.setProperty(CSS_VARS.gap, ...)` | CSS grid reflows automatically |

---

## 3. State Shape (Zustand)

```ts
type MosaicState = {
  mosaicRef:            RefObject<HTMLDivElement | null>;
  paletteStock:         Palette[];           // full fetched list
  currentPalettesIndex: number;              // window start in paletteStock
  currentPalette:       Palette;             // actively displayed palette
  currentPalettes:      Palette[];           // window of 33
  tileSet:              TileSet;             // active tile names (subset of 8)
  tiles:                TileInstance[];      // current rendered tiles
};
```

The store uses Zustand's `create()` with default state (no reducers). Mutations happen through `mosaicStore.setState()` in `actions.ts`. Selectors are Zustand selector hooks.

---

## 4. Tile Architecture

### `TILE_REGISTRY.ts` — 8 definitions

Each tile is a `Record<string, TileDefinition>` where `TileDefinition = { shapes: Shape[] }`. Each `Shape` is a discriminated union:

```ts
{ type: "circle", cx, cy, r, colorIndex }
{ type: "rect",   x, y, width, height, colorIndex }
{ type: "path",   d, colorIndex }
{ type: "polygon", points, colorIndex }
```

`colorIndex` maps into a 5-element color array (CSS var names like `--color-0` through `--color-4`). Each tile uses indices 0–4 but not necessarily all of them (e.g. `Square` uses indices 1–4, `CornerCircles` uses 0–2).

### `Tile.tsx` — renderer

1. Looks up `name` in `TILE_REGISTRY`.
2. For each shape, renders the appropriate SVG primitive with `fill: var(--color-N)` and a transition class.
3. Applies rotation via `transform: rotate(var(--rotation-N))`.

### `computeNumberOfTiles.ts` — CSS-grid-aware math

```ts
tilesPerRow    = floor((width  + gap) / (tileSize + gap))
tilesPerColumn = floor((height + gap) / (tileSize + gap))
```

Derivation matches CSS `repeat(auto-fill, var(--tile-size))` exactly. The `+ gap` in numerator accounts for the last tile having no trailing gap.

### `computeInitialTiles.ts` — instance factory

Each tile instance gets:
- `id`: `"${i}-${random(36).substring(2,12)}"` (not a stable hash, random per regeneration)
- `name`: random pick from `tileSet`
- `colors`: shuffled copy of `CSS_VAR_KEYS` (so each tile maps color indices to actual CSS vars differently)
- `rotation`: random rotation variable key

---

## 5. Palette System

### Fetch pipeline

```
fetchPalettes()
  └─ getCachedPalettes()     ← localStorage.getItem("palettes")
      └─ isCacheValid()      ← checks expiration + version
          ├─ valid  → return cached
          └─ stale  → fetch("unpkg.com/nice-color-palettes@3.0.0/1000.json")
                      └─ Zod parse (array of 5 hex strings each)
                      └─ transform (map to Palette object with --color-N keys)
                      └─ cachePalettes() → localStorage.setItem
```

### Data shape after transform

```ts
type Palette = {
  "--color-0": "#333333",
  "--color-1": "#555555",
  "--color-2": "#777777",
  "--color-3": "#999999",
  "--color-4": "#bbbbbb",
};
```

Each fetched palette from the API has 5 hex colors, mapped to the 5 CSS variable keys. The default/fallback palette is a grayscale ramp.

### Palette cycling

`cycleMosaicPalettes()` slides a window of `MAX_NUMBER_OF_PALETTES` (33) over `paletteStock`. When it reaches the end, it wraps to 0. The window advances by 33 each time, so palettes are displayed in batches of 33, and you cycle through them in chunks.

---

## 6. CSS Strategy

| Property | Mechanism |
|---|---|
| Tile size | CSS variable `--tile-size`, set via JS on the mosaic div |
| Gap | CSS variable `--mosaicGap`, set via JS |
| Colors | CSS variables `--color-0` through `--color-4` |
| Rotations | CSS variables `--rotation-0` through `--rotation-3` |
| Grid | `grid-template-columns: repeat(auto-fill, var(--tile-size))` |
| Theme | Tailwind v4 with `gruvbox-theme` from `@repo/ui` |

The grid auto-fills columns/rows based on tile size and container width. The JS count must match the grid's count to avoid empty cells or overflow. This is ensured by `computeNumberOfTiles()` using the same arithmetic as CSS `auto-fill`.

---

## 7. Performance Characteristics

| Concern | Analysis |
|---|---|
| **Resize thrashing** | Debounced at 150 ms. Fast resizing (e.g. dragging window) will fire once after stabilization. |
| **Tile identity** | Every regeneration creates entirely new `TileInstance[]` with new `id` values (random suffix). React treats every tile as a new element and unmounts/remounts all SVGs. This is wasteful but acceptable for the typical grid size (~50–200 tiles). |
| **Color transitions** | CSS `transition-all duration-500` on SVG shapes. When palette changes, every shape cross-fades. |
| **Palette caching** | localStorage with 7-day TTL avoids re-fetching on every load. Version-bumped cache key invalidates on schema changes. |
| **Zustand subscriptions** | Each selector subscribes to a specific slice. `useMosaicTiles()` re-renders `MosaicDisplay` on every tile regeneration; other components are unaffected. |
| **Slider updates** | Direct DOM manipulation via `style.setProperty()` — no React re-render. |

---

## 8. Notable Patterns & Gotchas

### `updateElementStyles` as batch CSS setter
Used by color shuffle, rotation shuffle, and palette apply. Iterates a `Record<string,string>` and calls `element.style.setProperty()` for each. The palette object keys are CSS var names, so applying a palette is literally setting all 5 `--color-N` vars at once.

### `getPaletteId` — comparison strategy
Sorts the 5 hex values alphabetically and joins with `-`. This works because palette objects have exactly 5 keys with fixed names; sorting makes the comparison order-independent. Used in `arePalettesEqual()` to highlight the currently active palette in `PaletteControls`.

### `shuffleObject` — own-keys shuffle
Keeps keys in their original order, shuffles only values. Used for color shuffle (keys remain `--color-0`..`--color-4`, values get permuted) and rotation shuffle (keys remain `--rotation-0`..`--rotation-3`, values get permuted).

### Tile identity collapse on regeneration
`tiles.map(tile => <Tile key={tile.id} ...>)` — the `key` is `${i}-${randomStr}`. Every regeneration generates new random strings, so React unmounts and remounts every single SVG. An alternative would be stable IDs derived from the tile's properties, but that's more complex and may not matter for typical tile counts.

### `setMosaicRef` doubles as regeneration trigger
The action `setMosaicRef()` both persists the ref **and** calls `regenerateMosaicTiles()`. This means the initial resize observer callback triggers tile generation through two paths: the debounced effect calls both `setMosaicRef()` and `regenerateMosaicTiles()` explicitly. The `regenerateMosaicTiles()` call is redundant since `setMosaicRef` already calls it.

### Palette fetch is fire-and-forget
`initMosaicPalettes()` is an async function but its caller in `MosaicDisplay` only logs on error. The UI renders immediately with the fallback `initialPalette` (grayscale) and then updates when the fetch completes. This means a flash of grayscale on first load.

---

## 9. File-by-File Summary

| File | Lines | Role |
|---|---|---|
| `main.tsx` | 10 | React root mount with StrictMode |
| `App.tsx` | 11 | Full-screen wrapper, mounts MosaicMaker |
| `MosaicMaker.tsx` | 21 | Sidebar layout: main = MosaicDisplay, panel = Controls |
| `MosaicDisplay.tsx` | 52 | Resize observer, palette init, tile rendering |
| `Tile.tsx` | 59 | SVG renderer, shape dispatcher, rotation+transition |
| `Controls.tsx` | 69 | Button grid, sliders, tile set, palette controls |
| `SliderControls.tsx` | 36 | Local state slider, writes CSS var directly |
| `PaletteControls.tsx` | 29 | Palette swatch grid, highlights active |
| `TileSetControls.tsx` | 42 | Checkbox grid of tile patterns |
| `store.ts` | 16 | Zustand store, default state |
| `types.ts` | 19 | MosaicState, TileInstance types |
| `actions.ts` | 60 | All state mutations (7 exported functions) |
| `selectors.ts` | 24 | 4 Zustand selector hooks |
| `constants.ts` | 33 | Default sizes, gaps, rotation presets |
| `cssVars.ts` | 6 | CSS variable names as constants |
| `TILE_REGISTRY.ts` | 90 | 8 tile shape definitions |
| `initialPalette.ts` | 13 | Grayscale fallback palette |
| `initialTileSet.ts` | 17 | Ordered list of all tile names |
| `computeNumberOfTiles.ts` | 32 | Grid math, CSS-var-aware calculation |
| `computeInitialTiles.ts` | 22 | Tile instance factory |
| `generateTileColors.ts` | 9 | Shuffle CSS var key array |
| `generateTileRotation.ts` | 9 | Pick random rotation key |
| `fetchPalettes.ts` | 67 | Cache-or-fetch with localStorage |
| `fetchPalettes.schema.ts` | 5 | Zod schema for API response |
| `fetchWithValidation.ts` | 8 | Generic fetch + Zod parse |
| `arePalettesEqual.ts` | 8 | Palette comparison by sorted values |
| `getPaletteId.ts` | 7 | Stable palette key |
| `getRandom.ts` | 9 | Random array pick |
| `shuffleArray.ts` | 10 | Fisher-Yates shuffle |
| `shuffleObject.ts` | 11 | Shuffle values, keep keys |
| `updateElementStyles.ts` | 9 | Batch set CSS properties |
| `styles.css` | 4 | Tailwind v4 import with gruvbox theme |
