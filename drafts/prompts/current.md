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

When done:
1. Verify the code compiles/typechecks.
2. Check the box for this session in MIGRATION_PLAN.md.
3. Add a short note under the session describing what you did, any
   deviations from the plan, and anything you deferred.
4. If you made a non-obvious decision, add it to the Decisions Log.
5. Do not proceed to the next session. Stop and summarize what you did.
