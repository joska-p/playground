# randomart-engine Merge: Session-by-Session Plan

## Consumer breakage is expected and fine

`@repo/randomart` is getting refactored separately regardless of this
migration. **Do not let any session (S1–S10) slow down, hedge, or add
compatibility shims to avoid breaking the consumer.** It is expected to be
broken for most of this migration and that's fine. Each session should
focus only on building the new package correctly — not on keeping anything
downstream green. This should be stated explicitly in every session prompt
so the agent doesn't waste effort "protecting" a consumer nobody is
currently running.

## Why split it this way

Your agent has no memory between sessions, so the memory has to live in the
repo instead. Two files make that work:

1. **`MIGRATION_PLAN.md`** — lives in the repo root (or the new package
   root). It's the single source of truth: goal, target architecture, full
   checklist, and a running decisions/issues log. Every session starts by
   reading it and ends by updating it.
2. **The session prompt** (below) — one reusable template. You just swap in
   the session number each time. It tells the agent: read the plan, do
   *only* the next unchecked session, don't touch anything else, update the
   plan, stop.

Each session below is scoped to touch a small, bounded set of files (usually
1–4 new/modified files), so the agent never needs the whole two-codebase
picture in context — only the plan file + the specific source files it's
porting from.

---

## Step 1 — Create `MIGRATION_PLAN.md` in the repo

Copy this into the repo before Session 1. The agent will edit the checklist
and the log as it goes — that's the point.

```markdown
# randomart-engine Merge Plan

## Goal
Replace `randomart-engine` and `randomart-engine-library` with a single new
`randomart-engine` package that combines the library's clean architecture
with the engine's rich features (23+ rules, GLSL compiler, 25 animation
behaviors, dual RNG). Migrate `@repo/randomart` to the new API. Delete both
old packages when done.

## Target file layout (packages/randomart-engine/src/)
- types.ts        — union-literal ExprNodeType + full type system
- prng.ts         — FNV-1a + Mulberry32, dual RNG (structureRng/channelRng)
- expression.ts   — AST grow/evaluate/serialize + weighted pool builder
- rules.ts        — 23+ rules via createRule() + GrammarSpec model
- weight-presets.ts — balanced/organic/geometric/chaotic
- animation.ts    — 25 behaviors (spatial + color)
- glsl.ts         — GLSL compiler + dependency resolver
- glsl-library.ts — reusable GLSL helper functions
- color.ts        — palette interpolation
- png.ts          — zero-dep PNG encoder
- format.ts        — math string + tree view formatting
- generate.ts     — top-level entry, error-as-value pattern
- index.ts        — single barrel export
- cli.ts          — CLI

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

- [ ] S1 — Scaffold + foundation files (from library)
- [ ] S2 — Rules: terminals + transforms
- [ ] S3 — Rules: combinators
- [ ] S4 — Weighted pool builder, dual RNG, weight presets
- [ ] S5 — GLSL compiler core + dependency resolver
- [ ] S5.5 — Audit/preserve per-rule enable/disable + rule enumeration
- [ ] S6 — GLSL library functions, PI fix, vec3 fix, wire into toGPU()
- [ ] S7 — Animation: spatial behaviors
- [ ] S8 — Animation: color behaviors + resolver registration
- [ ] S8.5 — Audit/preserve behavior enumeration + multi-behavior composition
- [ ] S9 — Formatting (format.ts) + CLI
- [ ] S10 — Cleanup pass (boilerplate, README, build, cache eviction, dead exports)
- [ ] S11 — Swap @repo/randomart to new package, delete old packages

## Decisions Log
(agent appends here as it goes)

## Known Issues To Fix (carried over from analysis)
- [ ] fnv1a() truncates to low byte of char codes — needs proper UTF-8 (S1)
- [ ] Weight presets reference non-existent rule IDs (S4)
- [ ] mod operator behaves differently CPU vs GLSL (S6)
- [ ] PI precision inconsistent JS vs GLSL (S6)
- [ ] Hard-coded 'vec3' pseudo-rule, hidden coupling (S6)
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
```

---

## Step 2 — Reusable session prompt

Use this verbatim for every session. Only the bracketed line changes.

```
Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<N>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

<paste the "Session N" block from this document here>

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
```

---

## Step 3 — The sessions

### S1 — Scaffold + foundation (from library)
**Scope:** Create `packages/randomart-engine-next/` (working name until S11
migration) with the target layout. Port, as-is with minimal changes, from
`randomart-engine-library`:
- `types.ts`, `prng.ts`, `expression.ts` (base only — grow/evaluate/serialize,
  not the pool builder yet), `color.ts`, `png.ts`, `generate.ts`,
  `index.ts`.

Fix `fnv1a()` to use proper UTF-8 encoding instead of truncating to the low
byte of char codes.

**Do not** port rules yet (S2/S3), animation (S7/S8), or GLSL (S5/S6).
**Files touched:** ~7 new files.
**Done when:** package builds standalone, exports the base types/PRNG/PNG
encoder, `generate()` exists but rule set is still whatever minimal
placeholder the library had (real rules land in S2/S3).

---

### S2 — Rules: terminals + transforms
**Scope:** Port these rules from `randomart-engine` into the library's
`createRule()` / `GrammarSpec` framework in `rules.ts`:
- Terminals: `x`, `y`, `const`, `random`, `radial`, `sweep`, `fbm`,
  `recaman-pattern`, `nested-oscillation`
- Transforms: `sin`, `cos`, `abs`, `sqrt`, `exp`, `log`, `fract`

Map each engine rule's `ruleId` to an `ExprNodeType` union member (extend
`types.ts`'s union as needed).

**Do not** port combinators (S3) or touch the pool builder (S4) yet — a
simple existing tree-growth mechanism is fine for now.
**Files touched:** `rules.ts`, `types.ts`.
**Done when:** all 16 rules are registered and individually testable
(generate a tree using only one rule type, confirm evaluation works).

---

### S3 — Rules: combinators
**Scope:** Port the remaining rules:
- `add`→`sum`, `multiply`→`product`, `modulo`→`mod`, `pow`, `less-than`,
  `greater-than`, `step`, `if`, `smoothstep`, `clamp`

Same framework as S2. Note the naming remaps explicitly (e.g. engine's
`add` becomes `sum` in the new `ExprNodeType`) — keep this mapping written
down in the Decisions Log since S11 migration will need it.

**Files touched:** `rules.ts`, `types.ts`.
**Done when:** all 23+ rules are registered; a full random tree can be
grown and evaluated end-to-end (even without the improved pool builder).

---

### S4 — Weighted pool builder, dual RNG, weight presets
**Scope:**
- Port the engine's `buildPool()` with depth-dependent
  `structuralProbability` into `expression.ts`, replacing the library's
  simple coin-flip depth approach.
- Port `structureRng`/`channelRng` dual-RNG separation into `prng.ts` for
  correlated-but-varied color channels.
- Port weight presets (`balanced`, `organic`, `geometric`, `chaotic`) into
  `weight-presets.ts`, **fixing** the broken rule-ID references using the
  rule-name mapping from S3's Decisions Log entry.

**Files touched:** `expression.ts`, `prng.ts`, new `weight-presets.ts`.
**Done when:** tree generation with weight presets produces trees matching
the depth/shape characteristics of the original engine (spot-check a few
seeds).

---

### S5 — GLSL compiler core + dependency resolver
**Scope:** Port `compileToGLSL.ts` and the dependency-resolution logic
(topological sort) from the engine into a new `glsl.ts`. This session is
about the compiler skeleton and AST→GLSL traversal — not the full function
library (that's S6).

**Files touched:** new `glsl.ts`.
**Done when:** the compiler can turn a simple tree (e.g. just terminals +
one transform) into valid GLSL source, with dependencies resolved in
correct order.

---

### S5.5 — Audit/preserve per-rule enable/disable + rule enumeration

**Why this session exists:** the UI consumer (`store.ts`) toggles
individual rules on/off independently of any weight preset — it calls
`getAllRules()` to render one checkbox per rule, and passes
`enabledRuleIds` into `generateTrees()` to exclude unchecked rules from
generation. Nothing in Phases 1–4 of this plan explicitly requires the new
package to preserve that. Weight presets (S4) are a *different* UX model
— they pick a whole named ruleset with relative weights, not an
independent per-rule on/off filter. It's easy for the new package to have
ended up with presets but no per-rule filter. This session finds out and
fixes it if needed, before S6–S9 build further on top of `generate.ts`'s
contract.

**Scope:**
- Check whether the new package currently exposes something equivalent to
  `getAllRules()` — an enumerable list of all registered rules (id +
  enough metadata to label a checkbox). If not, add it to `rules.ts` /
  `index.ts`.
- Check whether `generate()` (or whatever composes tree generation) still
  accepts an explicit include/exclude list of rule ids, independent of
  whatever weight preset is active. If not, add that parameter — it
  should compose with weight presets, not replace them (e.g. a preset
  picks default weights, the enabled-list further filters which rules can
  appear at all).
- If either was dropped intentionally as part of the presets redesign,
  don't silently restore it — write the tradeoff in the Decisions Log and
  make an explicit call, since a downstream UI session depends on
  whichever way this goes.
- Do not touch the UI/consumer repo in this session — this is purely
  about confirming and, if needed, extending the new package's public
  API. The UI-side session that consumes this comes later, in the
  separate UI migration plan.

**Files touched:** `rules.ts`, `generate.ts`, `index.ts` (only if the
capability needs to be added or exposed differently).
**Done when:** there's a confirmed, documented way for a consumer to (a)
enumerate all rules and (b) generate a tree restricted to an arbitrary
subset of them, independent of preset choice — and the Decisions Log
states clearly whether this was already present, added, or intentionally
dropped.

---

### S6 — GLSL library functions, precision/vec3 fixes, wire into toGPU()
**Scope:**
- Port `glslLibrary.ts` → `glsl-library.ts` (the reusable GLSL helper
  functions for each rule).
- Fix the PI precision inconsistency: use `Math.PI` in JS and a matching
  15-digit constant in GLSL.
- Remove the hard-coded `'vec3'` pseudo-rule — register it as a proper
  grammar rule instead, or inline it cleanly (agent's judgment; log the
  choice).
- Fix the `mod` operator so CPU and GLSL paths agree.
- Replace the library's grayscale `toGPU()` stub with the full compiler
  from S5+S6.

**Files touched:** new `glsl-library.ts`, `glsl.ts`, `rules.ts`, `generate.ts`.
**Done when:** `toGPU()` produces full-color GLSL matching CPU output for a
handful of test trees.

---

### S7 — Animation: spatial behaviors
**Scope:** Port the spatial half of the 25 animation behaviors (zoom,
ripple, rotate, swirl, kaleidoscope, domain-warp, tunnel, etc.) into a new
`animation.ts`. Make `glslFunction` optional on the behavior type for
behaviors that only use `applyCode`.

Design note: keep behaviors independently applicable (each one a
self-contained function), not mutually exclusive alternatives — the
consumer runs several at once. Don't collapse toward a single-active-
behavior model even if that's simpler; S8.5 will formally verify this once
the full set is ported.

**Files touched:** new `animation.ts`, `types.ts`.
**Done when:** spatial behaviors apply correctly on the CPU path; GLSL path
can be a stub for behaviors not yet wired to the resolver (finished in S8).

---

### S8 — Animation: color behaviors + resolver registration
**Scope:** Port the color half of the animation behaviors (hue-shift,
contrast-pulse, edge-detect, etc.). Register all animation GLSL functions
with the dependency resolver from S5 so animated GLSL output actually
compiles end-to-end.

**Files touched:** `animation.ts`, `glsl.ts`.
**Done when:** all 25 behaviors work on CPU, and GLSL output compiles for
at least one representative behavior of each kind (spatial + color).

---

### S8.5 — Audit/preserve behavior enumeration + multi-behavior composition

**Why this session exists:** the UI consumer (`store.ts`) keeps
`activeAnimationBehaviorIds` as a list, not a single id, and drives it
with a play/pause `running` flag — meaning the UI lets you enable,
disable, and freely compose any subset of animation behaviors
simultaneously, not just pick one at a time. Nothing in S7/S8 as scoped
explicitly requires the ported animation system to support running
multiple behaviors stacked together (spatial + color combos, or several
spatial behaviors at once) rather than a single selected behavior. This
session confirms that composition actually works end-to-end — CPU and
GLSL both — before the UI migration is written against it.

**Scope:**
- Check whether there's an enumerable list of all behaviors (id + enough
  metadata to label a checkbox/toggle), equivalent to what the UI needs
  to render its behavior list. If not, add it.
- Check whether the CPU render path can apply an arbitrary *set* of
  active behavior ids together in one pass (not just one at a time).
  Verify order-of-application is deterministic and documented if it
  affects output (e.g. does zoom-then-hue-shift differ from
  hue-shift-then-zoom?).
- Check the GLSL path: confirm the dependency resolver from S5/S8 can
  compile a shader with multiple simultaneously-active behaviors, not
  just one. This is the likely failure point — resolving several
  behaviors' GLSL functions together is more complex than one at a time.
- If true multi-behavior composition wasn't part of the design and would
  be a significant rework, don't silently force it in — log the tradeoff
  and the effort estimate in the Decisions Log, and flag it clearly so
  the UI session can decide whether to scope the play button down to
  single-behavior-at-a-time as a fallback.
- Do not touch the UI/consumer repo in this session.

**Files touched:** `animation.ts`, `glsl.ts` (only if composition needs to
be added or fixed).
**Done when:** there's a confirmed, documented answer for whether/how a
consumer can (a) enumerate all behaviors and (b) run an arbitrary subset
of them composed together, on both CPU and GLSL paths — logged in the
Decisions Log either way.

---

### S9 — Formatting (format.ts) + CLI
**Scope:**
- Port math-string and tree-view formatting from the engine (Unicode
  operators: π, ·, mod) into new `format.ts`.
- Port/keep the library's CLI (`cli.ts`), pointed at the new package's API.

**Files touched:** new `format.ts`, `cli.ts`.
**Done when:** CLI can generate an image and print a formatted expression
tree using the new package end-to-end.

---

### S10 — Cleanup pass
**Scope:**
- Delete `public/` boilerplate directory if carried over.
- Fix README to match actual `package.json` scripts.
- Add a build script producing `dist/` with compiled JS + `.d.ts`; point
  `bin` at the compiled CLI instead of raw TS (or explicitly document the
  tsx-based approach if kept — agent's call, log it).
- Add cache eviction (LRU or max-size) to the per-seed memoization cache.
- Remove dead exports (`stepRule`, `recamanPatternRule`,
  `nestedOscillationRule`) if they remain unregistered after S2/S3.

**Files touched:** `package.json`, `README.md`, `expression.ts`, misc.
**Done when:** `npm run build` (or equivalent) produces a clean `dist/`,
README accurately reflects scripts, no dead exports remain.

---

### S11 — Swap @repo/randomart to new package, delete old packages
**Scope:** `@repo/randomart` is being refactored separately later — this
session is a mechanical swap, not a careful migration. Don't chase every
resulting type error or runtime break; that's out of scope and expected.
- Point `@repo/randomart`'s imports at the new package instead of the old
  one (bulk find/replace on the package name/path is fine; don't spend
  time fixing individual renamed identifiers unless it's trivial).
- Update root `tsconfig.json` project references.
- Delete `packages/randomart-engine` (old) and
  `packages/randomart-engine-library`.
- Rename `packages/randomart-engine-next` → `packages/randomart-engine`.
- Update `package.json` name/version as needed.
- Note in the plan file, briefly, what's now broken in `@repo/randomart`
  as a result (rough list is fine — it's for whoever does the consumer
  refactor later, not something to fix now).

**Files touched:** import paths across `@repo/randomart` + tsconfig +
package deletions/rename.
**Done when:** old packages are gone, the new package is in place at
`packages/randomart-engine`, and `MIGRATION_PLAN.md` shows all sessions
checked. `@repo/randomart` does not need to build or pass checks.

---

## Notes on running this with a free-tier agent

- If any single session still overflows context, split it further along
  the same lines — S3 is the most likely candidate now that S11 is a
  lightweight swap; split it into "sum/product/mod" and
  "pow/comparisons/step/if/smoothstep/clamp" if needed.
- Don't let the agent read the *entire* old engine or library source tree
  at the start of a session — point it at only the specific files named in
  that session's scope. That's most of what keeps context usage down.
- Since there are no tests in either original package, add a minimal smoke
  test (or at least a manual "generate one image + print one tree" check)
  at the end of each session — cheap insurance against a later session
  discovering S2's rule mapping was subtly wrong.
