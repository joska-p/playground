# @repo/glaze

> p5-style drawing immediacy and three.js-style shader freedom, in one package.

## What it is

`@repo/glaze` is a 2D rendering toolkit built on one idea: **a shape on the canvas and a shader on the canvas are the same mechanism.** The draw primitives (`drawCircle`, `drawRect`, `drawLine`, `drawText`) read like p5, and a "program" — a fragment shader plus its uniforms rendered as a fullscreen triangle — is what you reach for when shapes aren't enough. On WebGL2 the two speak the same language: shapes are tessellated and drawn through a shader, and custom programs are fullscreen passes.

It ships as two sibling runtimes over a shared foundation:

- `createSurface` — immediate-mode Canvas2D. Draw calls against a raw `2d` context.
- `createGpuRuntime` — WebGL2, the same drawing model. Shapes plus custom programs (`createProgram` / `renderProgram`), and `createStateBuffer` for GPGPU simulation on a ping-pong texture pair.

Both expose the same skeleton: a frame loop, a camera, and an input store, handed to you every frame as a context object (`time`, `deltaTime`, `frameCount`, `camera`, `input`, `width`, `height`, `dpr`). Drawing happens in **world space** — the runtime applies the camera for you, so pan/zoom/pointer math is solved once instead of once per sketch.

The React layer wraps the runtimes in `<CpuCanvas>` / `<GpuCanvas>`: the runtime is created on mount and destroyed on unmount, and pointer-drag + wheel pan/zoom gestures drive the same camera the runtime renders through. `core/` also exports the camera object and curried coordinate transformers (screen → canvas → normalized → UV) for custom math outside a canvas.

## Use cases

### Animated scene on plain Canvas2D

No React, no shaders — a canvas, a loop, and shapes.

```ts
import { createSurface } from '@repo/glaze/cpu/createSurface';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import { drawText } from '@repo/glaze/cpu/shapes/text';

const runtime = createSurface({ canvas });

runtime.setDraw(({ time }) => {
    runtime.clear('#0d1015');
    drawCircle(
        runtime.context,
        { fill: '#e11d48' },
        { x: 200, y: 150 + Math.sin(time * 2) * 30 },
        60
    );
    drawText(runtime.context, { fill: '#f8fafc', fontSize: 24 }, 'glaze', { x: 20, y: 40 });
});
```

`setDraw` starts the rAF loop; `runtime.destroy()` stops it and detaches listeners. The default camera is `{ x: 0, y: 0, zoom: 1 }`, so world pixels equal CSS pixels with a top-left origin.

### Shapes on a GPU canvas (React)

Same draw calls as the CPU runtime — WebGL2 under the hood.

```tsx
import { useState } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import type { GpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';

export function Sketch() {
    const [surface, setSurface] = useState<GpuRuntime | null>(null);

    return (
        <GpuCanvas
            onSurface={setRuntime}
            onFrame={() => {
                if (!runtime) return;
                runtime.clear(0.05, 0.07, 0.09, 1);
                runtime.drawCircle({ x: 200, y: 150 }, 60, { fill: '#e11d48' });
                runtime.drawRect({ x: 30, y: 30, w: 120, h: 90 }, { fill: '#16a34a' });
                runtime.drawLine(
                    { x: 30, y: 260 },
                    { x: 200, y: 260 },
                    { stroke: '#3b82f6', lineWidth: 8 }
                );
            }}
        />
    );
}
```

`onSurface` hands you the live runtime (ref-callback style, `null` on unmount) for imperative access; `onFrame` receives the same per-frame context the imperative `setDraw` does.

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

The standard uniforms are applied automatically each frame: `u_resolution` (device px), `u_aspect`, `u_mouse` (pointer normalized to the canvas, y-flipped to UV), `u_camera` (CSS-px offset + zoom), `u_dpr`, `u_time`. Add per-frame uniforms with the `uniforms` prop — a function of the frame context. For the imperative equivalent, use `runtime.createProgram(source)` and `runtime.renderProgram(program)` from `onSurface`.

### A GPGPU simulation (state buffer)

`createStateBuffer` owns two textures it alternates between: `step()` renders the active program into the write target while sampling the previous state through a `u_state` sampler, then swaps. Seed it with `init()` and read the live state back with `getTexture()`. This is Conway's Game of Life in miniature.

```ts
import { createGpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';
import { createStateBuffer } from '@repo/glaze/gpu/createStateBuffer';

const runtime = createGpuRuntime({ canvas });
const buffer = createStateBuffer(runtime.gl, 96, 96);

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

const display = runtime.createProgram(/* glsl */ `
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;
    uniform sampler2D u_state;
    void main() {
        float alive = texture(u_state, vUv).r;
        out_color = vec4(mix(vec3(0.05, 0.07, 0.12), vec3(0.96, 0.6, 0.22), alive), 1.0);
    }
`);

runtime.setDraw(() => {
    buffer.useProgram('sim');
    buffer.setUniforms({ u_gridSize: [96, 96] });
    buffer.step(); // one generation, then swap the ping-pong pair
    runtime.clear(0, 0, 0, 1);
    display.setUniforms({ u_state: buffer.getTexture() });
    runtime.renderProgram(display);
});
```

A pass is reusable: `addProgram` several shaders and switch between them with `useProgram(name)`.

### An interactive canvas (pan/zoom + input)

`CpuCanvas` and `GpuCanvas` wire pointer-drag pan and wheel zoom to a camera by default. Take control of that camera with `useCamera`:

```tsx
import { useState } from 'react';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { Surface } from '@repo/glaze/cpu/createSurface';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import { useCamera } from '@repo/glaze/react/useCamera';

export function Crosshair() {
    const [surface, setSurface] = useState<Surface | null>(null);
    const [camera, controls] = useCamera({ zoom: 1, minZoom: 0.5, maxZoom: 8 });

    return (
        <CpuCanvas
            onSurface={setRuntime}
            camera={camera}
            cameraControls={controls}
            onFrame={({ input }) => {
                if (!runtime) return;
                runtime.clear('#0d1015');
                const world = input.getPointerWorldPos(camera);
                drawCircle(runtime.context, { fill: '#38bdf8' }, world, 12);
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
- **Factories, not classes; named exports only, no barrel files; errors prefixed `Glaze:`.**

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
