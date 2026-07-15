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

  Created `packages/randomart-engine-next/` with full target layout. Ported 8
  files as-is from `randomart-engine-library`: `types.ts`, `prng.ts`,
  `expression.ts`, `rules.ts`, `color.ts`, `png.ts`, `generate.ts`, `index.ts`.
  Fixed `fnv1a()` to use `TextEncoder` for proper multi-byte UTF-8 encoding
  instead of `charCodeAt() & 0xff` which truncated non-ASCII characters. Also
  added missing non-null assertion on `opcodes[n.type]` in `toBytes()` to
  satisfy `noUncheckedIndexedAccess`. Package typechecks clean. Rules ported
  are the library's4 built-in rules (classic, trig, blocky, smooth) as
  placeholder — the full 23+ rules land in S2/S3.

- [x] S2 — Rules: terminals + transforms

  Extended `ExprNodeType` in `types.ts` with 10 new members: 6 terminals
  (`random`, `radial`, `sweep`, `fbm`, `recaman-pattern`, `nested-oscillation`)
  and 4 transforms (`sqrt`, `exp`, `log`, `fract`). Added `evaluate()`,
  `toGLSL()`, `toMathString()`, and `toBytes()` cases for all 16 rules in
  `expression.ts` (6 — `x`, `y`, `const`, `sin`, `cos`, `abs` — already
  existed). Registered 13 new individual test rules in `rules.ts` (16 total
  including the 3 original composite rules). New terminals are registered as
  0-arity operators in `GrammarSpec`, so they appear in trees via the existing
  `grow()` mechanism without modifying it. `fbm` GLSL is inlined as unrolled
  octaves; `recaman-pattern` GLSL returns `pseudoRecaman(p)` (to be resolved
  in S6 with the GLSL library). `nested-oscillation` is a self-contained node
  type rather than a composite subtree, evaluating to `sin(x * sin(y * PI) * PI)`.
  All deviations from the engine: sin/cos still multiply by PI (matching
  existing library convention, engine does the same); `random` uses `abs(p.x)`
  matching the engine. Typecheck and lint pass clean.

- [x] S3 — Rules: combinators

  Added 7 new `ExprNodeType` members: `pow`, `less-than`, `greater-than`,
  `step`, `if`, `smoothstep`, `clamp`. Implemented `evaluate()`, `toGLSL()`,
  `toMathString()`, and `toBytes()` (opcodes 23–29) for all 7 in
  `expression.ts`. Registered 10 new individual combinator rules in `rules.ts`
  (7 single-combinator + 3 composite: arithmetic-mix, flow-art,
  compare-and-clamp). Total rule count is now 33 (up from 23 in S2).
  Naming maps: engine's `add`→`sum`, `multiply`→`product`, `modulo`→`mod`
  (all three existed pre-S3). The `if` rule evaluates `condition > 0`,
  `smoothstep` maps GLSL output to [-1,1] via `2*t-1`, and `clamp` uses
  `clamp(lo, hi, x)` in GLSL directly. Typecheck and lint pass clean.

- [ ] S4 — Weighted pool builder, dual RNG, weight presets
- [ ] S5 — GLSL compiler core + dependency resolver
- [ ] S6 — GLSL library functions, PI fix, vec3 fix, wire into toGPU()
- [ ] S7 — Animation: spatial behaviors
- [ ] S8 — Animation: color behaviors + resolver registration
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

## Known Issues To Fix (carried over from analysis)

- [x] fnv1a() truncates to low byte of char codes — needs proper UTF-8 (S1)
- [ ] Weight presets reference non-existent rule IDs (S4)
- [ ] mod operator behaves differently CPU vs GLSL (S6)
- [ ] PI precision inconsistent JS vs GLSL (S6)
- [ ] Hard-coded 'vec3' pseudo-rule, hidden coupling (S6)
- [ ] 15 of 25 animation behaviors have empty glslFunction strings (S7/S8)
- [ ] Unbounded memoization cache — needs LRU/max-size (S10)
- [ ] bin field points to raw TS, requires tsx (S10)
- [ ] README documents scripts not in package.json (S10)
- [ ] Dead exports: stepRule, recamanPatternRule, nestedOscillationRule (S10)
