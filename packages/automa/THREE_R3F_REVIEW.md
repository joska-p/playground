# Three.js & R3F Best Practices Review — `@repo/automa`

Reviewed against [three-best-practices](https://github.com/anomalyco/opencode/tree/main/skills/three-best-practices) and [r3f-best-practices](https://github.com/anomalyco/opencode/tree/main/skills/r3f-best-practices).

---

## CRITICAL

### DataTexture never disposed — `useGridTexture.ts:20`

The `DataTexture` created inside `useMemo` is never disposed when the component unmounts or when `cols`/`rows` change. Over time, especially if grid dimensions change, this leaks GPU memory.

```
src/hooks/useGridTexture.ts:20 — const tex = new THREE.DataTexture(...)
```

**Fix:** Add a disposal effect:

```ts
useEffect(() => {
  const tex = uniforms.gridTexture.value;
  return () => tex.dispose();
}, [uniforms]);
```

---

## HIGH

### Missing `precision` qualifier in fragment shader — `cell-mesh.frag`

The fragment shader has no `precision` qualifier, leaving it at the default (`highp` on desktop, but varies). This can cause unexpected behaviour on mobile.

```
src/shaders/cell-mesh.frag:1
```

**Fix:** Add `precision highp float;` or `precision mediump float;` at the top.

---

### No pixel ratio cap — `AutomatonCanvas.tsx:45`

```
gl={{ preserveDrawingBuffer: true }}
```

On high-DPI displays (Retina), `renderer.getPixelRatio()` defaults to `devicePixelRatio` (3 on modern phones), which triples the fragment shader work for every pixel. The glow loop (9 texture fetches per pixel) makes this especially costly.

**Fix:** Cap pixel ratio:

```tsx
gl={{
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance',
}}
```

And add to `Scene.tsx`:
```tsx
useEffect(() => {
  const gl = useThree(s => s.gl);
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}, []);
```

---

### Unconditional `useFrame` subscription — `useGridTexture.ts:42`

`useFrame` is subscribed every frame, even when the generation hasn't changed. While the body has an early return, the hook itself still fires on every frame — which is unnecessary when the simulation is paused.

```
src/hooks/useGridTexture.ts:42 — useFrame(() => { ... });
```

**Fix:** Skip subscribing when not running:

```tsx
const running = useRunning(); // from uiStore
useFrame((state, delta) => {
  if (!running && generation === lastRenderedGeneration.current) return;
  // ...
});
```

Or use `frameloop="demand"` on Canvas and call `invalidate()` on each step.

---

### CellMesh re-renders on every generation — `CellMesh.tsx:20-25`

`CellMesh` subscribes to `useGrid()` and `useGeneration()`, which are Zustand selectors that cause a React re-render every time the grid evolves. The actual R3F object mutation (texture update) happens in `useFrame`, which does not need React re-renders.

```
src/components/canvas/CellMesh.tsx:21-25
```

**Fix:** Read from the store imperatively inside `useFrame` instead of via React hooks:

```tsx
function CellMesh(props: CellMeshProps) {
  const { uniforms } = useGridTexture(props);
  // read cols/rows/grid/generation from simulationStore.getState() inside useFrame
  // only subscribe to brushMode (needed for interaction handlers)
}
```

This follows `r3f-best-practices/perf-never-set-state-in-useframe` and `perf-zustand-selectors`.

---

### Inline array/object allocations — `Scene.tsx:36`, `CellMesh.tsx:42`

```tsx
target={[cols / 2, rows / 2, 0]}  // Scene.tsx:36
position={[cols / 2, rows / 2, 0]} // CellMesh.tsx:42
```

These create new arrays on every render. `OrbitControls.target` is set once; `mesh.position` can be set via ref.

**Fix (Scene):** Use a `useMemo` for target, or set it via `useEffect` on the controls ref.

**Fix (CellMesh):** Set position via ref in a `useEffect`.

---

## MEDIUM

### GridLines not wrapped in `React.memo` — `GridLines.tsx:9`

The geometry is memoized, but the component itself re-renders whenever its parent re-renders (e.g., on every generation change). React will re-create the `lineSegments` JSX and diff it.

```
src/components/canvas/GridLines.tsx:9
```

**Fix:** `const GridLines = React.memo(function GridLines(...) { ... });`

---

### `dispose={null}` not set on shared resources — `CellMesh.tsx:48-53`

`<planeGeometry>` and `<shaderMaterial>` are created inline. R3F will auto-dispose them on unmount. If these could ever be shared across instances, they need `dispose={null}` and manual lifecycle management.

Not a bug currently, but worth noting if the component is ever instantiated multiple times or used in a list.

---

### Fragment shader uses branching for glow — `cell-mesh.frag:12-18`

The double for-loop performs 8 texture lookups per fragment. On a 100×100 grid = 10,000 fragments × 8 = 80,000 texture fetches per frame. On mobile with high-DPI, this multiplies further.

Consider pre-computing the glow into a separate render target, or using a separable blur pass if the grid gets larger.

---

## LOW

### `useCameraFit` window resize listener — `useCameraFit.ts:36-37`

The resize listener calls `fit()` which re-creates the callback when `cols/rows/size` change (from `useCallback` deps). Fine, but the listener could debounce to avoid rapid projection matrix updates during resize.

---

### `useCameraFit` uses `useRef` indirection for camera — `useCameraFit.ts:12-16`

The camera is stored in a ref rather than used directly. The `useEffect` dependency on `camera` (a Three.js object reference) is unstable if the camera is recreated. In practice `camera` doesn't change, so this is just an unnecessary indirection.

---

## Summary

| Priority | Issue | File |
|----------|-------|------|
| CRITICAL | DataTexture never disposed | `useGridTexture.ts:20` |
| HIGH | Missing `precision` in frag shader | `cell-mesh.frag:1` |
| HIGH | No pixel ratio cap | `AutomatonCanvas.tsx:45` |
| HIGH | Unconditional useFrame | `useGridTexture.ts:42` |
| HIGH | CellMesh re-renders every generation | `CellMesh.tsx:21-25` |
| HIGH | Inline array allocations | `Scene.tsx:36`, `CellMesh.tsx:42` |
| MEDIUM | GridLines not memoized | `GridLines.tsx:9` |
| MEDIUM | Shader branching cost | `cell-mesh.frag:12-18` |

### What's done well

- **Single draw call** for the entire grid via `DataTexture` + `shaderMaterial`. Excellent approach.
- **Web Worker** for simulation stepping keeps the main thread free.
- **Proper `NearestFilter`** on the DataTexture — correct for pixel-art CA rendering.
- **Near/far planes** are configured via constants (`CAMERA_NEAR=0.1`, `CAMERA_FAR=100`).
- **Zustand vanilla stores** with fine-grained selectors (not full store subscriptions).
- **`touchAction: 'manipulation'`** prevents iOS double-tap zoom conflicts.
