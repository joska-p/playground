---
title: "Documenting a Package"
description: "How to write package-level documentation that works on GitHub and the Astro site."
category: "how-to"
tags:
  - how-to
---

# Documenting a Package

Every package in this repo has two documentation surfaces: a thin README on GitHub/npm and a deep reference doc on the Astro site. This guide walks through the process end-to-end.

## Before You Start

The package should already be scaffolded. See [Scaffolding Packages](./scaffolding-packages/) if it isn't.

## 1. Write the Thin README

The `README.md` at the package root is for **GitHub/npm browsing context** — identity, install, minimal usage, and a link to the full docs online.

Template:

```markdown
# @repo/<name>

> One-liner describing what the package does.

## Quick Start

```bash
pnpm add @repo/<name>
```

```tsx
import { Component } from "@repo/<name>/Component";

export default function Example() {
  return <Component />;
}
```

---

Full reference: [/docs/reference/packages/<name>/](/docs/reference/packages/<name>/)

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
```

The README should be **15–25 lines** at most. No architecture diagrams, no API tables, no state management internals — those go in the reference doc on the site.

## 2. Bootstrap the Reference Doc

Run the sync script to generate an initial reference doc from the README:

```bash
pnpm --filter @repo/playground sync-package-docs
```

This creates `src/content/docs/reference/packages/<name>.md` with frontmatter and the README content.
The file appears automatically in the docs sidebar (under **Reference → Packages**) and on the [docs index](/docs/).

## 3. Curate the Reference Doc

Open the generated file at `src/content/docs/reference/packages/<name>.md` and add depth:

- **Architecture** — how the package is structured (component tree, data flow)
- **API reference** — exported components, hooks, utilities, with signatures
- **Key patterns** — state management approach, CSS strategy, gotchas
- **Usage examples** — longer, contextual examples beyond the README snippet

The reference doc is the canonical home for everything that doesn't fit in the thin README. It can use MDX for interactive components (see [`design-tokens.mdx`](/docs/reference/design-tokens/) for an example).

## 4. Link from Related Docs

If the package is referenced by an existing explanation, how-to, or tutorial, add a link:

- **Explanation**: add a "Package Reference" paragraph that points to the new reference doc
- **How-to guides**: if the package is a prerequisite, mention it early and link

## 5. Verify

```bash
pnpm --filter @repo/playground build
pnpm --filter @repo/playground lint
pnpm --filter @repo/playground check-types
```

Check that:
- The new reference doc appears in the sidebar under **Reference**
- The README renders cleanly on GitHub (no broken relative links)
- Links between the README and the reference doc resolve correctly

---

## Maintenance

When the package's API or architecture changes:

1. Update the README (keep it thin — update the link, one-liner, or usage snippet)
2. Update the reference doc with the deeper changes
3. **Do not** duplicate content — if something belongs in the README, don't also write it in the reference doc, and vice versa

The sync script (`sync-package-docs`) is available if you ever want to re-bootstrap from the README, but it overwrites any manual curation. Use it as a one-time bootstrap, not a regular update step.
