# Fallow Codebase Report

**Date:** 2026-06-10
**Config:** [.fallowrc.json](.fallowrc.json)
**Fallow Version:** 2.89.0
**Schema Version:** 7

---

## Summary

| Metric                       | Count                         |
| ---------------------------- | ----------------------------- |
| **Total Issues (dead-code)** | **59**                        |
| Unused files                 | 5                             |
| Unused exports               | 33                            |
| Unused types                 | 13                            |
| Unused dependencies          | 2                             |
| Unresolved imports           | 1                             |
| Duplicate exports            | 1                             |
| Unused catalog entries       | 4                             |
| **Code Duplication**         | **16.55%** (2494/15067 lines) |
| Clone groups                 | 18                            |
| Clone instances              | 81                            |
| **Health Hotspots**          | **31 files**                  |
| Large functions              | 31                            |
| High-priority targets        | 2                             |

---

## By Workspace

### apps/playground

#### Unused Files

- `public/katex.css` — CSS file unreachable from entry points
  - **Suggestion:** Delete or import via an entry point

#### Unused Exports (6)

| Export              | File                                            | Line | Suggestion                    |
| ------------------- | ----------------------------------------------- | ---- | ----------------------------- |
| `Point`             | `src/components/data-viz/pie-chart/PieChart.ts` | 5    | Remove unused type export     |
| `CATEGORY_METADATA` | `src/data/docs.ts`                              | 13   | Remove or inline              |
| `CATEGORY_METADATA` | `src/data/notebook.ts`                          | 6    | Remove or inline              |
| `getTagMetadata`    | `src/data/notebook.ts`                          | 27   | Remove unused function export |
| `getFeaturedNotes`  | `src/data/notebook.ts`                          | 43   | Remove unused function export |
| `CATEGORIES`        | `src/data/projects.ts`                          | 11   | Remove or inline              |

#### Unused Dependencies

- `zod` in `package.json` — declared but only imported by `packages/mosaic-maker`
  - **Suggestion:** Move `zod` to `packages/mosaic-maker/package.json`

---

### apps/storybook

#### Unresolved Imports

- `/src/main.tsx` in `index.html` (line 1) — absolute path import not resolvable
  - **Suggestion:** Fix the import specifier or configure path resolution

---

### packages/automa

#### Unused Files

- `src/components/controls/ColorPicker.tsx` — component file unreachable from entry points
  - **Suggestion:** Either import it in a parent component or delete

#### Unused Exports (12)

| Export             | File                                       | Line | Suggestion                    |
| ------------------ | ------------------------------------------ | ---- | ----------------------------- |
| `MAX_COLS`         | `src/core/config.ts`                       | 16   | Remove unused config constant |
| `MAX_ROWS`         | `src/core/config.ts`                       | 17   | Remove unused config constant |
| `registerCreature` | `src/core/creature/registry.ts`            | 54   | Remove unused registration fn |
| `createEmptyGrid`  | `src/core/grid.ts`                         | 16   | Remove unused utility         |
| `registerRule`     | `src/core/rules/registry.ts`               | 24   | Remove unused registration fn |
| `registerShader`   | `src/core/shaders/registry.ts`             | 34   | Remove unused registration fn |
| `pause`            | `src/stores/simulation/actions.ts`         | 192  | Remove unused store action    |
| `play`             | `src/stores/simulation/actions.ts`         | 194  | Remove unused store action    |
| `setGrid`          | `src/stores/simulation/actions.ts`         | 196  | Remove unused store action    |
| `useGrid`          | `src/stores/simulation/selectors/index.ts` | 3    | Remove unused re-export       |
| `setRunning`       | `src/stores/ui/actions.ts`                 | 43   | Remove unused store action    |
| `setSpeedMs`       | `src/stores/ui/actions.ts`                 | 46   | Remove unused store action    |

#### Unused Types (2)

| Type              | File                             | Line | Suggestion              |
| ----------------- | -------------------------------- | ---- | ----------------------- |
| `SimulationState` | `src/stores/simulation/store.ts` | 31   | Remove `export` keyword |
| `UiState`         | `src/stores/ui/store.ts`         | 33   | Remove `export` keyword |

#### Unused Dependencies

- `leva` in `package.json` — declared but only imported by `packages/three-stage`
  - **Suggestion:** Move `leva` to `packages/three-stage/package.json`

#### Complexity Hotspots

| File                                              | Score | Trend        |
| ------------------------------------------------- | ----- | ------------ |
| `src/core/config.ts`                              | 1.9   | cooling      |
| `src/core/step.ts`                                | 1.9   | cooling      |
| `src/components/controls/RuleSelector.tsx`        | 2.1   |              |
| `src/components/controls/ShaderPropsControls.tsx` | 1.9   | cooling      |
| `src/components/controls/PlaybackControls.tsx`    | 1.7   | accelerating |
| `src/components/controls/SpeedSlider.tsx`         | 1.4   | cooling      |
| `src/stores/ui/store.ts`                          | 1.9   | stable       |
| `src/stores/simulation/store.ts`                  | 0.9   | cooling      |
| `src/core/creature/builtin.ts`                    | 0.0   | cooling      |
| `src/core/creature/registry.ts`                   | 1.2   | cooling      |

---

### packages/graph-viz

#### Unused Exports (1)

| Export    | File                        | Line | Suggestion                   |
| --------- | --------------------------- | ---- | ---------------------------- |
| `PALETTE` | `src/components/palette.ts` | 3    | Remove unused palette export |

#### Unused Types (2)

| Type           | File                      | Line | Suggestion              |
| -------------- | ------------------------- | ---- | ----------------------- |
| `Spherical`    | `src/components/types.ts` | 63   | Remove `export` keyword |
| `ThreeContext` | `src/components/types.ts` | 70   | Remove `export` keyword |

#### Large Functions

| Function        | File                           | Lines |
| --------------- | ------------------------------ | ----- |
| `GraphViz`      | `src/components/GraphViz.tsx`  | 184   |
| `EdgeLines`     | `src/components/EdgeLines.tsx` | 94    |
| `NodeMesh`      | `src/components/NodeMesh.tsx`  | 75    |
| `NodePanel`     | `src/components/NodePanel.tsx` | 70    |
| `makeWorkerSrc` | `src/components/workerSrc.ts`  | 89    |

---

### packages/image-manipulator

#### Unused Exports (3)

| Export          | File                                | Line | Suggestion                 |
| --------------- | ----------------------------------- | ---- | -------------------------- |
| `getImageData`  | `src/core/image-data.ts`            | 23   | Remove unused utility      |
| `setOutputs`    | `src/stores/manipulator/actions.ts` | 112  | Remove unused store action |
| `setProcessing` | `src/stores/manipulator/actions.ts` | 113  | Remove unused store action |

#### Unused Types (1)

| Type                 | File                                           | Line | Suggestion              |
| -------------------- | ---------------------------------------------- | ---- | ----------------------- |
| `CompareSliderProps` | `src/components/output/CompareSlider/index.ts` | 2    | Remove unused re-export |

#### Complexity Hotspots

| File                                                      | Score                | Trend   |
| --------------------------------------------------------- | -------------------- | ------- |
| `src/components/output/Output.tsx`                        | 2.4                  | cooling |
| `src/components/upload/ImageSourceControls.tsx`           | 2.1                  | cooling |
| `src/components/layout/ControlSection.tsx`                | 2.0                  | stable  |
| `src/components/workflow/WorkflowList.tsx`                | 1.9                  | stable  |
| `src/components/workflow/WorkflowControls.tsx`            | 1.9                  | cooling |
| `src/components/workflow/WorkflowNodeHeader.tsx`          | 1.9                  | stable  |
| `src/components/layout/Controls.tsx`                      | 1.2                  | cooling |
| `src/components/output/ImageLightbox.tsx`                 | 1.4                  | cooling |
| `src/components/layout/ImageManipulator.tsx`              | 1.3                  | stable  |
| `src/components/workflow/WorkflowNodeControls.tsx`        | 0.3                  | stable  |
| `src/core/manipulations/manipulations.ts`                 | 1.1                  | cooling |
| `src/components/output/CompareSlider/CompareSlider.tsx`   | 0.5                  | cooling |
| `src/components/output/CompareSlider/useCompareSlider.ts` | large fn (123 lines) |         |
| `src/components/workflow/WorkflowStepArgSlider.tsx`       | 0.7                  | cooling |
| `src/components/output/OutputCard.tsx`                    | large fn (76 lines)  |         |
| `src/components/output/Outputs.tsx`                       | large fn (69 lines)  |         |
| `src/components/upload/UploadZone/useUploadZone.ts`       | large fn (62 lines)  |         |

---

### packages/image-pipeline

#### Unused Exports (5)

| Export              | File                                        | Line | Suggestion                      |
| ------------------- | ------------------------------------------- | ---- | ------------------------------- |
| `generateTestImage` | `src/components/pipeline-docs/helpers.ts`   | 89   | Remove unused test helper       |
| `INTERNAL_SECTIONS` | `src/components/pipeline-docs/manipData.ts` | 430  | High-priority: 50% dead exports |
| `NEIGHBOR_MANIPS`   | `src/components/pipeline-docs/manipData.ts` | 431  | High-priority: 50% dead exports |
| `PIXEL_MANIPS`      | `src/components/pipeline-docs/manipData.ts` | 432  | High-priority: 50% dead exports |
| `WHOLE_MANIPS`      | `src/components/pipeline-docs/manipData.ts` | 433  | High-priority: 50% dead exports |

#### Code Duplication — Highest in repo

**File: `EndpointView.tsx`** — 4 clone groups, 64 duplicated lines
| Group | Instances | Lines | Pattern |
|-------|-----------|-------|---------|
| Section headers + description | 5 | 12 | Repeated `if (id === '...')` pattern with identical layout |
| Section headers + border boxes | 5 | 20 | Same structural pattern with different accent colors |
| Parameter table rows | 3 | 19 | Repeated table row structure |
| Resize/contrast param rows | 3 | 13 | Nearly identical JSX |

**File: `manipData.ts`** — 1 clone group, 38 duplicated lines

- 4 instances of very similar manipulation config objects
- **Suggestion:** Extract a factory function for manipulation definitions

**`vite.config.ts` across 9 packages** — 15 duplicated lines (entire file identical)

- `automa`, `image-manipulator`, `image-pipeline`, `image-to-particles`, `mosaic-maker`, `palette-generator`, `radu-machine-learning`, `sequence-renderer`, `three-stage`
- **Suggestion:** Create a shared Vite config package or Turborepo pipeline

**Neighborhood manipulations:** `box-blur.ts`, `gaussian-blur.ts`, `sharpen.ts` — 19 lines, 3 instances

- **Suggestion:** Extract common `defineNeighbor` boilerplate

**Pixel manipulations (batch 1):** `brightness.ts`, `contrast.ts`, `opacity.ts` — 8 lines, 3 instances
**Pixel manipulations (batch 2):** `hue-rotate.ts`, `saturation.ts`, `threshold.ts` — 7 lines, 3 instances

- **Suggestion:** Extract `definePixel` boilerplate factory

**Whole-image manipulations:** `flip-horizontal.ts`, `flip-vertical.ts`, `rotate-90cw.ts` — 17 lines, 3 instances

- **Suggestion:** Extract common `defineWhole` boilerplate

#### Complexity Hotspots

| File                                              | Score | Trend                                                                                           |
| ------------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------- |
| `src/App.tsx`                                     | 1.8   | cooling                                                                                         |
| `src/components/pipeline-docs/EndpointView.tsx`   | —     | 307-line `InternalsView`, 139-line `PipelineView`, 139-line `OverviewView`, 90-line `ManipView` |
| `src/components/pipeline-docs/SwaggerSidebar.tsx` | —     | 111-line component                                                                              |
| `src/components/pipeline-docs/TryItOut.tsx`       | —     | 101-line component                                                                              |

#### High-Priority Target

- **`manipData.ts`** — priority 24.1, 50% dead exports, 2 functions with untested complexity
  - **Action:** Remove 4 unused exports (`INTERNAL_SECTIONS`, `NEIGHBOR_MANIPS`, `PIXEL_MANIPS`, `WHOLE_MANIPS`)

---

### packages/image-to-particles

#### Duplicate Exports (1)

| Export     | Files                                                               | Lines |
| ---------- | ------------------------------------------------------------------- | ----- |
| `Particle` | `src/components/ImageToParticles.tsx:20` and `src/core/utils.ts:16` |       |

#### Unused Exports (2)

| Export   | File                 | Line | Suggestion           |
| -------- | -------------------- | ---- | -------------------- |
| `config` | `src/core/config.ts` | 23   | Remove unused export |
| `utils`  | `src/core/utils.ts`  | 126  | Remove unused export |

#### Unused Types (2)

| Type       | File                                  | Line | Suggestion              |
| ---------- | ------------------------------------- | ---- | ----------------------- |
| `Particle` | `src/components/ImageToParticles.tsx` | 20   | Remove `export` keyword |
| `Particle` | `src/core/utils.ts`                   | 16   | Remove `export` keyword |

#### Large Functions

| Function           | File                                  | Lines |
| ------------------ | ------------------------------------- | ----- |
| `ImageToParticles` | `src/components/ImageToParticles.tsx` | 143   |
| `<arrow>`          | `src/components/ImageToParticles.tsx` | 97    |
| `<arrow>`          | `src/components/ImageToParticles.tsx` | 72    |

---

### packages/mosaic-maker

#### Unused Files (2)

- `src/utils/palettes/arePalettesEqual.ts`
- `src/utils/palettes/getPaletteId.ts`
  - **Suggestion:** Delete or re-integrate if needed

#### Unused Exports (2)

| Export                | File                           | Line | Suggestion                 |
| --------------------- | ------------------------------ | ---- | -------------------------- |
| `paletteRecordSchema` | `src/core/palette.schema.ts`   | 3    | Remove unused schema       |
| `setPaletteStock`     | `src/stores/mosaic/actions.ts` | 30   | Remove unused store action |

#### Unused Types (1)

| Type             | File                                  | Line | Suggestion              |
| ---------------- | ------------------------------------- | ---- | ----------------------- |
| `CachedPalettes` | `src/utils/palettes/fetchPalettes.ts` | 6    | Remove `export` keyword |

#### Large Functions

| Function   | File                                   | Lines |
| ---------- | -------------------------------------- | ----- |
| `Controls` | `src/components/controls/Controls.tsx` | 102   |

---

### packages/palette-generator

#### Unused Exports (1)

| Export             | File                 | Line | Suggestion            |
| ------------------ | -------------------- | ---- | --------------------- |
| `scaleCoordsTo255` | `src/utils/color.ts` | 9    | Remove unused utility |

#### Unused Types (1)

| Type   | File                      | Line | Suggestion              |
| ------ | ------------------------- | ---- | ----------------------- |
| `Axis` | `src/core/colorSpaces.ts` | 60   | Remove `export` keyword |

#### Complexity Hotspots

| File                                  | Score | Trend   |
| ------------------------------------- | ----- | ------- |
| `src/components/PaletteGenerator.tsx` | 1.5   | cooling |

---

### packages/radu-machine-learning

#### Unused Files (1)

- `src/components/sketchpad/SketchPad.tsx` — 100-line component unreachable from entry points
  - **Suggestion:** Either wire into app or delete

#### Unused Types (2)

| Type         | File                | Line | Suggestion              |
| ------------ | ------------------- | ---- | ----------------------- |
| `Samples`    | `src/core/types.ts` | 4    | Remove `export` keyword |
| `Student_id` | `src/core/types.ts` | 6    | Remove `export` keyword |

#### Complexity Hotspots

| File                                | Score | Trend   |
| ----------------------------------- | ----- | ------- |
| `src/components/DisplayStudent.tsx` | 2.0   | cooling |
| `src/scripts/dataset_generator.ts`  | 1.9   | cooling |

---

### packages/sequence-renderer

#### Complexity Hotspots

| File                           | Score | Trend        |
| ------------------------------ | ----- | ------------ |
| `src/core/generateSequence.ts` | 1.6   | accelerating |

---

### packages/three-stage

#### Unused Types (2)

| Type       | File                  | Line | Suggestion              |
| ---------- | --------------------- | ---- | ----------------------- |
| `Geometry` | `src/lib/geometry.ts` | 25   | Remove `export` keyword |
| `Material` | `src/lib/material.ts` | 47   | Remove `export` keyword |

#### Code Duplication

**Lighting components:** `DirectionalLight.tsx`, `PointLight.tsx`, `SpotLight.tsx` — 27 lines, 3 instances

- Repeated `useControls` position config with identical X/Y/Z slider setup
- **Suggestion:** Extract a shared `lightPositionControls` helper

#### Complexity Hotspots

| File                                           | Score | Trend                            |
| ---------------------------------------------- | ----- | -------------------------------- |
| `src/components/lighting/SpotLight.tsx`        | 0.2   | cooling (also 65-line component) |
| `src/components/lighting/DirectionalLight.tsx` | 0.5   | cooling                          |
| `src/components/lighting/PointLight.tsx`       | 0.5   | cooling                          |
| `src/components/scene/Scene.tsx`               | 0.5   | accelerating                     |
| `src/components/sample/Sample.tsx`             | —     | 64-line component                |

---

### packages/ui

#### Complexity Hotspots

| File                                                    | Score | Trend                |
| ------------------------------------------------------- | ----- | -------------------- |
| `src/components/badge/Badge.tsx`                        | 1.9   | cooling              |
| `src/components/widgets/color-palette/ColorPalette.tsx` | 1.8   | accelerating         |
| `src/components/icons/lib.tsx`                          | 0.9   | cooling              |
| `src/components/icons/components/IconSpinner.tsx`       | 0.7   | cooling              |
| `src/components/widgets/sidebar/SidebarMain.tsx`        | 1.4   | accelerating         |
| `src/components/widgets/sidebar/SidebarPanel.tsx`       | 1.4   | accelerating         |
| `src/components/widgets/sidebar/Sidebar.tsx`            | —     | 87-line component    |
| `src/components/slider/Slider.tsx`                      | —     | 83-line component    |
| `src/components/input/Input.tsx`                        | —     | 66-line component    |
| `src/utils/cn.ts`                                       | 1.8   | cooling (fan-in: 19) |
| `src/App.tsx`                                           | 1.5   | cooling              |

---

### Configuration (root)

#### Unused pnpm Catalog Entries (4)

| Entry                        | File                  | Line | Consumers (hardcoded)                       |
| ---------------------------- | --------------------- | ---- | ------------------------------------------- |
| `@vitest/browser-playwright` | `pnpm-workspace.yaml` | 56   | `apps/storybook`                            |
| `lucide-react`               | `pnpm-workspace.yaml` | 50   | _(none)_                                    |
| `playwright`                 | `pnpm-workspace.yaml` | 57   | `apps/storybook`                            |
| `vitest`                     | `pnpm-workspace.yaml` | 55   | `apps/storybook`, `packages/image-pipeline` |

**Suggestion:** Either switch consumers to `catalog:` references, or remove entries with no consumers.

---

### Code Duplication — Cross-Workspace Summary

| Group                         | Files      | Lines   | Savings   | Suggestion                           |
| ----------------------------- | ---------- | ------- | --------- | ------------------------------------ |
| `vite.config.ts` (9 copies)   | 9 packages | 15 each | 120 lines | Shared Vite config package           |
| `EndpointView.tsx`            | 1 file     | 64      | 192 lines | Extract shared section components    |
| `manipData.ts`                | 1 file     | 38      | 114 lines | Factory function for manip defs      |
| Lighting position controls    | 3 files    | 27      | 54 lines  | Shared `lightPositionControls`       |
| Neighborhood manipulations    | 3 files    | 19      | 38 lines  | Extract `defineNeighbor` boilerplate |
| Whole-image manipulations     | 3 files    | 17      | 34 lines  | Extract `defineWhole` boilerplate    |
| Pixel manipulations (batch 1) | 3 files    | 8       | 16 lines  | Extract `definePixel` boilerplate    |
| Pixel manipulations (batch 2) | 3 files    | 7       | 14 lines  | Extract `definePixel` boilerplate    |

**Total estimated savings:** ~582 lines

---

### Complexity Hotspots — All Workspaces

Highest-risk files (score >= 1.5):

| File                                                    | Score | Workspace             |
| ------------------------------------------------------- | ----- | --------------------- |
| `src/components/output/Output.tsx`                      | 2.4   | image-manipulator     |
| `src/components/controls/RuleSelector.tsx`              | 2.1   | automa                |
| `src/components/upload/ImageSourceControls.tsx`         | 2.1   | image-manipulator     |
| `src/components/layout/ControlSection.tsx`              | 2.0   | image-manipulator     |
| `src/components/DisplayStudent.tsx`                     | 2.0   | radu-machine-learning |
| `src/scripts/dataset_generator.ts`                      | 1.9   | radu-machine-learning |
| `src/core/config.ts`                                    | 1.9   | automa                |
| `src/core/step.ts`                                      | 1.9   | automa                |
| `src/stores/ui/store.ts`                                | 1.9   | automa                |
| `src/components/workflow/WorkflowList.tsx`              | 1.9   | image-manipulator     |
| `src/components/workflow/WorkflowControls.tsx`          | 1.9   | image-manipulator     |
| `src/components/workflow/WorkflowNodeHeader.tsx`        | 1.9   | image-manipulator     |
| `src/components/controls/ShaderPropsControls.tsx`       | 1.9   | automa                |
| `src/components/badge/Badge.tsx`                        | 1.9   | ui                    |
| `src/App.tsx`                                           | 1.8   | image-pipeline        |
| `src/components/widgets/color-palette/ColorPalette.tsx` | 1.8   | ui                    |
| `src/utils/cn.ts`                                       | 1.8   | ui                    |
| `src/components/controls/PlaybackControls.tsx`          | 1.7   | automa                |
| `src/core/generateSequence.ts`                          | 1.6   | sequence-renderer     |
| `apps/storybook/.storybook/main.ts`                     | 1.6   | storybook             |
| `src/components/PaletteGenerator.tsx`                   | 1.5   | palette-generator     |
| `src/App.tsx`                                           | 1.5   | ui                    |
| `src/stories/slider/Slider.stories.tsx`                 | 1.5   | storybook             |

---

### Duplicate Exports

| Export     | Workspace          | Files                                   |
| ---------- | ------------------ | --------------------------------------- |
| `Particle` | image-to-particles | `ImageToParticles.tsx`, `core/utils.ts` |

---

## Critical Issues

1. **`manipData.ts` (image-pipeline)** — 50% dead exports (4 of 8), priority 24.1. Remove `INTERNAL_SECTIONS`, `NEIGHBOR_MANIPS`, `PIXEL_MANIPS`, `WHOLE_MANIPS`.
2. **`vite.config.ts` cloned across 9 packages** — 9 identical config files. Extract to a shared package.
3. **`EndpointView.tsx` (image-pipeline)** — 4 clone groups, repeated `if (id === ...)` pattern. Extract a shared section renderer.
4. **`notebook.ts` (playground)** — 50% dead exports (3 of 6). Remove `CATEGORY_METADATA`, `getTagMetadata`, `getFeaturedNotes`.
5. **16.55% code duplication** — 2494 of 15067 lines are duplicated, concentrated in `image-pipeline` and `vite.config.ts` files.
6. **`zod` and `leva`** are misplaced — declared in workspaces that don't consume them directly.

---

## Quick Wins (Auto-fixable)

| Issue                  | Type            | Count | Action                                                |
| ---------------------- | --------------- | ----- | ----------------------------------------------------- |
| Unused exports         | `remove-export` | 33    | `fallow fix --dry-run` to preview                     |
| Unused types           | remove `export` | 13    | `fallow fix --dry-run` to preview                     |
| Unused catalog entries | remove          | 4     | Manual review, then delete from `pnpm-workspace.yaml` |

---

## Next Steps

- [ ] Fix critical: remove dead exports from `manipData.ts` (image-pipeline)
- [ ] Fix critical: consolidate 9x `vite.config.ts` into shared config
- [ ] Fix critical: refactor `EndpointView.tsx` section pattern
- [ ] Run `fallow fix --dry-run` to preview auto-removable exports
- [ ] Run `fallow fix --yes` to apply auto-fixes
- [ ] Move `zod` to `packages/mosaic-maker/package.json`
- [ ] Move `leva` to `packages/three-stage/package.json`
- [ ] Remove unused files: `katex.css`, `ColorPicker.tsx`, `arePalettesEqual.ts`, `getPaletteId.ts`, `SketchPad.tsx`
- [ ] Clean up unused catalog entries in `pnpm-workspace.yaml`
- [ ] Extract shared `definePixel`/`defineNeighbor`/`defineWhole` boilerplate factories in image-pipeline
- [ ] Extract shared light position helper in three-stage
- [ ] Address top-10 complexity hotspots (score >= 1.8) with refactoring
