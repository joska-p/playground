Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<1>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

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

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
