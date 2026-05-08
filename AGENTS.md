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
