# Migration Plan — playground app
This document describes a phased migration to align the `playground` app with the project's Architectural Blueprint (`/docs/architectural-blueprint.md`). It follows your instruction: skip stories and CSS modules (you use Tailwind), treat color conversion logic as generic (move to `utils`), and proceed with "Option B" — a detailed migration plan and documentation of changes in this repo's `docs` folder.

Target outcomes
- Enforce directory taxonomy: `core/`, `components/`, `hooks/`, `renderers/`, `services/`, `utils/`.
- Enforce naming conventions: kebab-case folders, PascalCase component files, camelCase for hooks/logic/utils, UPPER_SNAKE for constants, no `export default`.
- Component-per-folder pattern for UI components (but skip stories/CSS modules per your preference).
- Move pure, reusable helpers (e.g. color conversions) to `src/utils/`.
- Centralize React hooks into `src/hooks/` if reusable across components.

Scope (initial)
- App: `apps/playground/`
- Focus on files already identified during repo scan (representative list below).
- Migration will be conservative: create new files/folders and update imports; keep old files temporarily (or move with git history) until final verification.

Principles & rules applied
- Where Does It Go?
  - Utility Test → `utils/`
  - Domain/Business/Sequence logic → `core/`
  - React lifecycle/state → `hooks/`
  - Component UI → `components/` (component-per-folder)
- Naming:
  - Folders: kebab-case (e.g., `palettes-generator`)
  - Components: PascalCase file names and folder names (e.g., `ColorPicker/ColorPicker.tsx`)
  - Hooks / utils: camelCase (e.g., `useColorPicker.ts`, `colorConversions.ts`)
- Exports:
  - Named exports only. Add `index.ts` barrels that re-export named entities (no `export default`).
- No CSS module files/stories will be created per your instruction.

High-level phases
- Phase 0: Prep & safety
- Phase 1: Utils consolidation (color conversions + libs → `src/utils`)
- Phase 2: Hooks consolidation (`src/hooks/`)
- Phase 3: Component-per-folder reorganization (rename/move UI files)
- Phase 4: Barrels & import updates
- Phase 5: Tests, CI, cleanup, and rollback instructions

Phase 0 — Prep & safety
1. Create a migration branch, e.g.:
   - `git checkout -b chore/migrate-structure-playground`
2. Add this document to repository (path you requested): `playground/docs/migration-playground-structure.md`.
3. Ensure a working TypeScript build and tests baseline:
   - Run `pnpm -w build` or your monorepo's build/test command to have a baseline of failing counts.
4. Install/enable a refactoring helper if available (IDE or codemod). We will list all changes; you can approve before applying.

Phase 1 — Consolidate utils
Goal: move pure, reusable logic to `apps/playground/src/utils/` with camelCase filenames.

Planned file moves (representative)
- Move color conversion helpers:
  - From:
    - `apps/playground/src/components/colors/palettes-generator/lib/color-conversions.ts`
  - To:
    - `apps/playground/src/utils/colorConversions.ts`
  - Rename exported interfaces/types to PascalCase if they represent types (already done: `RGBColor`, `HSLColor` are fine).
  - Update call-sites to `import { RGBToHSL } from '@/utils/colorConversions';`
  - Rationale: color conversions pass the Utility Test (project-agnostic).
- Move other component-local `lib` files that are generic:
  - `apps/playground/src/components/particles/image-to-particles/lib/utils.ts` → `apps/playground/src/utils/imageParticleUtils.ts` (or split into small files as necessary)
- Move top-level `lib`:
  - `apps/playground/src/lib/math.ts` → `apps/playground/src/utils/math.ts` or `src/core/math.ts` depending on domain-specificity. You specified color conversions are agnostic and should be `utils`. For `math.ts`, decide per file content:
    - If generic (helpers) → `utils/math.ts`
    - If sequence/domain rules → `core/math.ts`
  - `apps/playground/src/lib/utils.ts` → `apps/playground/src/utils/*` (split appropriately)

Phase 1 tasks
- Create folder: `apps/playground/src/utils/` (kebab-case root exists; folder names inside are filenames)
- Move files, update exports to use named exports and camelCase filenames.
- Update import paths across repo to reference `@/utils/...`.

Phase 2 — Consolidate hooks
Goal: centralize reusable React state logic under `apps/playground/src/hooks/` using camelCase naming and `use` prefix.

Planned moves / renames (representative)
- `apps/playground/src/components/colors/palettes-generator/controls/color-picker/use-colorPicker.ts` → `apps/playground/src/hooks/useColorPicker.ts`
  - Rename file to `useColorPicker.ts`.
  - Ensure it only contains React-specific logic (DOM/canvas, useEffect, useRef). Keep functionality that can be factored out later as pure functions in `utils/`.
- `apps/playground/src/components/particles/image-to-particles/use-image-upload.ts` → `apps/playground/src/hooks/useImageUpload.ts`
- `apps/playground/src/components/colors/palettes-generator/palette-context.tsx`:
  - If this file exports a React Context + Provider and `usePaletteContext` hook, split as:
    - `apps/playground/src/hooks/usePaletteContext.ts` (the hook)
    - `apps/playground/src/components/PaletteProvider/PaletteProvider.tsx` (Provider component if UI-related)
  - Rationale: hooks (state) in `hooks/`, provider component in `components/` (if it's presentational/has JSX).

Phase 2 tasks
- Create `apps/playground/src/hooks/` and move/rename hook files.
- Ensure hooks are camelCase and start with `use`.
- Replace imports across components to point to `@/hooks/...`.

Phase 3 — Component-per-folder reorganization
Goal: apply component-per-folder pattern for UI components (skip stories & css modules).

Rules:
- Each UI component gets its own folder named in kebab-case? The blueprint says components follow Component-per-Folder pattern and component folders example used PascalCase for MyComponent folder. The Naming Conventions table said Folders: kebab-case. However the Component-Per-Folder blueprint example uses `components/MyComponent/` (PascalCase folder). To reconcile: follow the "Universal Naming Conventions"—folders must be kebab-case. We'll use kebab-case folders and PascalCase files inside them. Example: `components/color-picker/ColorPicker.tsx` with `index.ts` barrel that exports named component `ColorPicker`. This keeps folder naming consistent with the blueprint's "Folders: kebab-case" rule.
- Component filename is PascalCase. Barrel `index.ts` uses `export * from './ColorPicker';`.

Planned moves/renames (representative)
- `apps/playground/src/components/colors/palettes-generator/controls/color-picker/color-picker.tsx`
  - To:
    - `apps/playground/src/components/colors/palettes-generator/controls/color-picker/ColorPicker.tsx`
    - `apps/playground/src/components/colors/palettes-generator/controls/color-picker/index.ts` (barrel: `export * from './ColorPicker';`)
- `apps/playground/src/components/colors/palettes-generator/palette-display.tsx`
  - To:
    - `apps/playground/src/components/colors/palettes-generator/palette-display/PaletteDisplay.tsx`
    - `.../palette-display/index.ts`
- `apps/playground/src/components/mosaic/mosaic-maker/mosaic-maker.tsx`
  - To:
    - `apps/playground/src/components/mosaic/mosaic-maker/MosaicMaker.tsx`
    - `.../mosaic-maker/index.ts`
- `apps/playground/src/components/misc/piechart/piechart.astro` and `piechart.ts`:
  - Consolidate into:
    - `apps/playground/src/components/misc/piechart/PieChart.astro` (or `PieChart.tsx` if React)
    - `.../piechart/index.ts`
- `apps/playground/src/components/sequences/recaman/recaman.tsx` → `apps/playground/src/components/sequences/recaman/Recaman.tsx` with index barrel.

Notes about folder naming
- We'll prefer kebab-case for folders such as `color-picker`, `palette-display`, `mosaic-maker`, `piechart`.
- Inside each folder, the main component file will be `PascalCase.tsx` (e.g., `ColorPicker.tsx`).
- Barrel `index.ts` will re-export the named component. Example:
  - `export * from './ColorPicker';`

Phase 3 tasks
- Create new component folders and files (or `git mv` to preserve history).
- Update components to import hooks and utils from `@/hooks` and `@/utils` respectively.
- Maintain named exports.

Phase 4 — Barrels & import updates
Goal: create index barrels at appropriate levels and update imports to minimal paths.

Barrels to add (examples)
- For each component folder add `index.ts` re-exporting the main component.
- Consider adding `apps/playground/src/components/index.ts` that exports commonly used components (use with caution to avoid huge bundles in apps).
- Update imports across the codebase:
  - From relative paths like `../../lib/color-conversions` → `@/utils/colorConversions`.
  - From `../../controls/color-picker/color-picker` → `@/components/colors/palettes-generator/controls/color-picker`.

Automated import update approach
- Use a code-aware search-and-replace tool (TS language service or codemod) to rewrite imports. If not available, do a safe list + manual update:
  - 1) Grep for old paths (e.g., `color-conversions`, `use-colorPicker`, `palette-context`) and prepare replacements.
  - 2) Run TypeScript compile to identify broken imports.
  - 3) Fix remaining broken imports iteratively.

Phase 5 — Tests, CI, cleanup
- Run full build & tests, fix TypeScript errors.
- Remove old/duplicated files once everything is green.
- Commit changes in small logical commits:
  - `git mv` operations per file for history preservation.
  - Followed by import updates in a separate commit.
- Final PR description will include this document and a migration checklist.

File-by-file mapping (initial list)
- utils
  - `apps/playground/src/components/colors/palettes-generator/lib/color-conversions.ts` → `apps/playground/src/utils/colorConversions.ts`
  - `apps/playground/src/components/particles/image-to-particles/lib/utils.ts` → `apps/playground/src/utils/imageParticleUtils.ts` (or split)
  - `apps/playground/src/lib/utils.ts` → `apps/playground/src/utils/*`
  - `apps/playground/src/lib/math.ts` → decide `utils/math.ts` or `core/math.ts` (see notes)
- hooks
  - `apps/playground/src/components/colors/palettes-generator/controls/color-picker/use-colorPicker.ts` → `apps/playground/src/hooks/useColorPicker.ts`
  - `apps/playground/src/components/particles/image-to-particles/use-image-upload.ts` → `apps/playground/src/hooks/useImageUpload.ts`
  - `apps/playground/src/components/colors/palettes-generator/palette-context.tsx` → split:
    - `apps/playground/src/hooks/usePaletteContext.ts` (hook)
    - `apps/playground/src/components/palette-provider/PaletteProvider.tsx` (if a provider UI component is necessary)
- components (rename files only + add barrels)
  - `apps/playground/src/components/colors/palettes-generator/controls/color-picker/color-picker.tsx` → `apps/playground/src/components/colors/palettes-generator/controls/color-picker/ColorPicker.tsx` + `index.ts`
  - `apps/playground/src/components/colors/palettes-generator/palette-display.tsx` → `.../palette-display/PaletteDisplay.tsx` + `index.ts`
  - `apps/playground/src/components/mosaic/mosaic-maker/mosaic-maker.tsx` → `.../mosaic-maker/MosaicMaker.tsx` + `index.ts`
  - `apps/playground/src/components/misc/piechart/piechart.astro` → `.../piechart/PieChart.astro` + `index.ts`
  - `apps/playground/src/components/sequences/recaman/recaman.tsx` → `.../recaman/Recaman.tsx` + `index.ts`
- other
  - `apps/playground/src/constants/routes.ts` — this can remain as-is but ensure the file lives under `src/core/` if the constants are domain-specific, or `src/utils/` if they are generic. Recommendation: move `routes.ts` to `apps/playground/src/core/routes.ts` if they capture app routing rules.

Example import update (illustrative)
- Before:
  - `import { RGBToHSL } from '../../lib/color-conversions';`
- After:
  - `import { RGBToHSL } from '@/utils/colorConversions';`

Testing checklist
- Type-check: `pnpm -w -C apps/playground tsc --noEmit` (or your project TS command)
- Build: `pnpm -w build`
- Smoke test the UI in dev mode: `pnpm -w dev` or equivalent
- Run unit tests for the changed modules
- Lint: `pnpm -w lint`

Rollback plan
- Keep changes on a dedicated branch. If migration breaks unexpectedly:
  - `git reset --hard origin/main` or revert the PR.
  - Alternatively, revert commits in the migration branch.

Risk assessment & mitigations
- Risk: many import changes could miss some files → mitigation: run TypeScript compile and search for unresolved imports.
- Risk: name collisions after moving files → mitigation: prefer unique filenames and named exports; run linter/TypeScript checks.
- Risk: losing git history → mitigation: use `git mv` when possible. If moving across directories with different repo roots, consider `git mv` or `git log --follow` to inspect history.

Conventions to apply globally in this migration
- Folders: kebab-case (e.g., `palettes-generator`, `color-picker`)
- Components: PascalCase filenames inside kebab-case folder (e.g., `color-picker/ColorPicker.tsx`)
- Hooks & Utils: camelCase filenames and `use` prefix for hooks (e.g., `useColorPicker.ts`, `colorConversions.ts`)
- Exports: named exports only
- Context/providers: split hook logic into `hooks/` and provider-presentational component into `components/` (if the provider renders UI)

Deliverables once you approve
- A commit plan with per-file `git mv` and edits (I will prepare a patch or series of patches).
- A PR description and a checklist for reviewers.
- This migration document added at `playground/docs/migration-playground-structure.md` (this file).
- A short follow-up runbook describing commands and what to watch for during deployment.

Next steps (choose one)
- Approve this plan and I will produce the concrete list of git commands and a patch (I will create patches in small steps: utils → hooks → components → import updates), or
- Ask for a full repo inventory (detailed list of every file to move) before I produce patches.

If you approve, I will prepare the first patch (Phase 1) containing:
- `apps/playground/src/utils/colorConversions.ts` (moved & renamed)
- Import updates for modules referencing color conversions
- Tests/type-checks run and results reported

Tell me to proceed with Phase 1 or ask for more detail on any part of the plan.