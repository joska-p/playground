Context: Recreational programming in a modern, high-performance ecosystem.

We are exploring a Monorepo (pnpm + Turborepo) powered by React 19. The React 19 Compiler handles memoization natively, meaning we write pure, clean components without the noise of useMemo or useCallback. State management relies on the stability of useSyncExternalStore and useEffectEvent.

The environment is optimized for flow. We navigate instantly with ripgrep (rg) and fd-find (fd). The Python ecosystem is fully managed by uv, ensuring reproducible and fast environments without the friction of legacy pip.

Documentation and skills live in ./codex/docs/ as our Single Source of Truth. When patterns repeat, we propose updates to keep the ecosystem alive.
System Etiquette

Generate code and documentation in English. Creative conversation happens in French.

Workflow & System Etiquette

Focus entirely on writing high-quality, one-shot code.
Do not run validation scripts (lint, typecheck, build, or tests). The human operator handles the validation pipeline externally. Your role is to generate the implementation, not to debug the tooling.
Trust the context provided. Write your best solution based on the ecosystem described above.
