---
title: "Adding Pages and Routes"
description: "Integrate new projects into the Astro shell."
type: "how-to"
order: 1
---

# Adding Pages and Routes

> Want to add your own visualization to the playground? Here's how.

---

## Where Pages Live

```
apps/playground/src/
├── constants/
│   └── routes.ts              # Single source of truth for navigation
├── layouts/
│   ├── layout.astro          # Base layout
│   └── navbar/              # Navbar components
└── pages/
    ├── index.astro          # Home
    ├── particles/           # Category landing
    │   └── image-to-particles/  # Project
    └── <category>/
        └── <project>/
            └── index.tsx     # Your new project
```

## Add a New Project

### Step 1: Create the Page

**Location:** `apps/playground/src/pages/<category>/<project>/index.tsx`

```tsx
import Layout from "../../layouts/layout.astro";

export default function MyPage() {
  return (
    <Layout title="My Awesome Project">
      <h1>My Awesome Project</h1>
      <p>This is going to be fun!</p>
    </Layout>
  );
}
```

### Step 2: Register the Route

Edit `apps/playground/src/constants/routes.ts`:

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
    // Add your project here
    {
      label: "My Awesome Project",
      href: "/particles/my-awesome-project",
      description: "What it does in one sentence",
    },
  ],
},
```

## Add a New Category

### Step 1: Landing Page

Create `apps/playground/src/pages/<category>/index.astro`:

```astro
---
import Layout from "../../layouts/layout.astro";

const projects = [
  {
    label: "My Project",
    href: "/my-category/my-project",
    description: "Does cool stuff",
  },
];
---

<Layout title="My Category">
  <div class="mx-auto max-w-4xl px-4 py-12">
    <h1 class="text-4xl font-bold">My Category</h1>
    <div class="grid gap-6 mt-8">
      {projects.map((p) => (
        <a href={p.href} class="block p-6 border rounded-lg">
          <h2>{p.label}</h2>
          <p>{p.description}</p>
        </a>
      ))}
    </div>
  </div>
</Layout>
```

### Step 2: Register Category

In `routes.ts`, add the top-level entry:

```typescript
{
  label: "My Category",
  href: "/my-category/",
  children: [
    {
      label: "My Project",
      href: "/my-category/my-project",
      description: "Does cool stuff",
    },
  ],
},
```

## Utility Links

Storybook, Graph, and GitHub links live in `routes.ts` too:

```typescript
{
  label: "Storybook",
  href: "/storybook/",
  description: "Component docs",
  isUtility: true,
  icon: "storybook",
},
```

> **Tip:** Icons come from [Lucide](https://lucide.dev/)—edit `UtilityLinks.astro` to add new ones.

## Best Practices

| Do | Don't |
|---|---|
| One component per folder | Put stuff anywhere |
| Descriptive labels in navbar | Vague names like "Thing" |
| Helpful descriptions for tooltips | Leave it blank |
| Paths like `/category/project/` | `/category-project/` |

## Quick Reference

| What | Where |
|------|-------|
| Add project | `routes.ts` + `pages/.../index.tsx` |
| New category | `routes.ts` + `pages/.../index.astro` |
| Change icon | `routes.ts` + `UtilityLinks.astro` |