---
name: diagnosing-bugs
description: "Diagnosis loop for hard bugs and performance regressions. Use when the user says 'diagnose'/'debug this', or reports something broken/throwing/failing/slow."
disable-model-invocation: true
---

# Diagnosing Bugs

A discipline for hard bugs. Skip phases only when explicitly justified.

## Redact

**Redact every secret first** — write `<REDACTED>` in its place. Build loops against env vars so credentials stay in the environment. Quoting captured artifacts: only the lines that carry signal.

If the redacted output is not enough to diagnose, say so and ask the user.

## Phase 1 — Build a feedback loop

**This is the skill.** Everything else is mechanical. A **tight** pass/fail signal for the bug — one that goes red on _this_ bug — means you will find the cause. Without one, no amount of staring at code helps.

Spend disproportionate effort here. **Be aggressive. Be creative. Refuse to give up.**

### Ways to construct one — try in roughly this order

1. **Failing test** at whatever seam reaches the bug — unit, integration, e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against a known-good snapshot.
4. **Headless browser script** (Playwright / Puppeteer).
5. **Replay a captured trace.** Save a real request/payload/event log to disk; replay in isolation.
6. **Throwaway harness.** Minimal subset of the system exercising the bug path with a single call.
7. **Property / fuzz loop.** 1000 random inputs, look for the failure mode.
8. **Bisection harness.** Automate "boot at state X, check, repeat" for `git bisect run`.
9. **Differential loop.** Same input through old vs new version, diff outputs.
10. **HITL bash script.** Last resort — drive the human with a structured loop.

### Tighten the loop

- Faster? (Cache setup, skip unrelated init, narrow scope.)
- Sharper signal? (Assert on the specific symptom, not "didn't crash".)
- More deterministic? (Pin time, seed RNG, isolate filesystem.)

A 30-second flaky loop is barely better than no loop; a 2-second deterministic one is a debugging superpower.

### Non-deterministic bugs

Goal: **higher reproduction rate**. Loop 100x, parallelise, stress, narrow timing windows. A 50%-flake bug is debuggable; 1% is not.

### When you genuinely cannot build a loop

Stop. List what you tried. Ask the user for: access to the reproducing environment, a redacted artifact (HAR, log dump, recording), or permission to add temporary instrumentation. Do **not** hypothesise without a loop.

### Completion criterion — tight + red

Phase 1 is done when you can name **one command** — a script, test, curl — that you have **already run at least once** (show invocation + output, redacted), and that is:

- **Red-capable** — drives the actual bug code path and asserts the user's exact symptom.
- **Deterministic** — same verdict every run (flaky: pinned high reproduction rate).
- **Fast** — seconds, not minutes.
- **Agent-runnable** — unattended; human only via structured HITL if needed.

If you catch yourself reading code to build a theory before this exists, **stop**. No red-capable command, no Phase 2.

## Phase 2 — Reproduce + minimise

Run the loop. Watch it go red.

Confirm:

- The loop produces the failure mode the **user** described — not a different nearby failure.
- The failure is reproducible across runs (or high enough rate for non-deterministic).
- You captured the exact symptom for later verification.

### Minimise

Shrink the repro to the **smallest scenario that still goes red**. Cut inputs, callers, config, data, steps **one at a time**, re-running after each cut.

Done when **every remaining element is load-bearing**.

## Phase 3 — Hypothesise

Generate **3-5 ranked hypotheses** before testing any. Single-hypothesis anchoring is the trap.

Each must be **falsifiable**:

> "If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse."

**Show the ranked list to the user before testing.** They often re-rank instantly. Don't block on it if AFK.

## Phase 4 — Instrument

Each probe maps to a specific prediction from Phase 3. **One variable at a time.**

1. **Debugger / REPL inspection** if available. One breakpoint beats ten logs.
2. **Targeted logs** at boundaries that distinguish hypotheses.
3. Never "log everything and grep".

**Tag every debug log** with a unique prefix, e.g. `[DEBUG-a4f2]`. Cleanup = single grep.

**Perf regressions:** establish a baseline (timing harness, `performance.now()`, profiler), then bisect. Measure first, fix second.

## Phase 5 — Fix + regression test

Write the regression test **before the fix** — but only at a **correct seam** (exercises the real bug pattern at the call site).

If no correct seam exists, that itself is the finding. Flag it.

If a correct seam exists:

1. Turn the minimised repro into a failing test.
2. Watch it fail.
3. Apply the fix.
4. Watch it pass.
5. Re-run the Phase 1 loop against the original scenario.

## Phase 6 — Cleanup

Before declaring done:

- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or absence of seam documented)
- [ ] All `[DEBUG-...]` instrumentation removed
- [ ] Throwaway prototypes deleted
- [ ] The correct hypothesis stated in the commit message
