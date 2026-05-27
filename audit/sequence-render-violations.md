# Convention Violations — `packages/sequence-renderer/src`

All rules quoted from `CONVENTIONS.md`.

---

## 1. `src/index.tsx` ✅ RESOLVED

**Rule violated:** *"No barrel files (`index.ts`). Import directly from the source file. They cause circular dependencies, slow down the TypeScript server, and are hard to maintain in a WIP monorepo."*

→ Renamed to `SequenceRenderer.tsx` and barrel file removed.

---

## 2. `src/index.tsx` ✅ RESOLVED

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File renamed to `SequenceRenderer.tsx` — matches primary export.

---

## 3. `src/utils/math.ts` ✅ RESOLVED

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File renamed to `findBiggestInterval.ts` — matches primary export.

---

## 4. `src/core/rules.ts` ✅ RESOLVED

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File renamed to `sequencesRule.ts` — matches primary export.

---

## 5. `src/core/generator.ts` ✅ RESOLVED

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File renamed to `generateSequence.ts` — matches primary export.

---

## 6. `src/core/visualizations/index.ts` ✅ RESOLVED

**Rule violated:** *"No barrel files (`index.ts`). Import directly from the source file. They cause circular dependencies, slow down the TypeScript server, and are hard to maintain in a WIP monorepo."*

→ Barrel file removed; content moved to `visualizations.ts`.

---

## 7. `src/core/visualizations/index.ts` ✅ RESOLVED

**Rule violated:** *"Filename must match the primary exported identifier (case-sensitive)."*

→ File renamed to `visualizations.ts` — matches primary export.

---

## 8. `package.json` ✅ RESOLVED

**Rule violated:** *"Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx` barrel."*

→ Root `"."` entry removed; replaced with `"./SequenceRenderer"` subpath.

---

## 9. `package.json` ✅ RESOLVED

**Rule violated:** *"Do not use `require` / `import` / `types` conditions when all three point to the same source file — omit them entirely."*

→ Three-condition block removed; single string value used per subpath.
