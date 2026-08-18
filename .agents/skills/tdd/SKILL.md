---
name: tdd
description: "Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions 'red-green-refactor', or wants integration tests."
disable-model-invocation: true
---

# Test-Driven Development

TDD is the red → green loop. This skill makes that loop produce tests worth keeping.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. A good test reads like a specification and survives refactors because it doesn't care about internal structure.

## Seams — where tests go

A **seam** is the public boundary you test at. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, confirm the seams with the user.

Ask: "What's the public interface, and which seams should we test?"

## Anti-patterns

- **Implementation-coupled** — mocks internals, tests private methods, verifies through a side channel. The tell: breaks on refactor without behavior change.
- **Tautological** — assertion recomputes expected value the way the code does. Expected values must come from an independent source of truth.
- **Horizontal slicing** — all tests first, then all implementation. Work in **vertical slices** instead — one test → one implementation → repeat.

## Rules of the loop

- **Red before green.** Write the failing test first, then only enough code to pass it.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactoring is not part of the loop.** It belongs to code review, not the red → green cycle.
