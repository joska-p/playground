# Playground (`apps/playground/src`) Convention Violations

## Filename casing ✅

| File | Rule | Fix | Status |
|------|------|-----|--------|
| `components/data-viz/pie-chart/piechart.astro` | Astro component files: `kebab-case.astro` | Rename to `pie-chart.astro` | ✅ `pie-chart.astro` |
| `components/data-viz/pie-chart/piechart.ts` | Utility / core files: `camelCase.ts` | Rename to `pieChart.ts` | ✅ `PieChart.ts` (matches export `PieChart`) |
| `lib/remark-base-url.mjs` | Utility / core files: `camelCase.ts` | Rename to `remarkBaseUrl.ts` | ✅ `remarkBaseUrl.ts` |

---

## Exports ✅

| File | Rule | Fix | Status |
|------|------|-----|--------|
| `components/data-viz/pie-chart/piechart.ts` | Named exports only (never `export default`) | Add named exports or export the `PieChart` class / `Point` class | ✅ `PieChart` and `Point` are now `export`ed |
| `components/data-viz/pie-chart/piechart.ts` | Filename must match the primary exported identifier | No export matches filename `piechart`; class is `PieChart` — rename file to `PieChart.ts` or align exports | ✅ Renamed to `PieChart.ts` |
| `data/docs.ts` | Filename must match the primary exported identifier | Primary export `docSchema` doesn't match filename `docs` | ✅ `docSchema` extracted to `doc.schema.ts` |
| `data/notebook.ts` | Filename must match the primary exported identifier | Primary export `notebookSchema` doesn't match filename `notebook` | ✅ `notebookSchema` extracted to `notebook.schema.ts` |
| `content/notebook/emergence/lib/utils.ts` | Filename must match the primary exported identifier | No export (`resizeCanvas`, `observeOnce`) matches filename `utils` | ✅ Renamed to `resizeCanvas.ts` |

---

## File extensions ✅

| File | Rule | Fix | Status |
|------|------|-----|--------|
| `lib/remark-base-url.mjs` | `.ts` — logic, utilities, everything else | Change extension to `.ts` and convert to TypeScript | ✅ `remarkBaseUrl.ts` |

---

## `interface` vs `type` ✅

Prefer `type` over `interface`. Use `interface` only when declaration merging is explicitly required.

### `components/ui/cards/`
- ✅ `components/ui/cards/base-card.astro` — replaced `interface Props` with `type Props`
- ✅ `components/ui/cards/doc-card.astro` — replaced `interface Props` with `type Props`
- ✅ `components/ui/cards/experiment-card.astro` — replaced `interface Props` with `type Props`

### `components/ui/features/`
- ✅ `components/ui/features/hero.astro` — replaced `interface Props` with `type Props`

### `content/notebook/birth-of-complexity/components/`
- ✅ `content/notebook/birth-of-complexity/components/divider.astro`
- ✅ `content/notebook/birth-of-complexity/components/epilogue-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/hero-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/step-1-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/step-2-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/step-3-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/step-4-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/step-5-illustration.astro`
- ✅ `content/notebook/birth-of-complexity/components/step-6-illustration.astro`

### `content/notebook/emergence/components/`
- ✅ `content/notebook/emergence/components/callout.astro`
- ✅ `content/notebook/emergence/components/figure.astro`
- ✅ `content/notebook/emergence/components/step-header.astro`
- ✅ `content/notebook/emergence/components/svg-node.astro`

---

## Zod schema file naming ✅

Zod schema files must use the `camelCase.schema.ts` suffix.

| File | Rule | Fix | Status |
|------|------|-----|--------|
| `data/docs.ts` | Zod schema files: `camelCase.schema.ts` | Extract `docSchema` into `doc.schema.ts` | ✅ `doc.schema.ts` created |
| `data/notebook.ts` | Zod schema files: `camelCase.schema.ts` | Extract `notebookSchema` into `notebook.schema.ts` | ✅ `notebook.schema.ts` created |

---

## Summary

| Category | Count | Resolved |
|----------|-------|----------|
| Filename casing | 3 | 3 ✅ |
| Exports | 5 | 5 ✅ |
| File extensions | 1 | 1 ✅ |
| `interface` vs `type` | 17 | 17 ✅ |
| Zod schema file naming | 2 | 2 ✅ |
| **Total** | **28** | **28 ✅** |
