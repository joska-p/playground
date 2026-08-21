---
title: UI Components
description: CSS tokens, responsive layout, and dynamic Tailwind colors.
tags:
    - conventions
    - reference
---

# UI Components

## CSS tokens

Static styling in `packages/ui` (and any package built the same way) flows through project CSS tokens via Tailwind utility classes. A new design decision starts with a token. Tailwind scale values cover most cases (`text-xs` over `text-[11px]`); reaching for an arbitrary value points at a missing token.

Values known only at runtime, such as a dynamically computed color, travel through CSS custom properties set via `style`; see [Dynamic colors](#dynamic-colors) below.

## Responsive layout

CSS Grid (`grid`, `grid-cols-*`) structures layout. Flexbox (`flex`, `justify-*`, `items-*`) aligns single axes (navbars, button groups) and dynamic or wrapping content (tag lists).

### Intrinsic layout

Typography and grids adapt intrinsically, so the same markup reflows across viewports:

- `repeat(auto-fit, minmax(..., 1fr))` builds grids that reflow naturally; `auto-fill` preserves empty tracks, `auto-fit` collapses them.
- `clamp()` scales fluid typography and spacing continuously.
- Reused values become tokens in `@theme`:

```css
@theme {
    --text-fluid-base: clamp(1rem, 2.5vw, 1.5rem);
    --grid-cols-cards: repeat(auto-fit, minmax(200px, 1fr));
}
```

- Tailwind's arbitrary value syntax keeps intrinsic layout in JSX classes:

```tsx
// intrinsic grid, reflows without media queries
<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4" />

// fluid type with clamp
<p className="text-[clamp(1rem,2.5vw,1.5rem)]" />
```

Intrinsic adaptation handles density and reflow; a breakpoint enters when the design changes structure rather than scale.

## Dynamic colors

Runtime colors flow through a CSS variable plus Tailwind's variable shorthand:

```tsx
<div
    style={{ '--var-x': dynamicValue }}
    className="text-(--var-x)"
/>
```
