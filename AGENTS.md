# Playground

Monorepo with pnpm workspaces + Turborepo.

## Start of session

Read `.agents/skills/project-knowledge/` — this is the curated knowledge base with architecture, conventions, patterns, and gotchas accumulated across sessions.

## Commands

Always run from repo root:

```bash
pnpm --filter @repo/<package> <cmd>
```

## Deep docs (on-demand, not always loaded)

- **Graph report** → `./graphify-out/GRAPH_REPORT.md` (full codebase graph)
- **Graph query** → `graphify query "<question>"` (scoped subgraph)
- **Conventions (code)** → `./apps/playground/src/content/docs/explanation/conventions.md`
- **Engine architecture** → `./apps/playground/src/content/docs/explanation/engine.md`
- **Package documentation** → `./apps/playground/src/content/docs/how-to/documenting-packages.md`
- **Other docs** → `./apps/playground/src/content/docs/`

## Prompt templates

Type `/` in the pi editor for:
`/build`, `/dev`, `/check`, `/review`, `/package`, `/docs`, `/graph`, `/add-package`, `/fallow`
