# Initialization Process

How `MosaicDisplay` mounts, measures the screen, and produces the right number of tiles.

---

## Chain of events

```
main.tsx
  → App (h-screen flex-col)
    → MosaicMaker
      → Sidebar
        → MosaicDisplay     ← resize observer, tile generation
        → Controls          ← sliders, palette picker, toggleable tiles
```

When `MosaicDisplay` mounts, two independent effects fire:

### 1. Palette fetch (once)

```
initMosaicPalettes()
  → check localStorage cache ("palettes", version 2, 7-day TTL)
    → hit?  return cached
    → miss? fetch unpkg → Zod validate → transform → cache → return
  → setMosaicPaletteStock(palettes)     → first 33 in `currentPalettes`
```

### 2. Resize + tile generation (every dimension change)

```ts
const [mosaicRef, dimensions] = useResizeObserver<HTMLDivElement>();
```

`useResizeObserver` creates a `ResizeObserver` on the mosaic `<div>`. On mount, dimensions go from `{0,0}` to the element's actual size. Each dimension update triggers:

```ts
useEffect → 150 ms debounce → setMosaicRef(mosaicRef)  // calls regenerateMosaicTiles() internally
```

---

## Tile count formula

In `computeNumberOfTiles.ts`:

```ts
const tilesPerRow    = Math.floor((width  + gap) / (tileSize + gap));
const tilesPerColumn = Math.floor((height + gap) / (tileSize + gap));
return tilesPerRow * tilesPerColumn;
```

This **mirrors how CSS Grid `auto-fill` works internally**.

Derivation:

- `n` tiles per row, each `tileSize` wide, separated by `gap`
- There are `n - 1` gaps, so total consumed width = `n * tileSize + (n - 1) * gap`
- That must fit inside the container: `n * tileSize + (n - 1) * gap ≤ width`
- Rearranged: `n * (tileSize + gap) ≤ width + gap`
- Therefore: `n = floor((width + gap) / (tileSize + gap))`

The `+ gap` in the numerator accounts for the **last tile having no trailing gap**. Without it the count would be off by one whenever the right edge is tight.

The grid's own CSS declaration:

```css
grid-template-columns: repeat(auto-fill, var(--tile-size))
```

uses exactly the same arithmetic, so the JS count matches what the grid will actually do.

---

## Resize observer

Implementation at `@repo/ui/hooks/useResizeObserver.ts`:

```ts
const ref = useRef<T>(null);
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
  const { width, height } = entries[0].contentRect;
  setDimensions({ width, height });
}, []);

useEffect(() => {
  if (!ref.current) return;
  const observer = new ResizeObserver(handleResize);
  observer.observe(ref.current);
  return () => observer.disconnect();
}, [handleResize]);
```

- Returns `[ref, dimensions]` — attach `ref` to the element, read `dimensions` reactively.
- `handleResize` is stable (empty deps array), so the observer is created once.
- On every resize the `dimensions` state updates, which triggers the 150 ms debounced effect in `MosaicDisplay`.

---

## What triggers a regeneration

| Action                        | `regenerateMosaicTiles` fires? |
|-------------------------------|--------------------------------|
| Window / container resize     | Yes (debounced 150 ms)         |
| Tile set checkbox toggle      | Yes                            |
| "New tiles" button            | Yes                            |
| Tile size slider              | Yes (debounced 150 ms)         |
| Gap slider                    | Yes (debounced 150 ms)         |
| Palette / color change        | No — CSS variables only        |

---

## Grid vs generated children

The CSS grid declares:

```css
grid-template-columns: repeat(auto-fill, var(--tile-size))
grid-template-rows: repeat(auto-fill, var(--tile-size))
```

It **automatically** computes the number of columns and rows, but it needs child elements to fill them. `computeNumberOfTiles` tells the JS how many children to produce so the grid is exactly filled — no empty cells, no overflow.

Tile size and gap sliders change CSS variables on the mosaic element directly; the grid reflows automatically during dragging. Once the drag settles (150ms debounce), tiles are regenerated to match the new layout dimensions.

---

## Dev-mode double fire

React `<StrictMode>` intentionally unmounts and remounts every component in development. You will see the full initialization chain run twice. In production it runs once.
