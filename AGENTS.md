# AGENTS.md

## Orientation

Before diving in, use these two tools to understand the project:

- **Broad architecture** → read `GRAPH_REPORT.md`
- **Focused question** → `graphify query "<question>"` (returns a scoped subgraph, much faster)

## Conventions

Read `CONVENTIONS.md` at the repo root before writing or editing any file.
Apply only the rules relevant to the current task. When in doubt, ask — do not guess.

## Running commands

Always run from the **repo root**. Never `cd` into a package.

```bash
pnpm --filter @repo/<package> <cmd>
```

Example:

```bash
pnpm --filter @repo/ui build
```

Use the scope (`@repo/`) exactly as it appears in the package's `package.json` `"name"` field.

## Scope discipline

Only touch files relevant to the current task. Do not refactor outside the requested scope.
