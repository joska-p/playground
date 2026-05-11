# Refactor: Color Space 2D Slice — ImageFill, Hooks & Components

## Goal

Eliminate copy-paste duplication across OKLab/OKLch code paths, fix the `fillOKLchSliceImageData` bug, and make the component generic so new color spaces can be added without creating new hooks/components.

---

## Problem Summary

Three layers of near-identical duplication:

| Layer | Files | Issue |
|-------|-------|-------|
| Fill functions | `imageFill.ts` | Two functions sharing 100% identical pixel-iteration boilerplate. LCh version ignores x,y → solid color. |
| Hooks | `useOKLabCanvas.ts`, `useOKLchCanvas.ts` | Same ref pattern, same render/getColorAtClientPosition structure, same coordinate math duplicated. |
| Components | `OKLabSlice.tsx`, `OKLchSlice.tsx` | 95% identical JSX. Also `OKLchSlice.tsx` exports a function named `OKLabSlice` (copy-paste naming bug). |

---

## Architecture

### Core insight

Every 2D color slice at fixed lightness follows the same mapping:

```
x → param1  (range [-rangeX, +rangeX])
y → param2  (range [-rangeY, +rangeY], top = positive)
color = convert(L, param1, param2)
```

A **color space definition** captures what differs between spaces (which param keys, which conversion function, defaults). The UI becomes a single generic component driven by this config.

### New file structure

```
src/
  utils/
    colorspaces.ts              ← NEW: type + all color space definitions (alongside other color utils)
    imageFill.ts                ← REWRITE: single generic fillSliceImageData
    color-utils.ts              ← UNCHANGED
    canvasDpr.ts                ← UNCHANGED
  hooks/
    useCanvasSlice.ts           ← NEW: generic hook (replaces both useOKLab/useOKLch)
  components/controls/
    Slice.tsx                   ← NEW: generic component (replaces both OKLab/OKLchSlice)
    index.tsx                   ← UPDATED: uses Slice with color space defs

  hooks/useOKLabCanvas.ts       ← DELETE
  hooks/useOKLchCanvas.ts       ← DELETE
  components/controls/OKLabSlice.tsx  ← DELETE
  components/controls/OKLchSlice.tsx  ← DELETE
```

---

## Implementation Steps

### Step 1 — `src/utils/imageFill.ts`

Replace both exported functions with one generic function:

```ts
type PixelFn = (x: number, y: number, width: number, height: number) => [number, number, number];

function fillSliceImageData(imgData: ImageData, pixelFn: PixelFn): void
```

It iterates the pixel grid once and calls `pixelFn(x, y, w, h)` for each pixel.

### Step 2 — `src/utils/colorspaces.ts`

Define `ColorSpaceDef` type and export both color space definitions:

```ts
type ColorSpaceDef = {
  id: string;
  name: string;
  xRangeKey: string;       // param key for x-axis range
  yRangeKey: string;       // param key for y-axis range
  lightnessKey: string;    // param key for the fixed L
  defaultParams: Record<string, number>;
  sliders: Array<{ key: string; label: string; min: number; max: number; step: number }>;
  toRGB: (lightness: number, xVal: number, yVal: number) => [number, number, number];
  toCSS: (lightness: number, xVal: number, yVal: number) => string;
};
```

Two exports:
- `oklab` — `toRGB = oklabTo8bit`, `toCSS` returns `oklab(L a b)`
- `oklch` — `toRGB = oklchTo8bit`, `toCSS` returns `oklch(L C H)`

### Step 3 — `src/hooks/useCanvasSlice.ts`

Generic hook taking `(colorSpace, params, displaySize)`. Returns `{ canvasRef, render, getColorAtClientPosition }`.

- `render` uses `colorSpace.toRGB` and the x/y param keys to call `fillSliceImageData`
- `getColorAtClientPosition` computes xVal/yVal from internal pixel coords, calls `colorSpace.toRGB` and `colorSpace.toCSS`

### Step 4 — `src/components/controls/Slice.tsx`

Generic component:

```tsx
<Slice colorSpace={oklab} displaySize={400} onPick={handlePick} className="..." />
```

- Renders canvas
- Renders sliders from `colorSpace.sliders` (drives param state)
- Shows picked color string
- Canvas click calls `getColorAtClientPosition`

### Step 5 — Update `src/components/controls/index.tsx`

Replace imports of `OKLabSlice` / `OKLchSlice` with `Slice` and color space defs.

### Step 6 — Delete old files

- `hooks/useOKLabCanvas.ts`
- `hooks/useOKLchCanvas.ts`
- `components/controls/OKLabSlice.tsx`
- `components/controls/OKLchSlice.tsx`

---

## Adding a new color space later

Add one definition to `colorspaces.ts`:

```ts
export const hsl = {
  id: 'hsl',
  name: 'HSL',
  xRangeKey: 'hue',
  yRangeKey: 'saturation',
  lightnessKey: 'lightness',
  defaultParams: { lightness: 50, hue: 360, saturation: 100 },
  sliders: [{ key: 'lightness', label: 'Lightness', min: 0, max: 100, step: 1 }],
  toRGB: hslTo8bit,
  toCSS: (l, h, s) => `hsl(${h} ${s}% ${l}%)`,
};
```

Usage: `<Slice colorSpace={hsl} />`. No new hooks or components needed.

If a future color space doesn't fit the 2D-slice-at-fixed-L model, it can still define its own `toRGB`/`toCSS` however it wants — nothing forces use of the x/y mapping formula.
