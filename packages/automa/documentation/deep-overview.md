# `useGridTexture`

**Location:** `src/hooks/useGridTexture.ts`  
**Used by:** [`CellMesh`](../../src/components/canvas/CellMesh.tsx)

---

> **Stale-content warning:** This document was written against an older API that used separate `aliveColor` / `deadColor` uniforms. The current code uses a `stateColors[]` array uniform (up to 8 states) and supports glow color as a separate uniform. Sections below reflect the live API; non-functional comments from the old version have been removed.

---

## Purpose

`useGridTexture` is the high-performance bridge between React's state management and WebGL's GPU rendering pipeline.

Its job is to take the Cellular Automata grid — a flat `Uint8Array` of `0`s and `1`s — and stream it every frame to a `THREE.DataTexture` that a GLSL fragment shader reads to draw every cell simultaneously on the GPU. No React re-renders are triggered during this process.

---

## API

```ts
type UseGridTextureParams = {
  cols: number;
  rows: number;
};

const { uniforms } = useGridTexture({ cols, rows });
```

### Parameters

| Name   | Type     | Description                            |
| ------ | -------- | -------------------------------------- |
| `cols` | `number` | Number of grid columns (texture width) |
| `rows` | `number` | Number of grid rows (texture height)   |

> Colors (`stateColors[]`, `glowColor`) are **not** parameters. They are read directly from the `uiStore` — see [Colour Synchronisation](#4-colour-synchronisation) below.

### Return value

| Name       | Type     | Description                                          |
| ---------- | -------- | ---------------------------------------------------- |
| `uniforms` | `object` | WebGL uniform descriptors passed to `shaderMaterial` |

#### Uniforms shape

```ts
{
  gridTexture: {
    value: THREE.DataTexture;
  } // 1 pixel = 1 cell (RED channel)
  stateColors: {
    value: THREE.Color[];
  } // colour palette, index = cell state (0 = dead, 1 = alive, ...)
  glowColor: {
    value: THREE.Color;
  } // colour of the neighbour glow
  texelSize: {
    value: THREE.Vector2;
  } // vec2(1/cols, 1/rows) for neighbour sampling
}
```

---

## How it works — step by step

### 1. WebGL object initialisation (`createGridUniforms`)

Instead of creating a 3D mesh for every cell (which would crash the browser on a 1000×1000 grid), the hook allocates a single `THREE.DataTexture` where **1 pixel = 1 cell**.

```ts
const data = new Uint8Array(cols * rows); // one byte per cell, initially all 0
const tex = new THREE.DataTexture(data, cols, rows, THREE.RedFormat, THREE.UnsignedByteType);
tex.magFilter = THREE.NearestFilter; // pixel-perfect, no interpolation between cells
tex.minFilter = THREE.NearestFilter;
```

Key choices:

- **`THREE.RedFormat`** — only one channel (R) is needed; alive = `255`, dead = `0`. Wastes no bandwidth on G/B/A.
- **`THREE.UnsignedByteType`** — matches the `Uint8Array` backing the grid directly.
- **`NearestFilter`** — prevents bilinear blurring between adjacent cells at any zoom level.

The function is intentionally **extracted outside the hook** so it is a pure function and can never close over stale React state.

---

### 2. Bypassing React for the render loop (`useFrame`)

React is great for UI but terrible for a 60 FPS game loop. `useFrame` plugs directly into Three.js's `requestAnimationFrame` loop — React is never involved:

```ts
useFrame(() => {
  const { running } = uiStore.getState(); // imperative read, no hook
  const { grid, generation } = simulationStore.getState();

  if (!running && generation === lastRenderedGeneration.current) return; // paused & unchanged
  if (generation === lastRenderedGeneration.current) return; // same generation

  const tex = textureRef.current;
  if (tex) {
    copyGridToTextureData(grid, tex.image.data as Uint8Array); // flat copy into GPU buffer
    tex.needsUpdate = true; // signals Three.js to re-upload
  }

  lastRenderedGeneration.current = generation;
});
```

The `generation` counter acts as a cheap change-detection gate — the texture upload is skipped entirely if the simulation did not advance.

#### What `copyGridToTextureData` does

```ts
// src/core/grid-to-texture.ts
const copyGridToTextureData = (grid: Grid, data: Uint8Array): void => {
  for (let i = 0; i < grid.length; i++) {
    data[i] = grid[i];
  }
};
```

A tight loop that copies raw cell values into the texture data array in place — no allocations, no garbage created per frame. Cell values `0`, `1`, `2`, ... are stored as-is; the fragment shader scales with `int(raw * 255.0 + 0.5)`.

---

### 3. The `useLayoutEffect` / `useRef` indirection

```ts
const textureRef = useRef<THREE.DataTexture | null>(null);

useLayoutEffect(() => {
  textureRef.current = uniforms.gridTexture.value;
}, [uniforms]);
```

`useFrame` reads `textureRef.current` rather than reading `uniforms.gridTexture.value` directly. This is deliberate:

- `uniforms` is created by `useMemo` and may be replaced when `cols`/`rows` change.
- `useLayoutEffect` fires **synchronously after the DOM paint** — before the next `useFrame` tick — guaranteeing `textureRef` always points at the current texture with no frame gap.
- If `useFrame` closed over the `uniforms` object directly it would capture a stale reference after a grid resize.

---

### 4. Colour synchronisation (`useEffect`)

```ts
useEffect(() => {
  for (let i = 0; i < MAX_STATE_COUNT; i++) {
    uniforms.stateColors.value[i].set(stateColors[i] ?? '#000000');
  }
  uniforms.glowColor.value.set(glowColor);
}, [stateColors, glowColor, uniforms]);
```

Colors are read from `uiStore` via `useStore`:

```ts
const stateColors = useStore(uiStore, (s) => s.stateColors);
const glowColor = useStore(uiStore, (s) => s.glowColor);
```

When the user changes a colour, this effect mutates the `THREE.Color` objects **in place** using `.set()`. No new `DataTexture` is allocated. The GPU picks up the change on the very next render without any React component re-rendering.

> **To change a colour at runtime**, call `uiStore.setState({ stateColors: ['#000', '#f00'] })` from anywhere in the app — e.g. from a colour-picker control.

---

### 5. Memory management (`useEffect` dispose)

WebGL has no garbage collector. A `DataTexture` that is no longer referenced by JS still occupies VRAM until explicitly released.

```ts
useEffect(() => {
  const tex = uniforms.gridTexture.value;
  return () => tex.dispose(); // runs on unmount OR before the next uniforms object is created
}, [uniforms]);
```

This cleanup fires in two situations:

1. **Grid resized** (`cols`/`rows` change) → `useMemo` creates new uniforms → old texture is disposed before the new one takes over.
2. **`CellMesh` unmounts** → texture is disposed unconditionally.

---

## Shader contract

`useGridTexture` must stay in sync with `src/shaders/glow/cell-mesh.frag`. The fragment shader expects exactly these uniform names:

```glsl
uniform sampler2D gridTexture; // the DataTexture — 1 texel = 1 cell
uniform vec3      stateColors[8]; // colour palette, index = cell state
uniform vec3      glowColor;      // colour of the neighbour glow
uniform vec2      texelSize;      // vec2(1/cols, 1/rows) — used to sample neighbours
```

The shader samples the 8 neighbours of each cell to compute a glow contribution:

```glsl
float raw = texture2D(gridTexture, vUv).r;
int   state = int(raw * 255.0 + 0.5);
vec3  base = stateColors[state];

float glow = 0.0;
for (int x = -1; x <= 1; x++) {
  for (int y = -1; y <= 1; y++) {
    if (x == 0 && y == 0) continue;
    vec2 offset = vec2(float(x), float(y)) * texelSize;
    float nRaw = texture2D(gridTexture, vUv + offset).r;
    float nState = nRaw * 255.0;
    glow += (nState > 0.5 && nState < 1.5) ? 1.0 : 0.0;
  }
}
glow = glow / 8.0;

vec3 glowContrib = glow * glowColor * 0.35;

gl_FragColor = vec4(base + glowContrib, 1.0);
```

`texelSize` must equal `vec2(1.0 / cols, 1.0 / rows)` — which is exactly what `createGridUniforms` computes. If `texelSize` is wrong, the glow samples will land on incorrect neighbours.

---

## Data flow diagram

```
uiStore                       simulationStore
(stateColors[]/glowColor)     (grid: Uint8Array,
                                generation: number)
      │                              │
      │ useStore()                   │ getState()  ← imperative, inside useFrame
      ▼                              ▼
┌─────────────────────────────────────────────────────────┐
│                  useGridTexture                          │
│                                                          │
│  useMemo → createGridUniforms(cols, rows, stateColors)   │
│    ├─ THREE.DataTexture  (cols × rows, RedFormat)        │
│    ├─ THREE.Color[8]    (state palette)                  │
│    ├─ THREE.Color       (glowColor)                      │
│    └─ THREE.Vector2     (1/cols, 1/rows)                 │
│                                                          │
│  useLayoutEffect → textureRef ← uniforms.gridTexture     │
│                                                          │
│  useEffect [uniforms] → tex.dispose() on cleanup         │
│                                                          │
│  useEffect [stateColors, glowColor] → uniform .set()     │
│                                                          │
│  useFrame (every tick)                                   │
│    generation changed?                                   │
│      ├─ copyGridToTextureData(grid, tex.image.data)      │
│      └─ tex.needsUpdate = true  →  GPU re-upload         │
│                                                          │
│  returns { uniforms }                                    │
└─────────────────────────────────────────────────────────┘
        │
        ▼
   CellMesh → <shaderMaterial uniforms={uniforms} />
        │
        ▼
   cell-mesh.frag — renders every cell in one draw call
```

---

## Pitfalls & gotchas

| Pitfall                                                                  | Why it matters                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Never add color values to `useMemo` deps**                             | It would re-create the `DataTexture` on every colour change, causing VRAM churn and a frame drop. Colour updates use `.set()` mutation instead.                                                                                 |
| **`textureRef` must be updated via `useLayoutEffect`, not `useEffect`**  | `useEffect` fires after paint; there is a one-frame window where `useFrame` could run with a stale `textureRef` after a grid resize. `useLayoutEffect` is synchronous and closes that gap.                                      |
| **`tex.dispose()` must always run on cleanup**                           | Forgetting it leaks VRAM. On a long session with many grid resizes this accumulates into a GPU memory crash.                                                                                                                    |
| **Use `uiStore.getState()` inside `useFrame`, never `useStore()`**       | `useStore()` is a React hook and cannot be called inside `useFrame`. `getState()` is the correct imperative escape hatch inside the render loop.                                                                                |
| **`texelSize` must match actual grid dimensions**                        | The fragment shader uses it to locate neighbouring cells. A stale value (e.g. from a previous grid size) causes the glow to bleed onto the wrong cells. It is recomputed automatically in `createGridUniforms` on every resize. |
| **Grid values are stored raw (`0`, `1`, `2`...), not multiplied by 255** | `copyGridToTextureData` does a direct byte copy. The fragment shader reads the raw value and converts with `int(raw * 255.0 + 0.5)` to reconstruct the cell state. `THREE.UnsignedByteType` maps `0` → `0.0` and `255` → `1.0`. |
