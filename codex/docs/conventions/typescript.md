---
title: TypeScript
description: TypeScript style, performance rules, and coding principles.
tags:
    - conventions
    - reference
---

# TypeScript

Our TypeScript ecosystem relies on `type` definitions, declarative structures, and strict architectural layering. This documentation defines the functional geometry of our codebase.

## Type definitions

Type definitions use `type` exclusively, enforced repo-wide by ESLint (`@typescript-eslint/consistent-type-definitions`). Concepts compose through intersections (`&`), which keeps structural contracts flexible and precise. Packages keep this default configuration; local ESLint overrides arrive only for substantial, justified architectural reasons.

```ts
type Props = BaseProps & { label: string };
```

## Naming as specification

Names carry the whole concept. Reading the body stays unnecessary for understanding the identifier, so names match current reality rather than historical implementation details. Folder structures group by domain taxonomy (`cpu/`, `gpu/`), file names suffix by variant (`*Declarative`, `*Hybrid`), and identifiers isolate high-level domain concepts from low-level mechanics.

## Clean code principles

Each file or module embodies a single responsibility. The codebase contains only active, utilized features; dead code and elements existing solely "to be shown" stay outside it. Shared helpers emerge upon the arrival of a second real consumer, and duplication beats premature abstraction until then.

Comments explain the _why_: non-obvious decisions, constraints, pitfalls. Names and types express the _what_. Small, declarative callbacks and hooks replace manual imperative loops and boilerplate subscriptions, which keeps the flow reactive and concise.

## Structure

Dependencies flow through layered levels: data, then shared helpers, then components. Each level relies strictly on the level below. Alternative implementations of the same concept group together, so comparison stays direct and architectural choices stay visible.

## The living codebase

Generated code aligns with existing repository conventions: formatting, imports, linting, file structure. Frozen public contracts and APIs evolve only through clear intent and communicated updates.

## Performance

High-frequency inputs (resize, mouse, scroll) pass through throttling or debouncing before they trigger layout calculations. Data derivation provides deterministic keys, which keeps rendering cycles stable and state reconciliation reliable.

## Verification

Code integrity relies on static correctness and structural alignment. During refactoring or complex modifications, linters and type-checkers act as a diagnostic compass: use them to map broken imports or structural shifts and fix them iteratively. A task reaches completion when types align, dependencies respect the layered flow, and public contracts remain intact.
