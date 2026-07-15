Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<9>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

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

When done:
1. Verify the code compiles/typechecks/lint.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
