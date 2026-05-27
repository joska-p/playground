# Image to Particles — Convention Violations

All rules quoted from `/workspaces/playground/CONVENTIONS.md`.

---

## 1. `src/index.tsx`

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | This is an `index.tsx` barrel; move `ImageToParticles` and `Particle` type into `ImageToParticles.tsx`. |
| **Filename must match the primary exported identifier** (case-sensitive). | Primary export is `ImageToParticles` but file is named `index.tsx`. |
| **React component files: `PascalCase.tsx`** | File contains a React component but is named `index.tsx` instead of `ImageToParticles.tsx`. |
| **Do not mix Tailwind and inline `style={{}}` props for the same concern.** | Button uses inline `style` for margin, padding, cursor instead of Tailwind utility classes. |

---

## 2. `src/App.tsx`

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Imports `{ ImageToParticles }` from `"./index"` which is a barrel; change to `"./ImageToParticles"` after extraction. |

---

## 3. `src/core/config.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Exports `CANVAS_WIDTH`, `CANVAS_HEIGHT`, `GRAVITY`, `PARTICLE_SIZE`, `RETURN_FORCE`, etc.; none match filename `config`. Either name a primary export `config` or rename file to match an export (e.g. `PARTICLE_SIZE.ts`). |

---

## 4. `src/core/utils.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Exports `calculateImageDimensions`, `drawImageToCanvas`, `initParticles`; none match filename `utils`. Split into single-export files or rename to match one export. |
