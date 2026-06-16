# AGENTS.md

## Orientation

Before diving in, use these tools to understand the project:

- **Broad architecture** → read `./graphify-out/GRAPH_REPORT.md`
- **Focused question** → `graphify query "<question>"` (returns a scoped subgraph, much faster)
- **Dead code / Clean up** → Use the root-level tool `fallow` to check for unused files, exports, or dependencies before refactoring.

## Conventions & Rules (Read On-Demand Only)

To save tokens, do not scan these files upfront. Only open them when triggered by the current task:

- **Modifying/Writing Source Code:** Read `./apps/playground/src/content/docs/explanation/conventions.md`. Apply _only_ the rules relevant to the task
- **Creating/Editing Documentation:** Read `./apps/playground/src/content/docs/how-to/documenting-packages.md`.
- **Rules/Engine/View Pattern:** Read `./apps/playground/src/content/docs/explanation/engine.md`
- **Looking for information not in the precedent files:** Search in the docs `./apps/playground/src/content/docs/`

## Running Commands

Always run from the **repo root**. Never `cd` into a package.[cite: 1]

```bash
pnpm --filter @repo/<package> <cmd>
```
