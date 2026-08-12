# Package Documentation Prompt (reusable)

Copy this into a fresh session for EACH package. Replace `<PACKAGE_NAME>` with
the package directory name under `packages/` (e.g. `randomart-engine`). Do one
package per session.

---

## Mission

Document the package `packages/<PACKAGE_NAME>` using the repo's documentation
system. This is a **single-package** task: do not touch, build, or regenerate
docs for any other package.

## The system (established, working, do NOT redesign)

Each documented package has two documentation halves:

1. **README** (`packages/<pkg>/README.md`) — the *concept*: what/why, quick
   start, usage examples, gotchas. It must stay simple and stable — it is the
   local spec, not an API inventory.
2. **API reference** — generated from source by **TypeDoc** reading TSDoc
   (`/** */`) comments on exported symbols. It never drifts because it is
   extracted from code on every build.

The flow: `packages/<pkg>/typedoc.json` → `pnpm build:docs` (turbo) → static
HTML in `packages/<pkg>/dist-docs/` (README embedded as the overview page) →
`pnpm collect-assets` merges it into the site at `/docs/api/<pkg>/`.

**Reference implementation — study these first (they are the template):**
- `packages/glaze/typedoc.json` — the config to copy and adapt (React variant).
- `packages/randomart-engine/typedoc.json` — the non-React variant (`@types/node` mapping).
- `packages/art-canvas/typedoc.json` — the app-package variant: one entry point
  (a single component export), README rewritten to concept-only, plus a stale
  `./styles` exports-map path fixed to `global.css`.
- `packages/glaze/package.json` — the `build:docs` script + `typedoc*` devDependencies.
- `scripts/collect-static-assets.mjs` — where a package gets registered.
- `apps/playground/src/content/docs/reference/packages.md` — the index page
  listing documented packages.
- `apps/playground/src/content/docs/how-to/documenting-packages.md` — the guide.

> **Glaze is the *config* template, not a style authority.** The repo's jsdoc
> lint is deliberately loose (anti-noise): the rules that forced `@param`/
> `@returns` on every function and no-blank-line blocks are disabled in
> `packages/config-eslint`. Keep comments minimal; the package's own files set
> the style.

## Steps

1. **Read the package.** `packages/<PACKAGE_NAME>/package.json` (exports map),
   `tsconfig*.json`, `README.md`, and the `src/` tree. Identify the **public
   exports** — the files behind the `exports` map (exclude `.css` and any
   `docs/`, demo, or test files). If there's no exports map, use the single
   entry file (e.g. `src/index.ts`).
   - **Validate every exports-map target exists on disk.** Stale paths are
     common: a `./styles` → `./src/styles/styles.css` that points at the file
     renamed to `global.css`, or a `./Demo` pointing at a renamed component
     (present in `automa`, `fracture`, `l-system`, `oeis-signal`,
     `radu-machine-learning`, `real-life`). Fix the path in the exports map —
     a missing target is a bug, in scope, and TypeDoc/README accuracy both
     depend on the map being true. `entryPoints` list the *fixed* paths.

2. **Create `typedoc.json`.** Copy `packages/glaze/typedoc.json`; set
   `entryPoints` to the exported source files **in exports-map order** (explicit
   list, as glaze does — do NOT use `entryPointStrategy: "expand"` over
   `src/**`); set `tsconfig` to the config that compiles `src` — if the root
   `tsconfig.json` is a solution file (`files: []` + references) use the
   referenced `tsconfig.app.json` / `tsconfig.lib.json`; if it `include`s `src`
   directly (extends `@repo/config-typescript/*`), point TypeDoc at it as-is
   (e.g. `l-system-engine` uses `./tsconfig.json`); keep `out`, `readme`,
   `theme`, `plugin`, and the exclude flags identical to glaze. Adapt
   `externalSymbolLinkMappings` to the ambient/external module the package
   actually references (glaze maps `@types/react`; a non-React package usually
   wants `@types/node` instead — see `randomart-engine`). Run
   `pnpm --filter @repo/<PACKAGE_NAME> build:docs` once here to confirm the
   toolchain before writing any comments.

3. **Add `build:docs`.** In `packages/<PACKAGE_NAME>/package.json`: add
   `"build:docs": "typedoc"` to `scripts` and the three devDependencies
   `typedoc`, `typedoc-plugin-missing-exports`, `typedoc-theme-hierarchy`
   (all `catalog:`). Run `pnpm install` afterwards — it updates
   `pnpm-lock.yaml`, which is expected.

4. **Audit + improve TSDoc comments** on the *public exports* (classes,
   functions, types, exported consts, props):
   - One-liner for each exported symbol; `@param`/`@returns` only where the
     signature is non-obvious; `@example` for tricky usage; `@internal` to
     hide internals; `@deprecated` when relevant.
   - Keep it minimal (the jsdoc lint is deliberately loose — see note above):
     a comment that only repeats the signature is noise. No `{type}` in tags
     (`jsdoc/no-types` is on). Wrap at ~100 cols, sentence case, backticks
     around identifiers.
   - `@link` only to symbols in this package — cross-package links would dangle.
   - Re-exported types from other packages (e.g. `@repo/pixel` re-exporting
     engine types) land in `_internal_` — leave them alone, they are the owning
     package's job to document.
   - Match the existing comment style in the file — do not add comments to
     internal/private code. Only what consumers see needs documenting.
   - Keep the diff minimal: fix/extend comments, don't refactor code.

5. **Simplify the README** so it stays stable:
   - Keep the **whole shell**: frontmatter, the `> tagline`, and the footer.
   - Keep: Purpose, Quick Start, Usage Examples, Patterns & Gotchas.
   - **Remove**: API inventory — export tables, per-signature walkthroughs,
     file-by-file API lists (TypeDoc now owns these).
   - **Verify accuracy, not just links**: every import path in a README example
      must exist in the package's exports map — no bare root import
      (`@repo/<pkg>` alone) unless a `"."` export exists; drop stale counts
      (e.g. "19 built-in rules") and filenames that no longer exist. Use the
      export's actual name and form — e.g. `@repo/art-canvas/art-canvas` is a
      *named* `{ App }`, never a default import. The exports map may split
      functions and types across subpaths (e.g. `l-system-engine`'s `./engine`
      vs `./types`) — import each from its own subpath, never invent a root
      export.
   - **Drop stale *sections*, not just links**: a "Testing" block referencing a
     `test` script the package doesn't have (or a made-up test count, e.g. "38
     tests") is fabricated — delete it. Only document what actually exists.
   - The README may describe a *different* or older API — if its names don't
     appear in the exports map at all, rewrite the concept sections, not just
     the import paths. Only document what the exports map exposes: internal
     hooks and sub-components must be dropped as imports, not described as
     package APIs.
   - Fix any links that point to the old `/docs/reference/packages/<other>/` —
      repoint cross-package mentions to the other package's new generated docs
      (relative `../../api/<other>/` from the reference index) or to the
      package's GitHub path.
   - **App/demo packages** (exports map like `./<name>` → one component plus
      `./styles`): the public surface is usually a single named component (e.g.
      `@repo/art-canvas/art-canvas` exports `{ App }`). The README's
      deep-internals inventory — pipeline diagrams, module/template/mood/palette
      tables, store walkthroughs — is still API inventory even though nothing
      there is exported: drop it, and keep a prose description of *what the app
      does* (its modes, controls) plus the one embed example. `entryPoints` is
      then that single file and the generated reference is tiny — expected, not
      a sign of failure. The `> tagline` and concept sections usually survive
      verbatim; only the inventory goes.

6. **Register the package:**
   - Add `['packages/<PACKAGE_NAME>/dist-docs', 'docs/api/<PACKAGE_NAME>']` to
      `targets` in `scripts/collect-static-assets.mjs` (keep entries sorted
      **alphabetically by source path** — e.g. `packages/art-canvas/...` before
      `packages/glaze/...`, `packages/pixel/...` before
      `packages/pixel-manipulator/...`).
   - Add a row to the table in
      `apps/playground/src/content/docs/reference/packages.md` (also sorted
      alphabetically by package name — `@repo/art-canvas` before
      `@repo/glaze`).

7. **Verify (all from repo root):**
   ```bash
   pnpm --filter @repo/<PACKAGE_NAME> build:docs   # dist-docs generated, 0 errors
   pnpm --filter @repo/<PACKAGE_NAME> check-types
   pnpm --filter @repo/<PACKAGE_NAME> lint-fix     # auto-fix style, then:
   pnpm --filter @repo/<PACKAGE_NAME> lint         # must be clean (the gate)
   pnpm --filter @repo/playground check-types      # content schema still valid
   pnpm --filter @repo/playground lint
   pnpm --filter @repo/playground build            # full site builds
   pnpm collect-assets                             # run LAST — build wipes dist/, docs must land in the final dist
   ```
   - Spot-check `packages/<PACKAGE_NAME>/dist-docs/index.html`: README is the
     overview (grep for the tagline), exports are documented (the exported
     symbol's HTML page), no dangling `@link`s.
   - `_internal_` modules in `dist-docs/` are expected — the
     `typedoc-plugin-missing-exports` plugin pulls referenced lib types (e.g.
     `Blob`) and re-exported types; glaze has them too. Don't try to remove
     them.
   - Aim for 0 TypeDoc **errors**; a React package will always emit the
     `JSXElementConstructor` warning from `@types/react`'s own defs — 0 errors
     and 1 warning is a pass. Note it and move on.

## Rules

- Only `packages/<PACKAGE_NAME>`, the two registration files
  (`collect-static-assets.mjs`, `reference/packages.md`), and the lockfile
  (`pnpm-lock.yaml`, from `pnpm install`) may change. If the package's README
  or code needs fixes, that's in scope — other packages are not.
- Never hand-edit `dist-docs/` (generated, gitignored).
- Never re-run `pnpm build:docs` / `collect-assets` for other packages.
- The lint gate ("lint clean") forces fixing pre-existing failures in the
  package — run `lint` before editing to know the baseline. Common traps when
  fixing them:
  - `jsdoc/require-param-description` fires on `@param` tags that exist but
    lack a description (the shared config keeps this one from
    `recommended-typescript-error`; `lint-fix` won't fix it). Fix aligned with
    the anti-noise style: **remove** the empty `@param` tag — the one-liner
    description carries the meaning (`jsdoc/require-param` is off, so no tag
    is fine). Keep a `@param` only when it genuinely clarifies a non-obvious
    parameter.
  - `no-unnecessary-condition` flags defensive `??`/`?.`/`if (x)` on values the
    types say are always defined — remove the guard, preserving a genuine
    runtime invariant with a length/count check, never a cast.
  - The type-noise rule bans `prop?: T | undefined`; with
    `exactOptionalPropertyTypes` you can't just drop `| undefined`. Fix: keep
    the prop optional and omit the key / use conditional spread
    (`...(x && { x })`) — never required `prop: T | undefined`.
- Follow repo conventions: read `AGENTS.md`; load the `coding-style` skill
  before editing code; the package's README + existing code are the local spec.
- Keep the README's `> tagline` and structure; just remove the API inventory.
- If the package has subpath exports like `./types`, `./core/...`, list each
  exported file in `entryPoints` (explicit, matching the exports map).
- Don't add comments/emoji/preamble unless the task needs it; be surgical.

## Definition of done

- `typedoc.json` + `build:docs` + devDeps in place; `pnpm install` done.
- `pnpm build:docs` produces `dist-docs/` with the README as the index.
- Public exports have TSDoc comments (minimal one-liners); README is
  concept-only, accurate, and stable.
- Package registered in `collect-static-assets.mjs` and the reference index.
- All commands in the Verify section pass (lint-fix run before lint; lint clean).
- No other package was modified.
