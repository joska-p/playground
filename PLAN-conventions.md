# Convention Standardization Plan ✅

> All items completed 2026-06-16. See final summary below.

## Decisions Made

### 1. File Naming Rule

**Proposal**: Keep the existing rule "filename matches primary export" but clarify the casing:

| Export type      | Convention                    | Example                                  |
| ---------------- | ----------------------------- | ---------------------------------------- |
| React components | PascalCase (exact match)      | `Button.tsx` exports `Button`            |
| Hooks            | camelCase (exact match)       | `useSomething.ts` exports `useSomething` |
| Everything else  | kebab-case of the export name | `define-manip.ts` exports `defineManip`  |

This is what the codebase largely does already — just need to enforce it consistently.

### 2. Factory Function Naming

Pick ONE pattern per semantic bucket:

| Pattern   | Used for                     | Examples to keep                                  |
| --------- | ---------------------------- | ------------------------------------------------- |
| `create*` | Object instantiation         | `createGrid`, `createSeededRandom`, `createIcon`  |
| `define*` | Type-safe config definitions | `defineManip`, `defineGrammarRule`, `defineLayer` |
| `parse*`  | String → data conversion     | `parseRule`, `parseGraph`, `parseNumericValue`    |
| `build*`  | Assembly from existing parts | `buildTree`, `buildGridUniforms`, `buildOutput`   |

**Needs renaming** (don't fit any bucket):

| Current                  | Proposed                | Reason                         |
| ------------------------ | ----------------------- | ------------------------------ |
| `factoryRule()`          | `createRule()`          | A factory, reads backwards     |
| `creatureFactory()`      | `createCreature()`      | Simple factory                 |
| `visualisationFactory()` | `createVisualization()` | Factory + British spelling fix |
| `variantFactory()`       | `createVariant()`       | Simple factory                 |
| `paletteFactory()`       | `createPalette()`       | Object creation                |

### 3. `store/` vs `stores/`

**Proposal**: Plural `stores/` everywhere (5 packages already use it).

Needs migration:

- `packages/palette-generator/src/store/` → `stores/palette/`
- `packages/sequence-renderer/src/store/` → `stores/sequence/`

### 4. British spelling outlier

**Proposal**: American English throughout.

- `visualisationFactory` → `createVisualization` (handled in rename above)
- Also check if `visualisation` appears in types, comments, or docs

### 5. Type file naming

**Proposal**: `types.ts` everywhere (majority convention).

Outliers to migrate:

- `harmonyRule.types.ts` → `types.ts`
- `image-pipeline.types.ts` → `types.ts`
- `palette-types.ts` → `types.ts`
- `types.d.ts` → `types.ts`

### 6. Barrel file extensions

**Proposal**: No `.ts` extensions in `import` paths.

Files to fix:

- `image-manipulator/src/stores/manipulator/selectors/index.ts`
- `mosaic-maker/src/stores/mosaic/selectors/index.ts`

### 7. `lib/` vs `utils/`

**Proposal**: `utils/` for utility/helper functions, `lib/` for third-party wrappers or initialization code.

Keep both in `ui` (they serve distinct purposes). Migrate `three-stage/lib/` → `utils/`.

### 8. `core/` vs `data/` directory

**Proposal**: `core/` for all pure domain/engine logic. `data/` reserved for static data files only.

`core/` is already well-established (12/14 packages use it). The only issue is `graph-viz`:

- `graph-viz/src/data/` contains **processing code** (pipeline.ts, stages/, schema) — belongs in `core/pipeline/`
- `radu-machine-learning/src/data/` contains **actual JSON data files** — legitimate use, keep as-is

Note: `graph-viz/src/data/` mix of `.ts` code and `.d.ts` types means this is processing logic, not data. The types it defines should also move to `core/pipeline/types.ts`.

---

## Execution Order

### Phase 1: Convention doc update

- Update `conventions.md` with the clarified rules above
- Gets merged first so new code follows the standard

### Phase 2: Package-by-package renames

Each package gets its own pass to avoid import breakage across packages:

1. `sequence-renderer` — consolidation test case (`factoryRule`, `visualisationFactory`, `store/` → `stores/`, barrel extensions)
2. `automa` — `creatureFactory` → `createCreature`
3. `ui` — `variantFactory` → `createVariant`
4. `mosaic-maker` — `paletteFactory` → `createPalette`, `palette-types.ts` → `types.ts`, barrel extensions
5. `image-pipeline` — `image-pipeline.types.ts` → `types.ts`
6. `palette-generator` — `store/` → `stores/`, `harmonyRule.types.ts` → `types.ts`
7. `graph-viz` — `src/data/` → `src/core/pipeline/`, `types.d.ts` → `types.ts`
8. `three-stage` — `lib/` → `utils/`
9. `randomart` — no changes needed (already mostly aligned)

### Phase 3: Verification

- Run `pnpm check-types` across all packages
- Run `pnpm lint` across all packages
- Run `pnpm test` across all packages
