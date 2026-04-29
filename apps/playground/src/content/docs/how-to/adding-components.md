---
title: "Adding Components"
description: "Add new UI components to the shared library."
tags:
  - how-to
featured: true
---

# Adding Components

## File Structure

```
packages/ui/src/components/MyComponent/
├── MyComponent.tsx          # Main implementation
├── MyComponent.stories.tsx # Storybook stories
├── index.ts               # Barrel export
└── myComponentVariants.ts # CVA variants
```

## Step 1: Define Variants

Use `class-variance-authority` (CVA) for variant management.

```typescript
// myComponentVariants.ts
import { cva } from "class-variance-authority";

export const myComponentVariants = cva("base classes here", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
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
});
```

## Step 2: Build the Component

```typescript
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

## Step 3: Export It

```typescript
// index.ts
export { MyComponent, myComponentVariants } from "./MyComponent";
```

## Step 4: Add Stories

Create `apps/storybook/src/stories/MyComponent/myComponent.stories.tsx`:

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MyComponent } from "@repo/ui";
import { fn } from "storybook/test";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "accent", "destructive", "outline", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
  },
  args: {
    onClick: fn(),
    children: "My Component",
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading...",
  },
};
```

## Step 5: Add to Package

In `packages/ui/src/index.ts`:

```typescript
export { MyComponent } from "./components/MyComponent/MyComponent.js";
export { myComponentVariants } from "./components/MyComponent/myComponentVariants.js";
```

Use explicit named exports in package entrypoints. Do not use `export *` in public package APIs.

## Standard Variants

| Variant       | Usage                  |
| ------------- | ---------------------- |
| `primary`     | Main action (default)  |
| `secondary`   | Alternative action     |
| `accent`      | Highlights             |
| `destructive` | Delete, danger         |
| `outline`     | Secondary with border  |
| `ghost`       | Minimal, no background |

## Checklist

- [ ] All variants have stories in Storybook (Step 4)
- [ ] Stories are documented with JSDoc comments
- [ ] Works in light AND dark mode
- [ ] Focus states: `focus-visible:ring-*`
- [ ] PropTypes via `ComponentProps<"element">` pattern

Components? Check [Storybook](/storybook/) for live examples.
