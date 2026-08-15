---
name: ui-styling
description: Use when writing CSS/Tailwind styling for @repo/ui components, using design tokens, dynamic color variables, or intrinsic layout grids.
---

# UI Styling

## Tokens & Styling

- **Tokens only:** No hardcoded hex/px. Use `text-xs`, not `text-[11px]`.
- **Dynamic Colors:** Never `style={{ color: val }}`. Inject the token variable locally:
  `<div style={{ '--accent': val }} className="text-accent bg-accent/10" />`[cite: 1]

## Layout Hierarchy

- **Grid by default:** Use `grid` + `grid-cols-*`.
- **Flexbox boundary:** Only for single-axis alignment (navbars) or text wrap (tags).
- **Intrinsic design:** Favor `minmax()` grids over breakpoint overrides (`md:`, `lg:`).
  `className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))]"`
