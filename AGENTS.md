# Playground

Monorepo with pnpm workspaces + Turborepo.

## Commands

Always run from repo root:

```bash
pnpm --filter @repo/<package> <cmd>
```

## Deep docs (on-demand, not always loaded)

- **Conventions (code)** → `./apps/playground/src/content/docs/explanation/conventions.md`
- **Engine architecture** → `./apps/playground/src/content/docs/explanation/engine.md`
- **Package documentation** → `./apps/playground/src/content/docs/how-to/documenting-packages.md`
- **Other docs** → `./apps/playground/src/content/docs/`

## Multi-Step Execution Protocol

When handling large or complex tasks, you must adhere to the following workflow:

1. **Plan First:** Do not jump into execution. Break the task down into distinct, sequential milestones.
2. **The Status Block:** At the beginning of _every_ response during a multi-step task, output a brief status update using this format:
   ```text
   [Goal]: <Brief objective of reminder the ultimate>
   [Progress]: [x] Step 1 | [/] Step 2 (In Progress) | [ ] Step 3
   ```
