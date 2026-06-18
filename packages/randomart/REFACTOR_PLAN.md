# Improvement Opportunities & Refactor Plan

Lessons from the draft that would benefit the package (./GRAMMAR_COMPARISON.md), ordered as a step-by-step implementation plan.

---

## Phase 1: Quick wins (no architectural changes)

### Step 1 — Add `sqrt` and `abs` rules

Low effort, high visual impact.

- `sqrt`: unary, evaluate as `Math.sqrt(Math.abs(args[0]()) + 1e-10)` (safe with epsilon)
- `abs`: unary, evaluate as `Math.abs(args[0]())`

Both slot into the existing `GrammarRule` pattern trivially. Register in `registry.ts`. The draft produces distinctive radial/ripple patterns from `sqrt` and mirror/symmetry from `abs`.

### Step 2 — Add per-pixel `random` terminal

Add a `random` rule (arity 0) that returns a deterministic hash of `(x, y)`. Unlike `constant` (baked at tree-build time), this varies per pixel — creating organic noise/texture.

Need: a `pixelRandom` function like `hash(x, y) = fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453)` (the classic GLSL hash). Since `evaluateNode` passes `(x, y)`, the rule can compute the hash directly.

Change: `evaluate` signature currently receives `(args, x, y)` but terminals ignore `x, y`. This rule would use them.

---

## Phase 2: Grammar improvements

### Step 3 — Weighted grammar branches

Add a `weight` field to `GrammarRule`. Modify `buildTree()` to use weighted random selection instead of the blunt 15% terminal-bias heuristic.

- Add `weight?: number` (default 1) to the `GrammarRule` type
- Change `buildTree` to: collect enabled rules, compute total weight, pick via `rng.next() * totalWeight`
- Remove the hardcoded `0.15` terminal-bias constant
- Remove the terminal vs operator pool split — let weights control the distribution naturally

This makes the grammar tunable: e.g. `add` weight 3, `multiply` weight 3, `sin` weight 1, terminals weight 2 gives the draft-like distribution without hardcoded pool logic.

---

## Phase 3: Animation (COMPLETED)

### Step 4 — `t` (time) terminal + animation loop (COMPLETED)

Add a `t` rule (arity 0) that reads a time value. Requires:

- A time source in the store (e.g. `performance.now()` / `requestAnimationFrame`) - **Done**
- `evaluateNode` passes a time parameter (or a context object) alongside `(x, y)` - **Done**
- The renderer re-renders on each animation frame while active - **Done**
- The Canvas component uses `requestAnimationFrame` loop - **Done**

The store needs a `running` boolean and a `time` ref. The `RenderTask` type needs a `time` field. - **Done**

---

## Phase 4: GPU rendering (biggest change)

### Step 5 — GLSL compilation + WebGL renderer

This is the highest-leverage change. It unlocks GPU-speed rendering, real-time `t` animation, and interactivity.

**5a — Add `toGLSL(args: string[]): string` to `GrammarRule`**

Each rule generates its GLSL expression fragment. Examples:

- `add`: `((${args[0]} + ${args[1]}) / 2.0)`
- `sin`: `sin(3.14159265 * ${args[0]})`
- `x`: `v_texCoord.x` (or `fragCoord.x` mapped to -1..1)
- `y`: `v_texCoord.y`
- `t`: `u_time`
- `random`: `random2d(v_texCoord)` (using a GLSL hash function in the preamble)
- `constant`: generated as a literal float, e.g. `0.42`

**5b — `compileToGLSL(tree: ExpressionNode): string`**

Recurses the tree calling `toGLSL`, wraps it in a complete fragment shader:

```glsl
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

// preamble: hash functions, etc.

void main() {
  vec2 uv = v_texCoord;
  float r = <treeR.toGLSL()>;
  float g = <treeG.toGLSL()>;
  float b = <treeB.toGLSL()>;
  gl_FragColor = vec4((vec3(r,g,b) + 1.0) / 2.0, 1.0);
}
```

**5c — WebGL renderer**

Replace (or augment) the Canvas 2D renderer with a full-screen quad + fragment shader. Can use raw WebGL or a thin wrapper like `regl` or `twgl`. The React component:

- Compiles the shader on tree change
- Passes `u_time` via `requestAnimationFrame`
- Passes `u_resolution` on resize

This eliminates the Worker pool entirely for the main render path (though Workers could remain for PNG export).

### Step 6 — Correlated RGB / single-tree vec3

Optional, complementary to the existing three-tree approach.

Add a `vec3` rule (arity 3) that bundles R, G, B into one tree. The build step would optionally:

- Build one tree rooted at `vec3` instead of three independent trees
- The shader compiler sees a single `vec3` output from one expression

This can coexist with the three-tree mode as a user toggle.

---

## Summary

| Step                  | Effort   | Impact    | Depends on       |
| --------------------- | -------- | --------- | ---------------- |
| 1 — sqrt, abs rules   | 30 min   | Medium    | Nothing          |
| 2 — per-pixel random  | 1 hr     | Medium    | Nothing          |
| 3 — weighted branches | 2 hr     | High      | Nothing          |
| 4 — t + animation     | 3 hr     | High      | Steps 1-3        |
| 5 — GLSL + WebGL      | 2-3 days | Very high | Step 4 (needs t) |
| 6 — correlated RGB    | 1 day    | Medium    | Step 5           |

Steps 1-3 can be done independently. Step 4 can be done with Canvas 2D before GLSL. Step 5 is the big one — once that's done, step 6 is small.
