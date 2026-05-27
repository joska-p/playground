# Convention Violations — `packages/sequence-renderer/src`

All rules quoted from `CONVENTIONS.md`.

---

## 1. `src/index.tsx`

**Rule violated:** *"No barrel files (`index.ts`). Import directly from the source file. They cause circular dependencies, slow down the TypeScript server, and are hard to maintain in a WIP monorepo."*

→ Rename to `SequenceRenderer.tsx` and export directly from there; remove the barrel file.

---

## 2. `src/index.tsx`

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File is `index.tsx` but primary export is `SequenceRenderer`; rename to `SequenceRenderer.tsx`.

---

## 3. `src/utils/math.ts`

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File is `math.ts` but primary export is `findBiggestInterval`; rename to `findBiggestInterval.ts`.

---

## 4. `src/core/rules.ts`

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File is `rules.ts` but exports are `recamanRule` and `sequencesRule`; rename to `sequencesRule.ts` or split into individual files.

---

## 5. `src/core/generator.ts`

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File is `generator.ts` but primary export is `generateSequence`; rename to `generateSequence.ts`.

---

## 6. `src/core/visualizations/index.ts`

**Rule violated:** *"No barrel files (`index.ts`). Import directly from the source file. They cause circular dependencies, slow down the TypeScript server, and are hard to maintain in a WIP monorepo."*

→ Remove this barrel file and import `recamanArcs` directly from its source file.

---

## 7. `src/core/visualizations/index.ts`

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File is `index.ts` but primary exports are `Visualization` (type) and `visualizations` (value); rename to `visualizations.ts` or `Visualization.ts`.

---

## 8. `package.json`

**Rule violated:** *"Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx` barrel."*

→ Remove the `"."` root entry; replace with explicit subpaths per component (e.g. `"./SequenceRenderer": "./src/SequenceRenderer.tsx"`).

---

## 9. `package.json`

**Rule violated:** *"Do not use `require` / `import` / `types` conditions when all three point to the same source file — omit them entirely."*

→ Replace the three-condition `"."` block with a single string value `"./src/index.tsx"` (or ideally remove the root entry per violation #8).
