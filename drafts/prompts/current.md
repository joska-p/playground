Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<5.5>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

---

S6 — GLSL library functions, precision/vec3 fixes, wire into toGPU()

Scope:


Port glslLibrary.ts → glsl-library.ts (the reusable GLSL helper
functions for each rule).
Fix the PI precision inconsistency: use Math.PI in JS and a matching
15-digit constant in GLSL.
Remove the hard-coded 'vec3' pseudo-rule — register it as a proper
grammar rule instead, or inline it cleanly (agent's judgment; log the
choice).
Fix the mod operator so CPU and GLSL paths agree.
Replace the library's grayscale toGPU() stub with the full compiler
from S5+S6.


Files touched: new glsl-library.ts, glsl.ts, rules.ts, generate.ts.
Done when: toGPU() produces full-color GLSL matching CPU output for a
handful of test trees.

---

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
