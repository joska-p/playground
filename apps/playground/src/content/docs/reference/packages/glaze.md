---
title: "Glaze"
description: "p5-style drawing immediacy and three.js-style shader freedom, in one package — a WebGL2 canvas where every shape is a fragment shader, with a sibling Canvas2D door and a shared coordinate/camera foundation."
category: "reference"
tags:
  - reference
  - glaze
order: 20
---

# @repo/glaze

---

## Purpose

`@repo/glaze` unifies two overlapping graphics libraries in this repo
(`@repo/graphics` — shader toolkit, and the `@repo/pixelate2d-*` line —
immediate-mode drawing) into a single coherent package. Drawing primitives
(`drawCircle`, `drawRect`, `drawLine`, `drawText`) read like p5, while a shape on
the canvas and a shader on the canvas are the **same mechanism**: a "program" is
a fragment shader plus uniforms, applied to a region.

The library's first job is to kill coordinate-mapping pain: pan, zoom, and
mouse-relative-to-canvas are handled once, so you never think about coordinate
math again.

## Design

| Decision | Choice |
| --- | --- |
| CPU/GPU | Two sibling doors, `cpu/` and `gpu/`. CPU is first-class, **not** a fallback. No shared renderer abstraction. |
| Drawing model | Assembly = draw calls, authorship = shaders. On GPU a built-in shape **is** a `createProgram` (a tiny pre-written fragment shader), not a batched renderer. |
| Expression layers | One shared foundation (`core/` = frame loop + camera/coords) under both doors. |
| Audience | The author — one person. No compatibility debt. |
| Naming | Curried `createXxx` factories (graphics style), named exports, no barrel files. |

## Quick Start

```bash
pnpm add @repo/glaze
```

Draw with the CPU door (plain Canvas2D):

```ts
import { createCpuDoor } from '@repo/glaze/cpu/createCpuDoor';

const door = createCpuDoor({ canvas });
door.setDraw(() => {
  door.clear('#0d1015');
  door.drawCircle({ x: 200, y: 150 }, 60, { fill: '#e11d48' });
  door.drawRect({ x: 30, y: 30, w: 120, h: 90 }, { fill: '#16a34a' });
  door.drawText('glaze', { x: 20, y: 40 }, { fill: '#f8fafc', fontSize: 24 });
});
```

Or the GPU door — same draw calls, WebGL2 under the hood:

```ts
import { createGpuDoor } from '@repo/glaze/gpu/createGpuDoor';

const door = createGpuDoor({ canvas });
door.setDraw(() => {
  door.clear(0.05, 0.07, 0.09, 1);
  door.drawCircle({ x: 200, y: 150 }, 60, { fill: '#e11d48' });
  door.drawLine({ x: 30, y: 260 }, { x: 200, y: 260 }, { stroke: '#3b82f6', lineWidth: 8 });
});
```

Author your own shader as a program and render it through the same surface:

```ts
const program = door.createProgram(/* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 out_color;
  uniform vec2 u_resolution;
  void main() {
    out_color = vec4(vUv, 0.5, 1.0);
  }
`);
// each frame:
door.clear(0, 0, 0, 1);
door.renderProgram(program);
```

## Exports

The front door is the `package.json` `exports` map — one subpath per module, no
barrels. All modules export named functions/factories only.

### core/ — shared foundation

| Export | Path | Description |
| --- | --- | --- |
| `createFrameLoop` | `@repo/glaze/core/createFrameLoop` | rAF loop with subscribe/unsubscribe, time + delta in seconds, auto start/stop. |
| `camera` | `@repo/glaze/core/coords/camera` | `Camera = { x, y, zoom }`, `defaultCamera`, `screenToWorld`/`worldToScreen`. |
| `createScreenToCanvas` | `@repo/glaze/core/coords/createScreenToCanvas` | Curried: screen → canvas (subtract element bounds). |
| `createCanvasToNormalized` | `@repo/glaze/core/coords/createCanvasToNormalized` | Curried: canvas → normalized (0–1, top-left origin). |
| `createNormalizedToUv` | `@repo/glaze/core/coords/createNormalizedToUv` | Pure y-flip (normalized → UV, bottom-left origin). Not NDC. |
| `createWorldToScreen` | `@repo/glaze/core/coords/createWorldToScreen` | Facade over `camera.worldToScreen`. |
| `createScreenToWorld` | `@repo/glaze/core/coords/createScreenToWorld` | Facade over `camera.screenToWorld`. |

### cpu/ — CPU door (Canvas2D)

| Export | Path | Description |
| --- | --- | --- |
| `createCpuDoor` | `@repo/glaze/cpu/createCpuDoor` | Loop + camera + raw Canvas2D + input; `setDraw`/`subscribe`/`clear`/`applyCamera`. |
| `createInputStore` | `@repo/glaze/cpu/input` | Poll-based input store (shared by both doors). |
| `drawCircle` | `@repo/glaze/cpu/shapes/circle` | `drawCircle(context, style, center, radius)`. |
| `drawRect` | `@repo/glaze/cpu/shapes/rect` | `drawRect(context, style, rect)`. |
| `drawLine` | `@repo/glaze/cpu/shapes/line` | `drawLine(context, style, a, b)` — stroke ?? fill ?? black. |
| `drawText` | `@repo/glaze/cpu/shapes/text` | `drawText(context, style, text, position)`. |
| `drawPath` | `@repo/glaze/cpu/shapes/path` | `drawPath(context, style, points, options?)` — fill + stroke, closed or open. |
| `types` | `@repo/glaze/cpu/shapes/types` | `Color`, `Rect`, `DrawStyle`, `TextStyle`, `PathOptions`. |

### gpu/ — GPU door (WebGL2)

| Export | Path | Description |
| --- | --- | --- |
| `createGpuDoor` | `@repo/glaze/gpu/createGpuDoor` | WebGL2 door: program lifecycle, standard uniforms, context-loss handling, `drawCircle`/`drawRect`/`drawLine`/`drawText`. |
| `compileProgram` | `@repo/glaze/gpu/shader/compileProgram` | GLSL compile/link + uniform introspection; exports `FULLSCREEN_TRIANGLE`. |
| `setUniforms` | `@repo/glaze/gpu/shader/setUniforms` | Type-dispatch uniform setters + `createStandardUniformValues`. |
| `createProgram` | `@repo/glaze/gpu/shader/createProgram` | The heart: a program = fragment shader + uniforms, drawn as a fullscreen triangle. |
| `circle` | `@repo/glaze/gpu/shapes/circle` | `circleFragmentSource` + `circleUniforms`. |
| `rect` | `@repo/glaze/gpu/shapes/rect` | `rectFragmentSource` + `rectUniforms`. |
| `line` | `@repo/glaze/gpu/shapes/line` | `lineFragmentSource` + `lineUniforms`. |
| `text` | `@repo/glaze/gpu/shapes/text` | `textFragmentSource`, `createTextRasterizer`, `textUniforms`. |

### react/ — React door

| Export | Path | Description |
| --- | --- | --- |
| `FrameLoopProvider` | `@repo/glaze/react/FrameLoopProvider` | Provides a shared rAF loop via context (auto start/stop, disposed on unmount). |
| `useFrame` | `@repo/glaze/react/useFrame` | Subscribe a callback to the provider loop; the latest closure is always used, so inline callbacks are safe. |
| `useCamera` | `@repo/glaze/react/useCamera` | `[Camera, CameraControls]` — a mutable pan/zoom camera with pointer-drag + wheel-zoom gestures and imperative controls. Also exports `createCamera` (factory, no React). |
| `CpuCanvas` | `@repo/glaze/react/CpuCanvas` | Canvas2D door as a component: `onFrame` draw, `onDoor`, built-in camera + gestures, overlay children. |
| `GpuCanvas` | `@repo/glaze/react/GpuCanvas` | WebGL2 door as a component — same props as `CpuCanvas`. |

`CpuCanvas` and `GpuCanvas` are separate components (CPU/GPU remain sibling
doors). Both wrap the doors' lifecycle: the door is created on mount and
destroyed on unmount, pan/zoom gestures drive the same `camera` object the door
renders through, and `onDoor` hands you the live door so you can call
`createProgram`/`renderProgram` (GPU) or `clear`/`applyCamera` (CPU).

```tsx
import { useRef } from 'react';
import { CpuCanvas, type CpuDoor } from '@repo/glaze/react/CpuCanvas';

export function Sketch() {
  const doorRef = useRef<CpuDoor | null>(null);
  return (
    <CpuCanvas
      style={{ width: 400, height: 300 }}
      onDoor={(door) => {
        doorRef.current = door;
      }}
      onFrame={() => {
        doorRef.current?.clear('#0d1015');
        doorRef.current?.drawCircle({ x: 200, y: 150 }, 60, { fill: '#e11d48' });
      }}
    />
  );
}
```

## Architecture

```
packages/glaze/src/
├── core/                    # the ONLY shared foundation
│   ├── createFrameLoop.ts   # rAF subscribe/unsubscribe, delta time
│   └── coords/              # Camera + curried space-ladder factories
├── cpu/                     # CPU DOOR — thin Canvas2D
│   ├── createCpuDoor.ts
│   ├── input.ts             # shared input store (both doors import it)
│   └── shapes/              # drawCircle/rect/line/text/path + types
├── gpu/                     # GPU DOOR — shader machinery
│   ├── createGpuDoor.ts
│   ├── shader/              # compileProgram, setUniforms, createProgram
│   └── shapes/              # per-shape fragment shaders + uniform builders
└── react/                   # React door (CpuCanvas/GpuCanvas kept apart)
```

`core/` is the only shared code. `cpu/` and `gpu/` are sibling doors — each owns
its loop, shapes, and input wiring; there is deliberately **no shared
`RenderDriver` abstraction** (duplicate over abstract). On GPU, `shapes/` sits
beside `shader/` so a shape reads as a `createProgram` — the same mechanism as a
fullscreen pass.

### Coordinate spaces

The space ladder runs: **screen → canvas → normalized → UV**. Shaders on the GPU
door additionally recover a fragment's *world* position from `vUv` + the
standard uniforms:

```
vec2 frag = vUv * u_resolution;                       // device px, origin bottom-left
vec2 device = vec2(frag.x, u_resolution.y - frag.y);  // y-flip → top-left
vec2 css = device / u_dpr;                            // CSS px, y down
return (css - u_camera.xy) / u_camera.z;              // world px
```

Draw calls are made in **world space**; the door applies the camera. The default
camera is `{ x: 0, y: 0, zoom: 1 }`, so world px == CSS px (top-left origin,
y down).

### Standard uniforms

`renderProgram` applies `u_resolution` (device px), `u_aspect`, `u_mouse`
(pointer normalized to canvas, y-flipped to UV), `u_camera` (vec3: CSS-px offset
x/y + zoom), and `u_dpr` beside any program-specific uniforms. Screen-space
shaders ignore `u_camera`/`u_dpr` — backward compatible with the graphics
uniform contract.

## Patterns & Gotchas

- **A shape is a program.** On GPU, `drawCircle` lazily compiles its shape
  program through the door's internal `createProgram` (joining the
  context-restore recompile set) and renders it via `renderProgram`. There is no
  batched renderer — each shape is a fullscreen pass. Fine for an author tool.
- **Shapes draw in world space.** `cpu/` shapes assume the door's Canvas2D
  transform is applied (`applyCamera()`); `gpu/` shape shaders derive world
  position from `vUv` + `u_camera`/`u_dpr` and run an SDF test with ~2-device-px
  anti-aliased edges.
- **`half` is reserved in GLSL ES 3.00.** Do not use `half` (or `hvec2/3/4`) as
  an identifier in fragment sources — it only fails at compile time.
- **Texture y-orientation.** Text is rasterized to an offscreen canvas (2×
  supersampled, 128-entry LRU cache) and uploaded with default
  `UNPACK_FLIP_Y`; the quad's UVs match so glyphs render upright.
- **Context loss.** The door calls `preventDefault()` on `webglcontextlost`,
  re-applies blend/viewport and recompiles tracked programs (including shape
  programs and the text cache) on `webglcontextrestored`.
- **Shared input store.** `createInputStore` lives under `cpu/input` but is
  imported by the GPU door too — input is shared scaffolding, not a drawing
  abstraction.
- **No comments, no barrels, factories not classes.** Follow `createXxx` naming;
  errors are prefixed `Glaze: `.

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

