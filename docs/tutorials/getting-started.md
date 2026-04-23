# Getting Started

> Welcome to the Creative Playground! Let's build something cool.

---

## 🌱 What is This?

The Creative Playground is a monorepo of interactive visualizations—mosaic generators, sequence renderers, particle effects, and color tools. Built with React 19, Astro, and Tailwind.

## 🛠️ Quick Start

```bash
# Clone and install
pnpm install

# Start everything
pnpm dev
```

| Command | What Happens |
|---------|-------------|
| `pnpm dev` | All apps + packages in watch mode |
| `pnpm build` | Production build |
| `pnpm check-types` | TypeScript check |

## 📁 Project Structure

```
apps/
├── playground/       # Main Astro site
└── storybook/        # Component docs

packages/
├── ui/               # Shared UI components
├── mosaic-maker/     # Mosaic generation
├── sequence-renderer/ # Math sequence viz
├── palette-generator/ # Color tools
├── image-to-particles/ # Particle effects
├── tailwind-config/   # Design tokens
└── typescript-config/ # TS config
```

## 🎯 Your First Contribution

1. **Add a page**: Create `apps/playground/src/pages/<category>/<project>/index.tsx`
2. **Add route**: Update `src/constants/routes.ts`
3. **Build something awesome**: Use `@repo/ui` components

```tsx
import { Sidebar, Button } from "@repo/ui";

function MyProject() {
  return (
    <Sidebar>
      <Sidebar.Panel>
        <Button>Click me</Button>
      </Sidebar.Panel>
      <Sidebar.Main>
        <p>Hello, world!</p>
      </Sidebar.Main>
    </Sidebar>
  );
}
```

## 📚 Learn More

| Topic | Where to Look |
|-------|-------------|
| Add pages | [how-to/adding-pages](./how-to/adding-pages.md) |
| Build components | [how-to/creating-components](./how-to/creating-components.md) |
| Design tokens | [reference/design-tokens](./reference/design-tokens.md) |
| Architecture | [explanation/architecture](./explanation/architecture.md) |

## 🚀 Run Individual Apps

```bash
cd apps/playground && pnpm dev      # Main site (port 4321)
cd apps/storybook && pnpm dev     # Storybook (port 6006)
```

## 💡 Pro Tips

> Tip: Run `pnpm lint-fix` before committing—keeps things tidy.

> Note: All packages use React 19. Check `packages/ui/package.json` for peer dependencies.

---

*Built with 🎨 by the playground team*