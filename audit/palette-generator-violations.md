# Palette Generator — Convention Violations

Audit of `/workspaces/playground/packages/palette-generator/src` against `CONVENTIONS.md`.

---

## Barrel files (`index.ts`) ✅ RESOLVED

Rule: **"No barrel files (`index.ts`). Import directly from the source file."**

---

## Filename must match the primary exported identifier ✅ RESOLVED (partial — `maths.ts` and `color.ts` excluded per user request)

Rule: **"Filename must match the primary exported identifier (case-sensitive)."**

---

## Type-only file naming ✅ RESOLVED

Rule: **"Type-only files: `camelCase.types.ts`"**

---

## Package exports (`package.json`) ✅ RESOLVED

Rule: **"Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx`."**

Rule: **"Do not use `require` / `import` / `types` conditions when all three point to the same source file — omit them entirely."**
