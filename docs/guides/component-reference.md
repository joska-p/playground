# Component Reference Guide

Reference patterns for building UI components in `@repo/ui`. Use Button and Input as the canonical examples.

---

## File Structure

```
components/MyComponent/
├── MyComponent.tsx        # Main implementation
├── MyComponent.stories.tsx # Storybook stories
├── index.ts               # Barrel export
└── myComponentVariants.ts # CVA variants (optional, can be inline)
```

---

## Component Pattern: Button

### Variants (`buttonVariants.ts`)

```tsx
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-mono text-sm whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-sm",
        outline: "border border-border bg-transparent hover:bg-foreground/5 hover:text-foreground shadow-sm",
        ghost: "hover:bg-foreground/10 hover:text-foreground shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
```

### Implementation (`Button.tsx`)

```tsx
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { buttonVariants } from "./buttonVariants.js";

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

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
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing…
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
```

### Key Conventions

| Pattern | Usage |
| :--- | :--- |
| `active:translate-y-[1px]` | Press effect on buttons only |
| `shadow-sm` | All variants (consistent depth) |
| `transition-colors` | Not `transition: all` |
| `font-mono text-sm` | Consistent typography |
| `h-10` | Default height |
| `rounded-md` | Border radius |

---

## Component Pattern: Input

### Variants (`inputVariants.ts`)

```tsx
import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "bg-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-border hover:border-primary/50",
        secondary: "border-secondary/50 bg-secondary/10 hover:border-secondary",
        accent: "border-accent/50 bg-accent/10 hover:border-accent",
        destructive: "border-destructive text-destructive focus-visible:ring-destructive",
        outline: "border-border bg-transparent hover:border-primary/50",
        ghost: "border-transparent bg-transparent hover:bg-foreground/5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
```

### Implementation (`Input.tsx`)

```tsx
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { inputVariants } from "./inputVariants.js";

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function Input({
  ref,
  className,
  variant,
  label,
  helperText,
  isLoading,
  startIcon,
  endIcon,
  id,
  type = "text",
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-foreground/80 text-xs font-bold tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startIcon && (
          <span className="absolute left-3 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
            {startIcon}
          </span>
        )}
        {isLoading && (
          <span className="absolute left-3 text-muted-foreground">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={isLoading || disabled}
          className={cn(
            inputVariants({ variant, className }),
            (startIcon || isLoading) && "pl-10",
            endIcon && "pr-10"
          )}
          {...props}
        />
        {endIcon && !isLoading && (
          <span className="absolute right-3 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
            {endIcon}
          </span>
        )}
      </div>
      {helperText && (
        <p
          className={cn(
            "text-xs italic",
            variant === "destructive" ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Input };
```

### Key Conventions

| Pattern | Usage |
| :--- | :--- |
| `useId` from React | Accessible ID generation |
| `shadow-sm` | Input depth (no press effect) |
| `transition-colors` | List properties explicitly |
| `pl-10` / `pr-10` | Icon padding compensation |
| `absolute` positioning | Icons inside input |
| `aria-hidden` icons | If decorative |

---

## Loading Spinner Pattern

Reused across components:

```tsx
<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
    fill="none"
  />
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>
```

Key points:
- `h-4 w-4` — Consistent spinner size
- `animate-spin` — Tailwind animation
- `currentColor` — Inherits text color
- Placeholder text ends with `…` not `...`

---

## Icon Pattern

### Icon Component Pattern

```tsx
function MyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* paths */}
    </svg>
  );
}
```

### Icon Positioning

| Position | Container | Padding on Input |
| :--- | :--- | :--- |
| Start | `absolute left-3` | `pl-10` |
| End | `absolute right-3` | `pr-10` |

Icon styling:
```tsx
[&_svg]:size-4 [&_svg]:shrink-0
```

---

## Disabled State Pattern

Always disable both interaction and styling:

```tsx
disabled={isLoading || disabled}
// In className
disabled:pointer-events-none disabled:opacity-50
// or for inputs
disabled:cursor-not-allowed disabled:opacity-50
```

---

## Storybook Pattern

### Icon Helpers

Define icons as functions (not arrow functions for lint):

```tsx
function SearchIcon() {
  return (
    <svg ...>
      {/* paths */}
    </svg>
  );
}
```

### Args Pattern

```tsx
export const Primary: Story = {
  args: {
    // required props
    variant: "primary",
    children: "Button Text",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Processing…",
  },
};
```

### ArgTypes

```tsx
argTypes: {
  variant: {
    description: "Visual style variant based on the theme colors.",
    options: ["primary", "secondary", "accent", "destructive", "outline", "ghost"],
    control: { type: "select" },
  },
  isLoading: {
    description: "Shows loading spinner",
    control: "boolean",
  },
}
```

---

## Accessibility Checklist

- [ ] Focus states: `focus-visible:ring-*` with offset
- [ ] Labels: `htmlFor` + `id` pairing
- [ ] Disabled: visual + pointer-events
- [ ] Loading: disables input, shows feedback
- [ ] Icons: decorative = `aria-hidden="true"`
- [ ] No `outline: none` without replacement
- [ ] Placeholders end with `…`

---

## Standard Variants

All components MUST have these 6 variants:

| Variant | Color | Usage |
| :--- | :--- | :--- |
| `primary` | primary | Primary action (default) |
| `secondary` | secondary | Secondary/alternative actions |
| `accent` | accent | Highlights, special actions |
| `destructive` | destructive | Delete, reset, dangerous |
| `outline` | border | Secondary with border |
| `ghost` | hover only | Minimal, tertiary |

### Required Stories

Create a story for each variant:

```tsx
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Label",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Label",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent Label",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Label",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Label",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Label",
  },
};
```

### CVA Definition

```tsx
const myComponentVariants = cva(
  "base classes..."
  {
    variants: {
      variant: {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        destructive: "text-destructive",
        outline: "border border-border bg-transparent hover:bg-foreground/5",
        ghost: "hover:bg-foreground/10",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
```

### HelperText Pattern

For error states in form inputs:

```tsx
variant === "destructive" ? "text-destructive" : "text-muted-foreground"
```

**Never use `error` variant name — use `destructive`.**

### Standard Sizes

| Size | Height | Padding | Text |
| :--- | :--- | :--- | :--- |
| `sm` | `h-8` | `px-3` | `text-xs` |
| `default` | `h-10` | `px-4 py-2` | `text-sm` |
| `lg` | `h-12` | `px-8` | `text-base` |
| `icon` | `h-10 w-10` | — | — |

---

## Quick Reference: New Component

1. Create folder: `packages/ui/src/components/MyComponent/`
2. Create `myComponentVariants.ts` with CVA
3. Create `MyComponent.tsx` with props interface
4. Add to barrel: `packages/ui/src/index.ts`
5. Create stories: `apps/storybook/src/stories/MyComponent/`
6. Test: `pnpm dev` → Storybook (port 6006)
7. Verify: `pnpm check-types && pnpm lint`