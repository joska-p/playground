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
- `packages/glaze/typedoc.json` — the config to copy and adapt.
- `packages/glaze/package.json` — the `build:docs` script + `typedoc*` devDependencies.
- `scripts/collect-static-assets.mjs` — where a package gets registered.
- `apps/playground/src/content/docs/reference/packages.md` — the index page
  listing documented packages.
- `apps/playground/src/content/docs/how-to/documenting-packages.md` — the guide.

## Steps

1. **Read the package.** `packages/<PACKAGE_NAME>/package.json` (exports map),
   `tsconfig*.json`, `README.md`, and the `src/` tree. Identify the **public
   exports** — the files behind the `exports` map (exclude `.css` and any
   `docs/`, demo, or test files). If there's no exports map, use the single
   entry file (e.g. `src/index.ts`).

2. **Create `typedoc.json`.** Copy `packages/glaze/typedoc.json`; set
   `entryPoints` to the exported source files (explicit list, as glaze does —
   do NOT use `entryPointStrategy: "expand"` over `src/**`); set `tsconfig` to
   the lib/app tsconfig that compiles `src` (usually `./tsconfig.json` if it's
   not composite, else the `.lib` one); keep `out`, `readme`, `theme`,
   `plugin`, and the exclude flags identical to glaze.

3. **Add `build:docs`.** In `packages/<PACKAGE_NAME>/package.json`: add
   `"build:docs": "typedoc"` to `scripts` and the three devDependencies
   `typedoc`, `typedoc-plugin-missing-exports`, `typedoc-theme-hierarchy`
   (all `catalog:`). Run `pnpm install` afterwards.

4. **Audit + improve TSDoc comments** on the *public exports* (classes,
   functions, types, props):
   - One-liner for each exported symbol; `@param`/`@returns` where non-obvious;
     `@example` for tricky usage; `@internal` to hide internals; `@deprecated`
     when relevant.
   - Match the existing comment style in the file — do not add comments to
     internal/private code. Only what consumers see needs documenting.
   - Keep the diff minimal: fix/extend comments, don't refactor code.

5. **Simplify the README** so it stays stable:
   - Keep: Purpose, Quick Start, Usage Examples, Patterns & Gotchas.
   - **Remove**: API inventory — export tables, per-signature walkthroughs,
     file-by-file API lists (TypeDoc now owns these).
   - Fix any links that point to the old
     `/docs/reference/packages/<other>/` — repoint cross-package mentions to
     the other package's new generated docs (relative `../../api/<other>/` from
     the reference index) or to the package's GitHub path.

6. **Register the package:**
   - Add `['packages/<PACKAGE_NAME>/dist-docs', 'docs/api/<PACKAGE_NAME>']` to
     `targets` in `scripts/collect-static-assets.mjs` (keep entries sorted).
   - Add a row to the table in
     `apps/playground/src/content/docs/reference/packages.md`.

7. **Verify (all from repo root):**
   ```bash
   pnpm --filter @repo/<PACKAGE_NAME> build:docs   # dist-docs generated, 0 errors
   pnpm --filter @repo/<PACKAGE_NAME> check-types
   pnpm --filter @repo/<PACKAGE_NAME> lint
   pnpm --filter @repo/<PACKAGE_NAME> lint-fix
   pnpm collect-assets                             # dist/docs/api/<pkg>/ present
   pnpm --filter @repo/playground check-types      # content schema still valid
   pnpm --filter @repo/playground lint
   pnpm --filter @repo/playground build            # full site builds
   ```
   - Spot-check `packages/<PACKAGE_NAME>/dist-docs/index.html`: README is the
     overview, exports are documented, no dangling `@link`s.
   - Aim for 0 TypeDoc warnings; if a warning comes from an external library's
     own type defs (e.g. `@types/react`), note it and move on.

## Rules

- Only `packages/<PACKAGE_NAME>` and the two registration files
  (`collect-static-assets.mjs`, `reference/packages.md`) may change. If the
  package's README or code needs fixes, that's in scope — other packages are not.
- Never hand-edit `dist-docs/` (generated, gitignored).
- Never re-run `pnpm build:docs` / `collect-assets` for other packages.
- Follow repo conventions: read `AGENTS.md`; load the `coding-style` skill
  before editing code; the package's README + existing code are the local spec.
- Keep the README's `> tagline` and structure; just remove the API inventory.
- If the package has subpath exports like `./types`, `./core/...`, list each
  exported file in `entryPoints` (explicit, matching the exports map).
- Don't add comments/emoji/preamble unless the task needs it; be surgical.

## Definition of done

- `typedoc.json` + `build:docs` + devDeps in place; `pnpm install` done.
- `pnpm build:docs` produces `dist-docs/` with the README as the index.
- Public exports have TSDoc comments; README is concept-only and stable.
- Package registered in `collect-static-assets.mjs` and the reference index.
- All commands in the Verify section pass.
- No other package was modified.
