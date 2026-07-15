Read MIGRATION_PLAN.md in this repo. Find the first unchecked session in
the Session Checklist — that is your ONLY task this session.

[Run session: S<3>]

Scope for this session, and nothing beyond it, is defined below. Source
material for what to port is in the original engine/library packages
(randomart-engine and randomart-engine-library) — read only the specific
files you need for this session, not the whole codebase.

@repo/randomart (the consumer) is expected to be broken right now and will
be refactored separately later. Do not check it, do not fix it, do not add
any compatibility shims for it. Ignore it completely unless this session
is explicitly S11.

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

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
