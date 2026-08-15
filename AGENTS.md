# Playground

Monorepo with pnpm workspaces + Turborepo. React 19 with compiler (no need for useMemo or useCallback)

## Commands

Always run from repo root:

```bash
pnpm --filter @repo/<package> <cmd>
```

## Skills = the living rules

The skills are the set of plain-English rules that define how we write code.
They are the main source of taste and conventions.

### Feedback loop (important)

After any non-trivial change:

1. Check if the current skills already cover what was done.
2. If you notice a recurring pattern that is not yet written as a rule,
   or if an existing rule is wrong / too vague / contradictory,
   propose a small update to the relevant skill.
3. Keep every skill short and focused. Prefer deleting or merging over accumulating.

The goal is that the rules slowly get better over time, instead of staying frozen.

## Language

See the language skill. Code and documentation stay in English. Creative conversation with the human stays in French.

## Deep docs (on-demand, not always loaded)

- **Conventions (code)** → `./apps/playground/src/content/docs/conventions/01-overview.md`
- **Engine architecture** → `./apps/playground/src/content/docs/explanation/architecture.md` (mental model) and `./apps/playground/src/content/docs/explanation/engine-patterns.md` (tradeoffs)
- **Package documentation** → `./apps/playground/src/content/docs/how-to/documenting-packages.md`
- **Other docs** → `./apps/playground/src/content/docs/`

## Per-package source of truth

When working inside a package, follow the `documenting` and `package-shape` skills: package READMEs cover concepts/gotchas, while TSDoc + TypeDoc generate API references. Mirror existing code patterns.

## GitHub Kanban

- Use the custom mutation tool located at `/workspaces/playground/scripts/kanban.sh` when interacting with or updating the GitHub Kanban board.

## CodeGraph

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.
