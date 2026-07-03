# Code Health Audit: `@repo/worker-pool`

> **Package Path:** `packages/worker-pool/`
> **Nature:** Pure TypeScript utility — no UI, no React, no JSX. A generic Web Worker pool with queue, drain, and teardown lifecycle.
> **Overall Health:** Clean. Findings are mild and concentrated in the test boundary.

---

## 📄 File: `src/worker-pool.ts`

- **Type of Smell:** N/A
- **Complexity Score:** N/A
- **Architectural Observation:** This is the core of the package — a single class `WorkerPool<TTask, TResult>` that manages a pool of Web Workers with FIFO queuing and automatic drain. The class is well-scoped with clear responsibilities split across `run` → `acquireWorker` → `dispatch` → `drainQueue` → `teardown`. The generic type parameters are justified: the whole point of the module is to be task/result agnostic. There are no massive `if/else` chains, no switch statements, and no nested configuration objects. The `dispatch` method uses a closure-based event listener pattern that is standard for one-shot worker calls. **No universal-function smell.**
- **Impact on Strictness:** None. Zero type assertions, zero eslint-disable comments.

---

## 📄 File: `src/types.ts`

- **Type of Smell:** N/A
- **Complexity Score:** N/A
- **Architectural Observation:** Two type exports:
  - `WorkerResult<T>` — a clean discriminated union (`{ ok: true; value: T } | { ok: false; error: Error }`).
  - `WorkerPoolConfig<TTask, TResult>` — three required hook functions (`workerFactory`, `serialize`, `deserialize`) and one optional config (`maxPoolSize`). Minimal surface area, no overloads, no conditional types branching on string literals.
- **Impact on Strictness:** None.

---

## 📄 File: `src/mock-worker-pool.ts`

- **Type of Smell:** N/A
- **Complexity Score:** N/A
- **Architectural Observation:** A 15-line mock class for test-time substitution. Synchronous handler execution, no-op teardown. There is nothing to simplify here.
- **Impact on Strictness:** None.

---

## 📄 File: `src/worker-pool.test.ts`

- **Type of Smell:** Linter Workaround (mild)
- **Complexity Score:** Low
- **Architectural Observation:** Tests are well-organized in vertical-slice "cycles" mirroring the TDD plan. The `createFakeWorker()` helper (lines 9–35) builds a minimal mock `Worker` using `vi.fn()` and closure-based callback capture. It is clean and appropriate but requires one type-level escape hatch and triggers linter relaxations.
- **Impact on Strictness:**
  - **Line 21:** `as unknown as Worker` — a double type assertion to treat the mock object as a `Worker` without implementing the full DOM interface. This is the standard pattern for fake Workers in tests, but it bypasses TypeScript strictness at the module boundary.
  - **`eslint.config.js`** (see below) disables three rules for `**/*.test.ts` files to accommodate this pattern.

---

## 📄 File: `eslint.config.js`

- **Type of Smell:** Linter Workaround / Config Loosening
- **Complexity Score:** Low
- **Architectural Observation:** The ESLint config inherits the monorepo's hyper-strict base config and then relaxes three rules for test files:
  1. `@typescript-eslint/no-unsafe-assignment` — 'off' — needed because mock objects (`vi.fn()` return values, cast objects) don't carry the exact types the base config expects.
  2. `@typescript-eslint/unbound-method` — 'off' — vi.fn() mocks are passed as event handlers, triggering this rule.
  3. `@typescript-eslint/no-floating-promises` — 'off' — test setup often has intentionally floating promises (e.g., `p2.catch(() => undefined)` on line 379).

  These are narrow, well-justified relaxations. The `eslint.config.js` is only 16 lines and does not engage in broad rule disabling. **No universal-function smell.**

- **Impact on Strictness:** Three rules disabled for all test files — small blast radius, but means test code is not checked for unsafe assignments, unbound methods, or floating promises anywhere in the test suite.

---

## 📄 File: `tsconfig.json`

- **Type of Smell:** N/A
- **Complexity Score:** N/A
- **Architectural Observation:** Strict mode enabled, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `erasableSyntaxOnly` all set. No local overrides that loosen strictness. No `skipLibCheck` bypass except the standard one.
- **Impact on Strictness:** None. Near-maximum strictness preserved.

---

## 📄 File: `README.md`

- **Type of Smell:** N/A (Defensive Documentation)
- **Complexity Score:** N/A
- **Architectural Observation:** The README explicitly calls out "Concrete class, not interface" as a design rationale, stating: "One class with config hooks (workerFactory, serialize/deserialize) is the PipelineGateway generalisation. Adding an abstract interface before a second implementation is premature." This shows deliberate architectural defense against the hyper-generic abstraction smell. It also documents non-goals (streaming, warm-up, bundler integration) which define what the module explicitly does NOT do — a healthy design boundary.
- **Impact on Strictness:** N/A (documentation).

---

## Summary

| File                      | Smell Type                                      | Severity |
| ------------------------- | ----------------------------------------------- | -------- |
| `src/worker-pool.ts`      | None                                            | —        |
| `src/types.ts`            | None                                            | —        |
| `src/mock-worker-pool.ts` | None                                            | —        |
| `src/worker-pool.test.ts` | Linter Workaround (1 type assertion)            | Low      |
| `eslint.config.js`        | Linter Workaround (3 rule relaxations for test) | Low      |
| `tsconfig.json`           | None                                            | —        |
| `README.md`               | None (defensive design documented)              | —        |

### React 19 / React Compiler Friction

**Not applicable.** This package has zero React dependencies. It is a pure TypeScript module used by `pixel`, `automa`, and `graph-viz` packages to manage Web Workers. No `useMemo`, `useCallback`, or component code exists anywhere in this package.

### Key Takeaway

`@repo/worker-pool` is a well-scoped, clean module. The only code-health notes are:

1. **`as unknown as Worker`** in tests — necessary to mock the DOM `Worker` interface without pulling in jsdom.
2. **Three ESLint rules relaxed for test files** — narrow, justified, but technically a weakening of the monorepo's hyper-strict config at the test boundary.

Neither finding represents meaningful technical debt. The package is a good example of the "deep module" philosophy: a small surface area that hides significant complexity (pool lifecycle, queue management, drain logic, error handling, transferable support) behind a simple three-method interface.
