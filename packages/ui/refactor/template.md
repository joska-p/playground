## Part 1: UI Engineering Guidelines ./packages/ui

### 1. Component Architecture

- **Separation of Concerns:** Split components into three distinct files when variations are involved:
- `ComponentName.tsx`: Main component logic and DOM structure.
- `variants.ts`: Style tokens, Tailwind classes, and recipe definitions via CVA.
- `ComponentName.stories.tsx`: Storybook isolated state testing and documentation.

- **HTML Element Extension:** Components should always extend their native HTML element attributes (e.g., `ButtonHTMLAttributes<HTMLButtonElement>`) to ensure native properties like `type`, `form`, or `aria-*` work out of the box.

### 2. Styling & Token Management

- **CVA First:** All variant logic (colors, sizes, states) must live inside a `cva()` wrapper. Avoid conditional string interpolation inside the component JSX.
- **Utility Merging:** Use the `cn()` utility wrapper on every component to allow consumer-side overrides via `className` without style clashing.
- **Semantic Overrides:** Support design token overrides via CSS custom properties passed through the native `style` prop (e.g., `--primary`).

### 3. UX & Accessibility (a11y)

- **Loading States:** Explicitly support a `loading` prop. When `loading` is true:
- Inject a semantic `<Spinner />` (or equivalent loader) before the children.
- Set `disabled={disabled || loading}` to prevent double submissions.
- Set `aria-busy={loading}` for screen readers.

- **Keyboard Focus & States:** Every interactive component must define `:focus-visible` outlines matching the variant color schema, active scaling effects (`active:scale-[.97]`), and disabled states (`disabled:pointer-events-none`).

---

## Part 2: Component Refactor Template

Use this blueprint when refactoring or creating new interactive components (e.g., `Input`, `Badge`, `Alert`).

### 1. The Styles & Variants (`variants.ts`)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const baseVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 disabled:pointer-events-none disabled:opacity-40', // Base styles
  {
    variants: {
      variant: {
        default: 'bg-surface-raised text-foreground',
        primary: 'bg-primary text-primary-foreground'
        // Add component specific variations...
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        default: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type BaseVariants = VariantProps<typeof baseVariants>;
```

### 2. The Implementation (`ComponentName.tsx`)

```typescript
import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn'; // Standardized path
import { baseVariants, type BaseVariants } from './variants';

// 1. Extend Native HTML Attributes + CVA Variant Types
export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement>, BaseVariants {
  loading?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function ComponentName({
  className,
  variant = 'default',
  size = 'default',
  loading = false,
  children,
  ref,
  ...props
}: ComponentNameProps) {
  return (
    <div
      ref={ref}
      className={cn(baseVariants({ variant, size }), className)}
      aria-busy={loading}
      {...props}
    >
      {loading && <span>Loading...</span>}
      {children}
    </div>
  );
}

```

### 3. The Documentation (`ComponentName.stories.tsx`) the stories live in a standalone storybook app in ./apps/storybook/src/stories/<subpath>

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName', // E.g., 'Data Entry/Input'
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: { variant: 'default', size: 'default', children: 'Content' }
};
```

./packages/ui/src/components/data-entry/button/ can also be use as a reference.

note: Don't try to lint checktypes or build. the package is in construction.
Don't look at lib/colorVariant.ts. It is gonna be replaced

base on this information can you refactor
./packages/ui/src/components/data-entry/slider
