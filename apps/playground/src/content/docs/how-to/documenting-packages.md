---
title: Documenting a Package
description: Package docs are generated centrally from code TSDoc comments and README files into a unified Astro content collection.
tags:
    - how-to
---

# Documenting a Package

Every package in `packages/*` automatically receives documentation — no opt-out required, and no per-package TypeDoc configuration needed.

A package's documentation has two halves, each maintained where it lives:

- **The README** (`packages/<name>/README.md`) — the concept: what the package is, why it exists, quick start, usage examples, gotchas.
- **The API reference** — generated centrally by TypeDoc from **TSDoc comments** on exported symbols.

---

## 1. Write the README

Keep the README focused on concepts that do not change with every refactor:

- `# @repo/<name>` title and a `> ` one-liner tagline.
- **Purpose** — why this package exists.
- **Quick Start** — install + first minimal example.
- **Usage Examples** — real-world snippets.
- **Patterns & Gotchas** — design decisions and pitfalls.

---

## 2. Document the code with TSDoc comments

Add TSDoc/`/** ... */` comments to exported symbols:

- One-liner for functions, classes, and types.
- `@param` / `@returns` for non-obvious signatures.
- `@example` for tricky usage.
- `@internal` to hide internals, `@deprecated` to mark removals.

---

## 3. Generate documentation and project pages

From the repository root, run:

```bash
pnpm build-docs
pnpm gen:project-pages
```

- `pnpm build-docs` runs TypeDoc centrally across all packages and generates Markdown entries and `index.json` into `apps/playground/src/content/api/`.
- `pnpm gen:project-pages` generates static Astro pages at `/discoveries/<id>/` for every project and package.

---

## 4. Viewing your documentation

Navigate to `/discoveries/<id>/` (e.g. `/discoveries/ui/` or `/discoveries/glaze/`) to view the application showcase (if present), the README overview, and the interactive API reference with sticky anchor navigation.
