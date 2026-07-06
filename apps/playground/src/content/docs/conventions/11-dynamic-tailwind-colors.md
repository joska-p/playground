---
title: 'Dynamic Tailwind Colors'
description: 'Applying dynamic colors via CSS variables and the Tailwind v4 shorthand.'
category: 'conventions'
tags:
  - reference
---

# Dynamic Tailwind Colors

## Contents

- [Rule](#rule)

## Rule

Use CSS variables set via `style` + Tailwind's CSS variable shorthand to apply dynamic colors:

```tsx
// ✅ Tailwind v4
<div
  style={{ '--color-primary': dynamicValue }}
  className="text-(--color-primary)"
/>

// ❌
<div style={{ color: dynamicValue }} />
```

See `apps/playground/src/content/docs/explanation/dynamic-tailwind.md` for the full explanation.
