---
description: Review code following playground conventions
argument-hint: "[path or glob]"
---
Review the code at the given path against the project conventions.

## Before reviewing

Read `./apps/playground/src/content/docs/explanation/conventions.md` first to apply the correct conventions.

## Focus areas

- Architecture violations (three-layer unidirectional flow: core → stores → components)
- Package `src/` structure violations (files in wrong directories)
- Naming and clarity
- Missing or incorrect error handling
- React anti-patterns (no `useEffect` for data fetching, no business logic in components)
- State initialization (always provide sensible defaults)
- Unused exports, dead code
- Import style consistency (prefer `import type`)

## Report format

Summarize findings grouped by severity: **blocking** (must fix before merge), **warning** (should fix), **nit** (nice to have).
