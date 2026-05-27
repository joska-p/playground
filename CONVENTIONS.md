# Project Conventions

Stack: Turborepo · Vite · React · Astro · TypeScript · Tailwind · Zustand · Zod · Storybook

---

## Monorepo structure

```
apps/
  astro/          ← Astro site
  storybook/      ← Standalone Storybook (imports from packages)
packages/
  ui/             ← Shared React component library
  ...             ← Other shared packages (all Vite + React)
```

Cross-package imports must use `@repo/` path aliases — never relative paths that cross package boundaries.

---

## Quick rules

- **Named exports only.** Never use `export default`.
- **Filename must match the primary exported identifier** (case-sensitive).
- **No barrel files** (`index.ts`). Import directly from the source file. They cause circular dependencies, slow down the TypeScript server, and are hard to maintain in a WIP monorepo.
- **No wildcard re-exports** (`export * from`).
- **Types are co-located** with the file that uses them. No shared `types/` package.
- **Prefer `type` over `interface`.** Use `interface` only when declaration merging is explicitly required.
- **Zod schemas are co-located** with the feature or component they validate. They are for runtime validation only — derive TS types independently, don't use `z.infer<>` as the source of truth.
- **Package public API is declared in `package.json` exports.** One subpath per public component — no root `index.tsx`.

---

## Naming conventions

### Casing by entity

| Entity                 | Convention                                | Example                        |
| ---------------------- | ----------------------------------------- | ------------------------------ |
| Directories            | kebab-case                                | `color-palette/`, `pie-chart/` |
| React component files  | `PascalCase.tsx`                          | `Button.tsx`, `GraphViz.tsx`   |
| Astro component files  | `kebab-case.astro`                        | `section-header.astro`         |
| Hook files             | `camelCase.ts` (must start with `use`)    | `useImageUpload.ts`            |
| Zustand store files    | `camelCase.ts` (must end with `Store`)    | `useGraphStore.ts`             |
| Utility / core files   | `camelCase.ts`                            | `fetchPalettes.ts`             |
| Zod schema files       | `camelCase.schema.ts`                     | `colorPalette.schema.ts`       |
| Type-only files        | `camelCase.types.ts`                      | `colorPalette.types.ts`        |
| CSS / stylesheets      | `kebab-case.css` / `.module.css`          | `gruvbox-theme.css`            |
| Content files          | `kebab-case.md` / `.mdx`                  | `first-visualization.md`       |
| Test files             | same base name + `.test.ts` / `.test.tsx` | `Button.test.tsx`              |
| Story files            | same base name + `.stories.tsx`           | `Button.stories.tsx`           |
| Assets (images, fonts) | kebab-case                                | `icon-search@2x.png`           |

### Casing by identifier (in-code)

| Identifier             | Convention                                 | Example                       |
| ---------------------- | ------------------------------------------ | ----------------------------- |
| Variables, functions   | camelCase                                  | `fetchPalettes`, `parseColor` |
| React components       | PascalCase                                 | `Button`, `GraphViz`          |
| Hooks                  | `use` + camelCase                          | `useImageUpload`              |
| Zustand stores         | `use` + PascalCase + `Store`               | `useGraphStore`               |
| Props types            | `XxxProps`, co-located with component      | `ButtonProps`                 |
| Module-level constants | SCREAMING_SNAKE_CASE                       | `MAX_RETRIES`, `API_BASE_URL` |
| Zod schemas            | camelCase + `Schema` suffix                | `colorPaletteSchema`          |
| TypeScript types       | PascalCase (`type`, not `interface`)       | `ColorPalette`, `GraphNode`   |
| Enums                  | PascalCase (members: SCREAMING_SNAKE_CASE) | `Direction.NORTH`             |

---

## File extensions

- `.tsx` — files that contain JSX/TSX only.
- `.ts` — logic, hooks, stores, utilities, schemas, types, everything else.
- `.astro` — Astro components (no JSX).

---

## Exports

### In-code

All public exports must be named. The primary exported identifier must match the filename exactly:

```ts
// Button.tsx
export type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) { ... }

// useImageUpload.ts
export function useImageUpload() { ... }

// colorPalette.schema.ts
export const colorPaletteSchema = z.object({ ... });
```

### Package exports (`package.json`)

The package public API is declared via `exports` subpaths — one entry per public component. No root `index.tsx` barrel.

```json
{
  "exports": {
    "./Button": "./src/components/button/Button.tsx",
    "./GraphViz": "./src/components/graph-viz/GraphViz.tsx",
    "./styles": "./src/styles/styles.css"
  }
}
```

Consumers import exactly what they need:

```ts
import { Button } from "@repo/ui/Button";
import { GraphViz } from "@repo/ui/GraphViz";
```

**Rules:**

- Do not use `require` / `import` / `types` conditions when all three point to the same source file — omit them entirely.
- The `./styles` subpath for CSS is the only exception to the component-per-subpath rule.
- Internal files not listed in `exports` are private by default — do not import them across packages.

---

## Function syntax

### Declarations vs arrows

- **React components** → `function` declaration. Never `const Component = () =>`.
- **Top-level named functions** (hooks, utils, store actions) → `function` declaration.
- **Inline callbacks and one-liners** → arrow functions.

```ts
// ✅ React component — function declaration
export function Button({ label, onClick }: ButtonProps): JSX.Element {
  // ✅ inline handler — arrow
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return <button onClick={handleClick}>{label}</button>;
}

// ✅ top-level util — function declaration
export function fetchPalettes(id: string): Promise<ColorPalette> {
  return fetch(`/api/palettes/${id}`).then((r) => r.json());
}

// ✅ one-liner util — arrow is fine
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// ❌ avoid — arrow for top-level named functions
export const fetchPalettes = (id: string) => { ... };

// ❌ avoid — arrow for React components
export const Button = ({ label }: ButtonProps) => { ... };
```

The `function` declaration is preferred for top-level names because:

- generics are clean: `function Component<T>()` vs the TSX workaround `const Component = <T,>() =>`
- React DevTools always resolves the name correctly
- hoisting keeps file organisation flexible (helpers can sit below the main export)

### Return types

Infer by default. Annotate explicitly in two cases:

- **React components** — always annotate with `JSX.Element` or `React.ReactNode` to make nullable returns visible at a glance.
- **Async functions with a meaningful return shape** — annotate with the concrete type so callers don't have to read the body.

```ts
// ✅ infer — obvious return type
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// ✅ annotate — nullable JSX is invisible without it
export function Avatar({ src }: AvatarProps): JSX.Element | null {
  if (!src) return null;
  return <img src={src} />;
}

// ✅ annotate — return shape matters to callers
export async function fetchPalette(id: string): Promise<ColorPalette> {
  const res = await fetch(`/api/palettes/${id}`);
  return res.json();
}
```

---

## Zustand stores

One store per feature/domain. The `use` prefix is kept because Zustand stores are consumed as hooks, but they are **not** general-purpose hooks — they manage shared state. Name them `use[Domain]Store`.

```ts
// useGraphStore.ts
import { create } from "zustand";

type GraphStore = {
  nodes: GraphNode[];
  addNode: (node: GraphNode) => void;
};

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
}));
```

Store files must not contain JSX. Use `.ts`, never `.tsx`.

---

## Zod schemas

Co-locate schemas next to the code they validate. Use the `.schema.ts` suffix. Schemas are for **runtime validation only** — write TypeScript types separately and keep them independent.

```
features/color-palette/
  ColorPalette.tsx
  colorPalette.types.ts       ← TS types (written manually)
  colorPalette.schema.ts      ← Zod schema (runtime validation)
  colorPalette.schema.test.ts ← schema tests if needed
```

```ts
// colorPalette.schema.ts
import { z } from "zod";

export const colorPaletteSchema = z.object({
  id: z.string().uuid(),
  colors: z.array(z.string().regex(/^#[0-9a-f]{6}$/i)),
});
```

---

## Tailwind & CSS

This is a WIP — the goal is to converge on this over time:

- **Default: use Tailwind utility classes** for layout, spacing, color, and typography.
- **Use CSS Modules** (`*.module.css`) only for styles that can't be expressed in utilities: complex animations, pseudo-element tricks, or deeply scoped third-party overrides.
- **Avoid global CSS** except for base resets and CSS custom properties (design tokens) declared in a single `global.css` per app.
- Do not mix Tailwind and inline `style={{}}` props for the same concern.

---

## Storybook

Stories live in `apps/storybook/` and are **not co-located** with components. Mirror the source package structure inside `apps/storybook/stories/`:

```
apps/storybook/
  stories/
    ui/
      Button.stories.tsx        ← mirrors packages/ui/src/Button.tsx
      GraphViz.stories.tsx
    ...
```

Story files follow the same naming rule as their subject: `[ComponentName].stories.tsx` for React components.

Stories import directly from the package using `@repo/` aliases:

```ts
// apps/storybook/stories/ui/Button.stories.tsx
import { Button } from "@repo/ui/Button";
import type { ButtonProps } from "@repo/ui/Button";
```

---

## Component folder structure

For non-trivial components, group related files in a kebab-case folder:

```
packages/ui/src/widgets/color-palette/
  ColorPalette.tsx              ← component (PascalCase)
  colorPaletteVariants.ts       ← helper data / variants (camelCase)
  colorPalette.types.ts         ← TS types
  colorPalette.schema.ts        ← Zod schema (if needed)
  ColorPalette.test.tsx         ← tests
  color-palette.module.css      ← CSS module (if needed)
```

Simple, self-contained components can live as a single file without a folder.

---

## Tests

- Use `.test.ts` / `.test.tsx` in the same folder as the subject file.
- Test file base name must match the subject file base name exactly.
- Schema tests use `.schema.test.ts`.

---

## Edge cases

- **Tool config files** (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, etc.) — these require a default export by the tool's own spec. This is a forced exception, not a choice. The `import/no-default-export` rule is turned off for these files in the ESLint config.
- **`package.json` exports field** — the `exports` map is a Node.js resolver directive, not a JavaScript export. The named export rule does not apply to it. Named vs default exports are enforced inside the files those paths point to.
- **Single-export files** — filename ↔ export name match is case-sensitive and non-negotiable.
- **WIP packages** — even experimental packages should follow naming rules from the start. Renames are expensive once things are imported across packages.

---

## Package dependencies

The monorepo has two kinds of packages: **apps** (`apps/*`) and **shared packages** (`packages/*`). The rules differ because apps are fully bundled — their dependency tree collapses at build time — while shared packages are consumed by other packages and must not bundle what the consumer already provides.

### `dependencies`

Runtime code that is **not** provided by the consumer and **not** erased at build time.

| What belongs here                                                            | Example                                        |
| ---------------------------------------------------------------------------- | ---------------------------------------------- |
| Shared package consumed at runtime by another package                        | `"@repo/ui": "workspace:*"` in an app          |
| A library the package ships logic from and the consumer doesn't already have | A small utility library unique to this package |

**In practice this list is almost always empty for `packages/*`** — their runtime deps are either peer deps (React) or devDeps (build tools, types). Apps are the main users of `dependencies`.

### `devDependencies`

Anything only needed to **build, type-check, lint, or test** the package. Never ends up in the consumer's bundle.

| What belongs here                          | Example                             |
| ------------------------------------------ | ----------------------------------- |
| Build tooling                              | `vite`, `typescript`, `tailwindcss` |
| Type definitions                           | `@types/node`, `@types/react`       |
| Linting / formatting                       | `eslint`, `@repo/eslint-config`     |
| Test runners and utilities                 | `vitest`, `@testing-library/react`  |
| Storybook                                  | `storybook`, `@storybook/*`         |
| Workspace packages used only at build time | `@repo/tsconfig`                    |

### `peerDependencies`

A library the package **uses but expects the consumer to provide**. Prevents multiple copies of the same lib in the final bundle.

| What belongs here                                    | Why                                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `react`, `react-dom`                                 | Every shared React package must declare these as peers — never bundle React    |
| Any lib from the stack that the consumer already has | e.g. `zustand`, `zod` if a package builds on them but the app owns the version |

Always pair a peer dep with a matching entry in `devDependencies` so the package can build and test locally:

```json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  }
}
```

### Quick reference

| Scenario                                                | Where it goes                          |
| ------------------------------------------------------- | -------------------------------------- |
| `react` / `react-dom` in a shared package               | `peerDependencies` + `devDependencies` |
| `react` / `react-dom` in an app                         | `dependencies`                         |
| `vite`, `typescript`, `tailwindcss`                     | `devDependencies` (everywhere)         |
| `@types/*`                                              | `devDependencies` (everywhere)         |
| `@repo/eslint-config`, `@repo/tsconfig`                 | `devDependencies`                      |
| `@repo/ui` consumed by an app at runtime                | `dependencies` in the app              |
| `zustand`, `zod` in a package that re-exports from them | `peerDependencies` + `devDependencies` |
| `zustand`, `zod` used only internally in a package      | `dependencies`                         |

---

## Tooling

### Shared ESLint config

ESLint is configured once in `packages/eslint-config` and consumed by every app and package. This avoids plugin version mismatches and keeps rules consistent across the monorepo.

```
packages/eslint-config/
  index.js        ← exports createConfig(dirname)
  package.json
```

```json
// packages/eslint-config/package.json
{
  "name": "@repo/eslint-config",
  "type": "module",
  "private": true,
  "exports": {
    ".": "./index.js"
  },
  "dependencies": {
    "@eslint/js": "catalog:",
    "eslint-plugin-import": "catalog:",
    "eslint-plugin-react-hooks": "catalog:",
    "eslint-plugin-react-refresh": "catalog:",
    "typescript-eslint": "catalog:",
    "globals": "catalog:"
  }
}
```

The config is a named export — a factory function so each consumer passes its own `dirname` for correct TypeScript project resolution:

```js
// packages/eslint-config/index.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export function createConfig(dirname) {
  return [
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
      ],
      plugins: { import: importPlugin },
      languageOptions: {
        globals: globals.browser,
        parserOptions: { tsconfigRootDir: dirname },
      },
      rules: {
        "import/no-default-export": "error",
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "import/no-cycle": ["error", { maxDepth: 2 }],
      },
    },
    // tool config files require a default export — exempt them
    {
      files: ["*.config.ts", "*.config.js", "vite.config.ts", "tailwind.config.ts"],
      rules: { "import/no-default-export": "off" },
    },
  ];
}
```

Each consuming package's `eslint.config.js`:

```js
import { defineConfig } from "eslint/config";
import { createConfig } from "@repo/eslint-config";

export default defineConfig(createConfig(import.meta.dirname));
```

Each consuming package's `package.json` only needs:

```json
{
  "devDependencies": {
    "eslint": "catalog:",
    "@repo/eslint-config": "workspace:*"
  }
}
```

Plugins live in `packages/eslint-config` — they do not need to be installed in consuming packages.

### Rules enforced automatically

| Convention                          | Rule                                             |
| ----------------------------------- | ------------------------------------------------ |
| No default exports                  | `import/no-default-export`                       |
| `type` over `interface`             | `@typescript-eslint/consistent-type-definitions` |
| `import type` for type-only imports | `@typescript-eslint/consistent-type-imports`     |
| No circular dependencies            | `import/no-cycle`                                |

### Rules enforced by convention only (no lint rule yet)

| Convention                        | Reason                                                                 |
| --------------------------------- | ---------------------------------------------------------------------- |
| Filename casing                   | no rule without `unicorn`                                              |
| `function` declaration over arrow | `func-style` is too blunt — bans arrows everywhere including callbacks |
| Filename ↔ export name parity     | needs a custom rule                                                    |
| No barrel files                   | caught indirectly by `import/no-cycle`                                 |
