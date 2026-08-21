---
name: package-shape
description: Use when designing a new package, organizing src/ directories, structuring data flow, or deciding where logic, state, and components belong.
---

# Package Shape & Architecture

Every package follows one shape at three zoom levels: events flow Screen → Bridge → Logic and results flow back; pluggable behavior becomes definitions → registry → engine core; a Bridge is an unexported store with getter/setter pairs.

The single sources of truth stand at `/workspaces/playground/codex/docs/explanation/architecture.md`, `/workspaces/playground/codex/docs/explanation/engine-patterns.md`, and `/workspaces/playground/codex/docs/conventions/packages.md`. Their facts govern every structural decision.
