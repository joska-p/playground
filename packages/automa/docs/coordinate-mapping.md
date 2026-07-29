# Coordinate Mapping & the Cell Painting Bug

## What went wrong

Painting a single cell on the grid sometimes painted a cross (5 cells),
sometimes 3, sometimes a random blob. Painting a creature pattern like
R-pentomino produced a shapeless blob. The behaviour was non-deterministic
and varied by grid position.

## Root cause: float32 precision in a cross-domain shader calculation

The old paint shader received the target in **UV domain** (normalised `[0,1]`)
and multiplied by `u_resolution` inside the shader to recover cell coordinates:

```glsl
vec2 diff = (vUv - u_mouse) * u_resolution;
float dist = length(diff);
if (dist < u_brushSize) { /* paint */ }
```

For an adjacent cell, `diff` should be exactly `(1.0, 0.0)` in cell-units.
With `u_brushSize = 1.0`, the check `1.0 < 1.0` should be `false`.

But `vUv` comes from GPU barycentric interpolation (float32), and `u_mouse`
comes from JavaScript (float64 → float32 at the uniform upload). These two
paths can produce values that differ by ~1 ULP for the same logical
`(col + 0.5) / cols`. When that ULP makes the adjacent cell's distance
`0.99999994 < 1.0`, the cell gets painted. The result varies by grid
position because the rounding depends on the exact float64→float32
conversion of each specific `(col + 0.5) / cols`.

## The fix

Replace the distance-based check with an exact integer cell comparison using
`gl_FragCoord.xy`:

```glsl
ivec2 thisCell = ivec2(gl_FragCoord.xy);
if (all(equal(thisCell, u_targetCell))) { /* paint */ }
```

`gl_FragCoord.xy` is the window-space position of the current fragment,
which for a `cols × rows` viewport is `(col + 0.5, row + 0.5)`.
Conversion to `ivec2` truncates to `(col, row)`. The target is passed as
integer cell coordinates from JavaScript — no division, no float32 rounding,
no domain crossing inside the shader.

The API was simplified from:

```
paint(normalizedX, normalizedY, brushSize, value)
```

to:

```
paint(col, row, value)
```

## Coordinate domains in the automa pipeline

```
Screen (CSS pixels, origin top-left, Y-down)
  │  subtract bounds.left/top
  ▼
Canvas (CSS pixels, origin top-left, Y-down)
  │  Y-flip: bounds.height - (y - bounds.top)
  │  scale + offset for aspect-fit (contain/cover/fill)
  ▼
Grid world (continuous [0, cols] × [0, rows], origin top-left, Y-up)
  │  floor() to discretise
  ▼
Grid cell (integer {col, row})
  │  passed to engine.paint(col, row, value)
  ▼
GPU compute (FBO: cols × rows pixels, integer-addressed)
  │  gl_FragCoord.xy → {col, row} via truncation
  ▼
State texture (cols × rows texels, NEAREST)
  │  sampled in cell-mesh.frag via UV
  ▼
Display (canvas buffer: CSS × DPR pixels)
```

## Everything that contributed to the bug

### 1. Private coordinate subsystem in automa

`packages/automa/src/lib/coordinates.ts` contains `eventToGridPoint`,
`createCanvasToGrid`, `createWorldToGrid` — a parallel mini-library that:

- Is not tested
- Inverts Y (while the central `transforms.ts` in `@repo/graphics` does not)
- Reimplements `'contain'/'cover'/'fill'` fit modes already present in
  `createDataToCanvas`/`createCanvasToData`
- Doesn't compose with DPR or the uniform builder

The central library (`packages/graphics/src/math/transforms.ts`) defines
six coordinate domains with composable, tested, round-trip-safe converters.
A grid of cells is just a `Data` domain with bounds `[0, cols] × [0, rows]`,
so `createCanvasToData` could have handled it directly.

### 2. Implicit domain crossing inside a shader

The old paint shader received `u_mouse` in UV domain and `u_resolution` to
convert to cell domain. The multiply `(vUv - u_mouse) * u_resolution` is
a cross-domain calculation that looks harmless in GLSL but is susceptible
to float32 rounding differences between the GPU interpolator and the CPU
uniform upload path.

**Rule**: compute shaders use integer coordinates (`gl_FragCoord.xy`,
`texelFetch`). Display shaders use UV/float coordinates (`texture`).
Never do a float multiply inside a shader to recover the other domain.

### 3. CSS transform invalidates getBoundingClientRect

`useInteractiveCanvas` applies `canvas.style.transform` (CSS `translate` +
`scale`) on every pointer move. This changes `getBoundingClientRect()`,
which `eventToGridPoint` depends on. When both fire on the same pointer
event, the read-after-write hazard produces stale or offset coordinates
during paint-drag.

Pan/zoom should be consumed as data by the coordinate pipeline, not applied
as a CSS transform that mutates the canvas layout.

### 4. Three different Y conventions

| Context                           | Y direction | Origin      |
| --------------------------------- | ----------- | ----------- |
| `transforms.ts` (screen/canvas)   | Down        | Top-left    |
| `eventToGridPoint` (after Y-flip) | Up          | Bottom-left |
| GL (`gl_FragCoord`, `texelFetch`) | Up          | Bottom-left |

Each conversion step inverts Y in a different place, making it hard to
reason about whether a given coordinate is flipped or not.

## Recommendations

### A. Make grid a first-class domain in transforms.ts

Grid is just `Data` with integer binning. Add a factory that composes
`createScreenToCanvas` → `createCanvasToData({xMin:0, xMax:cols, yMin:0, yMax:rows})` → `floor`:

```ts
function createScreenToGrid(
  canvasBounds: CanvasElementBounds,
  cols: number,
  rows: number,
  fit?: AspectFitMode
) {
  const toCanvas = createScreenToCanvas(canvasBounds);
  const toData = createCanvasToData(
    { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
    canvasBounds.width,
    canvasBounds.height,
    fit
  );
  return (screen: Point2D) => {
    const d = toData(toCanvas(screen));
    return {
      column: Math.floor(d.x),
      row: Math.floor(d.y),
      index: Math.floor(d.y) * cols + Math.floor(d.x)
    };
  };
}
```

Then `eventToGridPoint` is a one-line factory call. The custom
`coordinates.ts` becomes a thin re-export. Tested, composable, no
duplication.

### B. Feed pan/zoom as data, not CSS

Replace the CSS `transform` in `useInteractiveCanvas` with either:

- A uniform matrix or offset in the display shader (the QuadPipeline
  applies the transform at render time), or
- A coordinate offset injected into the `eventToGridPoint` pipeline

Either way, `getBoundingClientRect()` stays stable and all coordinate
transforms remain consistent regardless of interaction state.

### C. Never cross domains inside a shader

Codify as a convention:

| Pipeline      | Addressing mode | Shader function                 |
| ------------- | --------------- | ------------------------------- |
| GPGPU compute | Integer (cell)  | `gl_FragCoord.xy`, `texelFetch` |
| Display       | Float (UV)      | `vUv`, `texture`                |

The only bridge between them is the texture bind: the GPGPU writes
cell data at pixel `(col, row)`, the display reads it with `texture`
at UV `(col/cols, row/rows)`. No shader computes `(uv - target) * resolution`.

### D. Pick one Y convention and derive the rest

Choose a canonical Y-orientation for the grid. If Y-up (matching GL),
then `createScreenToGrid` includes the Y-flip at a single, documented
point. Every other transform derives from it via composition.
