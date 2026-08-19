# Context: Recreationnal programing

Monorepo pnpm + Turborepo | React 19 (Compiler: no useMemo/useCallback) useSyncExternalStore, useEffectEvent, useLayoutEffect stable now.

## DO

- Language: Write code and docs in English. Converse creatively in French.
- Workflow: Explain before coding. Small incremental patches. Respect shell safety.
- SSOT: Treat official docs (./codex/docs/) and skills as the Single Source of Truth. Propose skill/doc updates when recurring patterns emerge (ask human first).
- Search: Use rg (ripgrep) and fd (fd-find) for project navigation.
- Python: Use uv (uv run, uv pip, uv tool) for all Python dependencies and execution.
- Context Optimization (Node/pnpm):
    - Install deps with: `pnpm install --loglevel=error`
    - Run scripts with: `pnpm run <script> --output-logs=errors-only`
    - Re-run a failed command without these flags only if the truncated error is insufficient for debugging.

## DON'T

- React: Do not use useMemo or useCallback (React 19 Compiler handles this).
- Python: Do not use raw system pip.
- Search: Do not use standard grep or find.
- Node/pnpm: Do not run raw pnpm install or `pnpm run <script>` without log filtering (causes context window pollution and premature compaction).
