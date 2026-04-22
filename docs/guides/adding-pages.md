# Adding Pages and Routes

This guide explains how to add new pages to the playground app.

---

## Project Structure

```
apps/playground/src/
├── components/          # Reusable UI components
│   └── category/       # Components specific to category pages
├── constants/
│   └── routes.ts       # Navigation configuration (single source of truth)
├── layouts/
│   ├── layout.astro    # Base layout
│   ├── navbar/         # Navigation components
│   └── CategoryPage.astro  # Reusable category page template
└── pages/
    ├── index.astro     # Home page
    ├── graph/          # Knowledge graph
    ├── particles/      # Category landing page
    │   └── image-to-particles/  # Individual project
    ├── sequences/
    ├── mosaic/
    ├── colors/
    └─��� data-viz/
```

---

## Adding a New Project

### 1. Create the page file

Pages live in `src/pages/<category>/<project>/index.astro` or `index.tsx`.

```astro
---
import Layout from "../../layouts/layout.astro";
---

<Layout title="My Project">
  <h1>My Project</h1>
  <p>Project description goes here.</p>
</Layout>
```

### 2. Add the route

Open `src/constants/routes.ts` and add your project to the appropriate category:

```typescript
{
  label: "Particles",
  href: "/particles/",
  children: [
    {
      label: "Image to Particles",
      href: "/particles/image-to-particles",
      description: "Transform images into interactive particles",
    },
    // Add your new project here
    {
      label: "My New Project",
      href: "/particles/my-new-project",
      description: "What it does",
    },
  ],
},
```

### 3. Create category landing page (if new category)

If you're adding a new category (not Particles, Sequences, etc.), create a landing page at `src/pages/<category>/index.astro`:

```astro
---
import Layout from "../../layouts/layout.astro";

const projects = [
  {
    label: "My New Project",
    href: "/my-category/my-new-project",
    description: "What it does",
  },
];
---

<Layout title="My Category">
  <div class="mx-auto max-w-4xl px-4 py-12">
    <h1 class="text-4xl font-bold">My Category</h1>
    <div class="grid gap-6 mt-8">
      {projects.map((project) => (
        <a href={project.href} class="block p-6 border rounded-lg">
          <h2>{project.label}</h2>
          <p>{project.description}</p>
        </a>
      ))}
    </div>
  </div>
</Layout>
```

Then add the category to routes.ts:

```typescript
{
  label: "My Category",
  href: "/my-category/",
  children: [
    {
      label: "My New Project",
      href: "/my-category/my-new-project",
      description: "What it does",
    },
  ],
},
```

---

## Utility Links

Utility links (Storybook, Graph, GitHub) are also defined in `routes.ts`. They appear as icon buttons in the navbar, next to the theme toggle.

```typescript
{
  label: "Storybook",
  href: "/storybook/",
  description: "Component documentation",
  isUtility: true,
  icon: "storybook",
},
```

Available icons are defined in `src/layouts/navbar/UtilityLinks.astro`. To add a new icon, edit that file.

### Icon sources

- [Heroicons](https://heroicons.com/) — copy the SVG code
- [Lucide](https://lucide.dev/) — free, consistent stroke icons
- [Phosphor](https://phosphoricons.com/) — detailed icons

---

## Best Practices

1. **One component per folder** — follow the existing pattern
2. **Descriptive labels** — route labels appear in the navbar
3. **Helpful descriptions** — used for tooltips and category pages
4. **Consistent paths** — `/category/project/` not `/category-project/`

---

## Quick Reference

| Task | File to edit |
|------|-------------|
| Add project to existing category | `routes.ts` |
| Create new category | `routes.ts` + `pages/<category>/index.astro` |
| Add/change utility icon | `routes.ts` + `UtilityLinks.astro` |
| Customize category page style | `layouts/CategoryPage.astro` |