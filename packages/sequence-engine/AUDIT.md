# Code Health Audit — `@repo/sequence-engine`

**Package path:** `packages/sequence-engine/`
**Role:** Pure mathematical sequence generation engine (no UI, no browser APIs, no React).
**TypeScript strictness:** `@tsconfig/strictest` (via `packages/config-typescript/node.json`).
**Examined:** 11 source files, 2 config files, README.

---

### 📄 File: `src/rules/lookAndSay.ts`

- **Type of Smell:** Silent Correctness Failure / Runtime Data Loss
- **Complexity Score:** Low
- **Architectural Observation:** The `nextLookAndSay()` helper uses `Number(result)` to convert a string-built representation of the next term back into a number. Look-and-say terms grow exponentially in digit length; by step 10 the value exceeds `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991), causing silent floating-point precision loss. By step 12 the conversion produces `NaN`, and all subsequent terms propagate `NaN`. The rule declares `maxSteps: 15`, but the generation pipeline silently corrupts output after step 10 or 11. This is a latent bug in a math/creative-coding package where numerical integrity matters.
- **Impact on Strictness:** None. The bug is invisible to the type system — `Number(string)` always returns `number` at the type level.

---

### 📄 File: `src/rules/types.ts`

- **Type of Smell:** Universal Parameter Object / Speculative Generality
- **Complexity Score:** Low
- **Architectural Observation:** `NextStepOptions` bundles `index`, `current`, `sequence`, `seen`, and `seed` into a single bag type passed to every rule's `getNext()`. The `seed` field flows through the entire generation pipeline (`engine.ts` → every `getNext` call) but is consumed by zero of the 9 registered rules. This is speculative generality — the parameter was added to the shared interface before any rule needed it. While a bag-of-props pattern is standard for plugin architectures, carrying dead I/O through every invocation obscures the actual data dependencies of each rule and makes the contract harder to reason about.
- **Impact on Strictness:** None.

---

### 📄 File: `src/rules/registry.ts`

- **Type of Smell:** Hardcoded Registration / Open-Closed Violation
- **Complexity Score:** Low
- **Architectural Observation:** The rule registry is a `Map<string, SequenceRule>` populated by 9 explicit imports. Adding a new rule requires editing this file. A `registerRule()` function exists and is exported, suggesting an intent for dynamic/plugin-style registration, but no external code calls it — all registration is static and centralized. The `getAllRules()` returns `Map.values()` in insertion order, which becomes the order consumers display (e.g., select dropdowns), but this ordering is implicit and undocumented.
- **Impact on Strictness:** None.

---

### 📄 File: `src/engine.ts`

- **Type of Smell:** Dead Code Path / Assumed Initial Condition
- **Complexity Score:** Low
- **Architectural Observation:** The `generateSequence` function clamps steps via `sequenceRule.maxSteps === 0 ? steps : Math.min(steps, sequenceRule.maxSteps)`. The `=== 0` branch is dead code — every registered rule defines a non-zero `maxSteps`. Additionally, the engine unconditionally seeds the sequence with `[0]` and `seen = new Set([0])`. This baked-in initial condition means every sequence starts from 0, which is correct for most rules but is an implicit contract that rule authors must account for (e.g., `fibonacciRule` checks `index <= 1` to short-circuit). The initial condition is not parameterizable.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/sequence-engine/package.json`

- **Type of Smell:** Leaky Export Structure / Inconsistent Symmetry
- **Complexity Score:** Low
- **Architectural Observation:** The `exports` map defines 4 paths: `.` (engine), `./rules` (registry), `./rules/types`, and `./rules/recaman`. The `./rules/recaman` export exists solely because the renderer's store initializes with `recamanRule` as the default — this leaks a consumer concern into the package's public API surface. No other rule gets a dedicated export path, creating an asymmetry that suggests one rule is "special." If the intent were to allow direct rule imports, a barrel pattern (`./rules/<name>`) would be more consistent.
- **Impact on Strictness:** None.

---

### 📄 File: `README.md`

- **Type of Smell:** Documentation Decay / Phantom API References
- **Complexity Score:** Low
- **Architectural Observation:** The README references three things that no longer exist in the codebase: (1) a `createRule()` helper in `src/rules/create-rule.ts` — the "How to Add a New Sequence" section shows an import from `'./create-rule'` that has no corresponding file; (2) a `PresetStore` interface and `InMemoryPresetStore` class in `src/store/PresetStore.ts` — no such file or directory exists; (3) a `./types` export exposing `ParamDescriptor`, `LayerCategory`, `LayerConfigEntry`, `PresetRecord` — none of these types exist in this package (they were moved to `@repo/sequence-renderer`). The README describes an architecture that diverged from reality.
- **Impact on Strictness:** None.

---

### ✅ Files with No Notable Smells

- `src/rules/collatz.ts` — clean, pure, minimal
- `src/rules/fibonacci.ts` — clean, pure, minimal
- `src/rules/padovan.ts` — clean, pure, minimal
- `src/rules/primes.ts` — clean, pure, minimal
- `src/rules/squareNumbers.ts` — clean, one-liner
- `src/rules/sternDiatomic.ts` — clean, recursion depth is O(log n) in practice
- `src/rules/triangular.ts` — clean, one-liner
- `src/rules/recaman.ts` — clean, pure, minimal
- `tsconfig.json` — no local overrides, delegates to strictest config
- `eslint.config.js` — no local overrides, delegates to shared config

---

### Aggregate Summary

| Smell Category | Count | Severity |
|---|---|---|
| Correctness / Data Loss | 1 (lookAndSay) | High |
| Speculative Generality | 1 (types.ts) | Low |
| Open-Closed Violation | 1 (registry.ts) | Low |
| Dead Code Path | 1 (engine.ts) | Low |
| Leaky API Surface | 1 (package.json) | Low |
| Documentation Decay | 1 (README.md) | Low |

**No linter-fighting, no type assertions, no React friction** — this package is otherwise clean, well-structured, and passes the strictest TypeScript config without any escape hatches. The dominant remediation need is the `lookAndSay` bug, followed by README alignment with actual code.
