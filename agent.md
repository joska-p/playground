# Agent Instructions: Project Creative Playground

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `pnpm graphify` to keep the graph and the playground visualization current (AST-only, no API cost)

## Context
This is an experimental creative coding lab and monorepo. The primary goal is to provide a "Stateless First" playground for complex visualizations ("Engines") integrated into a high-performance Astro shell.

## Tech Stack
- TypeScript / Node.js (>= 22.12.0)
- Environment: Nix (Mandatory shell via `nix develop`)
- Frameworks: Astro (Shell/Layouts), React 19 (Engines)
- Styling: Tailwind CSS v4 + CVA
- Logic: Zustand (State), Graphify (Knowledge Graph)

## Rules & Standards
- **Nix First**: Run all commands via `nix develop --command <cmd>` unless direnv is active.
- **Stateless First**: Use Astro for structural UI; reserve React for domain-specific "Engines" in `packages/`.
- **URL as State**: Sync UI state to URL SearchParams for shareability.
- **Component Pattern**: Follow component-per-folder: `src/components/Name/` (inc. `.stories.tsx`).
- **Graphify Workflow**: Read `graphify-out/GRAPH_REPORT.md` for context; run `pnpm graphify` after any code change.
- **Verification**: UI changes MUST be verified in Storybook (`apps/storybook`).
- **Branch Strategy**: 
  - ALWAYS perform work on the `develop` branch. 
  - NEVER push directly to `main` unless explicitly instructed for a production release.
- **Environment Logic**:
  - `astro.config.mjs` uses `process.env` (Node.js) for environment detection.
  - Use `Boolean(process.env.VERCEL)` for Vercel detection and `Boolean(process.env.GITHUB_ACTIONS)` for GitHub Pages.
  - DO NOT use `import.meta.env` inside `astro.config.mjs`; it is not available in that context.
- **Turborepo Awareness**:
  - If modifying environment-related logic, ensure `turbo.json` includes the relevant variables (`VERCEL`, `GITHUB_ACTIONS`) in `globalEnv` to prevent cache poisoning.
  - 
## 🤖 Agent Protocol (For AI Agents)

AI Agents **MUST** follow these rules to ensure consistency and safety:

1.  **Context Discovery**:
    -   Before suggesting architectural changes, read `graphify-out/GRAPH_REPORT.md`.
    -   Use `pnpm graphify` (powered by [**graphifyy**](https://github.com/joska-p/graphifyy)) after code changes to keep the knowledge graph current.
2.  **Surgical Execution**:
    -   Apply minimal, targeted changes. Do not perform unrelated refactoring.
    -   Adhere to naming conventions and file structures strictly.
3.  **Planning Protocol**:
    -   For features or bug fixes, provide a **Plan** (including testing strategy) before execution.
    -   Use `enter_plan_mode` for complex tasks involving multiple files or architectural decisions.
4.  **Verification**:
    -   A task is only complete when verified. Run relevant build/lint/test commands.
    -   Always check for and update related stories and documentation.

## Skills

This project includes specialized skills in `.agents/skills/`. When working on tasks matching these domains, load the skill using: `skill(name: "skill-name")`

- **frontend-design**: Production-grade UI/React components
- **vercel-react-best-practices**: React/Next.js performance optimization
- **vercel-composition-patterns**: React compound components & composition
- **vercel-react-native-skills**: React Native & Expo best practices
- **vercel-react-view-transitions**: View Transition API usage
- **turborepo**: Monorepo/turborepo configuration
- **documentation-writer**: Diátaxis documentation framework
- **web-design-guidelines**: Web accessibility & UX audit
- **find-skills**: Discovering additional skills
- **graphify**: Knowledge graph exploration
