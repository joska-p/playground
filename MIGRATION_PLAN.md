# randomart-engine Merge Plan

## Goal

Replace `randomart-engine` and `randomart-engine-library` with a single new
`randomart-engine` package that combines the library's clean architecture
with the engine's rich features (23+ rules, GLSL compiler, 25 animation
behaviors, dual RNG). Migrate `@repo/randomart` to the new API. Delete both
old packages when done.

## Target file layout (packages/randomart-engine/src/)

- types.ts — union-literal ExprNodeType + full type system
- prng.ts — FNV-1a + Mulberry32, dual RNG (structureRng/channelRng)
- expression.ts — AST grow/evaluate/serialize + weighted pool builder
- rules.ts — 23+ rules via createRule() + GrammarSpec model
- weight-presets.ts — balanced/organic/geometric/chaotic
- animation.ts — 25 behaviors (spatial + color)
- glsl.ts — GLSL compiler + dependency resolver
- glsl-library.ts — reusable GLSL helper functions
- color.ts — palette interpolation
- png.ts — zero-dep PNG encoder
- format.ts — math string + tree view formatting
- generate.ts — top-level entry, error-as-value pattern
- index.ts — single barrel export
- cli.ts — CLI

## Ground rules for every session

- Only do the ONE session listed as "next" below. Do not start another.
- Do not touch @repo/randomart until Session 11.
- @repo/randomart is expected to be broken throughout S1–S10 and will be
  refactored separately later. Do not add compatibility shims, keep old
  exports around, or spend any effort keeping it working. Ignore it
  entirely until S11.
- Do not delete the old packages until Session 11 is done.
- If you discover a decision that isn't specified below, write it in the
  Decisions Log with your reasoning, make a reasonable choice, and continue
  — don't block waiting for the user unless it's destructive/irreversible.
- At the end of the session: check off the box, add a one-paragraph note
  under that session with what was done and any follow-ups, commit.

## Session Checklist

- [x] S1 — Scaffold + foundation files (from library)
- [x] S2 — Rules: terminals + transforms
- [x] S3 — Rules: combinators
- [x] S4 — Weighted pool builder, dual RNG, weight presets
- [x] S5 — GLSL compiler core + dependency resolver
- [x] S5.5 — Audit/preserve per-rule enable/disable + rule enumeration
- [x] S6 — GLSL library functions, PI fix, vec3 fix, wire into toGPU()

  **S6 note:** Extracted GLSL library functions into `glsl-library.ts` (single
  source of truth); `glsl.ts` now re-exports from it. Fixed PI precision: all
  GLSL sin/cos/sweep/nested-oscillation output now uses `3.141592653589793`
  (15-digit Math.PI match). Fixed mod operator: CPU now uses
  `a - b * floor(a/b)` matching GLSL `mod()` semantics; GLSL side got a
  proper zero-divisor guard (`abs(b) < 1e-6 ? 0.0 : mod(a, b)`). The vec3
  pseudo-rule was already eliminated by architecture — the new `compileToGLSL`
  wraps three channel trees in `vec3()` at the compiler level; no special-case
  node type needed. Noise dependency collection walks the expression tree and
  maps node types to library function IDs (currently only `recaman-pattern` →
  `pseudoRecaman`). `toGPU()` now calls `compileToGLSL(node, node, node, [])`
  to produce a full WebGL 2 fragment shader with noise library preamble,
  replacing the old grayscale WebGL 1 stub. Files touched: new
  `glsl-library.ts`, `glsl.ts`, `expression.ts`, `compileToGLSL.ts`,
  `rules.ts`.

- [ ] S7 — Animation: spatial behaviors
- [ ] S8 — Animation: color behaviors + resolver registration
- [ ] S8.5 — Audit/preserve behavior enumeration + multi-behavior composition
- [ ] S9 — Formatting (format.ts) + CLI
- [ ] S10 — Cleanup pass (boilerplate, README, build, cache eviction, dead exports)
- [ ] S11 — Swap @repo/randomart to new package, delete old packages

## Decisions Log

- **S1: `fnv1a()` fix approach.** Used `new TextEncoder().encode(text)` for
  proper UTF-8 instead of `charCodeAt(i) & 0xff`. The `TextEncoder` API is
  available in Node 16+ and is the standard way to get UTF-8 bytes from a
  string. A module-level singleton avoids re-creating it per call.
- **S1: `rules.ts` included despite S2/S3 scope.** The library's 4 built-in
  rules (classic, trig, blocky, smooth) were ported as-is because `generate.ts`
  depends on the rule registry. These are the library's existing rules, not the
  full 23+ from the engine package. They serve as the "minimal placeholder"
  described in the S1 scope.
- **S2: Terminals as 0-arity operators in GrammarSpec.** Rather than modifying
  `grow()` to support a separate `terminals` list (which the scope explicitly
  defers), new terminal types are registered as 0-arity entries in the
  `operators` array. When `grow()` picks them, it creates a node with no
  children, which is functionally identical to a terminal leaf. The trade-off
  is that terminal selection probability is now shared with operator selection
  rather than being a separate random draw — acceptable for S2 since S4's pool
  builder will replace this anyway.
- **S2: `nested-oscillation` as a leaf node, not a composite subtree.** The
  engine builds this rule's output as a `sin(multiply(x, sin(y)))` subtree via
  `buildNode()`. In the new library's expression tree model, it is cleaner to
  make it a self-contained node type that evaluates `sin(x * sin(y * PI) * PI)`
  directly, avoiding coupling to combinators (S3) that aren't ported yet.
- **S3: Naming remaps from engine to new `ExprNodeType`.** The engine uses
  `add`/`multiply`/`modulo` while the new package uses `sum`/`product`/`mod`
  (matching the library convention already in S1). All other combinators keep
  the same name: `pow`, `less-than`, `greater-than`, `step`, `if`,
  `smoothstep`, `clamp`. S11 will need to translate between these when
  migrating `@repo/randomart`.
- **S3: `if` rule evaluates `condition > 0` (not `condition >= 0`).** Matches
  the engine's `ifRule` implementation. The threshold is strict greater-than,
  so `condition === 0` falls through to the false branch.
- **S3: `smoothstep` maps GLSL output to [-1,1] via `2*t-1`.** The engine
  uses `smoothstep(edge0, edge1, x)` which returns [0,1], then maps to
  [-1,1] via `t*2-1`. The new package follows the same convention, with
  the GLSL output wrapped as `(2.0 * smoothstep(...) - 1.0)`.
- **S4: `terminalBias` kept in `GrammarSpec` but no longer used by `grow()`.**
  The engine's pool-builder approach replaces the library's coin-flip. The
  field remains for backward compatibility with existing rule definitions
  in `rules.ts` — those definitions still reference `terminalBias` values
  that are now ignored. A future cleanup pass can remove them.
- **S4: Default terminals injected when spec has none.** When a `GrammarSpec`
  has no terminal operators (arity 0 with category 'terminal'), the pool
  builder injects x (weight 1.0), y (weight 1.0), and const (weight 0.5)
  matching the engine's terminal rule weights. Specs that already include
  terminals (e.g. `terminal-x`) are left as-is.
- **S4: `banded-noise` removed from weight presets.** The engine's organic
  preset referenced `banded-noise` at weight 0.2, but no such rule exists
  in the engine's grammar registry (grep confirmed it only appears in
  WeightPresets.ts). It was a dead reference and has been dropped.
- **S5: Dependency collection through behaviors, not rule traversal.** The
  engine's compileToGLSL collects noiseDependencies from each GrammarRule during
  recursive compileNode traversal. In the new architecture, expression nodes
  reference GLSL library functions directly in their static toGLSL() output
  strings, so the compiler cannot discover those dependencies statically by
  walking the tree. Instead, dependency collection happens through
  AnimationBehavior.noiseDependencies, which is already how the engine handles
  behavior-specific noise needs. A future enhancement could scan the compiled
  GLSL output string for function references, but for now this is sufficient
  and matches the actual use case: library functions are wired to their
  consumer nodes either via behaviors or by direct compilation (S6).
- **S5.5: `enabledRuleIds` added to `GenerateOptions`, not to `buildTree`/`grow`.**
  The old engine's `generateTrees()` accepted `enabledRuleIds` and filtered
  `getAllRules()` before calling `buildTree()`. In the new package, `buildTree()`
  operates on a single `GrammarSpec` (one rule), so per-rule filtering is
  better placed at the `generate()` entry point where the caller picks which
  rule to use. This keeps the internal tree-building functions rule-agnostic
  and composes cleanly: the consumer calls `listRules()`, filters by
  `enabledRuleIds`, and passes each enabled rule's id to `generate()`.
  Weight presets are orthogonal — they adjust per-node-type weights within a
  rule's grammar, not which rules are available.
- **S5: AnimationBehavior and ApplyCodeContext types added to the new package
  ahead of S7/S8.** The compileToGLSL function signature requires these types.
  They are minimal forward-portals that match the engine's definitions exactly,
  enabling the compiler to typecheck cleanly. Behaviors themselves are imported
  and populated in S7/S8.
- **S6: vec3 pseudo-rule eliminated by architecture, not registered.** The old
  engine had a hard-coded `ruleId === 'vec3'` special case in `compileNode()`
  because the TreeConfig API could produce a single vec3 node combining R/G/B.
  In the new package, the architecture already handles this cleanly:
  `compileToGLSL()` takes three separate `ExprNode` trees and wraps them in
  `vec3()` at the compiler level. No special-case node type is needed, no
  hidden coupling exists. The vec3 pseudo-rule is simply not applicable.
- **S6: Noise dependency collection via static node-type map.** Instead of
  having each rule declare `noiseDependencies` (old engine), a static
  `NOISE_DEPS_BY_NODE` map in `compileToGLSL.ts` associates expression node
  types with their required GLSL library function IDs. The compiler walks each
  tree and collects deps. Currently only `recaman-pattern` → `pseudoRecaman`.
  This is extensible: adding a new node that references a library function
  requires only adding an entry to the map.

## Known Issues To Fix (carried over from analysis)

- [x] fnv1a() truncates to low byte of char codes — needs proper UTF-8 (S1)
- [x] Weight presets reference non-existent rule IDs (S4)
- [x] mod operator behaves differently CPU vs GLSL (S6)
- [x] PI precision inconsistent JS vs GLSL (S6)
- [x] Hard-coded 'vec3' pseudo-rule, hidden coupling (S6)
- [ ] 15 of 25 animation behaviors have empty glslFunction strings (S7/S8)
- [ ] Unbounded memoization cache — needs LRU/max-size (S10)
- [ ] bin field points to raw TS, requires tsx (S10)
- [ ] README documents scripts not in package.json (S10)
- [ ] Dead exports: stepRule, recamanPatternRule, nestedOscillationRule (S10)
- [ ] Confirm per-rule enable/disable + rule enumeration survived the
      merge — the UI consumer relies on both (S5.5)
- [ ] Confirm behavior enumeration + running multiple animation behaviors
      composed together (not just one active behavior) survived the merge —
      the UI consumer's play/pause + multi-select relies on it (S8.5)
