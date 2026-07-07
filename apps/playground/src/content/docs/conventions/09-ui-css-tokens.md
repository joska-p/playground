---
title: UI Components — CSS Tokens
description: Using project CSS tokens instead of hardcoded colors, spacing, or radius values.
tags:
  - conventions
  - reference
---

# UI Components — CSS Tokens

## Contents

- [Rule](#rule)

## Rule

**Rule**, scoped to `packages/ui` (and any package built the same way, like a standalone component library).

- Components must use project CSS tokens. No hardcoded colors, spacing, or radius values.
- Use Tailwind utility classes that map to tokens for **static** styling — never inline a raw hex/px value in `style` or `className`.
- For values that are only known at runtime (a dynamically computed color, say), setting a CSS custom property via `style` is the sanctioned exception — see [Dynamic Tailwind Colors](./11-dynamic-tailwind-colors.md). That's a different case from hardcoding a static value; both rules can be true at once.
- When adding a new design decision, define a token first.
- Prefer Tailwind scale values over arbitrary ones (`text-xs` over `text-[11px]`). If you reach for an arbitrary value, ask yourself if a token is missing first.
