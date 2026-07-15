Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<5>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

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

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
