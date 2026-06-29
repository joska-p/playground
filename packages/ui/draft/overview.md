## Refined Core Architectural Strategy

### 1. Unified TypeScript Typings (Preferring `type`)

To maintain consistency across the entire design system and eliminate mixing paradigms, we will strictly use TypeScript `type` declarations instead of `interface`. This applies to both component property extensions and utility structures.

```tsx
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { buttonVariants } from './buttonVariants';

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

export type SidebarProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
  isOpen?: boolean;
};
```

---

### 2. The Native CSS & Tailwind v4 Power Selectors

To build complex interactive states without adding JavaScript memory overhead, reactive state variables, or extra re-renders, leverage Tailwind v4's native support for advanced CSS pseudo-classes and structural selectors:

- **Orientation-Driven Layouts (`landscape:` and `portrait:`)**: Instantly shifts layout configurations depending on the viewport aspect ratio rather than arbitrary pixel widths. Perfect for structural containers like the `Sidebar`.
- **The Sibling State Engine (`peer-*`)**: Allows you to style an element based on the state of a preceding sibling element. Vital for crafting hidden-checkbox primitives like custom toggles, switches, and radio groups.
- **The Parent State Engine (`group-*`)**: Distributes parent states (like hovering, keyboard focus, or custom data attributes) down to multi-layered nested children effortlessly.
- **The Modern Conditional Matcher (`*:has()`)**: Tailwind v4 introduces seamless support for arbitrary parent checking using `:has()`. You can change layout geometry purely because a child contains an active structural component.
- **Clean Pointer Interactions (`focus-visible:`)**: Separates deliberate keyboard tab-focus highlights from normal mouse/trackpad click actions, keeping focus outlines hidden unless they are needed for accessibility.
- **Native Custom Data Properties (`data-*`)**: Match internal component states directly to standard CSS values. You can style elements cleanly using variants like `group-data-[state=open]:rotate-180`.

---

### 3. Updated Reference Blueprint: The Orientation-Fluid `Sidebar`

Here is the updated architectural pattern refactored to use `type` declarations and pure structural layout triggers:

```tsx
// src/components/widgets/sidebar/Sidebar.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

export type SidebarProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
  isOpen?: boolean;
};

export type SidebarSubComponentProps = React.ComponentPropsWithoutRef<'div'>;

export function Sidebar({ children, className, isOpen = true, ...props }: SidebarProps) {
  return (
    <div
      data-sidebar-open={isOpen}
      className={cn(
        'grid h-screen w-full',
        'portrait:grid-rows-[1fr_auto] landscape:grid-cols-[auto_1fr]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Sidebar.Panel = function SidebarPanel({ children, className, ...props }: SidebarSubComponentProps) {
  return (
    <aside
      className={cn(
        'bg-card text-card-foreground border-border transition-transform duration-300',
        // Landscape Mode: Left-hand control bar
        'landscape:h-full landscape:w-80 landscape:border-r',
        'landscape:group-data-[sidebar-open=false]:-translate-x-full',
        // Portrait Mode: Interactive Bottom sheet
        'portrait:order-last portrait:h-64 portrait:w-full portrait:border-t',
        'portrait:group-data-[sidebar-open=false]:translate-y-full',
        className
      )}
      {...props}
    >
      <div className="h-full overflow-y-auto p-4">{children}</div>
    </aside>
  );
};

Sidebar.Main = function SidebarMain({ children, className, ...props }: SidebarSubComponentProps) {
  return (
    <main
      className={cn('bg-background h-full w-full overflow-hidden', className)}
      {...props}
    >
      {children}
    </main>
  );
};
```

---

### 4. Official Core References

For deep references on complex selector capabilities, state wiring, and pseudo-class configurations, check out the official documentation engines:

- [Tailwind CSS Hover, Focus, and Other States Documentation](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [MDN Web Docs: The CSS :has() relational pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
