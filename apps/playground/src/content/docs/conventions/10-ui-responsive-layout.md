---
title: 'UI Components — Responsive Layout'
description: 'Preferring CSS Grid and intrinsic layout over breakpoint-driven layout.'
category: 'conventions'
tags:
  - reference
---

# UI Components — Responsive Layout

## Contents

- [Default choice and exceptions](#default-choice-and-exceptions)
- [Intrinsic layout](#intrinsic-layout)

## Default choice and exceptions

**Guideline** — a strong default, not a ban on Flexbox or breakpoints.

**Default Choice:** Use CSS Grid (Tailwind: `grid`, `grid-cols-*`, etc.) for all layout structures.
**Rationale:** Grid provides explicit control over both axes, better gap handling, and simpler responsive design.

**Exceptions:** Use Flexbox (`flex`, `justify-*`, `items-*`) for:

- Single-axis alignment (e.g., navbars, button groups).
- Dynamic or wrapping content (e.g., tag lists).

## Intrinsic layout

Prefer **intrinsic layout** over breakpoint-driven layout for typography. Let content reflow based on available space — not a fixed viewport width.

- Use `repeat(auto-fit, minmax(..., 1fr))` for grids that reflow naturally. Use `auto-fill` when empty tracks should be preserved (e.g. to maintain grid alignment), `auto-fit` when they should collapse.
- Use `clamp()` for fluid typography and spacing instead of overriding values at breakpoints.
- If a value is reused, define it as a token in `@theme` rather than repeating the arbitrary value:

  ```css
  @theme {
    --text-fluid-base: clamp(1rem, 2.5vw, 1.5rem);
    --grid-cols-cards: repeat(auto-fit, minmax(200px, 1fr));
  }
  ```

- In JSX, use Tailwind's arbitrary value syntax to keep intrinsic layout out of `style`:

  ```tsx
  // ✅ Intrinsic grid — reflows without breakpoints
  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4" />

  // ✅ Fluid type with clamp
  <p className="text-[clamp(1rem,2.5vw,1.5rem)]" />

  // ❌ Breakpoint-switching column counts
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
  ```

- Breakpoints (`sm:`, `md:`, `lg:`) are a last resort — only when the layout genuinely cannot adapt intrinsically. If you're writing a responsive prefix to change a column count or font size, ask whether `minmax()` or `clamp()` solves it first.
