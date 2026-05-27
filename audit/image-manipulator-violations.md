# Audit: `packages/image-manipulator/src` — Convention Violations

Generated from CONVENTIONS.md rules.

---

## 1. `src/index.ts`

| Field | Value |
|---|---|
| **Rule** | No barrel files (`index.ts`) |
| **Quote** | "No barrel files (`index.ts`). Import directly from the source file." |
| **Fix** | Delete this file; consumers must import directly from the source module (e.g. `@repo/image-manipulator/core/pipe` or via `package.json` subpaths). |
| **Status** | ✅ **Resolved** — File deleted. App.tsx updated to import from `"./components/ImageManipulator"` instead. |

---

## 2. `src/manipulations/index.ts`

| Field | Value |
|---|---|
| **Rule** | No barrel files (`index.ts`) |
| **Quote** | "No barrel files (`index.ts`). Import directly from the source file." |
| **Fix** | Delete this file; import `brightness`, `energyMap`, `grayscale` directly from their individual module files. |
| **Status** | ✅ **Resolved** — File deleted. Composite structures `manipulations` and `manipulationsIds` moved to `src/manipulations/manipulations.ts`. |

---

## 3. `src/core/drawImage.ts`

| Field | Value |
|---|---|
| **Rule** | Filename must match the primary exported identifier |
| **Quote** | "Filename must match the primary exported identifier (case-sensitive)." |
| **Fix** | Rename to `drawImageOnCanvas.ts` (to match its single export) or rename the export to `drawImage`. |
| **Status** | ✅ **Resolved** — File renamed to `drawImageOnCanvas.ts`. Updated all imports from `"./types"` to `"./pixel.types"` in `fork.ts`, `iteratePixels.ts`, `pipe.ts`. |

---

## 4. `src/core/types.ts`

| Field | Value |
|---|---|
| **Rule** | Type-only file naming convention |
| **Quote** | "Type-only files: `camelCase.types.ts`" (naming table) |
| **Fix** | Rename to `pixel.types.ts` (or another `camelCase.types.ts` name matching the domain). |
| **Status** | ✅ **Resolved** — File renamed to `pixel.types.ts`. All imports updated from `"./types"` to `"./pixel.types"`. |

---

## 5. `src/components/display/Output.tsx`

| Field | Value |
|---|---|
| **Rule** | Props type naming convention |
| **Quote** | "Props types: `XxxProps`, co-located with component" (naming table, example: `ButtonProps`) |
| **Fix** | Rename `type Props` → `type OutputProps` (or preferably inline it where the component accepts props). |
| **Status** | ✅ **Resolved** — `type Props` renamed to `type OutputProps`. |

---

## 6. `src/components/controls/Controls.tsx`

| Field | Value |
|---|---|
| **Rule** | Package public API — no root barrel import |
| **Quote** | "One subpath per public component — no root `index.tsx`." |
| **Fix** | Change `import { Button, Input, Select } from "@repo/ui"` to individual subpath imports: `import { Button } from "@repo/ui/Button"`, etc. |
| **Status** | ✅ **Resolved** — Barrel import replaced with `@repo/ui/Button`, `@repo/ui/Input`, `@repo/ui/Select` subpath imports. Also replaced `../../manipulations` barrel import with direct module imports and inlined `manipulations`/`manipulationsIds` definitions. |

---

## 7. `src/components/ImageManipulator.tsx`

| Field | Value |
|---|---|
| **Rule** | Package public API — no root barrel import |
| **Quote** | "One subpath per public component — no root `index.tsx`." |
| **Fix** | Change `import { Sidebar } from "@repo/ui"` to `import { Sidebar } from "@repo/ui/Sidebar"`. |
| **Status** | ✅ **Resolved** — Barrel import replaced with `@repo/ui/Sidebar` subpath import. |

---

## 8. `src/components/SeamCarvingDemo.tsx`

| Field | Value |
|---|---|
| **Rule** | Package public API — no root barrel import |
| **Quote** | "One subpath per public component — no root `index.tsx`." |
| **Fix** | Change `import { Input } from "@repo/ui"` to `import { Input } from "@repo/ui/Input"`. |
| **Status** | ✅ **Resolved** — Barrel import replaced with `@repo/ui/Input` subpath import. |
