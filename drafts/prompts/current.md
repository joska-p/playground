Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<7>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

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

When done:
1. Verify the code compiles/typechecks/lint.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
