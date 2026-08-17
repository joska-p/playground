# Playground

Monorepo pnpm + Turborepo | React 19 (Compiler: no `useMemo`/`useCallback`) useSyncExternalStore, useEffectEvent, useLayoutEffect stable now

## Core Rules & SSOT

- **Skills & Docs**: Official site documentation (`./apps/playground/src/content/docs/`) and skills are the Single Source of Truth (SSOT).
- **Language**: Code/docs in English. Creative conversation in French.
- **Workflow & Feedback Loop**: Small incremental patches, explain before coding, respect shell safety. Propose skill/doc updates after non-trivial tasks when recurring patterns emerge (ask human approval).

## Environment & Available CLI Tools

- **Code & File Exploration**: `rg` (ripgrep), `fd` (fd-find), `tree`, `jq`, `bat` are pre-installed. Prefer `rg` and `fd` over standard `grep`/`find` for faster project navigation.
- **Python Ecosystem**: Always use **`uv`** (`uv run`, `uv pip`, `uv tool`) to manage Python dependencies, run scripts, or execute tools. Avoid raw system `pip`.
