# Playground

Monorepo with pnpm workspaces + Turborepo. React 19 with compiler (no need for useMemo or useCallback)

## Commands

Always run from repo root:

```bash
pnpm --filter @repo/<package> <cmd>
```

## Deep docs (on-demand, not always loaded)

- **Conventions (code)** → `./apps/playground/src/content/docs/conventions/01-overview.md`
- **Engine architecture** → `./apps/playground/src/content/docs/explanation/engine.md`
- **Package documentation** → `./apps/playground/src/content/docs/how-to/documenting-packages.md`
- **Other docs** → `./apps/playground/src/content/docs/`

## Per-package source of truth

When working inside a package, its **README + existing code are the local spec**:
mirror the patterns the code already shows (exports, naming, structure, testing,
gotchas) and keep the README accurate — it is part of the contract. The global
`coding-style` skill supplies the general technique; this repo's docs and code
supply the specifics. Follow the same pattern when building a new package:
write the README as the local spec before the code.

## CodeGraph

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.
