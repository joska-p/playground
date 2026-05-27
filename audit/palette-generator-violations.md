# Palette Generator — Convention Violations

Audit of `/workspaces/playground/packages/palette-generator/src` against `CONVENTIONS.md`.

---

## Barrel files (`index.ts`)

Rule: **"No barrel files (`index.ts`). Import directly from the source file."**

| File | What needs to change |
|---|---|
| `src/index.tsx` | Remove barrel; rename to `PaletteGenerator.tsx` to match its primary export |
| `src/core/rules/index.ts` | Remove barrel; consumers should import from individual rule files directly |
| `src/components/controls/index.tsx` | Remove barrel; rename to `Controls.tsx` to match its primary export |
| `src/components/display/index.tsx` | Remove barrel; rename to `Display.tsx` to match its primary export |

---

## Filename must match the primary exported identifier

Rule: **"Filename must match the primary exported identifier (case-sensitive)."**

| File | Primary export(s) | What needs to change |
|---|---|---|
| `src/core/generator.ts` | `generatePalette` | Rename to `generatePalette.ts` |
| `src/core/colorspaces.ts` | `colorSpaces` | Rename to `colorSpaces.ts` |
| `src/utils/maths.ts` | `createRemap` | Rename to `createRemap.ts` |
| `src/utils/color.ts` | `scaleTo255`, `scaleCoordsTo255` | Rename to `scaleTo255.ts` (or split into separate files per export) |

---

## Type-only file naming

Rule: **"Type-only files: `camelCase.types.ts`"**

| File | What needs to change |
|---|---|
| `src/core/rules/types.ts` | Rename to match content, e.g. `harmonyRule.types.ts` or `palette.types.ts` |

---

## Package exports (`package.json`)

Rule: **"Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx`."**

| What needs to change |
|---|
| Replace the `"."` entry pointing to `./src/index.tsx` with per-component subpaths (e.g. `"./PaletteGenerator"`, `"./Controls"`, `"./Display"`) |

Rule: **"Do not use `require` / `import` / `types` conditions when all three point to the same source file — omit them entirely."**

| What needs to change |
|---|
| Replace the three-condition `"."` entry (`types`, `import`, `require` all pointing to the same file) with a single conditionless string |
