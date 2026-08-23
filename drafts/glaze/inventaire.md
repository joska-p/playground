# Audit Report: `glaze` Architectural Refactoring

## Summary

- **Files Analyzed:** [Number]
- **High-Priority Opportunities Identified:** [Number]

---

## Category 1: Mathematical Invariants (Branded Types Candidates)

| File / Function                   | Current Issue (Runtime Check / Flaw)        | Proposed Branded Type | Impact                            |
| :-------------------------------- | :------------------------------------------ | :-------------------- | :-------------------------------- |
| `src/math/vec2.ts` -> `reflect()` | Accepts raw `Vec2`, assumes it's normalized | `NormalizedVec2`      | Eliminates division-by-zero check |

## Category 2: Lifecycle & Proof Tokens Candidates

| File / Method                        | Dishonesty / Race Condition Risk             | Proposed Proof Token | Impact                                |
| :----------------------------------- | :------------------------------------------- | :------------------- | :------------------------------------ |
| `src/render/renderer.ts` -> `draw()` | Can be called before canvas context is ready | `ActiveFrameToken`   | Guarantees call order at compile time |

## Category 3: Dishonest Function Isolation (Impure to Edges)

| File / Function            | Hidden External Dependency               | Fix Strategy                                 |
| :------------------------- | :--------------------------------------- | :------------------------------------------- |
| `src/particles/emitter.ts` | Calls `Math.random()` inside update loop | Pass `seed: number` or `randomFn` explicitly |

## Category 4: Abstraction Level Violations (SLAP)

| File / Function                             | Mixed Abstraction Levels                      | Proposed Breakdown                                        |
| :------------------------------------------ | :-------------------------------------------- | :-------------------------------------------------------- |
| `src/scene/scene.ts` -> `updateAndRender()` | Mixes array filtering, math, and canvas calls | Split into 3 functions: `filter()`, `compute()`, `draw()` |

---

## Recommended Action Plan (Ordered Bottom-Up)

1. Task 1: Refactor `math/` (Add `NormalizedVec2`, pure functions)
2. Task 2: ...
