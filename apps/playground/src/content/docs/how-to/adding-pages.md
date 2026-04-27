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
├── layouts/
│   ├── base-layout.astro      # Base layout
│   └── navbar/                # Navbar components
└── pages/
    ├── index.astro            # Home
    ├── projects/
    │   └── <category>/
    │       └── <project>/
    │           └── index.astro # Your new project
```

## Add a New Project

### Step 1: Create the Page

**Location:** `apps/playground/src/pages/projects/<category>/<project>/index.astro`

```astro
---
import BaseLayout from "../../../../layouts/base-layout.astro";
import { projects } from "../../../../data/projects";

const project = projects.myproject;
---

<BaseLayout title={project.name}>
  <h1>{project.name}</h1>
  <p>{project.description}</p>
</BaseLayout>
```

### Step 2: Add to Data Model

Edit `apps/playground/src/data/projects.ts`:

```typescript
export const projects = {
  // ...existing projects

  myproject: {
    name: "My Awesome Project",
    description: "What it does in one sentence.",
    category: "generative", // Must exist in Category type
    slug: "myproject", // URL slug
    tags: [{ label: "React", color: "secondary" }],
    icon: Sparkles,
  },
} satisfies Record<string, Project>;
```

## Add a New Category

### Step 1: Create Landing Page

Create `apps/playground/src/pages/projects/<category>/index.astro`:

```astro
---
import BaseLayout from "../../../../layouts/base-layout.astro";
import { projectsByCategory, categories } from "../../../../data/projects";

const category = "mycategory";
const meta = categories[category];
const categoryProjects = projectsByCategory[category];
---

<BaseLayout title={`${meta.name} | Playground`}>
  <h1>{meta.name}</h1>
  <p>{meta.description}</p>

  <ul>
    {categoryProjects.map((project) => (
      <li>
        <a href={`/projects/${category}/${project.slug}`}>
          {project.name}
        </a>
      </li>
    ))}
  </ul>
</BaseLayout>
```

### Step 2: Add to Categories Record

Edit `apps/playground/src/data/projects.ts`:

```typescript
export type Category = "generative" | "color" | "image" | "data-viz" | "mycategory";

export const categories: Record<Category, CategoryMeta> = {
  // ...existing
  mycategory: {
    name: "My Category",
    description: "What makes this category special.",
    icon: MyIcon,
  },
};
```

And add to `projectsByCategory`:

```typescript
export const projectsByCategory: Record<Category, ProjectWithSlug[]> = {
  // ...existing
  mycategory: [],
};
```

### Step 3: Add Navbar Routes (if needed)

Routes are defined in `Navbar.astro` frontmatter. Edit `apps/playground/src/layouts/navbar/Navbar.astro`:

```typescript
const routes: Route[] = [
  {
    label: "Projects",
    href: `${baseUrl}/projects/`,
  },
  // Add category link here if top-level
];
```

## Utility Links

Utility links (GitHub, Storybook) are defined in `UtilityLinks.astro`:

```astro
<a href={`${baseUrl}/storybook`} target="_blank">
  <span>Storybook</span>
</a>
```

> **Tip:** Icons come from [Lucide](https://lucide.dev/)

## Best Practices

| Do                                       | Don't                    |
| ---------------------------------------- | ------------------------ |
| One component per folder                 | Put stuff anywhere       |
| Descriptive labels in navbar             | Vague names like "Thing" |
| Helpful descriptions for tooltips        | Leave it blank           |
| Paths like `/projects/category/project/` | `/category-project/`     |

## Quick Reference

| What         | Where                                          |
| ------------ | ---------------------------------------------- |
| Add project  | `projects.ts` + `pages/.../index.astro`        |
| New category | `projects.ts` + `pages/<category>/index.astro` |
| Change nav   | `Navbar.astro` frontmatter                     |
