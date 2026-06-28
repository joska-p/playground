---
title: 'Adding Components'
description: 'Add new UI components to the shared library.'
category: 'how-to'
tags:
  - how-to
featured: true
---

# Adding Components

## File Structure

```
packages/ui/src/components/button/
├── Button.tsx              # Component (PascalCase.tsx)
└── buttonVariants.ts       # CVA variants (camelCase.ts)
```

Simple components can live as a single file without a folder. For anything with variants, helpers, types, or styles, group them in a kebab-case directory:

```
packages/ui/src/components/color-palette/
├── ColorPalette.tsx
├── colorPaletteVariants.ts
├── colorPalette.types.ts
├── colorPalette.schema.ts
└── ColorPalette.test.tsx
```

There are **no barrel files** (`index.ts`). Components are exported via `package.json` `exports` subpaths.

---

## Step 1: Define Variants

Use `class-variance-authority` (CVA) for variant management.

```typescript
// buttonVariants.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md  text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border-border hover:bg-foreground/5 hover:text-foreground border bg-transparent',
        ghost: 'hover:bg-foreground/10 hover:text-foreground'
      },
      size: {
        small: 'h-8 px-3 text-xs',
        medium: 'h-10 px-4 py-2',
        large: 'h-12 px-8 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium'
    }
  }
);
```

## Step 2: Build the Component

Use `type` for props (never `interface`). Export with a named export — the identifier must match the filename exactly.

```typescript
// Button.tsx
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./buttonVariants";

type ButtonProps = {
  isLoading?: boolean;
} & ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function Button({
  ref,
  className,
  children,
  variant,
  size,
  isLoading,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      ref={ref}
      disabled={isLoading ?? disabled}
      {...props}
    >
      {isLoading ? <span className="flex items-center gap-2">...</span> : children}
    </button>
  );
}

export { Button };
```

React components use `function` declaration, never `const Component = () =>`.

---

## Step 3: Register the Export

The public API is declared in `packages/ui/package.json` under `exports`. Add an entry per component:

```json
{
  "exports": {
    "./Button": "./src/components/button/Button.tsx",
    "./buttonVariants": "./src/components/button/buttonVariants.ts"
  }
}
```

Internal files not listed in `exports` are private by default — do not import them across packages.

---

## Step 4: Add Stories

Stories live in `apps/storybook/` and are **not co-located**. Mirror the source structure:

```
apps/storybook/src/stories/button/
└── Button.stories.tsx
```

Import from the package subpath:

```typescript
// apps/storybook/src/stories/button/Button.stories.tsx
import { Button } from '@repo/ui/Button';
import type { Meta } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'accent', 'destructive', 'outline', 'ghost'],
      control: { type: 'select' }
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'select' }
    }
  },
  args: { onClick: fn(), children: 'Button Text' }
};

export default meta;

export const Primary = {
  args: { variant: 'primary' }
};

export const Secondary = {
  args: { variant: 'secondary', children: 'Secondary Action' }
};
```

Story file naming matches the component: `Button.stories.tsx` for `Button.tsx`.

---

## Standard Variants

| Variant       | Usage                  |
| ------------- | ---------------------- |
| `primary`     | Main action (default)  |
| `secondary`   | Alternative action     |
| `accent`      | Highlights             |
| `destructive` | Delete, danger         |
| `outline`     | Secondary with border  |
| `ghost`       | Minimal, no background |

## Standard Sizes

| Size     | Usage             |
| -------- | ----------------- |
| `small`  | Compact UI        |
| `medium` | Default           |
| `large`  | Emphasis          |
| `icon`   | Square, icon-only |

## Checklist

- [ ] Variants exported in a separate `camelCaseVariants.ts` file
- [ ] Props use `type`, never `interface`
- [ ] Component uses `function` declaration, not arrow
- [ ] Stories in `apps/storybook/src/stories/` (not co-located)
- [ ] Stories import from `@repo/ui/ComponentName`
- [ ] Component registered in `package.json` `exports`
- [ ] Works in light AND dark mode
- [ ] Focus states: `focus-visible:ring-*`

Components? Check [Storybook](/storybook/) for live examples.
