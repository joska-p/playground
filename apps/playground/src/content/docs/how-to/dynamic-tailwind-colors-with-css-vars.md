---
title: Dynamic Tailwind Colors with CSS Variables
description: Use CSS custom properties to apply dynamic colors via Tailwind v4's arbitrary value syntax.
tags:
  - how-to
---

# Dynamic Tailwind Colors with CSS Variables

Tailwind v4's JIT compiler scans source files for complete class name strings at build time. Dynamically constructed names like `bg-${color}` or `border-l-${variable}` are invisible to the scanner and produce no output.

The workaround: set a CSS custom property via inline `style` and reference it with Tailwind's `(--prop)` arbitrary value syntax.

## Step 1: Map types to CSS variable references

Define a lookup that returns a `var(--token)` string, not a Tailwind class name:

```typescript
const TYPE_ACCENT: Record<string, string> = {
  pixel: 'var(--utility-6)',
  neighborhood: 'var(--utility-3)',
  whole: 'var(--utility-2)',
  pipeline: 'var(--utility-1)'
};
```

These strings are plain CSS — no Tailwind scanning involved.

## Step 2: Set the variable on a parent element

Use inline `style` to inject the CSS custom property. The `as React.CSSProperties` cast avoids TypeScript complaints about custom property names.

```tsx
<div
  className="space-y-6"
  style={
    {
      '--accent': TYPE_ACCENT[manip.type] ?? 'var(--utility-4)'
    } as React.CSSProperties
  }
>
  ...
</div>
```

## Step 3: Use the variable in Tailwind classes

Reference `--accent` anywhere in the subtree with Tailwind v4's parenthetical arbitrary value syntax. These class names are fully static — the JIT compiles them ahead of time.

```tsx
{
  /* Background */
}
<span className="bg-(--accent) text-white ...">PIXEL</span>;

{
  /* Border left */
}
<div className="border-l-2 border-l-(--accent) ...">How It Works</div>;

{
  /* Border bottom */
}
<h3 className="border-b-2 border-b-(--accent) ...">Section Title</h3>;
```

For side-by-side context, here's the **wrong** approach (JIT-invisible) and the **correct** one:

```typescript
// ❌ JIT never sees "bg-utility-6" — variable is interpolated at runtime
const color = "utility-6";
<div className={`bg-${color}`} />

// ✅ JIT sees "bg-(--accent)" — the var() resolves at runtime in the browser
const color = "var(--utility-6)";
<div style={{ "--accent": color } as React.CSSProperties} className="bg-(--accent)" />
```

## Supported properties

Any Tailwind utility that accepts a color value works with `(--prop)`:

| Utility       | Syntax                                     |
| ------------- | ------------------------------------------ |
| Text color    | `text-(--accent)`                          |
| Background    | `bg-(--accent)`                            |
| Border color  | `border-(--accent)`, `border-l-(--accent)` |
| Border bottom | `border-b-(--accent)`                      |
| Ring          | `ring-(--accent)`                          |
| Outline       | `outline-(--accent)`                       |
| Divide        | `divide-(--accent)`                        |
| Shadow        | `shadow-(--accent)`                        |
| Decoration    | `decoration-(--accent)`                    |
| Accent        | `accent-(--accent)`                        |
| Caret         | `caret-(--accent)`                         |

The variable name is arbitrary — `--accent`, `--card-accent`, `--brand` — as long as the inline style and the class reference match.
