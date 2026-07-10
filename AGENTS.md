# Playground

Monorepo with pnpm workspaces + Turborepo.

## Commands

Always run from repo root:

```bash
pnpm --filter @repo/<package> <cmd>
```

## Deep docs (on-demand, not always loaded)

- **Conventions (code)** → `./apps/playground/src/content/docs/conventions/conventions/*.md`
- **Engine architecture** → `./apps/playground/src/content/docs/explanation/engine.md`
- **Package documentation** → `./apps/playground/src/content/docs/how-to/documenting-packages.md`
- **Other docs** → `./apps/playground/src/content/docs/`

## CodeGraph

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.
