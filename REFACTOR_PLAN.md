# Refactor Plan

Organized into independent sessions. Each session starts with a fresh context
window. The **Session Prompt** at the top of each session is written to be the
first message you paste into a new opencode context.

---

## Session 1: Fix Double Rendering in `useShaderRunner`

**Goal:** Eliminate the wasted double `render()` call per frame and the one-frame
latency in `onBeforeRender`.

### Session Prompt

```
I have a refactoring task. Read REVIEW.md and REFACTOR_PLAN.md at the repo root
for context, then execute Session 1 described there.

You have access to these tools: Read, Write, Edit, Bash, Glob, Grep.

Read the following files before you start:
- packages/graphics/src/react/useShaderRunner.ts
- packages/graphics/src/react/ShaderCanvas.tsx
- packages/automa/src/components/canvas/CellMesh.tsx

The plan is:
1. Remove the `useFrame` hook from `useShaderRunner` — it should NOT auto-render.
2. Update `ShaderCanvas` to call `runner.render()` inside its own `useFrame`, AFTER
   invoking `onBeforeRender`.
3. `CellMesh` already calls `runnerRef.current?.render()` after setting uniforms in
   its own `useFrame` — confirm it still works correctly (it should, since
   useShaderRunner no longer races it).

Verify:
- Run `pnpm --filter @repo/graphics lint && pnpm --filter @repo/graphics check-types`
- Run `pnpm --filter @repo/automa lint && pnpm --filter @repo/automa check-types`
- Run `pnpm --filter @repo/art-canvas lint && pnpm --filter @repo/art-canvas check-types`
```

### Changes

| File                                             | Change                                                                  |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `packages/graphics/src/react/useShaderRunner.ts` | Remove the `useFrame` call that auto-renders                            |
| `packages/graphics/src/react/ShaderCanvas.tsx`   | Call `runner.render()` inside its own `useFrame` after `onBeforeRender` |

---

## Session 2: Upgrade `GPGPUPipeline` to Replace `SimulationEngine`

**Goal:** Make `GPGPUPipeline` powerful enough that `SimulationEngine` can be a thin
wrapper (or eliminated entirely). This moves the GPGPU abstraction into `graphics`
where it belongs.

### Session Prompt

```
I have a refactoring task. Read REVIEW.md and REFACTOR_PLAN.md at the repo root
for context, then execute Session 2 described there.

You have access to these tools: Read, Write, Edit, Bash, Glob, Grep.

First read these files:
- packages/graphics/src/webgl/GPGPUPipeline.ts
- packages/graphics/src/react/useGPGPU.ts
- packages/automa/src/core/gpu/SimulationEngine.ts
- packages/automa/src/core/gpu/engine-ref.ts
- packages/automa/src/stores/simulation/actions.ts
- packages/automa/src/components/canvas/CellMesh.tsx
- packages/automa/src/hooks/useGridTexture.ts
- packages/automa/src/shaders/sim-step.frag
- packages/automa/src/shaders/gpu-paint.frag

The goal is to upgrade `GPGPUPipeline` so that `SimulationEngine` can use it
instead of manually managing FBOs, programs, and uniforms.

Requirements for the upgraded `GPGPUPipeline`:
1. Support multiple shader programs (not just one). `SimulationEngine` needs
   `simProgram` + `paintProgram`.
2. Cache uniform locations at compile time (avoid `gl.getUniformLocation` in hot
   paths). Currently only `SimulationEngine` does this.
3. Expose a `setUniforms(name, value)` / `setUniforms(record)` method for
   setting program uniforms before each step/render.
4. Keep the `step()` method (read from FBO A, draw to FBO B, swap).
5. Add an `init(data: Uint8Array)` method to upload initial grid data to both
   textures (matching `SimulationEngine.init()`).
6. Keep the existing `compile()` / `getStateTexture()` / `resize()` / `destroy()`
   API stable so nothing breaks.
7. Expose `width` / `height` getters.

After upgrading `GPGPUPipeline`, refactor `SimulationEngine` to be a thin wrapper
that creates GPGPUPipeline instances for sim and paint, or eliminate it entirely
and wire the GPGPUPipeline directly in `CellMesh.tsx`.

Steps:
1. Upgrade `GPGPUPipeline` with the features above.
2. Update `useGPGPU` hook if needed.
3. Refactor `SimulationEngine` to use `GPGPUPipeline`.
4. Verify all imports and call sites still work.

Verify:
- Run `pnpm --filter @repo/graphics lint && pnpm --filter @repo/graphics check-types`
- Run `pnpm --filter @repo/automa lint && pnpm --filter @repo/automa check-types`
- Run `pnpm --filter @repo/graphics test`
```

### Changes

| File                                               | Change                                                                        |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `packages/graphics/src/webgl/GPGPUPipeline.ts`     | Add multi-program, uniform caching, `setUniforms`, `init`, multi-step support |
| `packages/graphics/src/react/useGPGPU.ts`          | Update if API changes                                                         |
| `packages/automa/src/core/gpu/SimulationEngine.ts` | Refactor to use `GPGPUPipeline` or eliminate                                  |

---

## Session 3: Clean Up Dead Code

**Goal:** Remove or deprecate unused exports to reduce maintenance surface.

### Session Prompt

```
I have a refactoring task. Read REVIEW.md and REFACTOR_PLAN.md at the repo root
for context, then execute Session 3 described there.

You have access to these tools: Read, Write, Edit, Bash, Glob, Grep.

First, confirm nothing imports these by running a search:
- Grep for "@repo/graphics/webgl/InstancedBatch"
- Grep for "@repo/graphics/math/Vector2"
- Grep for "@repo/graphics/math/Vector3"
- Grep for "@repo/graphics/webgl/texture-utils"
- Grep for "@repo/graphics/webgl/GPGPUPipeline" (may now be used after Session 2)

If any are unused, remove them from:
1. The source file itself (delete the file if it's entirely dead code)
2. The `exports` map in `packages/graphics/package.json`

Also fix the double-shader-compilation in `useShaderRunner.ts`:
- The constructor `new ShaderRunner(...)` already calls `compileFragmentShader`.
- The separate `useEffect` that calls `compileFragmentShader` is redundant for
  the initial mount. Keep it only for recompilation on `fragmentShader` change,
  but ensure it doesn't double-compile on mount.

Read before you start:
- packages/graphics/package.json
- packages/graphics/src/react/useShaderRunner.ts

Verify:
- Run `pnpm --filter @repo/graphics lint && pnpm --filter @repo/graphics check-types`
- Run `pnpm --filter @repo/automa lint && pnpm --filter @repo/automa check-types`
- Run `pnpm --filter @repo/art-canvas lint && pnpm --filter @repo/art-canvas check-types`
- Run `pnpm --filter @repo/graphics test`
```

### Changes

| File                                             | Change              |
| ------------------------------------------------ | ------------------- |
| `packages/graphics/src/webgl/InstancedBatch.ts`  | Remove file         |
| `packages/graphics/src/math/Vector2.ts`          | Remove file         |
| `packages/graphics/src/math/Vector3.ts`          | Remove file         |
| `packages/graphics/src/webgl/texture-utils.ts`   | Remove file         |
| `packages/graphics/package.json`                 | Remove dead exports |
| `packages/graphics/src/react/useShaderRunner.ts` | Fix double compile  |

---

## Session 4: Write Tests for Critical Paths (Optional)

**Goal:** Cover the most important paths that changed during the refactor.

### Session Prompt

```
I have a testing task. Read REVIEW.md and REFACTOR_PLAN.md at the repo root
for context, then execute Session 4 described there.

You have access to these tools: Read, Write, Edit, Bash, Glob, Grep.

Add tests for:
1. `GPGPUPipeline` — test that `step()` produces different state, that `init()`
   uploads data correctly, that `resize()` works, and that multi-program support
   functions. Follow the patterns in `packages/graphics/src/webgl/QuadPipeline.test.ts`.
2. `useShaderRunner` — test that it does NOT auto-render (no extra useFrame).
3. `CellMesh` — high-level integration check (component renders without error).

Look at existing test patterns:
- packages/graphics/src/webgl/QuadPipeline.test.ts
- packages/graphics/src/math/transforms.test.ts

Run tests:
- `pnpm --filter @repo/graphics test`
- `pnpm --filter @repo/automa test` (if test runner exists)
```
