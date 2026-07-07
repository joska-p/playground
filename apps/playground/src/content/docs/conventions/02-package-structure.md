---
title: Package src/ Structure
description: The directory layout a package tends to follow inside src/.
tags:
  - conventions
  - reference
---

# Package `src/` Structure

## Contents

- [Layout](#layout)
- [Notes](#notes)

## Layout

**Guideline.** Every package tends toward a consistent directory layout
inside `src/`:

| Directory     | Purpose                                                                                 | Example                       |
| ------------- | --------------------------------------------------------------------------------------- | ----------------------------- |
| `core/`       | Pure domain logic, algorithms, types. No React, no side effects.                        | `core/grid.ts`, `core/rules/` |
| `components/` | React components. One file per component.                                               | `components/Button.tsx`       |
| `stores/`     | Zustand stores, each in its own domain subdirectory.                                    | `stores/simulation/`          |
| `hooks/`      | React hooks.                                                                            | `hooks/useResizeObserver.ts`  |
| `utils/`      | Pure helper functions.                                                                  | `utils/cn.ts`                 |
| `lib/`        | Third-party wrappers or initialization code (rare, only when wrapping an external lib). | `lib/variants/`               |

## Notes

- `core/` is for code that could run in any context — no React, no DOM, no store imports.
- `data/` is reserved for **static data files only** (JSON, images, etc.), never for code modules.
- `utils/` is the default home for helpers. Use `lib/` only when wrapping a third-party library (initialization, adapter pattern). Most packages should not have `lib/`.
- Avoid top-level files in `src/` — everything belongs in a subdirectory.
- If a `core/` domain grows beyond ~200 lines, split into a subdirectory: `core/parser/`, `core/rules/`, etc.

The 200-line figure and the `lib/` vs `utils/` line are both judgment
calls, not measured thresholds — if a package has a good reason to put a
same-purpose wrapper in `lib/` at 50 lines, or keep `core/` flat past 200,
that's a legitimate call, not a violation.
