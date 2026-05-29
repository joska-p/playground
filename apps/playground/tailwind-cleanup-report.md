# Tailwind Cleanup Report — apps/playground

Generated: Friday, May 29, 2026
Directory: apps/playground

---

## External Dependencies (black boxes)

List any components imported from outside the package boundary that appear at call sites.
Heritage analysis was skipped for these — they may be worth a separate cleanup session.

| Component            | Imported from                                  | Used in               |
| -------------------- | ---------------------------------------------- | --------------------- |
| `<PaletteGenerator>` | `@repo/palette-generator/PaletteGenerator`     | palettes/index.astro  |
| `<GraphViz>`         | `@repo/graph-viz`                              | graphify/index.astro  |
| `<MosaicMaker>`      | `@repo/mosaic-maker/MosaicMaker`               | mosaic/index.astro    |
| `<SequenceRenderer>` | `@repo/sequence-renderer/SequenceRenderer`     | sequences/index.astro |
| `<ImageManipulator>` | `@repo/image-manipulator/ImageManipulator`     | image-manipulator/... |
| `<ImageToParticles>` | `@repo/image-to-particles/ImageToParticles`    | particles/index.astro |
| `<Icon>`             | `lucide-react`                                 | multiple files        |

---

## Usage Map Summary

The application follows a consistent layout pattern using `BaseLayout.astro` as the root wrapper, which establishes a base `bg-background text-foreground min-h-screen antialiased` context. 

Most pages feature a `Hero.astro` section at the top, followed by a main content area typically constrained by `mx-auto max-w-6xl` (or `5xl`/`4xl` depending on the page type). 

Collections (Projects, Docs, Notebook) are organized into `section` elements, often using a `SectionHeader.astro` component to establish a title and description, followed by a CSS grid of cards (`DocCard.astro` or `ExperimentCard.astro`). These grids consistently use `gap-4` and vary from 2 to 4 columns based on the viewport size.

---

## Proposed Changes

### [src/pages/index.astro]

#### Classes to remove — heritage

| ID  | Line | Element | Class(es) | Reason | Fix direction |
| --- | ---- | ------- | --------- | ------ | ------------- |
| H1  | 13   | div (slot cta) | `flex flex-wrap items-center gap-4` | Already defined in `Hero.astro` wrapper for the `cta` slot | fix child |

---

### [src/components/ui/features/hero.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C1  | 50   | h1 | `text-foreground` | Redundant with `body` default |

---

### [src/components/ui/features/stats.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C2  | 14   | dd | `text-foreground` | Redundant with `body` default |

---

### [src/components/ui/features/section-header.astro]

#### Flags — do not touch, requires review

| ID  | Line | Class(es) | Reason |
| --- | ---- | --------- | ------ |
| F1  | 17   | `mb-12` | Hardcoded margin causes layout rigidity in composite components |

---

### [src/components/ui/projects/featured-projects.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C3  | 21   | div (grid) | `mt-8` | Redundant with `mb-12` on preceding `SectionHeader` due to margin collapse |

---

### [src/components/ui/docs/featured-docs.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C4  | 17   | div (grid) | `mt-8` | Redundant with `mb-12` on preceding `SectionHeader` |
| C5  | 34   | div (center) | `mt-8` | Potential collision/redundancy with grid margins |

---

### [src/pages/projects/index.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C6  | 28   | div (grid) | `mt-8` | Redundant with `mb-12` on preceding `SectionHeader` |

---

### [src/pages/docs/[...slug].astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C7  | 22   | div (flex-1 wrapper) | `min-h-screen` | Redundant with `body` min-height |

---

### [src/pages/404.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C8  | 43   | h1 | `text-foreground` | Redundant with `body` default |

---

### [src/components/ui/docs/token-table.astro] / [typography-table.astro]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C9  | 13   | div (wrapper) | `border-border` | Inconsistent ordering with `border` |

---

## Summary Table

| File | Wrappers | Intra classes | Heritage classes | Flags |
| ---- | -------- | ------------- | ---------------- | ----- |
| src/pages/index.astro | 0 | 0 | 1 | 0 |
| src/components/ui/features/hero.astro | 0 | 1 | 0 | 0 |
| src/components/ui/features/stats.astro | 0 | 1 | 0 | 0 |
| src/components/ui/features/section-header.astro | 0 | 0 | 0 | 1 |
| src/components/ui/projects/featured-projects.astro | 0 | 1 | 0 | 0 |
| src/components/ui/docs/featured-docs.astro | 0 | 2 | 0 | 0 |
| src/pages/projects/index.astro | 0 | 1 | 0 | 0 |
| src/pages/docs/[...slug].astro | 0 | 1 | 0 | 0 |
| src/pages/404.astro | 0 | 1 | 0 | 0 |
| src/components/ui/docs/token-table.astro | 0 | 1 | 0 | 0 |
| **Total** | **0** | **9** | **1** | **1** |

---

## Notes for Review

- **Margin Collapse Inefficiency**: A recurring pattern (C3, C4, C6) involves `SectionHeader` having `mb-12` while the subsequent content grid has `mt-8`. Because both are block elements, the margins collapse, making the `mt-8` visually inert. Proposing removal of `mt-8` in these cases to simplify the layout logic.
- **Base Layout Inheritance**: Multiple components explicitly re-declare `text-foreground` (C1, C2, C8), which is already established globally on the `body` in `BaseLayout.astro`.
- **Slot Redundancy**: In `index.astro`, the `cta` slot wrapper repeats layout classes already provided by the `Hero` component's internal slot container.
- **Astro Fragments**: Many components return multiple top-level elements or use slots extensively. This makes heritage analysis critical but also requires careful execution to avoid breaking slot-based layouts.
