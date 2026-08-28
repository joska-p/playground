---
title: Documenting a Package
description: Package docs are generated from code TSDoc comments and README files into a unified Astro content collection.
---

# Documenting a Package

Every package in `packages/*` receives documentation automatically. Each package carries a `typedoc.json` extending the shared base; packages with a public API add `entryPoints` (from `package.json` exports), readme-only packages set `"entryPoints": []`.

A package's documentation has two halves, each maintained where it lives:

- **The README** (`packages/<name>/README.md`) holds the concept: what the package is, why it exists, quick start, usage examples, gotchas.
- **The API reference** generates from TSDoc comments on exported symbols, rendered as anchored sections on the package's page.

---

## 1. The README

The README focuses on concepts that survive refactors:

- `# @repo/<name>` title and a `> ` one-liner tagline.
- **Purpose**, why the package exists.
- **Quick Start**, install plus first minimal example.
- **Usage Examples**, real-world snippets.
- **Patterns & Gotchas**, design decisions and pitfalls.

"The README ships as pure Markdown. Metadata (title, description, hasApp) derives directly from package.json. The build enforces this by warning if a --- frontmatter block is present."

---

## 2. TSDoc comments on exported symbols

Exported symbols carry TSDoc/`/** ... */` comments:

- One-liner for functions, classes, and types.
- `@param` / `@returns` for non-obvious signatures.
- `@example` for tricky usage.
- `@internal` hides internals, `@deprecated` marks removals.

---

## 3. Generation

From the repository root:

```bash
pnpm generate-typedoc-json
pnpm gen:project-pages
```

- `pnpm generate-typedoc-json` runs the `generate-typedoc-json` turbo root task (which executes `codex/ateliers/typedoc-pipeline/generate-typedoc-json.mjs`): TypeDoc runs once per package and writes `codex/ateliers/typedoc-pipeline/.generated/api-docs/<package-dir>/docs.json` (raw TypeDoc JSON, gitignored). Turbo caches it, decoupled from `astro build`; it runs before building or dev-ing the app.
- The custom content loader (`apps/playground/src/content/loaders/packages.ts`) reads each `docs.json`, merges the package README and `package.json` metadata (`description`, `hasApp`, `hasReference`), and serves the `packages` content collection, one entry per package.
- `pnpm gen:project-pages` rewrites a static Astro page at `apps/playground/src/pages/discoveries/<package-dir>.astro` for every package — a thin wrapper over the shared `DiscoveryLayout`. Existing pages stay untouched, so hand-tweaked pages survive regeneration.

The collection stands as the single source of truth, with no `index.json` or per-package route config involved.

---

## 4. Viewing the documentation

- `/discoveries/<package-dir>/` shows the application showcase (when `hasApp` is `true`), the README overview, and the API reference.
- The README renders as the `#overview` section; the API reference renders in the `#api` section with each exported symbol as an anchored section at `#symbol-<name>`, linked from the sidebar.

The URL derives from the package name (`<name>` minus the `@repo/` prefix). `title` and the URL stay decoupled, so a package renames in `package.json` while its page stays put.
