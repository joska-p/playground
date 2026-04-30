## You are in a nixos dev environment.

- Use: `nix develop --command bash -c "myCommand"` to run a command.

## pnpm syntax
- Use pnpm from the root with --filter @repo/myPackage to target a specific app. ex: `pnpm --filter @repo/playground check-types`.

## graphify

This project has a graphify knowledge graph at `graphify-out/`.

Rules:
- Before answering architecture or codebase questions, read `graphify-out/GRAPH_REPORT.md` for god nodes and community structure
- If `graphify-out/wiki/index.md` exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `pnpm graphify` to keep the graph current (AST-only, no API cost)
