---
title: Coding Style
description: Core philosophy, naming conventions, clean code principles, and codebase respect.
tags:
    - conventions
    - reference
---

# Coding Style

## Contents

- [Naming as Specification](#naming-as-specification)
- [Clean Code Principles](#clean-code-principles)
- [Structure for Understanding](#structure-for-understanding)
- [Respect the Codebase](#respect-the-codebase)
- [Verification](#verification)

## Naming as Specification

- **A name carries the whole concept**: If you need to read the body to understand the function or variable name, rename it.
- **Self-documenting names**: Match current reality rather than historical implementation details.
- **Domain taxonomy as folder structure**: Group by category (`cpu/`, `gpu/`), suffix by variant (`*Declarative`, `*Hybrid`).
- **Single abstraction layer**: Do not mix high-level domain concepts with low-level mechanics in the same identifier.

## Clean Code Principles

- **Single Responsibility**: One idea per file or module.
- **Eliminate bloat**: Cut unused features or dead code that exist only "to be shown".
- **Extract shared logic on real duplicate usage**: Extract shared helpers when a second real consumer appears, but never build premature abstractions. Duplicate over abstract when in doubt.
- **High-value comments**: Add comments only to explain *why* (non-obvious decisions, constraints, pitfalls). Never comment *what* the code does — names and types carry that meaning.
- **Declarative mechanisms**: Prefer small, declarative callbacks or hooks over manual imperative loops or boilerplate subscriptions.

## Structure for Understanding

- **Layered Abstraction**: Data → shared helpers → components. Each level depends only on the level below.
- **Side-by-side implementations**: Keep alternative implementations of the same concept grouped together so they can be compared directly.

## Respect the Codebase

- Match existing repository conventions (formatting, imports, linting, file structure).
- Do not modify frozen public contracts or APIs without clear intent and communication.

## Verification

- Always execute typechecks, linting, and relevant test/build commands before declaring a task complete.
