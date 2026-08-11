---
title: Documenting a Package
description: Package docs are generated from the code — a simple README plus TSDoc comments, rendered by TypeDoc.
tags:
    - how-to
---

# Documenting a Package

A package's documentation has two halves, each maintained where it lives:

- **The README** (`packages/<name>/README.md`) — the concept: what the package
  is, why it exists, quick start, usage examples, gotchas. Keep it **simple and
  stable**; it is the local spec, not a changelog of the API.
- **The API reference** — generated from the code by TypeDoc reading **TSDoc
  comments** on exported symbols. This never drifts, because it is extracted
  from the source on every build.

The two are combined into a static HTML site per package and merged into the
docs at build time.

---

## 1. Write the README

Keep the README focused on what does **not** change with every refactor:

- `# @repo/<name>` title and a `> ` one-liner tagline.
- **Purpose** — why this package exists.
- **Quick Start** — install + first minimal example.
- **Usage Examples** — a few real-world snippets.
- **Patterns & Gotchas** — design decisions and pitfalls.

Do **not** maintain API inventory in the README (export tables, per-signature
walkthroughs) — TypeDoc generates that from the code, so it stays correct on
its own.

## 2. Document the code with TSDoc comments

Add TSDoc/`/** ... */` comments to exported symbols — the ones consumers touch:

- One-liner for functions, classes, and types.
- `@param` / `@returns` for non-obvious signatures.
- `@example` for tricky usage.
- `@internal` to hide internals, `@deprecated` to mark removals.

The quality of the generated reference is exactly the quality of these
comments.

## 3. Generate the docs

Add a `typedoc.json` (see `packages/glaze/typedoc.json` as the template) and a
`build:docs` script to the package, then run from the repo root:

```bash
pnpm build:docs
```

Each documented package emits static HTML into its own `dist-docs/` (cached by
Turborepo). TypeDoc embeds the README as the overview page.

## 4. Merge into the site

Add the package to `scripts/collect-static-assets.mjs` and run:

```bash
pnpm collect-assets
```

The generated docs land in the site at `/docs/api/<name>/` and are listed on
the [Package API Reference](../reference/packages/) page.

---

## Adding a new package

1. Write the README spec first (per the scaffold generator).
2. Add TSDoc comments to the exports.
3. Copy `packages/glaze/typedoc.json`, adjust `entryPoints` (the package's
   exported files), add `"build:docs": "typedoc"` and the `typedoc*`
   devDependencies (catalog).
4. Add the package to `scripts/collect-static-assets.mjs` and the reference
   index page.

---

## Maintenance

When a package's API changes, there is nothing to edit: the reference is
regenerated. Only update the README when the **concepts** change, and re-run:

```bash
pnpm build:docs && pnpm collect-assets
```

---

_See [Package API Reference](../reference/packages/) for the current docs._
