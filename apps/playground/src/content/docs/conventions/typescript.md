---
title: TypeScript
description: TypeScript style, performance rules, and coding principles.
tags:
    - conventions
    - reference
---

# TypeScript

## Type definitions

- **Do** use `type` over `interface`. This is enforced by ESLint (`@typescript-eslint/consistent-type-definitions`) repo-wide.
- **Do** use an intersection (`&`) anywhere you'd have reached for `extends`.
- A package can override this in its own ESLint config if it has a real reason to — but the default is `type`.

```ts
// ✅ Good
type Props = BaseProps & { label: string };

// ❌ Bad
interface Props extends BaseProps { label: string }
```

## Naming as specification

- **Do** make a name carry the whole concept. If you need to read the body to understand the name, rename it.
- **Do** match current reality rather than historical implementation details.
- **Do** group by domain taxonomy in folder structure (`cpu/`, `gpu/`), suffix by variant (`*Declarative`, `*Hybrid`).
- **Don't** mix high-level domain concepts with low-level mechanics in the same identifier.

## Clean code principles

- **Do** keep one idea per file or module (Single Responsibility).
- **Do** cut unused features or dead code that exist only "to be shown".
- **Do** extract shared helpers when a second real consumer appears — never build premature abstractions. Duplicate over abstract when in doubt.
- **Do** add comments only to explain _why_ (non-obvious decisions, constraints, pitfalls).
- **Don't** comment _what_ the code does — names and types carry that meaning.
- **Do** prefer small, declarative callbacks or hooks over manual imperative loops or boilerplate subscriptions.

## Structure

- **Do** layer dependencies: data → shared helpers → components. Each level depends only on the level below.
- **Do** keep alternative implementations of the same concept grouped together for direct comparison.

## Respect the codebase

- **Do** match existing repository conventions (formatting, imports, linting, file structure).
- **Don't** modify frozen public contracts or APIs without clear intent and communication.

## Performance

- **Do** throttle or debounce high-frequency inputs (resize, mouse, scroll) before layout calculations.
- **Do** use deterministic keys derived from data — no random keys.

## Verification

- **Do** always execute typechecks, linting, and relevant test/build commands before declaring a task complete.
