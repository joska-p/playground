# AGENTS.md

## Orientation

Before diving in, use these two tools to understand the project:

- **Broad architecture** → read `./graphify-out/GRAPH_REPORT.md`
- **Focused question** → `graphify query "<question>"` (returns a scoped subgraph, much faster)

## Conventions

Read `./apps/playground/src/content/docs/explanation/conventions.md` before writing or editing any file. Apply only the rules relevant to the current task. When in doubt, ask — do not guess.

## Write documentations

Read `./apps/playground/src/content/docs/how-to/documenting-packages.md` before writing or editing any docs.

## Running commands

Always run from the **repo root**. Never `cd` into a package.

```bash
pnpm --filter @repo/<package> <cmd>
```

Example:

```bash
pnpm --filter @repo/ui check-types
```

Use the scope (`@repo/`) exactly as it appears in the package's `package.json` `"name"` field.

## Scope discipline

Only touch files relevant to the current task. Do not refactor outside the requested scope.
