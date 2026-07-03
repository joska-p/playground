# Code Health Audit: `@repo/randomart-engine`

Audited Tue Jul 14 2026. 19 source files across 5 modules. No React/UI code present (pure TypeScript engine).

---

## Summary

**Files audited:** 31 (12 utility/entry files + 19 grammar rules)

**Linter escapes (`eslint-disable`, `as any`, `as unknown`, `@ts-*`):** 0 — the codebase is remarkably clean on strictness workarounds.

**TS strictness relaxation:** 1 override (`noUncheckedIndexedAccess: false` in `tsconfig.json` — disables the mandatory narrowing on indexed reads that `@tsconfig/strictest` enforces).

**React Compiler / React 19 notes:** Not applicable — this package is a pure engine with no DOM, no components, no hooks.

---

## Findings

### 📄 File: `src/grammar/registry.ts`

- **Type of Smell:** Universal Function Abstraction / Maintenance Debt
- **Complexity Score:** Low
- **Architectural Observation:** The `Map<string, GrammarRule>` has duplicate keys for `radialSymmetryRule` and `nestedOscillationRule` — both are inserted at lines 33/39 and then again at lines 43/44. The second insertion silently overwrites the first with the same object reference, so the runtime behavior is correct. However, this indicates that registry maintenance was done manually (no dedup check), and the extraneous lines create a misleading maintenance surface — someone removing "duplicate" entries could accidentally remove the real one and keep the duplicate.
- **Impact on Strictness:** None.

### 📄 File: `src/types.ts` (GrammarRule interface)

- **Type of Smell:** Universal Function Abstraction / Interface Overload
- **Complexity Score:** Medium
- **Architectural Observation:** The `GrammarRule` type packs **5 callbacks** (`evaluate`, `toMathString`, `toGLSL`, `toTreeView`, `buildNode`) and 6 scalar properties into a single contract. Every rule must implement all 5, even when trivial (e.g. `terminal-x.ts` and `terminal-y.ts` are nearly identical). The `evaluate` signature has 5 parameters including optional `node?`, which only `constantRule` actually uses (to read `constantValue`). This couples every rule's evaluation signature to a single edge case. Additionally, the CPU math (`evaluate`) and the GLSL string (`toGLSL`) duplicate normalization/shaping logic verbatim — see `exp.ts` and `pow.ts` where the full normalization expression appears in both JavaScript and GLSL forms. Splitting the interface into separate `EvaluableRule`, `GLSLCompilable`, `Displayable` traits would let rules declare which facets they support.
- **Impact on Strictness:** None.

### 📄 File: `src/compile/compileToGLSL.ts`

- **Type of Smell:** Universal Function Abstraction / Special-Casing
- **Complexity Score:** Medium
- **Architectural Observation:** The `compileNode` function (line 40) has a hard-coded early-return for `ruleId === 'vec3'` — but `vec3` is not a registered grammar rule. This special case exists because the R/G/B channel trees can produce a single `vec3` node (from the `TreeConfig` API), bypassing the per-channel pipeline. This creates a hidden coupling: the GLSL compiler knows about a pseudo-rule that neither the registry nor the evaluator handles. Separately, `compileToGLSL()` (line 71) is a monolithic function that generates the **entire** GLSL fragment shader as a single template-literal string — preamble (noise helpers + behavior GLSL), spatial transforms, color evaluation, and color transforms. This makes testing the shader stages independently impossible and any change to the shader structure requires editing this one function.
- **Impact on Strictness:** None.

### 📄 File: `src/animation/behaviors.ts`

- **Type of Smell:** Inert Convention / Dead Weight
- **Complexity Score:** Low
- **Architectural Observation:** Of the 15 animation behaviors, **8** have `glslFunction: ''` (empty string). The `buildPreamble` function in `compileToGLSL.ts` joins all behaviors' GLSL functions together, so these 8 empty strings produce 8 blank lines in every generated shader preamble. The convention forces every behavior to carry a `glslFunction` field even when it has no helper function to declare. This could be simplified by making `glslFunction` optional (`glslFunction?: string`). The empty-string behaviors are: `zoom`, `ripple`, `drift`, `expand`, `mirrorTile`, `goldenWander`, `noiseCrawl`, `colorDrift`.
- **Impact on Strictness:** None.

### 📄 File: `src/grammar/rules/exp.ts`

- **Type of Smell:** Duplicated Normalization Logic (Cross-Target)
- **Complexity Score:** Low
- **Architectural Observation:** The `evaluate` function (line 9) implements `((Math.exp(clamped) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0`. The `toGLSL` method (line 15) repeats the exact same normalization formula in GLSL syntax: `(((exp(${clamped}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`. If this normalization formula changes, both targets must be updated in lockstep. The same pattern appears in `pow.ts` (`sign * abs^exp` normalization duplicated across JS and GLSL) and `log.ts`. There is no shared normalization constant source of truth.
- **Impact on Strictness:** None.

### 📄 File: `src/grammar/rules/exp.ts` (cont.)

- **Type of Smell:** Hardcoded Magic Numbers
- **Complexity Score:** Low
- **Architectural Observation:** The normalization constants `0.36787944117` (exp(-1)) and `2.35040238729` (exp(1) - exp(-1)) are inlined as number literals in both `evaluate` and `toGLSL`. Their semantic meaning is not documented at the declaration site — a reader must reverse-engineer that `0.36787944117 ≈ e^{-1}` and `2.35040238729 ≈ e - e^{-1}`.
- **Impact on Strictness:** None.

### 📄 File: `src/grammar/rules/constant.ts`

- **Type of Smell:** Interface-Reliant Optional Parameter
- **Complexity Score:** Low
- **Architectural Observation:** This is the **only** rule that uses the optional `node` parameter on `evaluate` (to access `constantValue`). Every other rule declares `_node` as an unused parameter. The `toMathString`, `toGLSL`, and `toTreeView` methods also receive the optional `node` parameter, but only `constantRule` uses it. This means every rule's signature is polluted by a parameter that 18/19 rules don't need — a sign that the `GrammarRule` interface should be split.
- **Impact on Strictness:** None.

### 📄 File: `src/grammar/rules/radial-symmetry.ts` and `src/grammar/rules/nested-oscillation.ts`

- **Type of Smell:** Macro-Node Pattern (buildNode returns sub-trees, not a direct rule)
- **Complexity Score:** Low
- **Architectural Observation:** Both rules have `arity: 0` but `buildNode` returns a pre-composed subtree (e.g. `sqrt(add(multiply(x,x), multiply(y,y)))` for radial-symmetry). The `evaluate` and `toGLSL` methods then each repeat the subtree logic as a single-shot formula. This means the same mathematical expression is described **three times**: once in `buildNode` as a subtree, once in `evaluate` as a JS expression, and once in `toGLSL` as a GLSL expression. If the formula ever changes, all three must be updated in sync. These rules are essentially "macros" that could be decomposed into real grammar rules rather than hardcoded subtrees.
- **Impact on Strictness:** None.

### 📄 File: `src/grammar/rules/radial-symmetry.ts` (cont.)

- **Type of Smell:** Inconsistent GLSL Return
- **Complexity Score:** Low
- **Architectural Observation:** The `toGLSL` method returns the string `'radial-symmetry'` — a bare identifier, not a GLSL expression. If this identifier isn't `#define`'d or separately declared elsewhere in the shader, the GLSL compiler would throw an undeclared-identifier error. This is **not** caught by any test or type-check. The `nested-oscillation` rule has the same issue with its `toGLSL` returning `'nested-oscillation'`.
- **Impact on Strictness:** None (but it's a latent runtime bug in GLSL output).

### 📄 File: `tsconfig.json`

- **Type of Smell:** TS Strictness Relaxation
- **Complexity Score:** Low
- **Architectural Observation:** The `@tsconfig/strictest` base enables `noUncheckedIndexedAccess: true`, but this package overrides it to `false`. This means `Map.get()` and array indexing return nominally non-nullable types, and callers are not obligated to handle the `undefined` case. The code does handle undefined returns in many places (e.g., `evaluate.ts:11-12` checks `if (!rule) return 0`), but the compiler does not enforce it. Lifting this override would systematically flag ~15-20 locations where indexed access to `rules` Map, arrays, etc. goes unchecked.
- **Impact on Strictness:** Relaxes `@tsconfig/strictest` — the strictest setting the monorepo aims for.

### 📄 File: `src/compile/compileToGLSL.ts` (GLSL Noise Helpers)

- **Type of Smell:** Inlined Shared Code
- **Complexity Score:** Low
- **Architectural Observation:** The GLSL noise/random helper functions (`random2d`, `hash1`, `smoothNoise`, `smoothNoise2`) are defined as a constant template string at the top of `compileToGLSL.ts`. They are concatenated into every generated shader preamble via `buildPreamble`. If the noise functions were ever needed by the CPU evaluator (they aren't today), they would be duplicated between JS and GLSL. This is currently harmless but worth noting for maintainability — the `smoothNoise2` function is actually referenced by `noiseCrawlBehavior` and `colorDriftBehavior` in `behaviors.ts`, meaning those behaviors depend on these helpers being present in the preamble.
- **Impact on Strictness:** None.

---

## Aggregate Metrics

| Smell Category                          | Count | Avg Complexity |
| --------------------------------------- | ----- | -------------- |
| Universal Function / Interface Overload | 3     | Medium         |
| Cross-Target Logic Duplication          | 2     | Low            |
| Inert Convention / Dead Weight          | 1     | Low            |
| TS Strictness Relaxation                | 1     | Low            |
| Latent GLSL Bug                         | 2     | Low            |

**Total findings:** 11

**Linter escapes:** 0 (clean)

**`as any` / `as unknown`:** 0 (clean)

**React-specific friction:** N/A (no React)

---

## Recommended Follow-Ups

1. **Deduplicate registry.ts** — remove the duplicate `radialSymmetryRule` and `nestedOscillationRule` insertions.
2. **Fix `radial-symmetry` and `nested-oscillation` `toGLSL`** — these return bare identifiers instead of real GLSL expressions. They either need shader-level `#define` macros or proper GLSL expressions.
3. **Make `glslFunction` optional** on `AnimationBehavior` — saves 8 empty-string entries and 8 blank lines per generated shader.
4. **Extract normalization constants** in `exp.ts`, `pow.ts`, `log.ts` — document and share magic numbers between JS and GLSL targets.
