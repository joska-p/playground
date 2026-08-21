---
name: stores
description: Use when writing or editing Zustand stores, store actions, state slices, or getter selectors.
---

# Stores (The Bridge)

State splits cleanly: TanStack Query owns server data, Zustand holds client state, and plain async functions orchestrate through `getState()` / `setState()`. Getter hooks select slices; the raw store stays private to its module.

The single source of truth stands at `/workspaces/playground/codex/docs/conventions/state.md`. Its facts govern every store edit.
