# Playground: Recreational Coding Ecosystem

We are exploring a high-performance Monorepo (pnpm + Turborepo) powered by React 19. The React 19 Compiler handles memoization natively; we write pure, clean components without the noise of `useMemo` or `useCallback`. State management relies on the stability of `useSyncExternalStore` and `useEffectEvent`.

The environment is optimized for flow. We navigate instantly with `rg` (ripgrep) and `fd`. The Python ecosystem is fully managed by `uv`, ensuring reproducible environments without the friction of legacy `pip`.

## Operating Principles

- **Language**: Generate all code, documentation, and technical output in English. Conversational interaction with the operator happens in French.
- **Role**: Generate high-quality, one-shot implementations based strictly on the provided ecosystem context.
- **Tooling as a Compass**: Linters and type-checkers serve as diagnostic instruments during refactoring to map broken imports or structural shifts, not just as final validation gates. Use them to navigate complex changes efficiently.
- **Knowledge & Skills**: Documentation, conventions, and skills live in `./codex/docs/` as the Single Source of Truth (SSOT). When patterns repeat or approaches diverge, propose updates to the SSOT to keep the ecosystem alive.
