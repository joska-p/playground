**Overall assessment:** This is a solid, well-structured foundation for a small creative-coding / shader toolkit. The modularity is good, responsibilities are mostly clear, and the factory-function + returned object pattern keeps things lightweight and composable. It already follows several clean-code principles (single responsibility, clear naming of public APIs, explicit disposal, TypeScript types). There are a few inconsistencies and opportunities to tighten it further.

### Strengths

- **Clear separation of concerns**
  - `createWebGLContext` owns the canvas ↔ GL relationship, DPR, viewport, clear, and context-loss events.
  - `compileShaderProgram` is a pure compilation + uniform introspection utility.
  - `createQuadPipeline` and `createGPGPUPipeline` are distinct pipelines with their own lifetime and state.
  - `createFrameLoop` is a pure, reusable animation-loop primitive.
  - `createFBOManager` isolates the ping-pong FBO logic cleanly.

- **Good public API design**
  - Factory functions return plain objects with methods and getters. Easy to test and to compose.
  - Explicit `dispose()` / `reinitialize()` paths show you thought about resource lifetime and context restoration.
  - Uniform handling is centralized in `setUniformValue` with a sensible type switch.

- **Practical details**
  - Fullscreen triangle (instead of a quad) is the modern, correct choice.
  - Context-loss / restore hooks are present.
  - DPR is capped sensibly (`Math.min(..., 2)`).
  - Typed uniforms + active-uniform introspection avoid stringly-typed surprises at runtime.

### Clean-code observations & suggestions

1. **Naming consistency**
   - `webGlContextAttributes` vs `webGLContextAttributes` (and the type `WebGLContextAttributes`). Pick one casing convention and stick to it everywhere.
   - Some places use `u_resolution` / `uniformResolution` dual lookup. Prefer a single canonical name (or a small alias map) so the fallback logic doesn’t proliferate.

2. **Single responsibility & duplication**
   - `createShaderRunner` is a thin convenience layer over `createWebGLContext` + `createQuadPipeline`. That’s fine, but the resize / DPR logic is slightly duplicated between the two. Consider letting the runner only own the high-level orchestration and always delegate sizing to the context.
   - The hardcoded resolution / aspect / mouse uniform injection in `QuadPipeline.render` is convenient for creative-coding demos, but it mixes “framework uniforms” with user uniforms. A cleaner approach is to keep the pipeline completely generic and let the runner (or a small `StandardUniforms` helper) inject the common ones via `setUniforms`.

3. **Error handling & invariants**
   - Most creation failures throw, which is good. A few places only `console.warn` (e.g. `render` / `setUniforms` called before a program exists). Prefer consistent fail-fast for programming errors and warnings only for recoverable / optional cases.
   - `GPGPUPipeline` already documents the context-loss limitation—good. Consider making the limitation explicit in the type or adding a `reinitialize` path later if you want the same robustness as the quad pipeline.

4. **State & mutability**
   - Mutable internal state (`currentDpr`, `program`, `uniformBuilder`, `pingPong`, etc.) is inevitable, but the public surface is mostly immutable / queryable. Keep it that way.
   - `nextTextureUnit` is reset every `render`—that’s correct for the current design, but if you later support multi-pass or more complex binding it will need to become part of a binding context.

5. **Small API polish**
   - `resize` signatures differ slightly between context, runner, and GPGPU. Align the optional parameters where it makes sense.
   - `createFrameLoop` is excellent. Consider exposing a way to force a single tick or to pause without unsubscribing if you anticipate more control needs.
   - The `Point2D` and `ShaderUniformValues` imports are external; make sure those types stay minimal and stable.

6. **Testability & extensibility**
   - Because everything is created via pure factories that take a `WebGL2RenderingContext` (or canvas), you can already inject a mock GL context for unit tests. Keep that property.
   - If the library grows, a thin `GraphicsContext` façade that owns the GL context + a shared frame loop would reduce the number of objects a user has to wire together.

### Minor concrete suggestions

- Extract the common “look up uniform by canonical name or alias” logic into a tiny helper.
- Make the default DPR policy a named constant or a small options object so it’s not repeated.
- Consider returning a more explicit result type from `compileShaderProgram` (or adding a `debugInfo` field) if you ever want to surface active attributes / uniform counts to the user.
- In `createFBOManager`, the `createFBO` / `createFBOPair` helpers are already clean; the only extra safety you might add is checking that the textures/FBOs are non-null after creation (you already have some of that).

### Verdict

This is already cleaner and more intentional than most ad-hoc WebGL helper collections. The architecture is modular, the public APIs are readable, and the lifetime management is thoughtful. The main clean-code wins from here would be:

- stricter naming consistency,
- pushing “framework uniforms” out of the core pipeline,
- aligning the resize / DPR contracts,
- and keeping the GPGPU path as robust as the display path when you next touch context loss.

If you keep the same discipline as the library grows (small factories, explicit dispose, minimal hidden global state), it will stay pleasant to use for creative experiments.

---

**Thoughts on `transforms.ts`**

This is one of the cleaner and more useful parts of the library. Coordinate-system hell is exactly where creative-coding / WebGL code usually becomes a mess of ad-hoc multiplications, and you have turned it into a coherent set of pure, composable factories. That is the right instinct.

### What works well

- **Factory style is consistent** with the rest of the codebase (`createX` returns a pure function). Easy to test, easy to compose, no hidden state.
- **Clear naming of the spaces** you care about:
  - screen → canvas → normalized → buffer / WebGL
  - data domain ↔ canvas (with aspect-fit modes)
  - world / grid helpers
- **`createShaderUniformBuilder`** is particularly good. It documents the important Y-flip (top-left mouse → bottom-left vUv) in one place instead of scattering the conversion.
- **Aspect-fit logic** (`contain` / `cover` / `fill` / `none`) is factored cleanly into `computeDataFit` and reused by both directions.
- **Overloaded `createNormalizedToWebGL`** is a nice small ergonomic touch (works both as factory and as immediate transform).
- **`generateGLSLFragment`** is a pragmatic code-generation helper. For a creative-coding toolkit it is valuable — it removes a common source of “why is my UV upside-down?” bugs.

### Clean-code observations

1. **Documentation is uneven**
   - The JSDoc on `ShaderUniformValues` and inside `createShaderUniformBuilder` is excellent.
   - Most of the other factories have almost none. A one-line comment describing the coordinate spaces (origin, axis direction, units) would make the file much more approachable for future-you or collaborators.

2. **Y-axis conventions are the biggest cognitive load**
   - Screen / canvas / normalized mouse: top-left, y-down
   - WebGL clip / vUv: bottom-left, y-up
   - Data domain: usually mathematical (y-up) but the code does not force it
     You handle the conversion in the right places, but the _mental model_ is only partially documented. Consider a short top-of-file comment that lists every space you support and its origin + axis direction. That single paragraph will save hours later.

3. **Slight asymmetry in the API surface**
   - Some factories are curried (`createScreenToCanvas(bounds)` → function)
   - `createNormalizedToWebGL` is overloaded
   - `gridToWorld` is a plain function (not a factory)
   - `createWorldToGrid` is a factory
     None of this is wrong, but the inconsistency is noticeable. Prefer the factory form everywhere unless the transform is truly parameter-free.

4. **`generateGLSLFragment` feels a bit orphaned**
   - It lives in the same file as the JS transforms, yet it produces GLSL. That is fine for a small toolkit, but if the file grows you may want a `shaderSnippets.ts` (or keep it here and just document that it is the “shader-side counterpart”).

5. **Edge cases & robustness**
   - Division by zero when `canvasWidth` / `canvasHeight` / data domain size is 0 is not guarded. In a React resize path this can happen briefly.
   - `paddingFraction` is applied symmetrically; that is usually what you want, but it is worth a comment.
   - `createWorldToGrid` / `createCanvasToGrid` clamp, which is friendly for interactive use. Good.

6. **Naming nits (same theme as earlier)**
   - `uniformResolution`, `uniformAspectRatio`, `uniformMouse` — these match the dual-lookup style in `createQuadPipeline`. Keep the names stable; they are part of the public contract with shaders.
   - `CanvasElementBounds` vs the more common `DOMRect`-like shape is fine; just be consistent when you pass `getBoundingClientRect()` results.

### Suggested small improvements

```ts
// Top of file – worth the few lines
/**
 * Coordinate spaces used by this module
 *
 * screen     – browser viewport, origin top-left, y-down, CSS pixels
 * canvas     – element local, origin top-left, y-down, CSS pixels
 * normalized – 0..1 inside the canvas box, origin top-left, y-down
 * buffer     – drawingBuffer pixels, origin top-left, y-down
 * webgl/vUv  – 0..1 (or -1..1), origin bottom-left, y-up
 * data       – user-defined domain (usually mathematical, y-up)
 */
```

- Add a couple of zero-size guards (or document that callers must not pass zero).
- Consider exporting a tiny `compose(f, g)` helper if you find yourself chaining three or more transforms often; otherwise leave it.
- The dual lookup in the pipeline (`uniformResolution` _or_ `u_resolution`) could be documented next to `createShaderUniformBuilder` so users know which names are “blessed”.

### Overall verdict

This file is **good**. It is pure, focused, and solves a real pain point without over-engineering. The main clean-code wins from here are:

- more explicit documentation of the coordinate spaces and Y-axis conventions,
- a bit more naming/API consistency,
- and deciding whether `generateGLSLFragment` stays here or moves to a shader-helpers module.

It already feels like the mathematical backbone the rest of the WebGL + React layers can rely on. Keep the same pure-factory discipline and it will stay pleasant as the toolkit grows.

---

**Current React layer – honest assessment**

You’re in the classic “imperative WebGL resource + declarative React” tension. The code already shows good instincts (especially the careful mount-once + recompile-in-place pattern in `useShaderRunner` and the shared frame loop). The main friction is architectural: what belongs in a Context, what belongs in a local hook, and how much implicit coupling you want between components.

### What’s working well

- **`useShaderRunner`** is the strongest piece. Freezing the initial context config, using an empty-deps setup effect, and a separate recompile effect is exactly the right pattern for expensive GL resources under Strict Mode. The ResizeObserver + rAF throttle is also solid.
- **Shared `FrameLoop` via Context** is a good idea. Multiple canvases / simulations should not each create their own `requestAnimationFrame` loop.
- **`useInteractiveCanvas`** keeps interaction state out of React state (ref-based) — correct for high-frequency pointer data that must not trigger re-renders.
- **`ShaderCanvas`** is a reasonable “batteries-included” component that composes the lower-level hooks.

### Where the design is straining

1. **Context vs Hook boundary is fuzzy**
   - `FrameLoopContext` is the only real Context. Everything else is local hooks. That’s mostly fine, but `ShaderCanvas` is already becoming a bit of a god-component that knows about:
     - runner lifecycle
     - interaction state
     - which uniforms exist (`u_panOffset`, `u_zoom`)
     - mouse normalization
     - the frame callback
   - This mixes “infrastructure” with “domain conventions”.

2. **Implicit coupling through uniform names**
   - `ShaderCanvas` reaches into the pipeline and checks for `u_panOffset` / `u_zoom`. That’s convenient for demos but violates the clean-code principle of not having the view layer know the shader’s internal uniform contract. The pipeline should stay generic; the interaction → uniform mapping belongs in a higher-level adapter or in the user’s `onBeforeRender`.

3. **`useGPGPU` is incomplete relative to the rest**
   - It correctly manages lifecycle, but it forces the caller to already have a `WebGL2RenderingContext`. That creates an awkward ownership question: who owns the GL context when you want both a display shader _and_ a GPGPU simulation?

4. **Provider naming & surface area**
   - `GraphicsProvider` only provides the frame loop. The name promises more than it delivers. Either expand it later or rename it (`FrameLoopProvider`).

### Recommended direction (clean + pragmatic)

Keep the current low-level hooks, but make the layering clearer:

```
┌─────────────────────────────────────────────┐
│  GraphicsProvider (Context)                 │  ← owns FrameLoop (+ later maybe a shared GL factory)
│    useFrame                                 │
└─────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────┐
│  useShaderRunner / useGPGPU / useInteractive│  ← pure resource + behaviour hooks
│  (no React Context, just refs + effects)    │
└─────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────┐
│  ShaderCanvas / SimulationCanvas            │  ← thin presentational components
│  (compose hooks, expose clean props)        │
└─────────────────────────────────────────────┘
```

#### Concrete suggestions

**1. Keep the FrameLoop in Context (this is the right use of Context)**

- One animation loop for the whole tree is a classic shared service → Context is appropriate.
- Rename `GraphicsProvider` → `FrameLoopProvider` (or expand it later if you add a shared GL context factory).

**2. Make `ShaderCanvas` thinner**
Move the pan/zoom uniform injection out of the component. Either:

- Let the user do it in `onBeforeRender`, or
- Provide a small helper hook `usePanZoomUniforms(pipeline, interactionRef)` that the user can call if they want the convention.

This removes the hard-coded uniform names from the canvas component and keeps the pipeline generic.

**3. Prefer composition of hooks over a fat Context for WebGL resources**
Do **not** put the `ShaderRunner` or `GPGPUPipeline` into Context unless multiple distant components truly need to share the _same_ GL instance. Most of the time a canvas owns its own context. Hooks that return refs are the cleaner model here (exactly what you already did with `useShaderRunner` and `useGPGPU`).

**4. Clarify ownership for GPGPU + display**
Two common clean patterns:

- **Same context**: expose the `gl` from `useShaderRunner` (or from a lower-level `useWebGLContext`) and pass it to `useGPGPU`.
- **Separate contexts**: keep them independent (simpler, slightly more GPU memory). Document the trade-off.

Right now `useGPGPU` assumes the caller already has a `gl`, which is fine if you document it, but it feels incomplete next to the more polished `useShaderRunner`.

**5. Interaction hook is good — keep it ref-based**
Don’t promote pan/zoom into React state. The current ref approach is correct for 60 fps data.

**6. Small clean-code fixes**

- In `ShaderCanvas` the mouse handler normalizes to 0–1, while `useInteractiveCanvas` stores pixel coordinates. Decide on one coordinate space (or expose both) and document it.
- The middle-button-only panning comment says “Right or middle” but the code only checks `e.button !== 1`. Align comment and code.
- `useFrame` recreates the subscription whenever the callback identity changes (because of the ref update pattern). That’s fine, but be aware that an unstable `onBeforeRender` will cause unnecessary subscribe/unsubscribe churn.

### Mental model to resolve the struggle

| Concern                        | Prefer                                 | Why                                              |
| ------------------------------ | -------------------------------------- | ------------------------------------------------ |
| Shared animation loop          | Context                                | One true source of time                          |
| Expensive GL resource lifetime | Hook returning refs                    | Ownership stays with the component that needs it |
| High-frequency input (pointer) | Hook + ref                             | Avoid re-renders                                 |
| “Batteries-included” demo UI   | Thin component that composes the above | Easy entry point without polluting the core      |

You are not forced to choose “everything is Context” or “everything is hooks”. The cleanest design for this domain is:

- **Context** for the truly shared, long-lived services (frame loop, maybe a theme or debug flags later).
- **Hooks** for resource acquisition and local interaction state.
- **Components** that only compose the hooks and render a `<canvas>`.

Your current code is already 70 % of the way there. The biggest win will come from thinning `ShaderCanvas` and making the pan/zoom → uniform mapping an optional convention rather than something the canvas component itself understands.
