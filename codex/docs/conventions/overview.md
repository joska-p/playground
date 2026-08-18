---
title: Conventions — Overview
description: Cross-cutting coding rules used across the project — naming, structure, and patterns.
featured: true
tags:
    - conventions
    - reference
---

# Conventions

- [Packages](/docs/conventions/packages/) — directory layout, public API, imports/exports, naming
- [State](/docs/conventions/state/) — data fetching, state initialization, Zustand stores
- [Validation](/docs/conventions/validation/) — Zod validation, schema co-location
- [Errors](/docs/conventions/errors/) — ErrorBoundary, absence patterns
- [UI Components](/docs/conventions/ui/) — CSS tokens, responsive layout, dynamic colors
- [TypeScript](/docs/conventions/typescript/) — type definitions, coding principles, performance
- [Documentation](/docs/conventions/documentation/) — README concepts, TSDoc API generation

Write code that reads like a sentence. Prefer clarity over brevity, but cut every unnecessary word.

Most of what's in these docs is a hard rule — cross-cutting consistency here saves
more time than the flexibility would be worth. A few sections are
genuinely thresholds or judgment calls rather than bright lines; those are
called out explicitly as **guideline** instead of **rule**.

For the shape a package's internals tend to follow (Logic/Bridge/Screen,
definitions/registry), see [Architecture](/docs/explanation/architecture/)
and [Engine Patterns](/docs/explanation/engine-patterns/).
