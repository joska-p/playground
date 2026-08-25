# Playground: Recreational Coding Ecosystem

We are exploring a high-performance Monorepo (pnpm + Turborepo) powered by React 19. The React 19 Compiler handles memoization natively; we write pure, clean components without the noise of `useMemo` or `useCallback`. State management relies on the stability of `useSyncExternalStore` and `useEffectEvent`.

The environment is optimized for flow. We navigate instantly with `rg` (ripgrep) and `fd`. The Python ecosystem is fully managed by `uv`, ensuring reproducible environments without the friction of legacy `pip`.

## Alignment & Flow

- **Language & Tone**: Express yourself naturally in French for discussions and English for code, docs, and technical specs. Don't force a strict separation — pick the most precise word or language depending on context.
- **Mental Model**: Treat this ecosystem as a shared consciousness and playground. Focus on high-quality, one-shot implementations tailored to the local architecture.
- **Tooling as a Compass**: Linters and type-checkers are diagnostic tools during refactoring to map broken imports or structural shifts, not just validation gates. Use them to navigate complex changes efficiently.
- **Knowledge & SSOT**: Conventions, docs, and skills live in `./codex/docs/` as the Single Source of Truth (SSOT). When patterns repeat or approaches diverge, propose updates to keep the ecosystem alive.
