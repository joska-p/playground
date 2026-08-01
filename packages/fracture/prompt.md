I have an interactive Mandelbrot explorer @packages/fracture built on top of our graphics library @packages/graphics (`ShaderCanvas`, `FrameLoopProvider`, Zustand store, etc.).

Current state:

- Fragment shader does classic escape-time + smooth iteration + finite-difference normal mapping for 3D lighting + OKLCH coloring.
- We already added a continuous convergence measure for the interior of the set (so the bulbs are no longer pure black).
- Normal mapping / depth works well, but at higher zooms the lighting flattens because of precision limits.
- View is controlled by `u_zoom` + `u_panOffset` (and the usual interaction options on `ShaderCanvas`).

**Goal:** Implement emulated double precision (double-single / DS arithmetic) so we can zoom significantly deeper before the image becomes blocky.

Requirements:

1. **Shader side**
   - Add double-single helpers (`ds_set`, `ds_add`, `ds_mul`, and a complex square).
   - Rewrite the orbit iteration in `getMandelbrotData` (or equivalent) using DS arithmetic for `z` and `c`.
   - Keep the rest of the pipeline (normals, lighting, OKLCH, interior convergence coloring) in regular float for performance.
   - Bailout and smooth iteration can still use the high part of the DS values.

2. **View / uniforms**
   - The current single-precision `u_panOffset` + `u_zoom` will become the new bottleneck.
   - Prefer the cleanest integration with `ShaderCanvas` and our existing abstraction.
   - If we need to pass the center as high/low parts (`u_centerRe` / `u_centerIm` as `vec2`), use whatever hooks or imperative APIs `ShaderCanvas` already provides (or ditch the ShaderCanvas and use the hooks directly).
   - On the JS/TS side, split the current double-precision center into hi/lo floats before uploading.

3. **Performance & quality**
   - Accept the expected 4–8× slowdown.
   - Keep `maxIterations` scaling reasonable (can be a bit more aggressive now that precision is better).
   - Preserve all existing controls (sun angle, bump height, ambient, hue, chroma, etc.).

4. **Deliverables**
   - Updated fragment shader with DS arithmetic.
   - Any necessary changes to `Scene.tsx`, the store, or `ShaderCanvas` usage.
   - Clear comments explaining the DS functions and how the center is split.
   - A short note on the new practical zoom limit we should expect.

Please inspect the current `ShaderCanvas` API and our graphics helpers first, then implement the cleanest solution that stays consistent with the existing architecture. Prefer extending existing hooks over adding completely new parallel systems.
