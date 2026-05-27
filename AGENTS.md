## AGENTS.md

Purpose

- Enforce running package-scoped pnpm commands from repo root.
  Rule (use exactly)

```
pnpm --filter @repo/<package> <cmd>
```

Example:

```
pnpm --filter @repo/ui build
```

Recommendations

- Always run from repository root; do not cd into packages.
- Use the scope (`@repo/`) exactly as in package.json "name".

# Agent rules

Before writing or editing any file, read CONVENTIONS.md at the repo root.

Apply only the rules relevant to the current task. Do not refactor
files outside the scope of the current request.

When in doubt about a convention, ask — do not guess.
