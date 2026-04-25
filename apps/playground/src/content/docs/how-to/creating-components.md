---
title: "Creating Components"
description: "Build UI components in the shared library."
type: "how-to"
order: 2
---

# Creating Components

> Want to build a new UI component? Let's do it right.

---

## File Structure

```
packages/ui/src/components/MyComponent/
├── MyComponent.tsx          # Main implementation
├── MyComponent.stories.tsx # Storybook stories
├── index.ts               # Barrel export
└── myComponentVariants.ts # CVA variants (optional)
```

## Step-by-Step

### Step 1: Create the Folder

```bash
mkdir -p packages/ui/src/components/MyComponent
```

### Step 2: Define Variants (CVA)

```tsx
// myComponentVariants.ts
import { cva } from "class-variance-authority";

export const myComponentVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        small: "h-8 px-3 text-xs",
        medium: "h-10 px-4",
        large: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);
```

### Step 3: Build the Component

```tsx
// MyComponent.tsx
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { myComponentVariants } from "./myComponentVariants.js";

interface MyComponentProps
  extends ComponentProps<"button">, VariantProps<typeof myComponentVariants> {}

function MyComponent({ ref, className, variant, size, ...props }: MyComponentProps) {
  return (
    <button
      className={cn(myComponentVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}

export { MyComponent, myComponentVariants };
```

### Step 4: Export It

```ts
// index.ts
export { MyComponent, myComponentVariants } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

### Step 5: Add to Package Barrel

In `packages/ui/src/index.ts`, add:

```ts
export * from "./components/MyComponent";
```

## Storybook Stories

```tsx
// MyComponent.stories.tsx
import type { StoryObj } from "@storybook/react";

export default {
  title: "Components/MyComponent",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "destructive"],
      control: { type: "select" },
    },
  },
};

export const Primary: StoryObj = {
  args: {
    variant: "primary",
    children: "Click me",
  },
};

export const Secondary: StoryObj = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};
```

> **Tip:** Run `cd apps/storybook && pnpm dev` to see your stories (port 6006).

## Checklist

Before calling it done:

- [ ] TypeScript check passes: `pnpm check-types`
- [ ] Lint passes: `pnpm lint`
- [ ] All variant stories created
- [ ] Focus states work: `focus-visible:ring-*`
- [ ] Works in light AND dark mode

## Standard Variants

Every component should support:

| Variant       | Usage                 |
| ------------- | --------------------- |
| `primary`     | Main action (default) |
| `secondary`   | Alternative actions   |
| `accent`      | Highlights            |
| `destructive` | Delete, reset, danger |
| `outline`     | Secondary with border |
| `ghost`       | Minimal, tertiary     |

## Utility: cn()

All components use `cn()` for class merging:

```tsx
import { cn } from "../../utils/cn.js";

// Usage
className={cn("base-class", condition && "conditional")}
className={cn("base", { "active": isActive })}
```
