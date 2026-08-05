# Objective

I want to add a new rendering pipeline to my existing WebGL2 Mandelbrot viewer @packages/fracture using **Perturbation Theory** (specifically the K.I. Martin algorithm). This will allow arbitrary, virtually infinite zoom levels (up to 1e100 and beyond) while maintaining high FPS.

**CRITICAL:** I already have a working renderer using Double-Single (DS) arithmetic. I do NOT want to replace it. I want both the old DS renderer and the new Perturbation renderer to coexist in the app, with a UI selector menu to switch the active canvas/pipeline.

# Architecture Overview

My app uses React19 and a WebGL2 helper lib @packages/graphics.

- The current renderer computes the fractal entirely on the GPU using DS float math.
- The new renderer will shift the heavy precision work to the CPU (computing a Reference Orbit) and send that data to the GPU via a Data Texture. The GPU will then use standard, lightning-fast `highp float` 32-bit math to compute the per-pixel deltas.

# Step-by-Step Implementation Plan

## 1. UI & State Management

- Add a state variable to track the active renderer: e.g., `'double-single'` | `'perturbation'`.
- Add a dropdown or button menu to the UI to switch between them.
- When switching, initialize the corresponding pipeline and pass the relevant uniforms.

## 2. CPU-Side: Reference Orbit Calculation (JS/TS)

For the perturbation renderer, we need a high-precision reference orbit computed on the CPU.

- Create a new class/module `PerturbationOrbit.ts`.
- It should take the view center coordinates (`centerRe`, `centerIm`) and `maxIterations`.
- **Precision:** Start by using JavaScript `Float64Array` for the reference orbit. (Note: standard JS numbers only give ~15 digits of zoom. For truly arbitrary 1e100 zoom, note in the code that a BigInt or decimal.js library should be swapped in later, but get it working with Float64 first).
- Calculate the orbit: `X[0] = 0`, `C_ref = centerRe + i*centerIm`. Iterate `X[n+1] = X[n]^2 + C_ref`.
- Store the real and imaginary parts of the orbit in two `Float32Array`s (or a single interleaved array).
- **Glitch Detection:** Keep track of the iteration where the reference orbit escapes (bailout > 2.0). Pixels that don't escape before this might glitch, but we can handle that later.

## 3. GPU-Side: Data Texture for Orbit

- In the WebGL2 setup for the perturbation pipeline, create a `R32F` or `RG32F` Data Texture.
- Upload the CPU-computed `Float32Array` reference orbit to this texture.
- This bypasses uniform array size limits, allowing thousands of iterations.

## 4. GPU-Side: The Perturbation Fragment Shader

Create a new fragment shader: `perturbation.frag`. It should use the same lighting (OKLCH), bump-mapping, and coloring logic as my existing shader, but replace the hot loop with the perturbation delta equation:

**Math to implement in GLSL:**

- Let `Xn` be the reference orbit value sampled from the Data Texture at iteration `n`.
- Let `d` be the pixel's offset from the reference center: `d = (vUv - 0.5) * (3.0 / zoom)`.
- Initial delta: `dz = vec2(0.0, 0.0)`.
- Loop equation (standard `highp float`):
     ```glsl
     // Xn is complex (Xnr, Xni)
     // dz is complex (dzr, dzi)
     float r = Xnr * Xnr - Xni * Xni + dzr * dzr - dzi * dzi + d.x;
     float i = 2.0 * Xnr * Xni + 2.0 * dzr * dzi + d.y;
     dz = vec2(r, i);
     ```
- **Bailout:** Check if `dot(dz, dz) > 4.0`. If it escapes, calculate smooth iteration just like the old shader, but using `dz` and the current iteration count.

## 5. Pipeline Integration

- Create a new pipeline setup function (e.g., `createPerturbationPipeline.ts`) similar to my existing `createQuadPipeline.ts`.
- It must handle compiling `perturbation.frag`, binding the Data Texture, and passing standard uniforms (`u_zoom`, `u_centerRe`, etc.).
- Ensure that when the user switches renderers via the UI, the correct canvas/pipeline is cleaned up or hidden, and the new one takes over the `requestAnimationFrame` loop.

# Constraints

- Do not modify the existing DS shader files or break the existing pipeline.
- Use WebGL2 features natively (no external libraries like Three.js unless already present).
- Keep the performance high: the GPU loop must only use `highp float` math.
- Stay true too the clean code principles.

Please start by outlining the file structure and then provide the code for the CPU reference orbit calculator and the new perturbation fragment shader.
