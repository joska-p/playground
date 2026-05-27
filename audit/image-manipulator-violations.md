# Audit: `packages/image-manipulator/src` — Convention Violations

Generated from CONVENTIONS.md rules. No source files have been modified.

---

## 1. `src/index.ts`

| Field | Value |
|---|---|
| **Rule** | No barrel files (`index.ts`) |
| **Quote** | "No barrel files (`index.ts`). Import directly from the source file." |
| **Fix** | Delete this file; consumers must import directly from the source module (e.g. `@repo/image-manipulator/core/pipe` or via `package.json` subpaths). |

---

## 2. `src/manipulations/index.ts`

| Field | Value |
|---|---|
| **Rule** | No barrel files (`index.ts`) |
| **Quote** | "No barrel files (`index.ts`). Import directly from the source file." |
| **Fix** | Delete this file; import `brightness`, `energyMap`, `grayscale` directly from their individual module files. |

---

## 3. `src/core/drawImage.ts`

| Field | Value |
|---|---|
| **Rule** | Filename must match the primary exported identifier |
| **Quote** | "Filename must match the primary exported identifier (case-sensitive)." |
| **Fix** | Rename to `drawImageOnCanvas.ts` (to match its single export) or rename the export to `drawImage`. |

---

## 4. `src/core/types.ts`

| Field | Value |
|---|---|
| **Rule** | Type-only file naming convention |
| **Quote** | "Type-only files: `camelCase.types.ts`" (naming table) |
| **Fix** | Rename to `pixel.types.ts` (or another `camelCase.types.ts` name matching the domain). |

Additionally, this file acts as a shared types file consumed by multiple core and manipulation modules, which conflicts with: "Types are co-located with the file that uses them. No shared `types/` package." Consider co-locating each type at its usage site, or keep this file as a pragmatic exception but fix the naming.

---

## 5. `src/components/display/Output.tsx`

| Field | Value |
|---|---|
| **Rule** | Props type naming convention |
| **Quote** | "Props types: `XxxProps`, co-located with component" (naming table, example: `ButtonProps`) |
| **Fix** | Rename `type Props` → `type OutputProps` (or preferably inline it where the component accepts props). |

---

## 6. `src/components/controls/Controls.tsx`

| Field | Value |
|---|---|
| **Rule** | Package public API — no root barrel import |
| **Quote** | "One subpath per public component — no root `index.tsx`." |
| **Fix** | Change `import { Button, Input, Select } from "@repo/ui"` to individual subpath imports: `import { Button } from "@repo/ui/Button"`, etc. |

---

## 7. `src/components/ImageManipulator.tsx`

| Field | Value |
|---|---|
| **Rule** | Package public API — no root barrel import |
| **Quote** | "One subpath per public component — no root `index.tsx`." |
| **Fix** | Change `import { Sidebar } from "@repo/ui"` to `import { Sidebar } from "@repo/ui/Sidebar"`. |

---

## 8. `src/components/SeamCarvingDemo.tsx`

| Field | Value |
|---|---|
| **Rule** | Package public API — no root barrel import |
| **Quote** | "One subpath per public component — no root `index.tsx`." |
| **Fix** | Change `import { Input } from "@repo/ui"` to `import { Input } from "@repo/ui/Input"`. |
