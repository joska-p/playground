# Refactor Plan: Coordinate Mapping

Three sessions, each designed to start with a fresh context window. Sessions 2 and 3 depend on earlier ones — each prompt includes everything needed from the previous session.

---

## Session 1 — Central library: grid transforms

**Files touched**: `packages/graphics/src/math/transforms.ts`, `packages/graphics/src/math/transforms.test.ts`

**No dependencies. Start any time.**

### Goal

Add grid-domain factories to `@repo/graphics/math/transforms.ts` so that any consumer (automa, pixel-engine, etc.) can convert between screen/canvas and grid cells using the same composed, tested pipeline that already exists for Data.

### What to do

**1. Add four new exports to `transforms.ts`**

```ts
// Discrete grid cell — the result of worldToGrid / screenToGrid
type GridCell = {
        column: number;
        row: number;
        index: number;
};

// Continuous world → discrete cell (floor-based binning)
function createWorldToGrid(cols: number, rows: number): (world: Point2D) => GridCell;

// Discrete cell center → continuous world
function gridToWorld(cell: { column: number; row: number }): Point2D;

// Canvas pixel → grid cell (Y-flip + aspect-fit + floor)
function createCanvasToGrid(
        cols: number,
        rows: number,
        canvasWidth: number,
        canvasHeight: number,
        fit?: AspectFitMode // default 'contain'
): (canvas: Point2D) => GridCell;

// Screen event → grid cell (composes createScreenToCanvas + createCanvasToGrid)
function createScreenToGrid(
        canvasBounds: CanvasElementBounds,
        cols: number,
        rows: number,
        fit?: AspectFitMode
): (screen: Point2D) => GridCell;
```

**2. Implement `createCanvasToGrid` using `createCanvasToData`**

```ts
function createCanvasToGrid(
        cols: number,
        rows: number,
        canvasWidth: number,
        canvasHeight: number,
        fit: AspectFitMode = 'contain'
): (canvas: Point2D) => GridCell {
        const toData = createCanvasToData(
                { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
                canvasWidth,
                canvasHeight,
                fit
        );
        return (canvas: Point2D) => {
                const d = toData(canvas);
                const column = Math.floor(d.x);
                const row = Math.floor(d.y);
                return { column, row, index: row * cols + column };
        };
}
```

No internal Y-flip — `createCanvasToData` already handles the orientation
consistently with the rest of the library.

**3. Implement `createScreenToGrid` by composing**

```ts
function createScreenToGrid(
        canvasBounds: CanvasElementBounds,
        cols: number,
        rows: number,
        fit: AspectFitMode = 'contain'
): (screen: Point2D) => GridCell {
        const toCanvas = createScreenToCanvas(canvasBounds);
        const toGrid = createCanvasToGrid(cols, rows, canvasBounds.width, canvasBounds.height, fit);
        return (screen: Point2D) => toGrid(toCanvas(screen));
}
```

**4. Add tests** covering:

- `createWorldToGrid`: maps continuous coords to correct cell, clamps out-of-bounds
- `gridToWorld`: cell center is `(col + 0.5, row + 0.5)`
- `createCanvasToGrid`: round-trip with `gridToWorld` under 'contain', 'cover', 'fill'
- `createScreenToGrid`: compose with known canvas bounds, verify correct cell

**5. Export all four from the package index** if one exists, otherwise the
individual module export is sufficient (consumers import from the file path).

### Verification

```bash
pnpm --filter @repo/graphics check-types
pnpm --filter @repo/graphics test        # existing + new tests pass
pnpm --filter @repo/automa check-types   # no regression (nothing uses new API yet)
pnpm --filter @repo/automa lint
```

### Deliverable

`transforms.ts` exports `createWorldToGrid`, `gridToWorld`, `createCanvasToGrid`, `createScreenToGrid` (and `GridCell` type). All tested. Everything else unchanged.

---

## Session 2 — Automa: use central transforms

**Files touched**: `packages/automa/src/lib/coordinates.ts`, `packages/automa/src/hooks/useCellPainting.ts`, `packages/automa/ARCHITECTURE.md`

**Depends on**: Session 1 complete (the new exports must exist in `@repo/graphics`).

### Goal

Replace automa's private coordinate implementations with the central
factories from `@repo/graphics/math/transforms`. The old Y-flip in
`eventToGridPoint` (`bounds.height - ...`) is removed — the central
transforms don't flip Y there. The Y-flip moves to where it belongs:
inside `createCanvasToGrid` via the `Data` domain transform chain, or
as an explicit step before calling `createCanvasToGrid`.

### What to do

**1. Rewrite `packages/automa/src/lib/coordinates.ts`**

Current state (read the file before editing):

```ts
// Three custom implementations:
export function createWorldToGrid(...)
export function gridToWorld(...)
export function createCanvasToGrid(...)
export function eventToGridPoint(e, canvas, cols, rows) {
  const bounds = canvas.getBoundingClientRect();
  const localX = e.clientX - bounds.left;
  const localY = bounds.height - (e.clientY - bounds.top);  // Y-flip
  const canvasToGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
  return canvasToGrid({ x: localX, y: localY });
}
```

Replace with:

```ts
import {
        createScreenToGrid,
        gridToWorld as centralGridToWorld,
        type GridCell,
        type Point2D
} from '@repo/graphics/math/transforms';

export type { GridCell, Point2D };

// Re-export — automa code may reference gridToWorld
export { centralGridToWorld as gridToWorld };

export function createCanvasToGrid(
        cols: number,
        rows: number,
        boundsWidth: number,
        boundsHeight: number,
        fit: 'fill' | 'contain' | 'cover' = 'contain'
) {
        if (fit === 'fill') {
                // Simple 1:1 — each canvas pixel maps to (x * cols/width, y * rows/height)
                // This is what automa actually needs: no aspect preservation, just direct mapping.
        }
        // ...
}

export function eventToGridPoint(
        e: { clientX: number; clientY: number },
        canvas: HTMLCanvasElement,
        cols: number,
        rows: number
): GridCell {
        const bounds = canvas.getBoundingClientRect();
        const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height, 'fill');
        // Central lib uses Y-down. GL uses Y-up. Flip here.
        const localY = bounds.height - (e.clientY - bounds.top);
        return toGrid({ x: e.clientX - bounds.left, y: localY });
}
```

Wait — the central `createCanvasToData` does NOT do a Y-flip. The automa
needs Y-up (matching GL). There are two approaches:

**Option A**: Keep the Y-flip in `eventToGridPoint`, but delegate the
rest to central transforms.

**Option B**: Accept that the central `Data` domain uses Y-down, and
the automa flips once at the entry point.

The cleanest interim approach is **A**: keep the Y-flip local, route
everything else through `createCanvasToData`. This preserves the
existing behaviour while eliminating the duplicated fit-mode math.

Implementation sketch:

```ts
import {
        createCanvasToData,
        createScreenToCanvas,
        type Point2D
} from '@repo/graphics/math/transforms';

// Keep these exports for backward compat
export type GridCell = { column: number; row: number; index: number };
export type { Point2D };

export function createWorldToGrid(cols: number, rows: number) {
        return (p: Point2D) => ({
                column: Math.max(0, Math.min(cols - 1, Math.floor(p.x))),
                row: Math.max(0, Math.min(rows - 1, Math.floor(p.y))),
                index: Math.floor(p.y) * cols + Math.floor(p.x)
        });
}

export function gridToWorld(cell: { column: number; row: number }): Point2D {
        return { x: cell.column + 0.5, y: cell.row + 0.5 };
}

export function createCanvasToGrid(
        cols: number,
        rows: number,
        boundsWidth: number,
        boundsHeight: number,
        fit: 'fill' | 'contain' | 'cover' = 'contain'
) {
        // Delegate to the central Data transform (it handles the fit modes).
        // Note: canvas Y is down, grid Y is up — that flip happens in eventToGridPoint.
        const toData = createCanvasToData(
                { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
                boundsWidth,
                boundsHeight,
                fit
        );
        return (p: Point2D) => {
                const d = toData(p);
                return {
                        column: Math.floor(d.x),
                        row: Math.floor(d.y),
                        index: Math.floor(d.y) * cols + Math.floor(d.x)
                };
        };
}

export function eventToGridPoint(
        e: { clientX: number; clientY: number },
        canvas: HTMLCanvasElement,
        cols: number,
        rows: number
) {
        const bounds = canvas.getBoundingClientRect();
        const localX = e.clientX - bounds.left;
        const localY = bounds.height - (e.clientY - bounds.top); // Y-flip: GL convention
        const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
        return toGrid({ x: localX, y: localY });
}
```

This removes the duplicated fit-mode math without changing any caller.

**2. Update `ARCHITECTURE.md`** (already done in the previous session — just
verify the coordinate domains section references `docs/coordinate-mapping.md`
and the screen→grid pipeline diagram is accurate).

**3. Remove unused `createWorldToGrid` from central lib export?**
No — keep it. The central lib's `createWorldToGrid` is the canonical
implementation. The automa's local version is a thin compat shim.
A future session can migrate callers.

### Verification

```bash
pnpm --filter @repo/automa check-types
pnpm --filter @repo/automa lint
cd packages/automa && npx vite build
```

Manually verify: paint a single cell → only one cell changes (the regression
test for the original bug). Paint a creature pattern → correct shape appears.

### Deliverable

`coordinates.ts` delegates to `createCanvasToData` for fit-mode math.
Duplicated fit logic removed. `eventToGridPoint` behaviour unchanged.

---

## Session 3 — Interaction state as data

**Files touched**: `packages/graphics/src/react/useInteractiveCanvas.ts`,
`packages/automa/src/hooks/useCellPainting.ts`,
`packages/automa/src/lib/coordinates.ts`,
`packages/automa/src/components/canvas/CellMesh.tsx`

**Depends on**: Session 2 complete (coordinates.ts refactored).

### Goal

Currently `useInteractiveCanvas` applies pan/zoom as a CSS `transform`
on the canvas element. This changes `getBoundingClientRect()`, which
`eventToGridPoint` reads on every pointer event — creating a race
between the CSS mutation and the coordinate query.

Fix: expose pan/zoom as data (already returned by the ref), stop
mutating CSS, and feed the interaction state into the coordinate
pipeline. The QuadPipeline applies pan/zoom as a uniform transform
at render time.

### What to do

**1. Add pan/zoom uniforms to the display shader**

Modify `cell-mesh.frag` to accept `u_panOffset` and `u_zoom` uniforms
that transform the UV before sampling:

```glsl
uniform vec2 u_panOffset;
uniform float u_zoom;

void main() {
        vec2 uv = vUv;
        // Apply zoom (zoom > 1 = zoom in, anchored at center)
        uv = (uv - 0.5) / u_zoom + 0.5;
        // Apply pan
        uv -= u_panOffset;
        // ... rest of the shader (aspect correction, texture lookup)
}
```

Default values: `u_panOffset = (0, 0)`, `u_zoom = 1.0` (identity).

**2. Stop CSS transform mutation in `useInteractiveCanvas`**

Remove the `applyTransform()` call that sets `canvas.style.transform`.
The function can still exist (for backward compat) but is a no-op.
Remove the `useCallback` dependency if nothing else references it.

The pan/zoom state is still stored and returned via the ref — that's
the data consumers need.

**3. Pipe interaction state into the render loop**

In `CellMesh.tsx`, read `interactionState.current.pan` and
`interactionState.current.zoom` and pass them as uniforms in
`useSimulationUniforms`'s `onBeforeRender`:

```ts
// In CellMesh.tsx or useSimulationUniforms.ts
const interactionState = useInteractiveCanvas(canvasRef);

useFrame((time) => {
        const { pan, zoom } = interactionState.current;
        runner.pipeline.setUniforms({
                u_panOffset: [
                        pan.x / runner.ctx.drawingBufferWidth,
                        pan.y / runner.ctx.drawingBufferHeight
                ],
                u_zoom: zoom,
                gridTexture: engine.getDisplayTexture()
                // ... other uniforms
        });
        runner.render();
});
```

**4. Account for pan/zoom in eventToGridPoint**

`eventToGridPoint` currently assumes no transform. When the display is
panned/zoomed, the same screen coordinate maps to a different grid cell.

Add an optional `interaction` parameter:

```ts
export function eventToGridPoint(
        e: { clientX: number; clientY: number },
        canvas: HTMLCanvasElement,
        cols: number,
        rows: number,
        interaction?: { pan: Point2D; zoom: number }
) {
        const bounds = canvas.getBoundingClientRect();
        let localX = e.clientX - bounds.left;
        let localY = bounds.height - (e.clientY - bounds.top);

        // Reverse the display transform to get the logical grid coordinate
        if (interaction) {
                const cx = bounds.width / 2;
                const cy = bounds.height / 2;
                localX = (localX - cx) / interaction.zoom + cx + interaction.pan.x;
                localY = (localY - cy) / interaction.zoom + cy + interaction.pan.y;
        }

        const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
        return toGrid({ x: localX, y: localY });
}
```

**5. Pass interaction state from useCellPainting**

Update `useCellPainting` to accept an optional interaction ref and pass
it to `eventToGridPoint`:

```ts
export function useCellPainting(
  cols: number, rows: number,
  brushMode: BrushMode,
  paintCell: ...,
  creature?: ...,
  paintCreature?: ...,
  canvasRef?: ...,
  interactionState?: { current: { pan: Point2D; zoom: number } }
) {
  // ...
  const { column: col, row } = eventToGridPoint(e, canvas, cols, rows, interactionState?.current);
  // ...
}
```

**6. Wire it up in CellMesh.tsx**

```tsx
const interactionState = useInteractiveCanvas(canvasRef);

// Pass interactionState to useCellPainting
const { onPointerDown, onPointerMove, onPointerUp, onContextMenu } = useCellPainting(
        cols,
        rows,
        brushMode,
        paintCell,
        creature,
        placePattern,
        canvasRef,
        interactionState
);

// Pass pan/zoom as uniforms onBeforeRender
useSimulationUniforms({ runnerRef, cols, rows, interactionState });
```

### Verification

```bash
pnpm --filter @repo/automa check-types
pnpm --filter @repo/automa lint
cd packages/automa && npx vite build
```

Manual: pan/zoom with middle/wheel, then paint. The painted cell should
appear at the correct grid position under the pointer.

### Deliverable

- `cell-mesh.frag` accepts `u_panOffset` / `u_zoom` uniforms (default identity)
- `useInteractiveCanvas` stops mutating CSS transform
- `eventToGridPoint` accepts optional interaction state for reverse-transform
- `useCellPainting` and `CellMesh` wire the interaction state through
- Painting after pan/zoom hits the correct cell
