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

## Storybook

When working on UI components, always use the `storybook-mcp-server` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from a design system (including common-sounding ones like `shadow`, etc.), you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `list-all-documentation` to get a list of all components
- Query `get-documentation` for that component to see all available properties and examples
- Only use properties that are explicitly documented or shown in example stories
- If a property isn't documented, do not assume properties based on naming conventions or common patterns from other libraries. Check back with the user in these cases.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories. This will ensure you follow current conventions and recommendations.
- Check your work by running `run-story-tests`.

Remember: A story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.
