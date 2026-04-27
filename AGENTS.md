# AGENTS.md — Creative Playground

## Quick Commands

```bash
pnpm dev           # Start all apps (Astro:4321, Storybook:6006)
pnpm build         # Production build
pnpm lint          # Turborepo lint (depends on ^lint)
pnpm lint-fix      # Auto-fix lint issues
pnpm format        # Prettier write
pnpm check-types   # TypeScript type checking
pnpm clean         # Clean .turbo and node_modules
pnpm graphify      # Update knowledge graph post-code change
```

### Package-Specific Commands

```bash
pnpm --filter @repo/playground dev        # Main site (port 4321)
pnpm --filter @repo/storybook dev        # Storybook (port 6006)
pnpm --filter @repo/ui build             # Build UI package
pnpm --filter @repo/mosaic-maker lint    # Lint specific package
pnpm --filter @repo/playground check-types # Type check playground
```

## Mandatory Setup

- **Node.js 22+**: `pnpm` auto-installs
- **Nix (recommended)**: `nix develop` or `direnv allow` — ensures correct environment

## Architecture

| Path              | Type                                                                              |
| ----------------- | --------------------------------------------------------------------------------- |
| `apps/playground` | Main Astro app + in-app docs                                                      |
| `apps/storybook`  | UI component isolation (port 6006)                                                |
| `packages/ui`     | Shared atomic components                                                          |
| `packages/*`      | "Engines": mosaic-maker, sequence-renderer, palette-generator, image-to-particles |

## Verification Rules

- **Before commit**: Run `pnpm lint && pnpm format && pnpm check-types`
- **UI changes**: MUST verify in Storybook (`apps/storybook`) before committing

## Critical Conventions

- **Branch**: ALWAYS work on `develop` branch, never push to `main`
- **Commands**: ALWAYS use `pnpm --filter <package> <command>` from root, NEVER `cd` into directories

## Code Style Guidelines

### General

- 2 spaces for indentation
- Semicolons required
- Double quotes for strings
- Print width: 100 characters
- Trailing commas: ES5
- No unnecessary comments

### Prettier + ESLint

- Uses `prettier-plugin-tailwindcss` with `tailwindFunctions: ["cva", "cn", "clsx"]`
- ESLint extends `typescript-eslint/recommended`
- Prefer arrow functions over regular functions
- Prefer function declarations over expressions (`func-style: ["warn", "declaration"]`)
- React function components use `function` keyword (not arrow functions)
- React hooks rules enforced: `react-hooks/recommended`
- `react/react-in-jsx-scope`: OFF (React 17+ automatic JSX transform)

### Imports

- Always include `.js` extension in imports: `import { cn } from "../../utils/cn.js";`
- Group imports: external → internal → relative
- Use absolute workspace imports: `@repo/ui`, `@repo/mosaic-maker`, etc.

### TypeScript

- Strict mode enabled
- Use `type` imports for type-only imports: `import type { VariantProps } from "class-variance-authority";`
- Avoid `any` type
- Define interfaces for component props extending native HTML attributes

### React Components

- Use `function` keyword for named components (not arrow functions)
- Components receive `ref` and spread `...props` for forwardRef compatibility
- Use `ComponentProps<"element">` pattern for HTML attribute inheritance
- Default props use destructuring with defaults: `type = "button"`

### Styling with Tailwind + CVA

- Use `class-variance-authority` (CVA) for variant management
- Variants defined in separate `*Variants.ts` files
- Utility classes via `cn()` helper (clsx + tailwind-merge)
- Tailwind config in `packages/tailwind-config`

```typescript
// buttonVariants.ts
import { cva } from "class-variance-authority";

export const buttonVariants = cva("base classes", {
  variants: {
    variant: { primary: "bg-primary...", secondary: "bg-secondary..." },
    size: { small: "h-8...", medium: "h-10..." },
  },
  defaultVariants: { variant: "primary", size: "medium" },
});
```

```typescript
// Button.tsx
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { buttonVariants } from "./buttonVariants.js";

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

function Button({ ref, className, children, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
}

export { Button };
```

### Error Handling

- No explicit try/catch unless handling specific error cases
- Use Zod for runtime validation where needed
- PropTypes not required (TypeScript provides compile-time checking)

## Knowledge Graph

Read `graphify-out/GRAPH_REPORT.md` for god nodes and architecture context. Run `pnpm graphify` after code changes.

Rules:

- Before answering architecture questions, read graphify-out/GRAPH_REPORT.md
- For cross-module questions, prefer `graphify query "<question>"` over grep
- After modifying code, run `graphify update .` to keep graph current

## See Also

- **In-app docs**: `apps/playground/src/content/docs/` — Guidelines, API
- **Skills**: `.agents/skills/` — Domain-specific knowledge (frontend-design, turborepo, etc.)
- **OpenCode**: `.opencode/opencode.json` → links to this file
