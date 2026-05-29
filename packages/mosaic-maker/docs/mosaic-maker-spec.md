# Context Specification: @repo/mosaic-maker

## Package Overview

`@repo/mosaic-maker` is a procedural pattern generation engine[cite: 2]. It renders a responsive grid of SVG tiles whose shape, color, and rotation are randomized per cell[cite: 2]. Color palettes are pulled from an external source (`nice-color-palettes`), parsed using Zod, and cached locally[cite: 2]. The interface consists of a full-screen mosaic layout controlled via a sidebar configuration panel[cite: 2].

---

## Technical Lifecycles & Architecture

### 1. Initialization Pipelines

When the core `MosaicDisplay` component mounts, two independent asynchronous pathways execute[cite: 1]:

- **Palette Asset Hydration (One-Shot):** Checks `localStorage` for the cache key `"palettes"` (Version 2, 7-day TTL)[cite: 1, 2]. If a miss occurs, it fetches data from `unpkg.com/nice-color-palettes@3.0.0/1000.json`, runs a Zod schema validation parse, transforms the array into a structured CSS variable map, and saves it to cache[cite: 1, 2].
  - _Known Quirk:_ This is fire-and-forget[cite: 2]. The UI mounts initially with a grayscale fallback theme (`initialPalette`), which can cause a brief visual color flash once loading completes[cite: 2].
- **Grid Layout Engine (Continuous):** Binds a native `ResizeObserver` to the mosaic wrapper[cite: 1]. Dimensions update reactively[cite: 1]. Every width or height change is passed through a **150ms debounce** before calling `setMosaicRef()`, which persists the ref and triggers `regenerateMosaicTiles()` internally[cite: 1, 2]. The explicit `regenerateMosaicTiles()` call that previously doubled up on resize has been removed.

### 2. The Arithmetic behind Tile Counting

To guarantee that the JavaScript loop matches what the CSS rendering engine outputs exactly (avoiding empty trailing slots or row overflows)[cite: 1, 2], the system implements this precise formula in `computeNumberOfTiles.ts`[cite: 1]:

- `tilesPerRow = Math.floor((width + gap) / (tileSize + gap))`[cite: 1, 2]
- `tilesPerColumn = Math.floor((height + gap) / (tileSize + gap))`[cite: 1, 2]
- `Total Tiles = tilesPerRow * tilesPerColumn`[cite: 1]

_Derivation Note:_ A container holding `n` tiles features `n - 1` gaps[cite: 1]. Total consumed width equals `n * tileSize + (n - 1) * gap ≤ width`[cite: 1]. This rearranges to `n * (tileSize + gap) ≤ width + gap`[cite: 1]. The `+ gap` in the numerator mathematically balances out the fact that the final tile in a sequence lacks a trailing gap[cite: 1, 2].

### 3. Rendering vs. CSS Mutation Matrix

The system minimizes React re-renders by handling high-frequency updates directly in the DOM using CSS custom property values[cite: 1, 2].

| Trigger                                   | Engine Strategy                                                                                   | Resource Overhead                                                                                                                      |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Window/Container Resize**[cite: 1, 2]   | `ResizeObserver` $\rightarrow$ 150ms debounce $\rightarrow$ `setMosaicRef()` (calls `regenerateMosaicTiles()` internally)[cite: 1, 2] | **High:** Full array regeneration. Destroys and remounts all tile components[cite: 2].                                                 |
| **"New Tiles" Button Click**[cite: 1, 2]  | Explicitly calls `regenerateMosaicTiles()`[cite: 2].                                              | **High:** Full array regeneration. Destroys and remounts all tile components[cite: 2].                                                 |
| **Tile Checkbox Toggle**[cite: 1, 2]      | Modifies active array in `tileSet` $\rightarrow$ `regenerateMosaicTiles()`[cite: 2].              | **High:** Full array regeneration. Destroys and remounts all tile components[cite: 2].                                                 |
| **Palette Click / Selection**[cite: 2]    | Mutates `currentPalette` state $\rightarrow$ triggers `updateElementStyles()`[cite: 2].           | **Low:** DOM-only CSS property write[cite: 2]. SVG nodes cross-fade natively using CSS transitions[cite: 2].                           |
| **"Shuffle Colors / Rotations"**[cite: 2] | Applies `shuffleObject()` to randomize values while preserving keys[cite: 2].                     | **Low:** DOM-only CSS property write[cite: 2].                                                                                         |
| **Tile Size / Gap Sliders**[cite: 1, 2]   | Directly issues `mosaicRef.current.style.setProperty()` updates, then debounces tile regeneration at 150ms[cite: 2]. | **Low→Medium:** Live CSS grid reflow during drag (low)[cite: 1, 2]; single debounced tile array rebuild after drag settles (medium)[cite: 2]. |

---

## Notable Architecture Implementations & Flaws

- **Identity Instability:** Inside `computeInitialTiles.ts`, instances are given an ID formatted as `${i}-${randomStr}`[cite: 2]. Because this string randomizes on every recalculation, React completely skips element reconciliation when tiles regenerate[cite: 2]. It forces an absolute unmount and remount cycle for every single SVG node in the grid[cite: 2].
- **Object Property Shuffling:** The utility function `shuffleObject` is unique: it preserves the insertion order of object keys (e.g., `--color-0` through `--color-4`) but shuffles the mapped hexadecimal color values in place[cite: 2].
- **Component Subscription Isolation:** The application uses fine-grained Zustand selectors (e.g., `useMosaicTiles`)[cite: 2]. This creates excellent component boundaries, ensuring that updates to the core layout array avoid forcing unnecessary repaints across sidebar controls or sliders[cite: 2].
