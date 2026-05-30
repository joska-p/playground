---
title: "Codebase Conventions"
description: "Architecture, naming, and coding patterns used across the project."
category: "explanation"
tags:
  - explanation
---

# Codebase Conventions

This page explains the reasoning behind the project conventions. For the authoritative terse reference (agent-readable rules only, no rationale) see [`CONVENTIONS.md`] at the project root.

---

## Architecture

The codebase follows a strict three-layer unidirectional dependency flow:

```
Presentation Layer  →  State Orchestration Layer  →  Core Domain Engine
```

Dependencies point **downward only**:

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects. Framework-agnostic by design.
- **State Orchestration Layer** — Zustand stores that bridge the UI and core. Deterministic actions read from core and write to state.
- **Presentation Layer** — thin orchestrators that read state and dispatch events. No business logic.

This ensures the core engine is testable in isolation and UI frameworks can be swapped without touching domain logic.

---

## Monorepo Structure

```
apps/
  playground/    ← Astro site (docs, experiments, notebook)
  storybook/     ← Standalone Storybook
packages/
  ui/            ← Shared React component library
  ...            ← Other shared packages (Vite + React)
```

Cross-package imports use `@repo/` path aliases only — never relative paths that cross package boundaries.

---

## Naming Conventions

### Files and directories

Every file type has a fixed casing rule so tooling (glob patterns, import resolvers) can predict file locations without looking inside.

| Entity                | Convention            | Example                  |
| --------------------- | --------------------- | ------------------------ |
| Directories           | kebab-case            | `color-palette/`         |
| React component files | `PascalCase.tsx`      | `Button.tsx`             |
| Astro component files | `kebab-case.astro`    | `section-header.astro`   |
| Hook files            | `camelCase.ts`        | `useResizeObserver.ts`   |
| Zustand store files   | `camelCase.ts`        | `sequenceStore.ts`       |
| Utility / core files  | `camelCase.ts`        | `generateSequence.ts`    |
| Zod schema files      | `camelCase.schema.ts` | `colorPalette.schema.ts` |
| Type-only files       | `camelCase.types.ts`  | `colorPalette.types.ts`  |
| CSS files             | `kebab-case.css`      | `gruvbox-theme.css`      |
| Test files            | same as subject       | `Button.test.tsx`        |
| Story files           | same as subject       | `Button.stories.tsx`     |
| Content / docs        | kebab-case            | `first-visualization.md` |

### Identifiers in code

| Identifier               | Convention             | Example              |
| ------------------------ | ---------------------- | -------------------- |
| Variables, functions     | camelCase              | `fetchPalettes`      |
| React components         | PascalCase             | `Button`             |
| Hooks                    | `use` + camelCase      | `useImageUpload`     |
| Zustand store variable   | camelCase + `Store`    | `sequenceStore`      |
| Zustand getter hooks     | `use` + Domain + Slice | `useSequenceSteps`   |
| Zustand setter functions | camelCase verb + noun  | `setSequenceSteps`   |
| Props types              | `XxxProps`             | `ButtonProps`        |
| Module-level constants   | SCREAMING_SNAKE_CASE   | `MAX_RETRIES`        |
| Zod schemas              | camelCase + `Schema`   | `colorPaletteSchema` |
| TypeScript types         | PascalCase             | `ColorPalette`       |

### Semantics

Functions are **verbs** — `regenerateMosaicTiles`, not `updateTiles`. Avoid generic `update*` — "update what, how?"
Components are **nouns** — `MosaicDisplay`, `Controls`, `Button`.
No re-aliasing without reason: don't create `const x = y` just to rename.

### Filename-export parity

The primary exported identifier must match the filename exactly (case-sensitive):

```typescript
// Button.tsx → exports Button, ButtonProps
// sequenceStore.ts → exports useSequenceSteps, setSequenceSteps
// colorPalette.schema.ts → exports colorPaletteSchema
```

This makes imports predictable: if you need `useSequenceSteps`, you know the file is `sequenceStore.ts`.

---

## Function Syntax

React components and top-level named functions use `function` declarations. Arrow functions are reserved for inline callbacks and one-liner utilities.

```typescript
// ✅ React component — function declaration
export function Button({ label, onClick }: ButtonProps): JSX.Element {
  const handleClick = (e: React.MouseEvent) => {  // ✅ inline callback — arrow
    e.stopPropagation();
    onClick();
  };
  return <button onClick={handleClick}>{label}</button>;
}

// ✅ top-level util — function declaration
export function fetchPalettes(id: string): Promise<ColorPalette> { ... }

// ✅ one-liner — arrow is fine
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
```

Why `function` declarations?

- **Generics are clean**: `function Component<T>()` avoids the TSX workaround `const Component = <T,>() =>`
- **DevTools**: React DevTools always resolves `function` names correctly
- **Hoisting**: helpers can sit below the main export without forward references

Return types are inferred by default. Annotate explicitly for React components (`JSX.Element | null`) and async functions with a meaningful return shape.

---

## File Structure

- **One conceptual unit per directory.** A directory needs 2+ files; otherwise place the file in the parent.
- **Group by domain, not by type.** Controls live in `controls/`, tiles live in `tiles/`. No top-level `components/`, `hooks/`, `utils/` directories — that's organisation by type, not domain.
- **`core/`** — constants, types, pure data. No React, no store, no side effects.
- **`store/`** — split into `store.ts`, `actions.ts`, `selectors.ts`, and optionally `types.ts`.
- **`utils/`** — one file per clear purpose. No catch-all files (`utils.ts`, `paletteUtils.ts`).

### Component folders

For non-trivial components, group related files in a kebab-case folder:

```
color-palette/
  ColorPalette.tsx              ← component (PascalCase)
  colorPaletteVariants.ts       ← helper data / variants (camelCase)
  colorPalette.types.ts         ← TS types
  colorPalette.schema.ts        ← Zod schema (if needed)
  ColorPalette.test.tsx         ← tests
  color-palette.module.css      ← CSS module (if needed)
```

Simple, self-contained components can live as a single file without a folder.

---

## Exports

### In-code

- **Named exports only.** No `export default`.
- **Filename must match the primary exported identifier** (case-sensitive).
- **No barrel files** (`index.ts`). Import directly from the source file. Barrels cause circular dependencies and slow down the TypeScript server.
- **No wildcard re-exports** (`export * from`). Always list identifiers explicitly.

### Package exports in `package.json`

The public API of every package is declared in its `package.json` `exports` field — one subpath per public component:

```json
{
  "exports": {
    "./Button": "./src/components/button/Button.tsx",
    "./styles": "./src/styles/styles.css"
  }
}
```

Consumers import via subpath:

```typescript
import { Button } from "@repo/ui/Button";
```

Do not use `require` / `import` / `types` conditions when all three point to the same source — omit them entirely.
The `./styles` subpath for CSS is the only exception to the component-per-subpath rule.
Internal files not listed in `exports` are private by default — do not import them across packages.

---

## Zustand Store Pattern

State management follows a store-per-domain pattern designed for refactorability.

### The pattern

The store itself is **never exported**. Consumers interact only through getter hooks and setter functions:

```typescript
// sequenceStore.ts — file name: camelCase.ts
const sequenceStore = create<SequenceState>(() => ({
  sequenceRule: recamanRule,
  steps: 2,
  visualizationId: "recaman-arcs",
  sequence: [],
}));

// Getter — reactive hook, selects one slice
export function useSequenceSteps(): number {
  return sequenceStore((s) => s.steps);
}

// Setter — plain function, callable from event handlers or other stores
export function setSequenceSteps(steps: number) {
  sequenceStore.setState({ steps: Math.min(Math.max(steps, 2), 100) });
}
```

### Rules

- Store variable is private to its file — never exported, not even internally across files in the same feature.
- Getter hooks select exactly one slice — never return the full state object.
- Setter functions are plain functions (no `use` prefix, no hook rules) so they can be called from anywhere — event handlers, utils, other stores.
- Store files use `.ts` only — no JSX.
- Actions mutate state; selectors read it. Don't mix concerns.

This decouples consumers from the store shape. Internals can be refactored without touching call sites.

### State access & reactivity

- Subscribe to **minimal slices** — never the full store or multi-property context.
- **Heavyweight path** (structural changes — array mutations, component type changes): full component reconciliation.
- **Lightweight path** (cosmetic — colors, spacing, scalar sizes): bypass component tree, mutate design tokens or inline styles directly via targeted DOM or styling API injections.

---

## Zod Schema Pattern

Schemas are for **runtime validation only**. TypeScript types are written independently and are the source of truth for the type system.

```
features/color-palette/
├── ColorPalette.tsx
├── colorPalette.types.ts       ← TS types written manually
└── colorPalette.schema.ts      ← Zod schema (runtime validation)
```

```typescript
// colorPalette.schema.ts
import { z } from "zod";

export const colorPaletteSchema = z.object({
  id: z.string().uuid(),
  colors: z.array(z.string().regex(/^#[0-9a-f]{6}$/i)),
});
```

Do not use `z.infer<>` as the source of truth for types — it couples your type system to your validation logic and makes schema changes silently ripple through the codebase. Write TypeScript types explicitly and keep them independent.

---

## Data Hydration & Validation

- **Never block initial UI paint on network.** Provide a local fallback state immediately. Network-dependent assets must hydrate the viewport layout during cold mounts while background data resolution finishes.
- **All external payloads** must pass through Zod validation at the network boundary before entering stores.
- **Validated payloads** committed to persistent storage must carry a version flag and TTL.
- **When permuting data model attributes**, preserve insertion-order key structure — only values may change. This ensures rendering subsystems can evaluate node transitions without mapping errors.

---

## Layout Computations

Programmatic layout must align with native rendering engines. When calculating child counts to fill a container, account for platform edge cases (e.g. trailing spacing omission) to avoid off-by-one rendering gaps.

For example, `computeNumberOfTiles.ts` mirrors CSS Grid's `auto-fill` arithmetic:

```typescript
tilesPerRow = Math.floor((width + gap) / (tileSize + gap));
```

The `+ gap` in the numerator accounts for the last tile having no trailing gap, keeping JS and CSS in agreement.

---

## Performance Guardrails

- **High-frequency inputs** (resize, mouse, scroll): throttle or debounce before layout calculations. Isolate runtime calculations from layout thrashing.
- **Stable keys**: virtual lists and rendering loops must use deterministic keys derived from data properties — no random keys that trigger component unmount/remount churn.
- **Action audit**: lifecycle hooks and event managers must not cascade into duplicate calculations or execution loops.

---

## Tailwind & CSS Approach

- **Default:** Tailwind utility classes for layout, spacing, color, typography.
- **CSS Modules** (`*.module.css`) are reserved for styles that utilities cannot express: complex animations, pseudo-element tricks, or deeply scoped third-party overrides.
- **Global CSS** is limited to base resets and CSS custom properties (design tokens) declared in a single `global.css` per app.
- Do not mix Tailwind and inline `style={{}}` props for the same concern.

---

## Storybook

Stories live in `apps/storybook/stories/` — **not co-located** with components. Mirror the source package structure inside `apps/storybook/stories/`:

```
apps/storybook/stories/
  ui/
    Button.stories.tsx        ← mirrors packages/ui/src/Button.tsx
    GraphViz.stories.tsx
```

Import via `@repo/` aliases only. Story files use `[ComponentName].stories.tsx`.

---

## Tests

- Use `.test.ts` / `.test.tsx` in the same folder as the subject file.
- Test file base name must match the subject file base name exactly.
- Schema tests use `.schema.test.ts`.

```
ColorPalette.tsx          → ColorPalette.test.tsx
colorPalette.schema.ts    → colorPalette.schema.test.ts
buttonVariants.ts         → buttonVariants.test.ts
```

---

## Package Dependencies

| Scenario                                  | Where                                  |
| ----------------------------------------- | -------------------------------------- |
| `react` / `react-dom` in a shared package | `peerDependencies` + `devDependencies` |
| `react` / `react-dom` in an app           | `dependencies`                         |
| `vite`, `typescript`, `tailwindcss`       | `devDependencies` (everywhere)         |
| `@types/*`                                | `devDependencies` (everywhere)         |
| `@repo/eslint-config`, `@repo/tsconfig`   | `devDependencies`                      |
| `@repo/ui` consumed by an app at runtime  | `dependencies` in the app              |
| `zustand`, `zod` re-exported by a package | `peerDependencies` + `devDependencies` |
| `zustand`, `zod` used only internally     | `dependencies`                         |

Always pair a peer dep with a matching entry in `devDependencies` so the package can build and test locally. The monorepo has two flavours of packages — **apps** (fully bundled, dependency tree collapses at build time) and **shared packages** (consumed by other packages, must not bundle what the consumer already provides).

---

## ESLint

Enforced automatically by the shared ESLint config in `packages/eslint-config`:

| Convention                          | Rule                                             |
| ----------------------------------- | ------------------------------------------------ |
| No default exports                  | `import/no-default-export`                       |
| `type` over `interface`             | `@typescript-eslint/consistent-type-definitions` |
| `import type` for type-only imports | `@typescript-eslint/consistent-type-imports`     |
| No circular dependencies            | `import/no-cycle` (maxDepth: 2)                  |

Convention only (no lint rule yet):

| Convention                        | Reason                                 |
| --------------------------------- | -------------------------------------- |
| Filename casing                   | No rule without `unicorn`              |
| `function` over arrow (named)     | `func-style` is too blunt              |
| Filename ↔ export name parity     | Needs a custom rule                    |
| No barrel files                   | Caught indirectly by `import/no-cycle` |

---

## General Rules

- **Types are co-located** with the file that uses them. No shared `types/` package.
- **Prefer `type` over `interface`** — use `interface` only when declaration merging is required.
- **No comments** — code is self-explanatory through naming and structure.
- **No empty files.**
- **`array.sort()` mutates** — spread first for a sorted copy: `[...array].sort()`.
- **Unused code is deleted**, not commented out.

---

## Edge Cases

- **Tool config files** (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`) require a default export by the tool's spec — forced exception. The `import/no-default-export` rule is turned off for these in ESLint.
- **`package.json` `exports` field** is a Node.js resolver directive, not a JavaScript export — the named export rule doesn't apply to it.
- **WIP packages** must follow naming rules from the start. Renames are expensive once things are imported across packages.

---

[`CONVENTIONS.md`]: https://gitlab.com/jpotin/playground/blob/main/CONVENTIONS.md
