# Code Health Audit

Generated: 2026-07-03

---

### 📄 File: `src/hooks/useStepTimer.ts`

- **Type of Smell:** Logic Bug / Copy-Paste Error
- **Complexity Score:** Low
- **Architectural Observation:** `setStepTime` and `setRoundTripTime` are both assigned `now - genTime.current`. The two returned values are always identical. The name `roundTripTime` implies intent to measure worker round-trip (step request → response latency), but the hook only observes generation counter increments — it has no access to the async task lifecycle. The second state variable is dead analysis data, likely a copy-paste error from a template where RTT was computed separately.
- **Impact on Strictness:** None (pure logic bug in analytics, no type escape needed).

---

### 📄 File: `src/stores/simulation/actions.ts` (lines 99–105)

- **Type of Smell:** Architectural Concern / Race Condition (Fire-and-Forget Polling Loop)
- **Complexity Score:** High
- **Architectural Observation:** The `play()` function runs a `while` loop that polls `uiStore.getState().running` between steps. There is no mechanism to cancel an in-flight `pool.run()` worker request — if the worker takes longer than `speedMs`, steps accumulate overlappingly, or state is read/written from a stale generation. The `pool.run()` response includes a transferred `grid.buffer` (ownership moved to the worker via `transfer`), meaning the response grid's `ArrayBuffer` is detached on the main thread. If `step()` is called concurrently (or the loop restarts before a prior response is fully consumed), the transferred buffer causes a `TypeError` on detached `ArrayBuffer` access. This loop pattern needs a task queue, cancellation token, or promise chain to be hardened.
- **Impact on Strictness:** None (no type escapes), but runtime correctness is at risk.

---

## Summary

| Smell                                       | File                           | Severity    |
| ------------------------------------------- | ------------------------------ | ----------- |
| Linter escape (exhaustive-deps)             | `useGridTexture/index.ts:24`   | Low         |
| Copy-paste bug (stepTime === roundTripTime) | `useStepTimer.ts:14`           | Low         |
| Race condition in play loop                 | `simulation/actions.ts:99-105` | Medium-High |

The package is otherwise remarkably clean: zero `as any`/`as unknown`/`@ts-*` escapes, clean zustand selector pattern, well-factored hook splits (`useColorSync`/`useFrameSync` separated from `useGridTexture`), and consistent conventions throughout. The biggest actionable finding is the race condition in the `play()` loop, which could cause hard-to-debug runtime failures under load or slow-worker scenarios.
