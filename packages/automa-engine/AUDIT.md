# Code Health Knowledge Base Audit: `packages/automa-engine`

> Audit generated for static analysis and code health tracking.
> Rule: Do NOT modify, refactor, or change any code — pure discovery only.

---

## Summary

This package is impressively clean — 17 source files (9 rule data + 8 logic files), no `eslint-disable` comments, no `@ts-*` directives, no `any` assertions, no React memoization, no unused exports. The only type escape is the `as unknown as Worker` in `worker.ts`. The main architectural smell is the generic `evolve()` in `engine.ts:28` mixing 2-state and multi-state paths per-cell, a Low-severity universal function. No React 19 or Compiler friction applies (this is a non-UI engine package).

---

## Findings

### 📄 File: `src/engine.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** Low
- **Architectural Observation:** The single `evolve()` function (line 28) handles both 2-state rules (Conway, HighLife) and multi-state rules (Brian's Brain with stateCount=3) through one intertwined loop. At line 42–44, every cell checks `cellState > 1` to decide whether it's in the aging/refractory path, even though for Conway/HighLife this branch is never taken (cells are only 0 or 1). At line 50, another ternary (`rule.stateCount > 2 ? 2 : 0`) encodes the death behavior difference. These conditionals are evaluated per-cell, per-tick — ~10,000 iterations per step for a 100×100 grid. The alternative (a rule-specific `evolve` function or a function pointer for the aging step) would avoid per-cell branching and clarify the two modes. The README explicitly claims this as a design virtue ("fully generic"), but it conflates two fundamentally different state machines into one hot path.
- **Impact on Strictness:** None — no type escapes needed.

---

### 📄 File: `src/worker.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Lines 32–35 use `(self as unknown as Worker).postMessage(...)` to call `postMessage` with the `Transferable[]` overload. The `self` variable in a Web Worker context is typed as `DedicatedWorkerGlobalScope`, whose `postMessage` accepts `(message, StructuredSerializeOptions?)` — an options-object form. The code elects to cast to `Worker` to use the simpler `(message, transferList)` signature, which is not available on the scope type. The double assertion (`as unknown as Worker`) is required because the two types share no common ancestor: `DedicatedWorkerGlobalScope extends WorkerGlobalScope`, not `Worker`. This is a legitimate friction point in the TS Web Worker types — the transfer list signature exists at runtime but is awkward to express without casting.
- **Impact on Strictness:** One double type assertion (`as unknown as Worker`). No `eslint-disable` comments exist in the package.

---

### 📄 File: `src/rules/parse.ts`

- **Type of Smell:** Universal Function Abstraction (minor)
- **Complexity Score:** Low
- **Architectural Observation:** The `parseRule()` function (line 3) has a low-severity hidden coupling: it allocates fixed-size arrays of length 9 (`Array<boolean>(9).fill(false)`), implicitly assuming neighbor counts stay in 0–8. This constraint is not enforced by the `Rule` type (which uses `readonly boolean[]` with no length guard). A rule notation like `B12345678/S12345678` would silently populate positions beyond practical neighbor counts with no error. Combined with `engine.ts`'s `countActiveNeighbors` (which caps at 8), this is safe but undocumented — the numerical coupling between parse, type, and evolve is implicit.
- **Impact on Strictness:** None.

---

## Scope Notes

- **React 19 / React Compiler Friction:** Not applicable. This is a pure computation engine package with no React components, hooks, or JSX.
- **All files inspected:** 17 source files across `src/`, `src/rules/`, `src/creature/`.
