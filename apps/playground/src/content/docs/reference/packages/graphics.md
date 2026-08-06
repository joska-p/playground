---
title: 'Graphics lib'
description: 'A zero-dependency, React-first generative graphics library that bridges custom GLSL engines with WebGL2 — replacing heavy 3D engines with tiny, decoupled modules for coordinate mapping, shader execution, framebuffer management, GPU compute (GPGPU), and render-loop orchestration.'
category: 'reference'
tags:
    - reference
    - graphics
order: 20
---

# @repo/graphics

---

## Core Philosophy & Design Guidelines

This package is built around three core architectural principles:

1. **Zero Abbreviations & Explicit Naming:** No shortened variable or parameter names (`v`, `buf`, `ndc`). Everything reads as self-documenting, plain English (`vector`, `canvasElementBounds`, `devicePixelRatio`).
2. **Pure Curried Functions over State Engines:** Math modules export higher-order, curried functions rather than stateful classes. You configure the spatial context first (bounds, DPR, scale fit mode) and get back a specialized, single-argument transformer `(point: Point2D) => Point2D`.
3. **`originToTarget` Directional Flow:** Conversions are named explicitly by their source and destination spaces (`createScreenToCanvas`, `createCanvasToBuffer`, `createDataToCanvas`). The target of one stage naturally plugs into the origin of the next.

---

## Module Overview

| Module / Export                 | Kind      | Purpose                                                                                                                                                                                                                                                              |
| :------------------------------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2d/transforms**               | functions | Curried coordinate transforms (`screenToCanvas`, `canvasToNormalized`, `normalizedToWebGL`, `canvasToBuffer`, `bufferToCanvas`, `dataToCanvas`, `canvasToData`, `screenToBuffer`, `bufferToScreen`), `createShaderUniformBuilder`, re-exports `generateGLSLFragment` |
| **core/createWebGLContext**     | factory   | Canvas setup, DPR-aware resize, viewport management, context loss handling — returns a `WebGLContext`                                                                                                                                                                |
| **2d/createQuadPipeline**       | factory   | Generic fullscreen triangle shader runner — compile GLSL, bind uniforms, draw — returns a `QuadPipeline`                                                                                                                                                             |
| **core/createFBOManager**       | factory   | Ping-pong framebuffers for multi-pass rendering and feedback loops — returns an `FBOManager`                                                                                                                                                                         |
| **core/createFrameLoop**        | factory   | `requestAnimationFrame` loop with subscribe/unsubscribe, delta time — returns a `FrameLoop`                                                                                                                                                                          |
| **2d/createShaderRunner**       | factory   | Convenience composition of `WebGLContext` + `QuadPipeline` with standard-uniform injection, resize and mouse support — returns a `ShaderRunner`                                                                                                                      |
| **2d/createGPGPUPipeline**      | factory   | GPU compute pipeline over an `FBOManager` — multi-program, state texture, init/step — returns a `GPGPUPipeline`                                                                                                                                                      |
| **core/compileShaderProgram**   | factory   | GLSL compile/link helpers (`compileShaderProgram`, `setUniformValue`) shared by the shader pipelines                                                                                                                                                                 |
| **core/standardUniforms**       | helpers   | Canonical framework-uniform contract (`u_resolution`/`u_aspect`/`u_mouse`) + `applyStandardUniforms`                                                                                                                                                                 |
| **2d/react/FrameLoopContext**   | context   | `FrameLoopProvider` + `useFrame` — rAF loop distributed via React context                                                                                                                                                                                            |
| **2d/react/useShaderRunner**    | hook      | Mount a fragment shader on a canvas with `ResizeObserver` auto-resize                                                                                                                                                                                                |
| **2d/react/ShaderCanvas**       | component | Standalone animated shader component combining `useShaderRunner` + `useFrame` + `usePanZoomUniforms`                                                                                                                                                                 |
| **2d/react/usePanZoom**         | hook      | Pan/zoom state for 2D canvases (zero re-renders, mutable ref)                                                                                                                                                                                                        |
| **2d/react/usePanZoomUniforms** | hook      | Maps pan/zoom interaction state to `u_panOffset` / `u_zoom` uniforms                                                                                                                                                                                                 |
| **2d/react/useGPGPU**           | hook      | React wrapper around `GPGPUPipeline` — sim shader → state texture                                                                                                                                                                                                    |

---

## Spatial Coordinate System

All transformations adhere to strict domain definitions — preventing Y-axis flip bugs and DPI mismatch errors:

```
[ Screen Space ]  --->  [ Canvas Space ]  --->  [ Normalized Space ]  --->  [ WebGL NDC ]
  (Browser CSS)        (Canvas Layout)          (0–1)                    (-1–1, Y-flipped)
                              |
                              v
                       [ Buffer Space ]
                       (High-DPI GPU pixels)
```

| Space Name     | Boundaries / Range                     | Origin Position | Unit / Context                                     |
| :------------- | :------------------------------------- | :-------------- | :------------------------------------------------- |
| **Screen**     | `[0, windowWidth] x [0, windowHeight]` | Top-Left        | Raw browser pointer events (`clientX`, `clientY`)  |
| **Canvas**     | `[0, canvasWidth] x [0, canvasHeight]` | Top-Left        | Local CSS layout pixels inside the canvas element  |
| **Normalized** | `[0.0, 1.0] x [0.0, 1.0]`              | Top-Left        | Relative percentages across canvas dimensions      |
| **WebGL NDC**  | `[-1.0, 1.0] x [-1.0, 1.0]`            | Center          | Standard WebGL Normalized Device Coordinates       |
| **Buffer**     | `[0, width * DPR] x [0, height * DPR]` | Top-Left        | Physical GPU render target pixels (`gl_FragCoord`) |
| **Data**       | Domain-defined (e.g., `[-100, 100]`)   | Domain-defined  | Raw mathematical data, charts, or simulation space |

---

## Functional API

Transformations are curried — pre-configure your conversion pipeline once and pass pure single-argument functions into render loops:

```typescript
import { createScreenToCanvas, createCanvasToBuffer } from '@repo/graphics/2d/transforms';

const screenToCanvas = createScreenToCanvas(canvasElementBounds);
const canvasToBuffer = createCanvasToBuffer(devicePixelRatio);

const canvasPoint = screenToCanvas(pointerEventVector);
const bufferPoint = canvasToBuffer(canvasPoint);
```

### Composite transforms

Shorthand for common two-stage pipelines:

```typescript
import { createScreenToBuffer, createBufferToScreen } from '@repo/graphics/2d/transforms';

const screenToBuffer = createScreenToBuffer(canvasBounds, devicePixelRatio);
const bufferToScreen = createBufferToScreen(canvasBounds, devicePixelRatio);
```

### Data-domain mapping with fit modes

`fitMode` determines how mathematical data maps inside non-square viewports:

- `'contain'` — Scales domain so all data fits (letterbox/pillarbox).
- `'cover'` — Scales domain to fill the canvas (crops domain edges).
- `'fill'` — Distorts data to stretch across canvas dimensions.
- `'none'` — Raw 1:1 mapping, no scaling.

```typescript
import { createDataToCanvas } from '@repo/graphics/2d/transforms';

const dataToCanvas = createDataToCanvas(
    { xMin: -100, xMax: 100, yMin: -50, yMax: 50 },
    canvasDimensions,
    'contain',
    0.05 // 5% padding
);

const canvasPositions = dataPoints.map(dataToCanvas);
```

### Shader uniform builder

```typescript
import { createShaderUniformBuilder } from '@repo/graphics/2d/transforms';

const buildUniforms = createShaderUniformBuilder(cssWidth, cssHeight);
const values = buildUniforms(mouseNormalizedUV);
// → { resolution: [w*dpr, h*dpr], aspectRatio: w/h, mouse: [uvX, uvY] }
// dpr is the capped device pixel ratio (`min(window.devicePixelRatio, 2)`).
```

### Canonical uniform contract

`ShaderRunner.render()` injects three framework uniforms each frame — but only when
the shader declares them (checked via `hasUniform`). The names are **canonical**; the
legacy `uniformResolution`/`uniformAspectRatio`/`uniformMouse` aliases were removed.

| Canonical name | GLSL type | Value                                                         |
| :------------- | :-------- | :------------------------------------------------------------ |
| `u_resolution` | `vec2`    | Buffer pixels `[width * dpr, height * dpr]`                   |
| `u_aspect`     | `float`   | `cssWidth / cssHeight`                                        |
| `u_mouse`      | `vec2`    | Normalized UV in vUv space — origin bottom-left, y-up, `0..1` |

The values come from `createShaderUniformBuilder` (canvas size + normalized pointer).
`applyStandardUniforms` (in `core/standardUniforms`) maps the builder's
`{ resolution, aspectRatio, mouse }` onto the canonical `u_*` names and applies them via
`pipeline.setUniforms` before the draw call. `ShaderCanvas` additionally auto-binds two
uniforms each frame (only when the shader declares them):

| Canonical name | GLSL type | Value                                    |
| :------------- | :-------- | :--------------------------------------- |
| `u_panOffset`  | `vec2`    | Pan in vUv units (`pan / cssSize`, y-up) |
| `u_zoom`       | `float`   | Wheel zoom, clamped to `0.1..5`          |

The mouse value is **normalized in vUv space** — the same space as the built-in
`vUv` (origin bottom-left, y-up). Pointer coordinates are normalized against
the canvas box (`0..1`, top-left origin) before upload — `ShaderCanvas`
normalizes `clientX - rect.left` by `rect.width` — and converted to vUv space
on upload (`1 - y`). Convert to clip space inside the shader
(`vec2 ndc = u_mouse * 2.0 - 1.0;`) or via `createNormalizedToWebGL`.

Custom uniforms are set with `setUniforms` and accept numbers, number arrays,
`Float32Array`/`Int32Array`, and `WebGLTexture` values.

---

## WebGL Factories

### createQuadPipeline — fullscreen fragment shader runner

A **generic** fullscreen-triangle pipeline: compiles a fragment shader (with auto
`#version 300 es` injection), introspects uniforms, and draws. It knows nothing about
framework uniforms — those are injected by `createShaderRunner` (see the
[canonical uniform contract](#canonical-uniform-contract)):

```typescript
import { createQuadPipeline } from '@repo/graphics/2d/createQuadPipeline';

const gl = canvas.getContext('webgl2');
const pipeline = createQuadPipeline(gl);

pipeline.compileFragmentShader(myFragmentSrc);

// Custom uniforms (numbers, arrays, textures):
pipeline.setUniforms({
    u_time: performance.now() / 1000,
    u_color: [1.0, 0.4, 0.1],
    u_texture: myWebGLTexture
});

// Draw one frame:
pipeline.render();

// Free GL resources:
pipeline.dispose();
```

### createWebGLContext — canvas lifecycle

```typescript
import { createWebGLContext } from '@repo/graphics/core/createWebGLContext';

const ctx = createWebGLContext({ canvas });
ctx.viewport();
ctx.clear(0, 0, 0, 1);
ctx.resize(width, height);
ctx.onContextLost(() => {
    /* re-create resources */
});
ctx.onContextRestored(() => {
    /* re-upload */
});
```

Access the raw GL object via `ctx.gl`, and the buffer size via `ctx.drawingBufferWidth` / `ctx.drawingBufferHeight`. The `webGLContextAttributes` option (`alpha`, `antialias`, `premultipliedAlpha`) is read at context creation and cannot change for the life of the context — recreating the context requires a new `createWebGLContext` call.

### createFBOManager — ping-pong framebuffers

```typescript
import { createFBOManager } from '@repo/graphics/core/createFBOManager';

const fbo = createFBOManager(gl, width, height);

// Each frame:
fbo.bindWrite(); // render to current write target
// ... draw calls ...
fbo.unbind();
fbo.swap(); // swap read ↔ write for next frame

const readTex = fbo.getReadTexture(); // previous frame's result
const writeTex = fbo.getWriteTexture(); // current frame's target
```

### createFrameLoop — rAF subscription

```typescript
import { createFrameLoop } from '@repo/graphics/core/createFrameLoop';

const loop = createFrameLoop();
const unsubscribe = loop.subscribe((time, delta) => {
    // time in seconds, delta in seconds
});
unsubscribe(); // auto-stops when no subscribers
loop.dispose();
```

### createShaderRunner — quick all-in-one

Combines `createWebGLContext` + `createQuadPipeline` for the common case:

```typescript
import { createShaderRunner } from '@repo/graphics/2d/createShaderRunner';

const runner = createShaderRunner({ canvas, fragmentShader: fragmentShaderSrc });
runner.render(); // draw one frame
runner.setMouse({ x, y }); // update mouse uniform (normalized UV, 0..1)
runner.resize(width, height);

// Inspect internals:
runner.context; // raw WebGL2RenderingContext
runner.canvas; // the canvas element
runner.pipeline; // the underlying QuadPipeline
runner.ctx; // the underlying WebGLContext

// Free GL resources:
runner.dispose();
```

### createGPGPUPipeline — GPU compute (simulation)

Runs a simulation shader against a state texture in a feedback loop via an `FBOManager`. Supports multiple named programs:

```typescript
import { createGPGPUPipeline } from '@repo/graphics/2d/createGPGPUPipeline';

const gpu = createGPGPUPipeline(gl, width, height, simFragmentSrc);

gpu.addProgram('render', renderFragmentSrc);
gpu.useProgram('default');

// Each tick:
gpu.setUniforms({ u_dt: 0.016 });
gpu.step(); // render → swap FBO

// Initialize state:
gpu.init(new Uint8Array(width * height));
const stateTexture = gpu.getStateTexture();

// Free GL resources:
gpu.dispose();
```

---

## React Integration

### FrameLoopProvider & useFrame — frame loop context

Wrap your tree with `FrameLoopProvider` and subscribe to the animation loop with `useFrame`:

```tsx
import { FrameLoopProvider, useFrame } from '@repo/graphics/2d/react/FrameLoopContext';

function Root() {
    return (
        <FrameLoopProvider>
            <MyScene />
        </FrameLoopProvider>
    );
}

function MyScene() {
    useFrame((time, delta) => {
        // Called every rAF — stable callback ref, no stale closures
    });
}
```

### ShaderCanvas — auto-animating shader component

Declarative wrapper: it mounts the runner, resizes with the canvas, runs a frame
loop, and draws every frame. Pan (middle-drag) and zoom (wheel) are **always on**;
the `u_panOffset` / `u_zoom` uniforms are auto-fed each frame only when the shader
declares them. The canvas fills its container by default (override with `style`).

```tsx
import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';

<ShaderCanvas
    fragmentShader={myShaderSrc}
    webGLContextAttributes={{ antialias: true }}
/>;
```

The **time uniform** is injected automatically each frame into the shader's declared
`u_time` (opt out with `time={false}`; pick another name with `time="uTime"`). It is
set **before** `onBeforeRender`, so a user-set time wins. Custom per-frame uniforms go
through `onBeforeRender`, which receives a single props object with the pipeline, the
frame time, the mouse, and the current view:

```tsx
<ShaderCanvas
    fragmentShader={myShaderSrc}
    onBeforeRender={({ pipeline, time, mouse, view }) => {
        pipeline.setUniforms({
            u_speed: 2.0,
            u_time: time * 0.5,
            u_screen: [mouse.x, mouse.y]
        });
    }}
/>
```

The callback payload is all in **CSS space, y-down**: `view.pan` is in CSS pixels,
`mouse` is normalized `0..1` against the canvas box, and `view.zoom` is the wheel
zoom. The framework applies the flip to vUv space at the uniform boundary (`u_mouse`
is `1 - mouse.y`; `u_panOffset = [-pan.x / width, pan.y / height]`). Pan/zoom tuning
knobs (`minZoom`, `maxZoom`, `zoomToCursor`, `scalePanWithZoom`, `zoomSpeed`), view
seeding (`initialView`), and view sync (`onViewChange`) are all top-level props:

```tsx
<ShaderCanvas
    fragmentShader={interactiveShaderSrc}
    initialView={{ pan: { x: 0, y: 0 }, zoom: 1 }}
    maxZoom={1e6}
    zoomToCursor
    onViewChange={(view) => setStoreView({ pan: view.pan, zoom: view.zoom })}
    onBeforeRender={({ pipeline, view }) => {
        pipeline.setUniforms({ u_center: centerFromView(view) });
    }}
/>
```

Transform vUv with the pan/zoom uniforms, e.g. `vec2 uv = (vUv + u_panOffset) / u_zoom;`.
`webGLContextAttributes` is **mount-time only**: changing it re-mounts the canvas
element with a fresh context. Pointer movement is fed to `u_mouse` in vUv space
(normalized, origin bottom-left, y-up) — replace the default handler with the
`onPointerMove` prop when you need your own. For custom pipelines, handlers, or per-frame
sequencing, compose the hooks directly (`useShaderRunner`, `usePanZoom`,
`usePanZoomUniforms`, `useFrame`) instead — see the examples below.

### usePanZoomUniforms — pan/zoom → uniform mapping

The `u_panOffset` / `u_zoom` convention used by `ShaderCanvas` lives here, so it can be
reused without the component. It returns an apply-function that maps pan/zoom state onto
the uniforms each frame:

```tsx
import { usePanZoomUniforms } from '@repo/graphics/2d/react/usePanZoomUniforms';

function MyCanvas() {
    const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader });
    const interaction = usePanZoom(canvasRef);
    const applyPanZoom = usePanZoomUniforms(runnerRef, interaction);

    useFrame(() => {
        applyPanZoom();
        runnerRef.current?.render();
    });

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
```

Pan is stored in CSS pixels (top-left origin, y-down); it is normalized against the
canvas size on upload — `u_panOffset = [-pan.x / width, pan.y / height]`. Use
`usePanZoom` for the raw state (zero-re-render, ref-based).

### useShaderRunner — mount a shader with ResizeObserver

```tsx
import { useShaderRunner } from '@repo/graphics/2d/react/useShaderRunner';

function MyCanvas() {
    const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader });

    useEffect(() => {
        const id = setInterval(() => runnerRef.current?.render(), 16);
        return () => clearInterval(id);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
```

The `runnerRef.current` is a `ShaderRunner` — see the `createShaderRunner` factory above for `context`/`canvas` accessors and `dispose()`. The `webGLContextAttributes` option is read at mount and ignored after; editing `fragmentShader` recompiles the program in place without destroying the GL context.

### usePanZoom — pan/zoom state

Zero-re-render mutable ref for 2D canvas pan/zoom. Middle-drag pans and the wheel zooms
(`0.1..5`). Pan and pointer are CSS pixels relative to the canvas, y-down; normalize
against the canvas size before uploading to a shader:

```tsx
import { usePanZoom } from '@repo/graphics/2d/react/usePanZoom';

function Canvas() {
    const canvasRef = useRef(null);
    const state = usePanZoom(canvasRef);

    // Read mutable ref in your draw loop:
    //   state.current.pan, state.current.zoom, state.current.pointer
}
```

### useGPGPU — GPU compute hook

```tsx
import { useGPGPU } from '@repo/graphics/2d/react/useGPGPU';

const gl = canvas.getContext('webgl2');
const { pipelineRef, getStateTexture } = useGPGPU(gl, 256, 256, simShader);

// Step the simulation each frame:
pipelineRef.current?.setUniforms({ u_dt: 0.016 });
pipelineRef.current?.step();
```

---

## Architecture Blueprint

```
@repo/graphics/src/
├── 2d/
│   ├── transforms.ts           Curried coordinate factories + shader uniform builder
│   ├── createQuadPipeline.ts   Generic fullscreen triangle shader runner
│   ├── createShaderRunner.ts   Convenience: WebGLContext + QuadPipeline + standard uniforms
│   ├── createGPGPUPipeline.ts  GPU compute pipeline over createFBOManager (simulation)
│   └── react/
│       ├── FrameLoopContext.tsx   FrameLoopProvider + useFrame (rAF via React context)
│       ├── useShaderRunner.ts     Hook: mount a fragment shader with ResizeObserver
│       ├── ShaderCanvas.tsx       Thin animated shader component composing the hooks
│       ├── usePanZoom.ts Hook: pan/zoom state for 2D canvases
│       ├── usePanZoomUniforms.ts  Hook: interaction state → u_panOffset/u_zoom
│       └── useGPGPU.ts            Hook: GPGPU simulation pipeline → state texture
└── core/
    ├── createWebGLContext.ts   Canvas setup, DPR resize, context loss handling
    ├── compileShaderProgram.ts GLSL compile/link + uniform upload helpers
    ├── createFBOManager.ts     Ping-pong framebuffers for multi-pass/feedback
    ├── createFrameLoop.ts      Generic requestAnimationFrame subscription manager
    ├── standardUniforms.ts     Canonical uniform contract (u_resolution/u_aspect/u_mouse)
    └── generateGLSLFragment.ts GLSL UV-calculation snippet generator
```

---

## Field Notes & Guidelines for Contributors

- **Zero Runtime Dependencies:** The math layer must remain 100% pure TypeScript with zero external dependencies.
- **Separation of Concerns:** React hooks rely on WebGL modules, but WebGL modules must never rely on React. Math modules rely on nothing.
- **Factories, Not Classes:** WebGL objects are created by factory functions (`createQuadPipeline`, etc.) returning plain object literals typed by a declared interface. Closures own private state — no `class` keyword anywhere in `core/` or `2d/`.
- **Canonical Uniform Names Only:** framework uniforms are `u_resolution`/`u_aspect`/`u_mouse` — no legacy `uniform*` aliases.

---

*Part of [Creative Playground*](https://joska-p.github.io/playground)
