---
title: "Codebase Conventions"
description: "Naming rules, function syntax, and architectural patterns used across the project."
category: "explanation"
tags:
  - explanation
---

# Codebase Conventions

This page explains the reasoning behind the project conventions. For the complete authoritative reference see [`CONVENTIONS.md`] at the project root.

---

## Naming Conventions

### Files and directories

Every file type has a fixed casing rule. The rule exists so tooling (glob patterns, import resolvers) can predict file locations without looking inside.

| Entity                 | Convention             | Example                    |
| ---------------------- | ---------------------- | -------------------------- |
| Directories            | kebab-case             | `color-palette/`           |
| React component files  | `PascalCase.tsx`       | `Button.tsx`               |
| Astro component files  | `kebab-case.astro`     | `section-header.astro`     |
| Hook files             | `camelCase.ts`         | `useResizeObserver.ts`     |
| Zustand store files    | `camelCase.ts`         | `sequenceStore.ts`         |
| Utility / core files   | `camelCase.ts`         | `generateSequence.ts`      |
| Zod schema files       | `camelCase.schema.ts`  | `colorPalette.schema.ts`   |
| Type-only files        | `camelCase.types.ts`   | `colorPalette.types.ts`    |
| CSS files              | `kebab-case.css`       | `gruvbox-theme.css`        |
| Test files             | same as subject        | `Button.test.tsx`          |
| Story files            | same as subject        | `Button.stories.tsx`       |
| Content / docs         | kebab-case             | `first-visualization.md`   |

### Identifiers in code

| Identifier                  | Convention             | Example                  |
| --------------------------- | ---------------------- | ------------------------ |
| Variables, functions        | camelCase              | `fetchPalettes`          |
| React components            | PascalCase             | `Button`                 |
| Hooks                       | `use` + camelCase      | `useImageUpload`         |
| Zustand store variable      | camelCase + `Store`    | `sequenceStore`          |
| Zustand getter hooks        | `use` + Domain + Slice | `useSequenceSteps`       |
| Zustand setter functions    | camelCase verb + noun  | `setSequenceSteps`       |
| Props types                 | `XxxProps`             | `ButtonProps`            |
| Module-level constants      | SCREAMING_SNAKE_CASE   | `MAX_RETRIES`            |
| Zod schemas                 | camelCase + `Schema`   | `colorPaletteSchema`     |
| TypeScript types            | PascalCase             | `ColorPalette`           |

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

- Store variable is private to its file — never exported
- Getter hooks select exactly one property, never the whole state object
- Setter functions are plain functions (no `use` prefix, no hook rules)
- Store files are `.ts` only — no JSX

This decouples consumers from the store shape. Internals can be refactored without touching call sites.

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

## Test Conventions

- Test files use `.test.ts` / `.test.tsx` in the same folder as the subject
- Test file base name matches the subject file base name exactly
- Schema tests use `.schema.test.ts`

```
ColorPalette.tsx          → ColorPalette.test.tsx
colorPalette.schema.ts    → colorPalette.schema.test.ts
buttonVariants.ts         → buttonVariants.test.ts
```

There is no shared test utils package yet. Keep test helpers co-located with the feature.

---

## Tailwind & CSS Approach

The project uses Tailwind utility classes by default for layout, spacing, color, and typography.

**CSS Modules** (`*.module.css`) are reserved for styles that utilities cannot express: complex animations, pseudo-element tricks, or deeply scoped third-party overrides.

**Global CSS** is limited to base resets and CSS custom properties (design tokens) declared in a single `global.css` per app.

Do not mix Tailwind and inline `style={{}}` props for the same concern.

---

## Package Exports

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

There are no barrel files (`index.ts`). Internal files not listed in `exports` are private by default.

---

[`CONVENTIONS.md`]: https://github.com/your-org/creative-playground/blob/main/CONVENTIONS.md
