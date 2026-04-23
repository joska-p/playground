# UI Component Guidelines

Guidelines for building consistent, accessible, and performant UI components in `@repo/ui`.

---

## Core Principles

### 1. Stateless-First

Components should be stateless by default. Use local state only when:
- User interaction requires immediate feedback (loading spinners, toggles)
- The component is an interactive widget (slider, select dropdown)

Static content and presentational components should accept all data via props.

### 2. Theme-Aware, Not Theme-Dependent

- Use CSS custom properties (`--background`, `--foreground`, etc.)
- Never hardcode colors — use design tokens
- Theme is applied externally via CSS or Astro

### 3. Composition Over Configuration

- Small, composable primitives
- Flexible via props (variant, size, etc.)
- Consumer controls layout and composition

---

## Component API Pattern

### File Structure

```
components/MyComponent/
├── MyComponent.tsx          # Main implementation
├── MyComponent.module.css   # Scoped styles (if needed)
├── MyComponent.stories.tsx # Storybook stories
├── MyComponent.test.tsx    # Tests (optional)
└── index.ts                 # Barrel export
```

### Variants with CVA

Use `class-variance-authority` for variant management:

```tsx
// MyComponent.tsx
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn.js";

const myComponentVariants = cva(
  "inline-flex items-center justify-center rounded-md font-sans transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-transparent",
        ghost: "hover:bg-foreground/5",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface MyComponentProps extends React.ComponentProps<"button"> {
  variant?: VariantProps<typeof myComponentVariants>["variant"];
  size?: VariantProps<typeof myComponentVariants>["size"];
}
```

### Export Pattern

```tsx
// index.ts
export { MyComponent, myComponentVariants } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

---

## Accessibility

### Baseline Requirements

- **Buttons**: Use `<button>` for actions, `<a>` for navigation
- **Inputs**: Always include `<label>` (or `aria-label` for icon-only)
- **Icons**: Icon-only buttons need `aria-label`
- **Interactive elements**: Must have visible focus state (`focus-visible:ring-*`)
- **Images**: Include `alt` text (or `alt=""` for decorative)

### Focus States

- Never use `outline: none` without replacement
- Use `:focus-visible` for focus rings (not :focus)
- Match platform conventions:

```tsx
className={cn(
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "focus-visible:outline-none",
  className
)}
```

---

## Forms

### Input Pattern

```tsx
<label className="block text-sm font-medium text-foreground">
  Email
  <input
    type="email"
    name="email"
    autocomplete="email"
    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
  />
</label>
```

### Best Practices

- Use correct `type` (`email`, `tel`, `number`)
- Include `autocomplete` for browsers
- Provide `placeholder` with example (end with `…`)
- Handle errors inline, next to field

---

## Animation

### Performance

- Animate only `transform` and `opacity` (compositor-friendly)
- Never `transition: all` — list properties explicitly
- Set `transform-origin` for rotations

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

Or in component:
```tsx
className={cn(
  "transition-transform duration-150 ease-out",
  prefersReducedMotion && "transition-none"
)}
```

---

## Astro Integration

### Static Rendering

Stateless components render as static HTML. Use in Astro islands:

```astro
---
import { Button } from "@repo/ui";
---

<Button client:visible>Click me</Button>
```

### Theme Aware

Components use CSS variables, so theme works automatically:

```astro
<html data-theme="dark">
  <body class="bg-background text-foreground">
    <!-- Components inherit theme -->
  </body>
</html>
```

### Islands Strategy

- Use `client:visible` for interactive components
- Use `client:idle` for lower priority
- Static (default) for purely presentational

---

## Typography

- Use ellipsis `…` not three dots `...`
- Use curly quotes `"` `"` not straight `"` `
- Use non-breaking spaces for units: `10 MB`, `Cmd K`
- Use `text-wrap: balance` on headings

---

## Performance

- Virtualize lists > 50 items
- Avoid layout reads in render (`getBoundingClientRect`)
- Prefer uncontrolled inputs (no `onChange` on every keystroke if not needed)

---

## Testing Checklist

Before considering a component complete:

- [ ] Passes TypeScript check: `pnpm check-types`
- [ ] Passes lint: `pnpm lint`
- [ ] Has Storybook stories showing all variants
- [ ] Keyboard accessible
- [ ] Focus states visible
- [ ] Works in light and dark mode
- [ ] Reduced motion respected