Here’s a clear-eyed audit of the whole stack.

### Architecture (what it actually is)

| Layer                                                | Role                                             | Style                            |
| ---------------------------------------------------- | ------------------------------------------------ | -------------------------------- |
| `createFrameLoop` / `FrameLoopProvider` + `useFrame` | Shared RAF clock                                 | Imperative core + React context  |
| `useShaderRunner`                                    | Owns canvas + WebGL context + resize + recompile | Imperative hook                  |
| `useGPGPU`                                           | Owns ping-pong GPGPU pipeline                    | Imperative hook (clean)          |
| `useInteractiveCanvas`                               | Pan/zoom state + pointer/wheel listeners         | Imperative hook                  |
| `usePanZoomUniforms`                                 | Maps interaction state → uniforms                | Pure function returned from hook |
| `ShaderCanvas`                                       | Declarative façade that wires the above          | Component                        |

You have two consumption paths:

1. **Imperative** – consumer imports the hooks + `FrameLoopProvider` and builds their own canvas/render loop.
2. **Declarative** – consumer uses `<ShaderCanvas>` (which still forces them to wrap the tree in `FrameLoopProvider`).

That’s the root of the “annoying to import” feeling.

---

### Quirks & friction points (ordered by severity)

#### 1. Frame loop is a hard external dependency

```tsx
// ShaderCanvas.tsx
useFrame((frameTime) => { ... });
```

- Every consumer of `ShaderCanvas` must also import and mount `FrameLoopProvider`.
- `useFrame` silently does nothing if the context is missing (`if (!loop) return`).
- No documentation or runtime warning when the provider is forgotten.
- You can’t use `ShaderCanvas` in isolation; the “declarative” component still has an invisible imperative prerequisite.

#### 2. Discriminated union on `interactive` is over-engineered and leaky

```ts
export type ShaderCanvasProps =
  | (ShaderCanvasBaseProps & { interactive?: false; onBeforeRender?: ... })
  | (ShaderCanvasBaseProps & { interactive: true; ... extra props ... });
```

- The non-interactive branch exists mainly because the types got complicated.
- Inside the component you still do `props.interactive === true` checks in three places.
- `useInteractiveCanvas` is always called; the `enabled` flag just skips attaching listeners.
- `applyPanZoom` is always called; it just no-ops if the uniforms aren’t declared.
- Result: the non-interactive path is almost identical to the interactive one, yet the types pretend they are different worlds.

You already feel this: “I don’t see the point of using ShaderCanvas without interactive.”

#### 3. Two different “view” types that almost but don’t quite match

- `CanvasView` = `{ pan, zoom }`
- `ShaderCanvasView` = `{ pan, zoom, canvasWidth, canvasHeight }`

`onViewChange` gives you the small one; `onBeforeRender` gives you the big one. Consumers have to remember which is which.

#### 4. Pan/zoom coordinate system is magical

```ts
// usePanZoomUniforms
values['u_panOffset'] = [
        -interaction.pan.x / runner.canvas.clientWidth,
        interaction.pan.y / runner.canvas.clientHeight // Y is not flipped the same way
];
```

- Interaction state stores CSS pixels, top-left origin, y-down.
- Uniform conversion does a partial Y-flip + normalization.
- Comment says “Y-flipped into vUv space”, but the actual math is asymmetric (`-x` vs `+y`).
- `scalePanWithZoom` and `zoomToCursor` further mutate the meaning of `pan`.
- A consumer writing a shader has to reverse-engineer what `u_panOffset` actually means.

#### 5. Middle-button-only panning is a silent UX decision

```ts
if (e.button !== 1) return; // Middle button only
```

- No left-drag, no space+drag, no option to change it.
- Not exposed in `InteractionOptions`.
- Easy to miss when reading the code; feels like a leftover from a fractal explorer.

#### 6. `initialView` is mount-only (documented, but still painful)

```ts
// Changing it after mount has no effect — remount the canvas (e.g. via `key`)
```

- Correct for the current design, but forces the consumer into key-remounting patterns for “reset view”.
- No imperative `setView` / `reset` escape hatch on the ref.

#### 7. Time uniform injection has surprising precedence

```ts
// 1. auto-inject time (if declared)
// 2. onBeforeRender (user can overwrite)
// 3. pan/zoom
// 4. render
```

- Documented, but the `time?: boolean | string` API is a bit awkward (`true` → `"u_time"`, string → custom name, `false` → off).
- If the shader doesn’t declare the uniform, the injection is silently skipped (`hasUniform` guard). Same pattern is used for pan/zoom — good for flexibility, bad for discoverability.

#### 8. `useShaderRunner` freezes context attributes at mount

```ts
const initialConfigRef = useRef({ webGLContextAttributes });
// empty deps on the setup effect
```

- Correct (you can’t change WebGL context attributes after creation), but means `webGLContextAttributes` is effectively a mount-only prop. Changing it later is ignored with no warning.

#### 9. Mouse handling is split and inconsistent

- Default `onPointerMove` normalizes to `[0,1]` and calls `runner.setMouse`.
- Interactive path also tracks a raw CSS-pixel `pointer` inside `useInteractiveCanvas`.
- Two parallel mouse representations exist; only one is exposed to the shader by default.

#### 10. Export surface is noisy

```ts
export { FrameLoopContext, FrameLoopProvider, useFrame };
```

- Exporting the raw context is almost never what a consumer wants; it just invites misuse.
- `ShaderCanvas` re-exports a lot of types that are really internal (`InteractionOptions`, the two `OnBeforeRenderProps`, etc.).

#### 11. `useGPGPU` is clean… but orthogonal

It doesn’t participate in the frame loop or the canvas at all. That’s fine, but it highlights that the library currently has no unified “render graph” or shared GL context story. Consumers who want both a GPGPU sim and a `ShaderCanvas` have to glue them together themselves (share the `gl` somehow, etc.).

---

### Mental model summary

```
FrameLoopProvider          ← mandatory invisible scaffolding
  └── ShaderCanvas
        ├── useShaderRunner     (owns GL + canvas)
        ├── useInteractiveCanvas (always mounted, sometimes enabled)
        ├── usePanZoomUniforms  (always called)
        └── useFrame            (drives the whole thing)
```

The declarative component is really just a thin, opinionated composition of the imperative hooks. Because the composition is incomplete (still requires the provider) and the types try to paper over the fact that interactive/non-interactive are almost the same path, the surface feels heavier than the underlying power.

---

### Highest-leverage cleanups (if you decide to refactor)

1. **Make `ShaderCanvas` self-contained** – either create its own frame loop internally, or provide a single `<GraphicsRoot>` that bundles provider + any future shared state.
2. **Collapse the interactive discriminant** – make interactive the default (or always-on with an `enablePanZoom` boolean) and simplify the props/types.
3. **Unify the view type** and give the consumer a stable ref API (`canvasRef`, `viewRef`, `setView`, `resetView`).
4. **Expose pan button / drag mode** in options instead of hard-coding middle-button.
5. **Stop exporting the raw context**; keep `useFrame` public only for advanced imperative consumers.
6. **Document the exact coordinate transform** for `u_panOffset` / `u_zoom` in one place (or better, provide a small helper the shader author can copy).

The core pieces (`useShaderRunner`, `useGPGPU`, the frame loop) are solid. The fragility lives almost entirely in the composition layer and the attempt to support two slightly different contracts with one component.
