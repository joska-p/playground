Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<4>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

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

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
