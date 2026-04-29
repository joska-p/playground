## Stack & requirements

- **Node >=22.12.0**, pnpm@10.19.0 (auto-install-peers enabled)
- **Monorepo**: pnpm workspace with `apps/` (playground, storybook) and `packages/` (mosaic-maker, sequence-renderer, palette-generator, image-to-particles, ui, eslint-config, tailwind-config, typescript-config)
- **Build system**: Turborepo — `dev` and `preview` depend on `^build`, so `pnpm dev` builds workspace deps first
- **CI order**: type-check → lint → build (see `.github/workflows/deploy.yml`)

## Dev servers

- **Playground (Astro)**: `pnpm dev` → [localhost:4321](http://localhost:4321)
- **Storybook**: `pnpm --filter @repo/storybook dev` → [localhost:6006](http://localhost:6006)

## Quirks

- **No tests** — no test files or vitest/jest config exists; don't look for them
- **No CONTEXT.md or ADRs** — `docs/agents/domain.md` references them but they don't exist yet
- **Deploy**: `pnpm build` then copies `apps/storybook/storybook-static/` into `apps/playground/dist/storybook/` before deploy

## graphify

This project has a graphify knowledge graph at `graphify-out/`.

Rules:
- Before answering architecture or codebase questions, read `graphify-out/GRAPH_REPORT.md` for god nodes and community structure
- If `graphify-out/wiki/index.md` exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `pnpm graphify` to keep the graph current (AST-only, no API cost)

## Agent skills

### Issue tracker

Issues tracked on GitHub via `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.
