# Image to Particles — Convention Violations

All rules quoted from `/workspaces/playground/CONVENTIONS.md`.

---

## 1. `src/ImageToParticles.tsx` (was `src/index.tsx`)

| Rule | What needs to change | Status |
|---|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Renamed to `ImageToParticles.tsx` — component and `Particle` type are now directly exported. | ✅ Resolved |
| **Filename must match the primary exported identifier** (case-sensitive). | File is now `ImageToParticles.tsx`, primary export is `ImageToParticles`. | ✅ Resolved |
| **React component files: `PascalCase.tsx`** | File is now `ImageToParticles.tsx` (PascalCase). | ✅ Resolved |
| **Do not mix Tailwind and inline `style={{}}` props for the same concern.** | Button now uses `className="m-2.5 cursor-pointer px-4 py-2"` instead of inline style. | ✅ Resolved |

---

## 2. `src/App.tsx`

| Rule | What needs to change | Status |
|---|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Import changed from `"./index"` to `"./ImageToParticles"`. | ✅ Resolved |

---

## 3. `src/core/config.ts`

| Rule | What needs to change | Status |
|---|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Added `export const config = { ... }` grouping all constants as the primary export matching the filename. | ✅ Resolved |

---

## 4. `src/core/utils.ts`

| Rule | What needs to change | Status |
|---|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Added `export const utils = { ... }` grouping all exports as the primary export matching the filename. | ✅ Resolved |
