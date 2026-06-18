---
description: Write or update documentation following Diátaxis conventions
argument-hint: "[topic]"
---
Write documentation following the project's Diátaxis structure.

## Before writing

Read `./apps/playground/src/content/docs/how-to/documenting-packages.md` for package docs, or understand the four Diátaxis categories:

- **tutorial/** — Learning-oriented. Step-by-step, works every time, no surprises.
- **how-to/** — Task-oriented. Practical steps to achieve a specific goal.
- **explanation/** — Understanding-oriented. Background, context, discussion.
- **reference/** — Information-oriented. Accurate, complete descriptions.

## Content locations

- Package READMEs: `packages/<name>/README.md` (single source of truth)
- Astro docs pages: `apps/playground/src/content/docs/<category>/`

For package documentation, write the README and the Astro site will render it automatically via the sync script.
