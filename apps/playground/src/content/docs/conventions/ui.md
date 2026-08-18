---
title: UI Components
description: CSS tokens, responsive layout, and dynamic Tailwind colors.
tags:
    - conventions
    - reference
---

# UI Components

## CSS tokens

**Rule**, scoped to `packages/ui` (and any package built the same way).

- **Do** use project CSS tokens via Tailwind utility classes for **static** styling.
- **Don't** hardcode colors, spacing, or radius values in `style` or `className`.
- **Do** define a token before adding a new design decision.
- **Do** prefer Tailwind scale values over arbitrary ones (`text-xs` over `text-[11px]`). If you reach for an arbitrary value, ask yourself if a token is missing first.

For values only known at runtime (a dynamically computed color), setting a CSS custom property via `style` is the sanctioned exception — see [Dynamic colors](#dynamic-colors) below. That's a different case from hardcoding a static value; both rules can be true at once.

## Responsive layout

**Guideline** — a strong default, not a ban on Flexbox or breakpoints.

- **Do** use CSS Grid (`grid`, `grid-cols-*`) for all layout structures.
- **Do** use Flexbox (`flex`, `justify-*`, `items-*`) for single-axis alignment (navbars, button groups) or dynamic/wrapping content (tag lists).

### Intrinsic layout

- **Do** prefer intrinsic layout over breakpoint-driven layout for typography.
- **Do** use `repeat(auto-fit, minmax(..., 1fr))` for grids that reflow naturally. Use `auto-fill` when empty tracks should be preserved, `auto-fit` when they should collapse.
- **Do** use `clamp()` for fluid typography and spacing instead of overriding values at breakpoints.
- **Do** define reused values as tokens in `@theme` rather than repeating arbitrary values:

```css
@theme {
    --text-fluid-base: clamp(1rem, 2.5vw, 1.5rem);
    --grid-cols-cards: repeat(auto-fit, minmax(200px, 1fr));
}
```

- **Do** use Tailwind's arbitrary value syntax in JSX to keep intrinsic layout out of `style`:

```tsx
// ✅ Intrinsic grid — reflows without breakpoints
<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4" />

// ✅ Fluid type with clamp
<p className="text-[clamp(1rem,2.5vw,1.5rem)]" />

// ❌ Breakpoint-switching column counts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
```

- **Don't** reach for breakpoints (`sm:`, `md:`, `lg:`) until the layout genuinely cannot adapt intrinsically.

## Dynamic colors

Use CSS variables set via `style` + Tailwind's CSS variable shorthand:

```tsx
// ✅ Tailwind v4
<div
  style={{ '--color-primary': dynamicValue }}
  className="text-(--color-primary)"
/>

// ❌
<div style={{ color: dynamicValue }} />
```
