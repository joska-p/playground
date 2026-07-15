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

- [ ] S2 — Rules: terminals + transforms
- [ ] S3 — Rules: combinators
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
