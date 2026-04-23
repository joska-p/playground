# Playground (Astro)

> The main Astro site where all the magic happens.

---

## 🚀 Run It

```bash
pnpm dev
```

Opens at [localhost:4321](http://localhost:4321)

## 🛠️ Commands

| Command | What |
|---------|------|
| `pnpm dev` | Start dev server (4321) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview local build |

## ➕ Add a Project

See [Adding Pages](../docs/how-to/adding-pages.md) for the full guide.

```tsx
// Create: apps/playground/src/pages/<category>/<project>/index.tsx
// Register: src/constants/routes.ts
```

---

## 📁 Structure

```
apps/playground/src/
├── constants/routes.ts    # Navigation
├── layouts/             # Page layouts
├── pages/              # All projects
└── components/        # Shared components
```

---

## 📖 Learn More

| Topic | Link |
|-------|------|
| Add pages | [docs/how-to/adding-pages](../docs/how-to/adding-pages.md) |
| Design tokens | [docs/reference/design-tokens](../docs/reference/design-tokens.md) |

---

*Part of @repo/playground*