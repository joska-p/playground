# Monorepo Improvement Progress

## Phase 1: Orchestration Fix (Immediate)
- [x] Standardize Turbo Names (Update `turbo.json` with `@repo/` prefixes)
- [x] Unify Build Scripts (Add `build` script to packages)
- [x] Align Module Types (Add `"type": "module"` to `@repo/ui`)

## Phase 2: Pipeline Optimization
- [x] Refine Task Inputs/Outputs in `turbo.json`
- [x] Optimize Dev Mode Orchestration

## Phase 3: Developer Experience (DX)
- [x] Implement Source-First Development (Internal Packages pattern)
- [x] Global Linting/Formatting check

## Phase 4: Build Stability & ESM Fixes
- [x] Fix missing `.js` extensions in ESM package entry points
- [x] Resolve deep import issues by migrating to root package exports
- [x] Simplify `turbo.json` build pipeline
