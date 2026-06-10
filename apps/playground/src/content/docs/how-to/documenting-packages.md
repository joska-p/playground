---
title: 'Documenting a Package'
description: 'How to write package documentation — the README is the single source of truth.'
category: 'how-to'
tags:
  - how-to
---

# Documenting a Package

Every package's `README.md` is the **single source of truth** for its documentation.
It covers everything — consumer API, architecture, internals, gotchas.
The Astro site renders it automatically via the sync script.

## Before You Start

The package should already be scaffolded. See [Scaffolding Packages](./scaffolding-packages/) if it isn't.

## 1. Write the README

The README lives at `packages/<name>/README.md`. It documents both **consumer usage** and **contributor internals**.

### Template

```markdown
# @repo/<name>

> One-liner describing what the package does.

## Quick Start

\`\`\`bash
pnpm add @repo/<name>
\`\`\`

\`\`\`tsx
import { Component } from "@repo/<name>";

export default function Example() {
return <Component />;
}
\`\`\`

## Exports

| Export | Path | Description |
| ------ | ---- | ----------- |

## Architecture

Component tree, data flow, directory structure.

## Usage Examples

Longer contextual examples showing how the package is used in practice.

## Patterns & Gotchas

Key design decisions, edge cases, pitfalls to avoid.

## State Management (if applicable)

Store shape, actions, selectors.

## CSS Strategy (if applicable)

How styling works — CSS variables, Tailwind, theme tokens.

## Performance (if applicable)

Rendering considerations, memoization, debouncing.

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
```

Adapt the sections to what the package actually needs. Some packages may not need State Management, CSS Strategy, or Performance sections — omit them.

### Style guidelines

- Start with a `> ` tagline — the sync script uses it for the frontmatter `description` field.
- Use tables for API exports (name, path, description).
- Use ASCII diagrams or Markdown code blocks for architecture, not images.
- Named exports only (matches project convention).
- No emojis in section headings.

## 2. Sync to the Astro Site

Run from repo root:

```bash
pnpm --filter @repo/playground sync-package-docs
```

This copies the README into `src/content/docs/reference/packages/<name>.md`, wrapping it in frontmatter. The doc appears automatically in the sidebar under **Reference → Packages** and on the [docs index](/docs/).

**The sync script overwrites the reference doc.** Never edit `reference/packages/*.md` directly — all changes go in the README.

## 3. Verify

```bash
pnpm --filter @repo/playground build
pnpm --filter @repo/playground lint
pnpm --filter @repo/playground check-types
```

Check that:

- The doc appears in the sidebar under **Reference**
- The README renders cleanly on GitHub
- No broken internal links

## Maintenance

When the package's API or architecture changes:

1. Update the `README.md`.
2. Re-run the sync script.

That's it. One file to maintain, one command to publish.

### Pruning stale docs

If a package is removed from the repo, its reference doc becomes orphaned.
Clean it up:

```bash
pnpm --filter @repo/playground sync-package-docs -- --prune
```

### Adding a new package

1. Create `packages/<name>/README.md` following the template above.
2. Run the sync script — it detects new READMEs automatically.
3. If the package needs a custom display name in the sidebar title, add an entry to the `PACKAGE_NAMES` map in `scripts/sync-package-readmes.mjs`.
