# Code Health Audit: `packages/randomart`

Audited: 22 source files across `packages/randomart` and its engine dependency `packages/randomart-engine`.

- **TypeScript strictness:** `@tsconfig/strictest` (base) + `noUnusedLocals`, `noUnusedParameters`
- **ESLint strictness:** `typescript-eslint` strictTypeChecked + stylisticTypeChecked + custom rules
- **React:** React 19 + babel-plugin-react-compiler (configured)
- **State:** Zustand (no Redux)

---

### 📄 File: `packages/randomart-engine/src/types.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** High
- **Architectural Observation:** The `GrammarRule` type (lines 9–28) defines 8 fields and 5 methods — `evaluate`, `toMathString`, `toGLSL`, `toTreeView`, `buildNode` — that every rule must implement, from trivial terminals (arity 0, no args) to complex structurals (arity 3). This single abstraction couples three orthogonal concerns: (1) mathematical evaluation (CPU), (2) GLSL codegen (GPU), and (3) tree pretty-printing. Every one of the 19 grammar rules is forced to provide all five methods, even when certain methods are meaningless for that rule's role. The `node?` optional parameter (lines 22–25) further widens the interface: it exists only to serve `constantRule`, which needs `node.constantValue`, but every rule's method signature accepts it. Splitting into `NodeEvaluator`, `GLSLGenerator`, and `TreeFormatter` traits (or similar seam) would let leaf rules drop irrelevant implementations.
- **Impact on Strictness:** None — `satisfies GrammarRule` is used throughout and passes cleanly. The optional `node` parameter on methods is the sole concession to strictness (avoids a type cast on `constantRule`'s special accessor).

---

### 📄 File: `packages/randomart-engine/src/grammar/rules/nested-oscillation.ts`

- **Type of Smell:** Universal Function Abstraction (Interface Lying)
- **Complexity Score:** Medium
- **Architectural Observation:** This is a "macro" rule — its `buildNode()` (line 13) expands into a concrete subtree of `sin(multiply(x, sin(y)))` with `ruleId: 'sin'`. The `nested-oscillation` rule ID never appears in a compiled tree. However, `toGLSL()` (line 11) returns the literal string `'nested-oscillation'`, and `toMathString()` (line 10) returns `'nested-oscillation'` — both of which are **invalid GLSL/math** if they were ever reached. The methods lie about the rule's actual output. Only `buildNode` is the real entry point; the other four methods (`evaluate`, `toMathString`, `toGLSL`, `toTreeView`) are dead code or misleading. This happens because the `GrammarRule` interface forces all methods on all rules, even "macro" rules that substitute themselves unconditionally.
- **Impact on Strictness:** None — passes TypeScript because the interface is satisfied. The bug is semantic, not structural.

---

### 📄 File: `packages/randomart-engine/src/grammar/rules/radial-symmetry.ts`

- **Type of Smell:** Universal Function Abstraction (Interface Lying)
- **Complexity Score:** Medium
- **Architectural Observation:** Identical pattern to `nested-oscillation.ts`. `buildNode()` (line 13) expands into `sqrt(add(multiply(x,x), multiply(y,y)))`. `toGLSL()` (line 11) returns the literal `'radial-symmetry'` (invalid GLSL), `toMathString()` (line 10) returns `'radial-symmetry'` (meaningless as an expression). `evaluate()` (line 9) computes `sqrt(x²+y²)` which is a plausible radius expression but is dead code — the node never reaches evaluation. Four of the five methods are misleading dead weight.
- **Impact on Strictness:** None. Same pattern as nested-oscillation.

---

### 📄 File: `packages/randomart-engine/src/compile/compileToGLSL.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** Medium
- **Architectural Observation:** This single 108-line function performs seven distinct responsibilities: (1) inlines GLSL noise helper function strings (`GLSL_NOISE_HELPERS`), (2) concatenates behavior GLSL function definitions (`buildPreamble`), (3) applies behavior code snippets to spatial and color dimensions (`applyBehaviors`), (4) recursively compiles expression nodes to GLSL expressions (`compileNode`), (5) assembles the final `vec3` color expression from R/G/B trees (`compileColorExpr`), (6) handles a special `vec3` ruleId shortcut, and (7) assembles the complete fragment shader string. The `compileNode` function (line 40) also duplicates terminal detection logic present in `evaluate.ts` (`'x'`, `'y'`, `'constant'`). Splitting the preamble builder, the node compiler, and the shader assembler into separate modules would reduce coupling and make each testable in isolation.
- **Impact on Strictness:** None directly — but the `compileColorExpr` function (line 58) contains a special-case `vec3` ruleId check (line 63) that duplicates concept from the node compiler, and the `buildPreamble`/`applyBehaviors` functions are module-private and untestable individually.

---

### 📄 File: `packages/randomart-engine/src/grammar/registry.ts`

- **Type of Smell:** Data Integrity (Duplicate Map Keys)
- **Complexity Score:** Low
- **Architectural Observation:** Lines 39–40 and 43–44 add `radialSymmetryRule` and `nestedOscillationRule` to the `Map` **twice** — duplicate key-value pairs. `Map.set` silently overwrites on duplicate keys, so behavior is correct, but this is dead code / a copy-paste error that introduces noise. If one copy diverged from the other in the future, behavior would silently depend on insertion order.
- **Impact on Strictness:** None. Pure data bug, no type impact.

---

### 📄 File: `packages/randomart/src/hooks/useWebGLRenderer.ts`

- **Type of Smell:** Universal Function / Orchestrator Coupling
- **Complexity Score:** Medium
- **Architectural Observation:** This hook (93 lines) orchestrates six cross-cutting concerns in one function: (1) WebGL context init via `useWebGLContext`, (2) behavior ID resolution to behavior objects (lines 34–36), (3) animation speed ref sync via `useEffect` (lines 55–66, also handles direct draw on pause), (4) clock sync on pause/play (lines 69–75), (5) animation loop via `useAnimationLoop` (lines 78–92), and (6) shader compilation via `useShaderProgram`. The `onReady` callback (line 47) is a closure that captures `timeRef` and `speedRef` — its identity changes every render because it's an inline arrow, causing `useShaderProgram`'s effect (which lists `onReady` in deps) to potentially trigger unnecessarily. The behaviors array (line 34) is also a new array every render, which also risks spurious shader recompilation despite `useEffect` deps tracking.
- **Impact on Strictness:** Uses a type predicate filter `(b): b is NonNullable<typeof b> => !!b` (line 36) to narrow the `.filter(Boolean)` result — a clean pattern that avoids `as` assertions. No actual strictness violations.

---

### 📄 File: `packages/randomart/src/components/RandomArtCanvas.tsx`

- **Type of Smell:** React 19 / Compiler Friction
- **Complexity Score:** Low
- **Architectural Observation:** Subscribes to all three tree channels (`useTreeR`, `useTreeG`, `useTreeB`) and `useRunning` as separate Zustand selectors (lines 9–12). Because Zustand `useStore` subscriptions are independent, any tree change triggers a re-render of this component, which then passes object references `{ treeR, treeG, treeB }` to `useWebGLRenderer`. That inline object literal (line 14) changes identity every render even if tree values are stable, which may cause `useShaderProgram`'s effect (which deps on `trees`) to re-compile unnecessarily. A `useMemo` on the trees object would prevent this, but the React Compiler is expected to handle such cases.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/randomart/src/stores/randomart/selectors.ts`

- **Type of Smell:** Code Duplication (Channel Dispatch Pattern)
- **Complexity Score:** Low
- **Architectural Observation:** The triple-ternary `activeChannel === 'red' ? s.treeR : activeChannel === 'green' ? s.treeG : s.treeB` pattern appears in three separate selectors: `useSelectedTree` (line 53), `useSelectedInitialHash` (line 64), and `useSelectedChoiceCount` (line 72). The same `channel`-to-field mapping logic is duplicated. A small helper like `const channelField = (s, channel) => channel === 'red' ? s.rngR : channel === 'green' ? s.rngG : s.rngB` could centralize this. The `getChannelIndex` helper (line 44) already exists but only returns a numeric index (0/1/2), which is used for `treeR.args[idx]` fallback but not for the field-level dispatch.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/randomart/src/hooks/useAnimationLoop.ts`

- **Type of Smell:** React 19 / Compiler Friction (Minor)
- **Complexity Score:** Low
- **Architectural Observation:** Uses `useLayoutEffect` (line 12) without a dependency array to keep `onFrameRef.current` synchronized with the latest `onFrame` callback every render. This is a standard "ref capture" pattern that the React Compiler should handle automatically in React 19, making the manual ref wrapper potentially redundant. The effect (line 16) with `[running, enabled]` is correctly scoped. No functional issue, but the manual ref indirection is a pattern the Compiler is designed to eliminate.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/randomart-engine/src/tree/build.ts`

- **Type of Smell:** Universal Function Abstraction (Minor)
- **Complexity Score:** Low
- **Architectural Observation:** The `buildTree` function (line 38) accepts an optional `rules` parameter defaulting to `getAllRules()`. This is a reasonable convenience but masks two different calling patterns: (1) unconditional full-grammar builds from `generateTrees`, and (2) filtered-grammar builds. The `buildPool` function (line 23) has a terminal fallback (line 35) that accesses `rules.filter(...)` — an unnecessary second iteration through the rule list if the first pass already found terminals. Minor, but the defensive fallback suggests the abstraction boundary is fuzzy.
- **Impact on Strictness:** None — all type annotations are satisfied.

---

### 📄 File: `packages/randomart-engine/src/animation/behaviors.ts`

- **Type of Smell:** Minor Inconsistency
- **Complexity Score:** Low
- **Architectural Observation:** Most behaviors define `applyCode` as an arrow function returning a template literal. However, `goldenWanderBehavior` (line 162) uses a `{ return ... }` function body with a `.join('\n  ')` call. `noiseCrawlBehavior` (line 177) and `colorDriftBehavior` (line 188) use `.join('\n  ')` on arrays. This inconsistency in the `applyCode` pattern across 15 behavior implementations makes automated analysis harder (the type system does not distinguish these). Additionally, behaviors with empty `glslFunction: ''` (like `zoom`, `ripple`, `drift`, `expand`, `mirrorTile`, `goldenWander`, `noiseCrawl`, `colorDrift`) produce a blank string in the preamble — this is harmless but adds noise to the emitted shader.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/randomart/src/stores/randomart/actions/config.ts`

- **Type of Smell:** Defensive Programming Overreach
- **Complexity Score:** Low
- **Architectural Observation:** The `toggleRule` function (line 16) guards against disabling the last terminal rule by counting active terminal rules (lines 24–33) and returning an empty patch `{}` if count ≤ 1. This is correctness-critical logic that lives inside the action layer rather than in a validation seam. If a future caller bypasses `toggleRule` and writes to `enabledRuleIds` directly via `updateTreeConfig` or `setState`, the invariant is unenforced. The check is also done via `getRule(id)` lookup and re-filtering on every toggle — the O(n) cost is negligible but the structural concern (invariant enforcement location) is notable.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/randomart/src/components/inspector/ChannelTabs.tsx`

- **Type of Smell:** Inline SVG Components
- **Complexity Score:** Low
- **Architectural Observation:** `LinkIcon` (line 8) and `SplitIcon` (line 24) are tiny inline SVG components defined in the same file. They are referenced only in this file. This is not a smell per se, but if expanded with more icons, extracting to a shared icon set would be cleaner. The `correlated` mode disables all channel button clicks (line 75: `correlated ? undefined : ...`) and sets `cursor-not-allowed` (line 85) — this couples the correlated-RGB visual state with the channel-switching interaction in a single component.
- **Impact on Strictness:** None.

---

### 📄 File: `packages/randomart/src/components/control-panel/useDisplaySection.ts`

- **Type of Smell:** Side-effect-in-Render-like Pattern
- **Complexity Score:** Low
- **Architectural Observation:** The `handleDownload` function (line 45) does a DOM query `document.querySelector<HTMLCanvasElement>('canvas')` (line 48) to attempt a live canvas capture before falling back to CPU rendering. This `querySelector` runs inside an event handler, which is correct, but the coupling to DOM structure (knowing there's a `canvas` element in the DOM) makes the `RandomArtCanvas` component's internal structure part of this module's contract. The `fallbackDownload` function (line 64) duplicates the channel-correlated tree selection logic (`correlatedRGB ? treeR.args[0] : treeR`) that conceptually belongs to the store. The `renderTreesToPngBlob` engine call is done synchronously and blocks the UI thread for large sizes (1024×1024 with full tree evaluation).
- **Impact on Strictness:** None.

---

## Summary

| Category | Count | Severity |
|---|---|---|
| Universal Function / Hyper-Generic Abstraction | 5 files | High (GrammarRule interface, compileToGLSL) |
| Interface Lying (dead/misleading methods) | 2 files | Medium (nested-oscillation, radial-symmetry) |
| Data Integrity (duplicate map keys) | 1 file | Low (registry.ts) |
| Orchestrator Coupling | 2 files | Medium (useWebGLRenderer, compileToGLSL) |
| React 19 Compiler Friction | 1 file | Low (useAnimationLoop ref capture) |
| Code Duplication | 1 file | Low (selectors channel dispatch) |
| Linter Workarounds | 0 files | None found — package passes strict checks cleanly |

**No `as any`, `as unknown`, `// eslint-disable`, or `@ts-expect-error` escapes were found anywhere in the package.** The codebase maintains type safety under maximum strictness.
