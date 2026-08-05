# Implementation Review: `@repo/graphics`

> Scope: WebGL/React factories, hooks, and math transforms. React 19 + compiler
> in all consuming apps. All typechecks (`tsc --noEmit`) and tests (38/38) pass
> on the reviewed revision; findings below are code-review results, not test failures.

---

## Summary

- **2 HIGH** — behavioral bugs (stale-effect deps; inverted mouse Y).
- **4 MEDIUM** — robustness bugs (destroyed program on compile failure; stale
  shader on context restore; `step()` not binding its program; rAF chain dies
  on a throwing callback).
- **~7 LOW** — edge cases, hardening, doc drift.

Verified clean: closure/state isolation across all factories, resource
lifecycle (every GL object has a teardown path, resize/destroy are idempotent),
`FrameLoop` single-rAF guarantee, WebGL 2 GLSL conformance, and TS strictness.

---

## Confirmed Bugs

### B1 · HIGH · `useShaderRunner` re-creates the whole runner on every shader edit

**File:** `src/react/useShaderRunner.ts:71`

```ts
}, [dpr, fragmentShader, webGLContextAttributes]);
```

The create-effect depends on `fragmentShader`, so any shader edit re-runs it:
the runner (pipeline, VAO, `ResizeObserver`, context-loss listeners) is torn
down and rebuilt, and the second "recompile in place" effect (line 77) is dead
code — `skipRecompileRef` swallows it every time. This contradicts the code
comments (lines 73–76) and the README ("editing `fragmentShader` recompiles the
program in place without destroying the GL context"). If a caller rebuilds the
shader string with a new identity each render, the runner is recreated **every
render**.

> React 19 compiler note: the compiler does not deduplicate or rewrite effect
> dependencies — dependency arrays still drive effect re-runs verbatim, so this
> fix is required regardless of the compiler.

**Fix** — `fragmentShader` is not a "mount-time" prop; only `dpr` and
`webGLContextAttributes` are (context attributes are immutable for a context's
life):

```diff
-  }, [dpr, fragmentShader, webGLContextAttributes]);
+  }, [dpr, webGLContextAttributes]);
```

The recompile effect (deps `[fragmentShader]`) then handles shader edits as
designed. `mountPropsRef` keeps the latest shader for the recreate path when
`dpr`/attributes change.

### B2 · HIGH · `u_mouse`/`uniformMouse` Y-axis inverted relative to `vUv`

**Files:** `src/webgl/compileShaderProgram.ts:7` · `src/math/transforms.ts:240`

`FULLSCREEN_TRIANGLE` computes `vUv = pos * 0.5 + 0.5`, so `vUv.y = 0` at the
**bottom** of the framebuffer (NDC is y-up). `ShaderCanvas` and
`createShaderUniformBuilder` feed the mouse as normalized **top-left, y-down**.
The README claims `u_mouse` is "the same space as `vUv`" — it is not. Any shader
comparing `u_mouse` to a `vUv`-derived UV (e.g. `art-canvas`'s `mouseAttractor`
doing `m - uv`) gets a vertically mirrored pointer.

The fix must flip the **mouse upload**, not `vUv`: the GPGPU paint shader
(`automa/src/shaders/gpu-paint.frag`) reads `texture(u_state, vUv)` and relies
on `vUv` staying y-up to align with `gl_FragCoord` row order. Flipping the
vertex shader would silently mirror the paint target.

**Fix** — `src/math/transforms.ts`:

```diff
-    uniformMouse: mouseNormalizedUV ? [mouseNormalizedUV.x, mouseNormalizedUV.y] : [0, 0]
+    uniformMouse: mouseNormalizedUV ? [mouseNormalizedUV.x, 1 - mouseNormalizedUV.y] : [0, 1]
```

Update the doc comment (lines 233–235) and README table/paragraph to state
`u_mouse` is normalized in `vUv` space (y-up, bottom-left origin). `ShaderCanvas`
keeps sending top-left normalized coords; the flip happens at upload.

### B3 · MEDIUM · failed shader compile destroys the working program

**File:** `src/webgl/createQuadPipeline.ts:25-30`

```ts
if (program) gl.deleteProgram(program); // old program gone first
const compiled = compileShaderProgram(gl, fragmentSource); // throws on bad shader
```

A broken hot-reloaded shader throws after the old program was deleted, leaving
the pipeline bound to a deleted program → permanently blank canvas until a
successful edit.

**Fix** — compile first, swap on success:

```diff
     compileFragmentShader(fragmentSource: string): void {
-      if (program) gl.deleteProgram(program);
       const compiled = compileShaderProgram(gl, fragmentSource);
+      if (program) gl.deleteProgram(program);
       program = compiled.program;
       uniforms = compiled.uniforms;
     },
```

### B4 · MEDIUM · context restore recompiles from the stale, mount-time shader

**Files:** `src/webgl/createShaderRunner.ts:40-48`

`const currentSource = fragmentShader` is captured at creation and replayed in
the `webglcontextrestored` handler. After a shader edit
(`pipeline.compileFragmentShader`), a context loss + restore reverts to the
**original** shader.

**Fix** — let the pipeline track its own latest source; `reinitialize()` with no
arg recompiles from it.

`src/webgl/createQuadPipeline.ts`:

```diff
   let program: WebGLProgram | null = null;
+  let currentSource: string | null = null;
   let uniformBuilder = initialUniformBuilder;
@@
     compileFragmentShader(fragmentSource: string): void {
       const compiled = compileShaderProgram(gl, fragmentSource);
       if (program) gl.deleteProgram(program);
       program = compiled.program;
       uniforms = compiled.uniforms;
+      currentSource = fragmentSource;
     },

-    reinitialize(fragmentSource: string): void {
+    reinitialize(fragmentSource?: string): void {
+      const source = fragmentSource ?? currentSource;
+      if (source === null) {
+        throw new Error('QuadPipeline.reinitialize() called before any shader was compiled');
+      }
       gl.deleteVertexArray(vao);
       vao = gl.createVertexArray();
-      this.compileFragmentShader(fragmentSource);
+      this.compileFragmentShader(source);
     },
```

`src/webgl/createShaderRunner.ts`:

```diff
-  const currentSource = fragmentShader;
-
   const offContextLost = ctx.onContextLost(() => {
@@
   const offContextRestored = ctx.onContextRestored(() => {
     ctx.reinitialize();
-    pipeline.reinitialize(currentSource);
+    pipeline.reinitialize();
   });
```

### B5 · MEDIUM · `GPGPUPipeline.step()` never binds its program

**File:** `src/webgl/createGPGPUPipeline.ts:95-115`

`step()` looks up the program but relies on the consumer's earlier
`useProgram()` call. If any other program (e.g. a `QuadPipeline.render()`) ran
in between — render-then-sim ordering in one frame — `step()` silently renders
with the wrong shader. Consumers currently order sim→display, so it works by
luck.

**Fix:**

```diff
       const entry = programs.get(targetName);
       if (!entry) throw new Error(`GPGPUPipeline: program "${targetName}" not found`);

+      gl.useProgram(entry.program);
       fbo.bindWrite();
```

### B6 · LOW · a throwing `FrameLoop` callback kills the rAF chain permanently

**File:** `src/webgl/createFrameLoop.ts:21-24`

```ts
for (const cb of callbacks) {
        cb(time, delta);
}
rafId = requestAnimationFrame(tick); // never reached if a cb throws
```

**Fix** — schedule before iterating (a mid-loop unsubscribe is safe: `stop()`
cancels the just-scheduled frame):

```diff
   const tick = (now: number): void => {
     if (!running) return;
     const delta = (now - lastTime) / 1000;
     lastTime = now;
     const time = now / 1000;
+    rafId = requestAnimationFrame(tick);
     for (const cb of callbacks) {
       cb(time, delta);
     }
-    rafId = requestAnimationFrame(tick);
   };
```

---

## WebGL 2 / GLSL Validation (focus area 3)

All shader strings are `#version 300 es` with `in`/`out` + custom `out vec4`
(no `gl_FragColor`), correct samplers, and `gl_VertexID` in the fullscreen
triangle. Uniforms/attributes follow WebGL 2 best practice. Two GLSL-level notes:

### G1 · `withVersionDirective` is fragile with leading comments/whitespace

`src/webgl/compileShaderProgram.ts:25-27` only prepends when the source starts
with exactly `#version 300 es`. A leading comment/whitespace/BOM (common with
`?raw` shader imports) yields **two** `#version` directives → cryptic compile
failure.

```diff
 function withVersionDirective(source: string): string {
-  return source.startsWith('#version 300 es') ? source : `#version 300 es\n${source}`;
+  const stripped = source
+    .replace(/^\uFEFF/, '')
+    .replace(/^\s*#version\s+\d+\s+\w+\s*/m, '');
+  return `#version 300 es\n${stripped}`;
 }
```

### G2 · `uniformResolution` should use the actual drawing buffer

`createQuadPipeline.render()` (line 47) already sets the viewport from
`gl.drawingBufferWidth/Height`, but binds `builtUniforms.uniformResolution`
(`cssWidth * dpr`, unrounded) while the buffer is `Math.round(cssWidth * dpr)`
(`src/webgl/createWebGLContext.ts:63`). Off-by-one pixel at fractional DPRs.

```diff
       const builtUniforms = uniformBuilder(mousePx);
+      const resolution: [number, number] = [gl.drawingBufferWidth, gl.drawingBufferHeight];

       const resEntry = uniforms.get('uniformResolution') ?? uniforms.get('u_resolution');
-      if (resEntry) gl.uniform2f(resEntry.location, ...builtUniforms.uniformResolution);
+      if (resEntry) gl.uniform2f(resEntry.location, ...resolution);
```

Also round in `applyDPR` (createWebGLContext.ts:42-45) for consistency.

---

## Edge Cases & Error Handling (focus area 5)

### E1 · `createProgram()` result unchecked

`src/webgl/compileShaderProgram.ts:60` — typed non-null by `lib.dom` but can
return null at runtime (memory pressure / context limits). Guard and clean up
the shaders before throwing:

```diff
   const program = gl.createProgram();
+  if (!program) {
+    gl.deleteShader(vs);
+    gl.deleteShader(fs);
+    throw new Error('shader "link" program creation failed');
+  }
```

### E2 · `instanceof WebGLTexture` throws outside browsers

`src/webgl/compileShaderProgram.ts:93-98` — the `WebGLTexture` global is
undefined in SSR/Node/happy-dom; `value instanceof undefined` throws a
`TypeError`.

```diff
 function isWebGLTextureValue(
   gl: WebGL2RenderingContext,
   value: UniformValue
 ): value is WebGLTexture {
-  return value instanceof WebGLTexture && gl.isTexture(value);
+  return (
+    typeof WebGLTexture !== 'undefined' &&
+    value instanceof WebGLTexture &&
+    gl.isTexture(value)
+  );
 }
```

### E3 · `createCanvasToGrid`/`createScreenToGrid` don't clamp

`src/math/transforms.ts:209-214` — inconsistent with `createWorldToGrid` (line
186). A pointer outside the canvas yields negative `column`/`row`/`index`.

```diff
-    const column = Math.floor(d.x);
-    const row = Math.floor(d.y);
+    const column = Math.max(0, Math.min(cols - 1, Math.floor(d.x)));
+    const row = Math.max(0, Math.min(rows - 1, Math.floor(d.y)));
     return { column, row, index: row * cols + column };
   };
```

### E4 · `createFBOManager.createFBOPair` leaks on partial failure

`src/webgl/createFBOManager.ts:59-69` — if the second FBO in a pair throws, the
first is orphaned and `textureA/fboA` never get assigned.

```diff
   const createFBOPair = (width: number, height: number): void => {
-    const [tex0, fbo0] = createFBO(width, height);
-    const [tex1, fbo1] = createFBO(width, height);
-
-    textureA = tex0;
-    fboA = fbo0;
-    textureB = tex1;
-    fboB = fbo1;
-
-    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
+    let tex0: WebGLTexture | null = null;
+    let fbo0: WebGLFramebuffer | null = null;
+    try {
+      [tex0, fbo0] = createFBO(width, height);
+      const [tex1, fbo1] = createFBO(width, height);
+      textureA = tex0;
+      fboA = fbo0;
+      textureB = tex1;
+      fboB = fbo1;
+    } catch (error) {
+      if (tex0) gl.deleteTexture(tex0);
+      if (fbo0) gl.deleteFramebuffer(fbo0);
+      throw error;
+    } finally {
+      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
+    }
   };
```

(If the second `createFBO` throws after allocating its own texture/FBO, those
are lost; on error we delete the first pair. A full accounting would track both,
but this closes the common leak.)

### E5 · `ShaderCanvas` pointer not clamped to `[0,1]`

`src/react/ShaderCanvas.tsx:37-42` — values leave the unit range while the
pointer is outside the canvas.

```diff
         runnerRef.current?.setMouse({
-          x: (e.clientX - rect.left) / rect.width,
-          y: (e.clientY - rect.top) / rect.height
+          x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
+          y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
         });
```

### E6 · Zero-size canvas — handled

`useShaderRunner` skips 0×0 resize events (`useShaderRunner.ts:56`); `useGPGPU`
skips creation (`useGPGPU.ts:18`). Direct `createFBOManager(gl, 0, 0)` throws
from `checkFramebufferStatus` — acceptable, but document it.

### E7 · Degenerate math domains

`computeDataFit` (`src/math/transforms.ts:94-102`) divides by
`dataWidth`/`dataHeight`; a zero-size domain yields `Infinity` scales. Guard
callers or document the precondition.

### E8 · `QuadPipeline.dispose()` leaves `vao` set

`src/webgl/createQuadPipeline.ts:85-91` — harmless (double-dispose is a GL
no-op) but null it for symmetry with `program`.

---

## Closure & State Isolation (focus area 1) — PASS

- Every factory owns its state in per-instance closures; no module/global state
  is shared between instances.
- Interface methods correctly read/mutate their closed-over variables
  (`pingPong`, `currentWidth/Height`, `program`, `uniforms`, `activeName`,
  `callbacks`, `running`, etc.).
- No `class` keyword; plain object literals typed by declared interfaces, per
  the package design guidelines.

## Resource Lifecycle & Cleanup (focus area 2) — PASS

- **Shaders:** deleted after successful link and on every error path in
  `compileShaderProgram`.
- **Programs:** replaced (old deleted) on recompile; deleted in `dispose()`/
  `dispose()` chains (`QuadPipeline`, `GPGPUPipeline`, `ShaderRunner`).
- **FBOs/textures:** `destroyFBOPair` on `destroy()` and `resize()`; `resize`
  is idempotent (early-return on same size, destroys before recreating).
- **VAOs:** deleted in `dispose()`/`reinitialize()`.
- **FrameLoop:** exactly one rAF (`running` guard); `dispose` cancels it;
  repeated `subscribe`/`unsubscribe`/`dispose` cannot stack frames or leak
  GPU work. `useFrame`'s stable callback-ref pattern prevents stale closures.

## TypeScript Safety (focus area 4) — PASS with nits

- `ReturnType<typeof createSimulationEngine>` and the `setUniforms` overloads
  in `GPGPUPipeline` type-check cleanly in consumers (`automa-engine`, etc.).
- No `any` in the package.
- **Nit:** the `as Float32List`/`as Int32List` casts in `setUniformValue`
  (`compileShaderProgram.ts:119-156`) are required by the DOM lib, but a plain
  `number` reaching a `FLOAT_VEC*`/`MAT*` branch would crash at runtime. The
  scalar `FLOAT`/`INT` branches already handle both shapes; the vec/mat branches
  could assert `typeof value !== 'number'` as cheap hardening.
- **Nit:** `import.meta.env` is typed via `vite-env.d.ts`; the repeated
  `(import.meta as { env?: { DEV?: boolean } }).env?.DEV` casts could be
  replaced with a tiny `isDev()` helper.

## React 19 Compiler Notes

- **Effects are not compiler-rewritten:** dependency arrays still determine
  re-runs (B1). The compiler removes redundant `useMemo`/`useCallback`, not
  effect deps.
- The manual memoization patterns in `useShaderRunner` (`mountPropsRef`,
  `skipRecompileRef`) are ref-based and compiler-agnostic; they remain
  necessary for mount-time snapshot semantics and could be simplified once the
  `fragmentShader` dep is removed (B1).
- `useInteractiveCanvas` already embraces the "zero re-renders, mutable ref"
  style the compiler encourages — no changes needed.

## Doc Drift

- README Architecture Blueprint still lists `webgl/createProgramManager.ts`
  (renamed to `compileShaderProgram.ts`).
- README canonical-uniform table describes `u_mouse` as "same space as `vUv`"
  while claiming top-left/y-down — the two claims contradict (see B2). Fix the
  table/paragraph with B2.
- README `useShaderRunner` section claims in-place recompile on shader edit —
  only true after B1.

---

## Proposed Implementation Plan

1. **B1 + B2** + doc fixes (`transforms.ts` comment, README table/paragraph,
   `useShaderRunner` comment) — the two behavioral fixes.
2. **B3 + B4** — compile-safe swap + pipeline source tracking.
3. **B5 + B6** — `step()` program binding + resilient rAF scheduling.
4. **Hardening pass** — E1 (`createProgram` guard), E2 (`WebGLTexture` guard),
   G1 (`withVersionDirective`), E3 (grid clamp), G2 (drawing-buffer resolution),
   E5 (pointer clamp), E4 (FBO partial-failure cleanup), E8.
5. **Tests** — add `createFrameLoop.test.ts` (subscribe/unsubscribe/dispose,
   single-rAF, throwing-callback survival); extend `transforms.test.ts` for the
   mouse-flip and grid-clamp behavior. Verify with:
   `pnpm --filter @repo/graphics test && pnpm --filter @repo/graphics check-types`,
   then consumer typechecks (`automa`, `art-canvas`, `fracture`, `randomart-next`,
   `automa-engine`).

---

## Implementation Status

All plan steps implemented and verified:

- **Step 1** — `useShaderRunner.ts` deps `[dpr, webGLContextAttributes]`; mouse flip `[x, 1 - y]` in `transforms.ts`; doc comments + README canonical-uniform contract.
- **Step 2** — `createQuadPipeline.ts`: compile-first swap, `currentSource` tracking, `reinitialize(fragmentSource?)`; `createShaderRunner.ts` restore path updated.
- **Step 3** — `createGPGPUPipeline.ts` binds program in `step()`; `createFrameLoop.ts` schedules rAF before running callbacks.
- **Step 4** — E1 createProgram guard, E2 `WebGLTexture` guard, G1 version-directive strip, E3 grid clamp, G2 drawing-buffer resolution + `Math.round`, E5 pointer clamp, E4 FBO cleanup, E8 vao null.
- **Step 5** — `createFrameLoop.test.ts` (10 behavior-based tests) + `transforms.test.ts` mouse/grid assertions.

Verification (all green):

- `pnpm --filter @repo/graphics lint` — clean (0 errors, 0 warnings)
- `pnpm --filter @repo/graphics test` — 50/50 pass
- `pnpm --filter @repo/graphics check-types` — pass
- Consumer typechecks — `automa`, `randomart`, `fracture`, `automa-engine`, `randomart-next`, `art-canvas`, `storybook` all pass

Notes:

- lib.dom types `createProgram()`/`createFramebuffer()` as non-null, so the E1/E4 guards carry `eslint-disable-next-line @typescript-eslint/no-unnecessary-condition` (the WebGL spec allows null returns).
- The intentional `fragmentShader` omission from the runner deps carries an `eslint-disable-next-line react-hooks/exhaustive-deps` above the dep array.
