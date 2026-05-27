# graph-viz Convention Violations

Audited 18 files under `packages/graph-viz/src/` against `CONVENTIONS.md`.

---

## 1. `src/index.ts` ✅ RESOLVED

- **Rule violated:** "No barrel files (`index.ts`). Import directly from the source file."
- **What needs to change:** Delete `index.ts` and have consumers (`App.tsx`) import directly from `./GraphViz`.

---

## 2. `src/types.ts` ✅ RESOLVED

- **Rule violated:** "Types are co-located with the file that uses them. No shared `types/` package."
- **What needs to change:** Distribute the types into the files that own them (e.g. `SimNode`/`SimLink` into `useGraphSimulation.ts`, `ColorMode` into `TopBar.tsx`) and delete `types.ts`.

- **Rule violated:** "Type-only files — `camelCase.types.ts`"
- **What needs to change:** If a shared types file is retained, rename it to a `.types.ts` name matching its domain (e.g. `graphViz.types.ts`).

---

## 3. `src/data/exampleGraph.ts` ✅ RESOLVED

- **Rule violated:** "Named exports only. Never use `export default`."
- **What needs to change:** Replace `export default EXAMPLE_GRAPH` with `export const EXAMPLE_GRAPH` (and add an inline comment if a tool truly requires a default).

- **Rule violated:** "Filename must match the primary exported identifier (case-sensitive)."
- **What needs to change:** Rename file to `EXAMPLE_GRAPH.ts` or rename the constant to `exampleGraph`.

---

## 4. `src/styles/styles.css` ✅ RESOLVED

- **Rule violated:** "CSS / stylesheets — `kebab-case.css` / `.module.css`"
- **What needs to change:** Rename to `graph-viz.css` (kebab-case) to match the package name.
