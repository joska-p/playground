---
title: "Glaze"
description: "p5-style drawing immediacy and three.js-style shader freedom, in one package."
category: "reference"
tags:
  - reference
  - glaze
order: 20
---

# @repo/glaze

## What it is

`@repo/glaze` is a 2D rendering toolkit built on one idea: **a shape on the canvas and a shader on the canvas are the same mechanism.** The draw primitives (`surface.circle`, `surface.rect`, `surface.line`, `surface.text`) read like p5, and a "program" — a fragment shader plus its uniforms rendered as a fullscreen triangle — is what you reach for when shapes aren't enough. On WebGL2 the two speak the same language: shapes are tessellated and drawn through a shader, and custom programs are fullscreen passes.

It ships as two sibling runtimes over a shared foundation:

- `CpuSurface` — immediate-mode Canvas2D. A fluent class: `createCpuSurface` is a thin `new CpuSurface(config)` wrapper; draw calls are chainable methods against a raw `2d` context.
- `GpuSurface` — WebGL2, the same drawing model. A fluent class (`createGpuSurface` is a thin `new GpuSurface(config)` wrapper): the same chainable shape calls plus custom programs (`createProgram` / `renderProgram`), and `StateBuffer` for GPGPU simulation on a ping-pong texture pair.

Both expose the same skeleton: a frame loop, a camera, and an input store, handed to you every frame as a context object (`time`, `deltaTime`, `frameCount`, `camera`, `input`, `width`, `height`, `dpr`). Drawing happens in **world space** — the runtime applies the camera for you, so pan/zoom/pointer math is solved once instead of once per sketch.

The React layer wraps the runtimes in `<CpuCanvas>` / `<GpuCanvas>`: the runtime is created on mount and destroyed on unmount, and pointer-drag + wheel pan/zoom gestures drive the same camera the runtime renders through. `core/` also exports the `Camera` class and curried coordinate transformers (screen → canvas → normalized → UV) for custom math outside a canvas.

## Use cases

### Animated scene on plain Canvas2D

No React, no shaders — a canvas, a loop, and shapes.

```ts
import { createCpuSurface } from '@repo/glaze/cpu/createCpuSurface';

const surface = createCpuSurface({ canvas });

surface.setDraw(() => {
    surface
        .clear('#0d1015')
        .circle(200, 150 + Math.sin(surface.time * 2) * 30, 60, '#e11d48')
        .text('glaze', 20, 40, '#f8fafc', 24);
});
```

`setDraw` starts the rAF loop; `surface.destroy()` stops it and detaches listeners. The default camera is `{ x: 0, y: 0, zoom: 1 }`, so world pixels equal CSS pixels with a top-left origin. Per-frame state (`time`, `deltaTime`, `frameCount`, `width`, `height`, `dpr`) lives on the surface, updated before each draw callback. Every drawing method returns `surface`, so frames chain naturally with zero per-call allocations.

### Shapes on a GPU canvas (React)

Same draw calls as the CPU runtime — WebGL2 under the hood.

```tsx
import { useState } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import type { GpuSurface } from '@repo/glaze/gpu/createGpuSurface';

export function Sketch() {
    const [surface, setSurface] = useState<GpuSurface | null>(null);

    return (
        <GpuCanvas
            onSurface={setSurface}
            onFrame={({ surface }) => {
                surface.clear(0.05, 0.07, 0.09, 1);
                surface.circle(200, 150, 60, '#e11d48');
                surface.rect(30, 30, 120, 90, '#16a34a');
                surface.line(30, 260, 200, 260, '#3b82f6', 8);
            }}
        />
    );
}
```

`onSurface` hands you the live surface (ref-callback style, `null` on unmount) for imperative access; `onFrame` receives the same per-frame context the imperative `setDraw` does.

### A fullscreen shader (declarative)

For shader art you never touch the runtime: pass a fragment shader to `GpuCanvas` and it compiles it on mount, recompiles on context restore or source change, and renders it every frame.

```tsx
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

export function Plasma() {
    return (
        <GpuCanvas
            style={{ width: 400, height: 300 }}
            fragmentShader={`precision highp float;
in vec2 vUv;
out vec4 out_color;
uniform vec2 u_resolution;
uniform float u_time;
void main() {
  vec2 p = (vUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float wave = 0.5 + 0.5 * sin(length(p) * 5.0 - u_time * 4.0);
  out_color = vec4(mix(vec3(0.08, 0.05, 0.16), vec3(1.0, 0.35, 0.18), wave), 1.0);
}`}
        />
    );
}
```

The standard uniforms are applied automatically each frame: `u_resolution` (device px), `u_aspect`, `u_mouse` (pointer normalized to the canvas, y-flipped to UV), `u_camera` (CSS-px offset + zoom), `u_dpr`, `u_time`. Add per-frame uniforms with the `uniforms` prop — a function of the frame context. For the imperative equivalent, use `surface.createProgram(source)` and `surface.renderProgram(program)` from `onSurface`.

### A GPGPU simulation (state buffer)

`StateBuffer` owns two textures it alternates between: `step()` renders the active program into the write target while sampling the previous state through a `u_state` sampler, then swaps. Seed it with `init()` and read the live state back with `getTexture()`. This is Conway's Game of Life in miniature.

```ts
import { createGpuSurface } from '@repo/glaze/gpu/createGpuSurface';
import { createStateBuffer } from '@repo/glaze/gpu/createStateBuffer';

const surface = createGpuSurface({ canvas });
const buffer = createStateBuffer(surface.gl, 96, 96);

buffer.addProgram(
    'sim',
    /* glsl */ `
        precision highp float;
        in vec2 vUv;
        out vec4 fragColor;
        uniform sampler2D u_state;
        uniform vec2 u_gridSize;

        ivec2 wrap(ivec2 c) {
            return ivec2(mod(vec2(c) + u_gridSize, u_gridSize));
        }
        int cellAt(ivec2 c) {
            return int(texelFetch(u_state, wrap(c), 0).r * 255.0 + 0.5);
        }
        void main() {
            ivec2 coord = ivec2(gl_FragCoord.xy);
            int alive = cellAt(coord);
            int n = 0;
            for (int dy = -1; dy <= 1; dy++)
                for (int dx = -1; dx <= 1; dx++) {
                    if (dx == 0 && dy == 0) continue;
                    n += cellAt(coord + ivec2(dx, dy));
                }
            float next =
                alive == 1 && (n == 2 || n == 3) || alive == 0 && n == 3
                    ? 1.0 / 255.0
                    : 0.0;
            fragColor = vec4(next, 0.0, 0.0, 1.0);
        }
    `
);

buffer.init(cells); // one byte per cell: 0 or 1

const display = surface.createProgram(/* glsl */ `
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;
    uniform sampler2D u_state;
    void main() {
        float alive = texture(u_state, vUv).r;
        out_color = vec4(mix(vec3(0.05, 0.07, 0.12), vec3(0.96, 0.6, 0.22), alive), 1.0);
    }
`);

surface.setDraw(() => {
    buffer.useProgram('sim');
    buffer.setUniforms({ u_gridSize: [96, 96] });
    buffer.step(); // one generation, then swap the ping-pong pair
    surface.clear(0, 0, 0, 1);
    display.setUniforms({ u_state: buffer.getTexture() });
    surface.renderProgram(display);
});
```

A pass is reusable: `addProgram` several shaders and switch between them with `useProgram(name)`. `StateBuffer` is a class (`createStateBuffer` is a thin `new StateBuffer(gl, w, h)` wrapper).

### An interactive canvas (pan/zoom + input)

`CpuCanvas` and `GpuCanvas` wire pointer-drag pan and wheel zoom to a camera by default. Take control of that camera with `useCamera`:

```tsx
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { useCamera } from '@repo/glaze/react/useCamera';

export function Crosshair() {
    const [camera, controls] = useCamera({ zoom: 1, minZoom: 0.5, maxZoom: 8 });

    return (
        <CpuCanvas
            camera={camera}
            cameraControls={controls}
            onFrame={(surface) => {
                surface.clear('#0d1015');
                const world = surface.input.getPointerWorldPos(camera);
                surface.circle(world.x, world.y, 12, '#38bdf8');
            }}
        />
    );
}
```

The shared input store tracks the pointer (position + delta), mouse buttons, and keyboard state (`isKeyDown` / `wasKeyPressed`, cleared each frame). `input.getPointerWorldPos(camera)` converts the pointer to world coordinates, so the crosshair stays glued to the cursor under pan/zoom. `controls` adds `panTo`, `zoomTo`, and `reset`.

### One loop for everything else

`FrameLoopProvider` + `useFrame` run non-canvas logic on the same tick — e.g. an HUD that doesn't need a canvas.

```tsx
import { useState } from 'react';
import { FrameLoopProvider } from '@repo/glaze/react/FrameLoopProvider';
import { useFrame } from '@repo/glaze/react/useFrame';

function FpsHud() {
    const [fps, setFps] = useState(0);
    useFrame((_time, delta) => setFps(delta > 0 ? Math.round(1 / delta) : 0));
    return <span>{fps} fps</span>;
}

export function App() {
    return (
        <FrameLoopProvider>
            <FpsHud />
            <Sketch />
        </FrameLoopProvider>
    );
}
```

`useFrame` always calls the latest closure, so inline callbacks are safe; the loop starts on the first subscriber and stops when the last one leaves.

## Notes & gotchas

- **Shapes are batched.** GPU shapes are tessellated on the CPU into one dynamic vertex buffer and drawn in a single draw call per frame (flushed on `clear()`, before custom programs/text, and at the end of the frame). A fullscreen pass is reserved for custom programs.
- **Draw in world space.** CPU shapes assume the runtime's transform is applied (it is, before every frame); GPU shapes are tessellated in world space and projected through the camera matrix, with GPU MSAA anti-aliased edges.
- **`half` is reserved in GLSL ES 3.00.** Using `half` / `hvec2/3/4` as an identifier only fails at compile time.
- **Text is a texture.** Glyphs are rasterized to an offscreen canvas (2× supersampled, 128-entry LRU cache) and uploaded with `UNPACK_FLIP_Y`.
- **Context loss is handled.** The GPU runtime `preventDefault()`s `webglcontextlost`, then re-applies state and recompiles tracked programs (including the shape batcher and the text cache) on restore.
- **CPU and GPU stay siblings.** There is deliberately no shared renderer abstraction — duplicate over abstract.
- **Classes over factories.** `CpuSurface`, `GpuSurface`, `Camera`, `FrameLoop`, `InputStore`, `StateBuffer`, `Program`, `ShapeBatcher`, and `TextRasterizer` are classes; every `createX` export is a thin `new X(...)` wrapper kept for compatibility. Named exports only, no barrel files; errors prefixed `Glaze:`.

## Testing

```bash
pnpm --filter @repo/glaze test
```

## Contributing

PRs welcome! See [CONTRIBUTING.md].

## Changelog

Follows SemVer. See [CHANGELOG.md].

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

