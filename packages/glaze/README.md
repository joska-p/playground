# @repo/glaze

> p5-style drawing immediacy and three.js-style shader freedom, in one package.

## What it is

`@repo/glaze` is a 2D rendering toolkit built on one idea: **a shape on the canvas and a shader on the canvas are the same mechanism.** The draw primitives (`surface.circle`, `surface.rect`, `surface.line`, `surface.text`) read like p5, and a "program" — a fragment shader plus its uniforms rendered as a fullscreen triangle — is what you reach for when shapes aren't enough. On WebGL2 the two speak the same language: shapes are tessellated and drawn through a shader, and custom programs are fullscreen passes.

It ships as two sibling runtimes over a shared foundation:

- `CpuSurface` — immediate-mode Canvas2D. A fluent class: `createCpuSurface` is a thin `new CpuSurface(config)` wrapper; draw calls are chainable methods against a raw `2d` context.
- `GpuSurface` — WebGL2, the same drawing model. A fluent class (`createGpuSurface` is a thin `new GpuSurface(config)` wrapper): the same chainable shape calls plus custom programs (`createProgram` / `renderProgram`), and `StateBuffer` for GPGPU simulation on a ping-pong texture pair.

Both expose the same skeleton: a frame loop, a camera, and an input store. Per-frame state (`time`, `deltaTime`, `frameCount`, `camera`, `input`, `width`, `height`, `dpr`) lives on the surface, and draw callbacks receive the surface itself. Drawing happens in **world space** — the runtime applies the camera for you, so pan/zoom/pointer math is solved once instead of once per sketch.

The React layer wraps the runtimes in `<CpuCanvas>` / `<GpuCanvas>` or via hooks (`useCpuSurface` / `useGpuSurface`). Life-cycle operations (mounting, camera setup, gestures) are cleanly decoupled from rendering loops, allowing dynamic interaction updates without unnecessary context destructions or WebGL re-compilations.

## Use cases

### Animated scene on plain Canvas2D

No React, no shaders — a canvas, a loop, and shapes.

```ts
import { createCpuSurface } from '@repo/glaze/cpu/CpuSurface';

const surface = createCpuSurface({ canvas });

surface.setDraw(() => {
    surface
        .clear('#0d1015')
        .circle(200, 150 + Math.sin(surface.time * 2) * 30, 60, '#e11d48')
        .text('glaze', 20, 40, '#f8fafc', 24);
});
```

`setDraw` starts the rAF loop; `surface.destroy()` stops it and detaches listeners. The default camera is `{ x: 0, y: 0, zoom: 1 }`, so world pixels equal CSS pixels with a top-left origin. Per-frame state (`time`, `deltaTime`, `frameCount`, `width`, `height`, `dpr`) lives on the surface, updated before each draw callback. Every drawing method returns `surface`, so frames chain naturally with zero per-call allocations.

---

### React Integration: Components & Hooks

The React facade provides dual ways to work with Glaze: declarative components (`<CpuCanvas>` / `<GpuCanvas>`) or headless lifecycle hooks (`useCpuSurface` / `useGpuSurface`).

#### Shapes on a GPU canvas (`GpuCanvas`)

```tsx
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

export function Sketch() {
    return (
        <GpuCanvas onDraw="{(surface)"> {
                surface.clear(0.05, 0.07, 0.09, 1);
                surface.circle(200, 150, 60, '#e11d48');
                surface.rect(30, 30, 120, 90, '#16a34a');
                surface.line(30, 260, 200, 260, '#3b82f6', 8);
            }}
        />
    );
}

```

#### Headless Surface Management (`useGpuSurface` / `useCpuSurface`)

If you want complete control over component rendering or want to hook engine refs directly into your own UI, use the surface hooks:

```tsx
import { useEffect } from 'react';
import { useGpuSurface } from '@repo/glaze/react/hooks/useGpuSurface';

export function HeadlessSketch() {
    const { canvasRef, surfaceRef } = useGpuSurface({
        initialCamera: { zoom: 1.5 }
    });

    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        surface.setDraw(() => {
            surface.clear(0.1, 0.1, 0.1, 1);
            surface.circle(100, 100, 40, '#38bdf8');
        });
    }, [surfaceRef]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
```

---

### A fullscreen shader (declarative)

For shader art you never touch the runtime: pass a fragment shader to `GpuCanvas` and it compiles it on mount, recompiles on source change, and renders it every frame cleanly without flickering or unnecessary engine destruction.

```tsx
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

export function Plasma() {
    return (
        <GpuCanvas * + - / 0.05, 0.16), 0.18), 0.35, 0.5 0.5) 1.0); 300 4.0); 400, 5.0 float float; fragmentShader="{`precision" height: highp in main() out out_color="vec4(mix(vec3(0.08," out_color; p="(vUv" sin(length(p) style="{{" u_resolution.y, u_resolution; u_time u_time; uniform vUv; vec2 vec2(u_resolution.x vec3(1.0, vec4 void wave="0.5" wave), width: { }`} }}/>
    );
}

```

The standard uniforms are applied automatically each frame: `u_resolution` (device px), `u_aspect`, `u_mouse` (pointer normalized to the canvas, y-flipped to UV), `u_camera` (CSS-px offset + zoom), `u_dpr`, `u_time`. Add per-frame uniforms with the `uniforms` prop — a function of the surface.

---

### A GPGPU simulation (state buffer)

`StateBuffer` owns two textures it alternates between: `step()` renders the active program into the write target while sampling the previous state through a `u_state` sampler, then swaps.

```ts
import { createGpuSurface } from '@repo/glaze/gpu/GpuSurface';
import { createStateBuffer } from '@repo/glaze/gpu/StateBuffer';

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

---

### Interactive canvas (dynamic interactions & gestures)

`CpuCanvas` and `GpuCanvas` wire pointer-drag pan and wheel zoom to a camera by default. The React components dynamically route gestures through `gesturesRef` without recreating the `InputRouter` or re-binding raw input listeners.

```tsx
<CpuCanvas !="=" '#38bdf8'); (nativeEvent.button // 0) 1 12, button: canvasInteractions="{{" const if middle-drag nativeEvent, onStart({ p="surface.pointer;" p.y, pan: pans return; surface surface.circle(p.x, { } }) }, }}/>

```

Inputs and interactions remain cleanly separated:

- `InputStore` handles raw signals (`pointerdown`, `pointermove`, `wheel`, etc.).
- `InputRouter` pipelines events into an active gesture array dynamically provided at event time via getter delegation.
- `PanGesture` and `ZoomGesture` handle spatial transforms against `CameraControls`.

---

## Notes & gotchas

- **Shapes are batched.** GPU shapes are tessellated on the CPU into one dynamic vertex buffer and drawn in a single draw call per frame.
- **Draw in world space.** World pixel spaces map directly with smooth camera projection and GPU MSAA anti-aliasing.
- **Dynamic Interaction Bridge.** Gestures defined via `canvasInteractions` update seamlessly in React without forcing DOM listener unbinding or re-attachment.
- **Context loss handling.** The GPU runtime safely handles `webglcontextlost` and re-applies shader and resource states upon restoration.
- **Classes over factories.** `CpuSurface`, `GpuSurface`, `Camera`, `FrameLoop`, `InputStore`, `PanGesture`, `ZoomGesture`, `InputRouter`, `StateBuffer`, `Program`, `ShapeBatcher`, and `TextRasterizer` are pure imperative classes; `createX` exports are thin wrapper instantiators.

## Testing

```bash
pnpm --filter @repo/glaze test

```

## Contributing

PRs welcome! See [CONTRIBUTING.md].

## Changelog

Follows SemVer. See [CHANGELOG.md].

---

*Part of [Creative Playground*](https://www.google.com/search?q=https://joska-p.github.io/playground)
