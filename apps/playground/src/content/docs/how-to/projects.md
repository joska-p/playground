---
title: "Adding Projects and Categories"
description: "Add new visualizations to the playground using the centralized data model."
type: "how-to"
order: 2
---

# Adding Projects and Categories

> Want to add your own visualization to the playground? Here's how.

---

## The Data Model

All project and category metadata lives in a single source of truth:

```
apps/playground/src/data/projects.ts
```

This file contains:

- **`Category` type** — Union of valid category keys
- **`categories` record** — Metadata for each category (name, description, icon)
- **`projects` object** — All projects keyed by slug
- **`projectsByCategory`** — Projects grouped by category

### Type Definitions

```typescript
export type Category = "generative" | "color" | "image" | "data-viz";

export interface CategoryMeta {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const categories: Record<Category, CategoryMeta> = {
  generative: { name: "Generative Art", description: "...", icon: Sparkles },
  color: { name: "Color & Design", description: "...", icon: Palette },
  image: { name: "Image Processing", description: "...", icon: Flame },
  "data-viz": { name: "Data Visualization", description: "...", icon: BarChart3 },
};
```

---

## Consuming Projects Data

The data is imported throughout the app. Here's how each export is used:

### Get a Single Project

```typescript
import { projects } from "../../data/projects";

const project = projects.piechart;
// Returns: { name: "Pie Chart", description: "...", category: "data-viz", ... }
```

**Used in:** Individual project pages (`.../index.astro`)

### Get All Project Slugs

```typescript
import { projectSlugs } from "../../data/projects";

const slugs = projectSlugs;
// Returns: ["mosaic", "sequences", "palettes", "particles", "piechart"]
```

**Used in:** Home page for featured projects

### Get Category Metadata

```typescript
import { categories } from "../../data/projects";

const meta = categories["data-viz"];
// Returns: { name: "Data Visualization", description: "...", icon: BarChart3 }
```

**Used in:** Projects landing page for category headers

### Get Projects by Category

```typescript
import { projectsByCategory } from "../../data/projects";

const vizProjects = projectsByCategory["data-viz"];
// Returns: [{ slug: "piechart", name: "Pie Chart", ... }]
```

**Used in:** Projects landing page for project grids

---

## Adding a New Project

### Step 1: Create the Project Page

Create `apps/playground/src/pages/projects/<category>/<project>/index.astro`:

```astro
---
import BaseLayout from "../../../../layouts/base-layout.astro";
import { projects } from "../../../../data/projects";

const { name: title } = projects.myproject;
---

<BaseLayout title={title}>
  <h1>{title}</h1>
  <p>My awesome visualization goes here.</p>
</BaseLayout>
```

### Step 2: Add to Data Model

Edit `apps/playground/src/data/projects.ts`:

```typescript
export const projects = {
  // ...existing projects

  myproject: {
    name: "My Project",
    description: "What it does in one sentence.",
    category: "generative", // Must exist in Category type
    tags: [
      { label: "Canvas", color: "secondary" },
      { label: "React", color: "secondary" },
    ],
    icon: Sparkles, // Lucide icon
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
} satisfies Record<string, Project>;
```

That's it! The project automatically appears in:

- Projects landing page (`/projects/`)
- Home page featured section (first 4)
- Navigation via auto-generated routes

---

## Adding a New Category

### Step 1: Create the Category Landing Page

Create `apps/playground/src/pages/projects/<category>/index.astro`:

```astro
---
import BaseLayout from "../../../../layouts/base-layout.astro";
import { projectsByCategory } from "../../../../data/projects";
import { categories } from "../../../../data/projects";

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

### Step 2: Add the Icon

Choose a Lucide icon: https://lucide.dev/

```typescript
import { MyIcon } from "lucide-react";
```

### Step 3: Update the Category Type

Edit `apps/playground/src/data/projects.ts`:

```typescript
// Add to Category type
export type Category = "generative" | "color" | "image" | "data-viz" | "mycategory";
```

### Step 4: Add to Categories Record

```typescript
export const categories: Record<Category, CategoryMeta> = {
  // ...existing

  mycategory: {
    name: "My Category",
    description: "What makes this category special.",
    icon: MyIcon,
  },
};
```

### Step 5: Add to projectsByCategory

```typescript
export const projectsByCategory: Record<Category, ProjectWithSlug[]> = {
  generative: [],
  color: [],
  "data-viz": [],
  image: [],
  mycategory: [], // Must match Category type
};
```

---

## Routing

Routes are not auto-generated—they use the standard Astro file-based routing:

```
pages/projects/<category>/
├── index.astro           # Category landing page
└── <project>/
    └── index.astro      # Individual project page
```

The category in the path comes from your project's `category` field in `projects.ts`:

```typescript
const project = projects.piechart;
project.category === "data-viz"; // maps to /projects/data-viz/piechart/
```

---

## Quick Reference

| What            | Where                                   | How                                |
| --------------- | --------------------------------------- | ---------------------------------- |
| Add project     | `projects.ts` + `pages/.../index.astro` | Add to `projects` object           |
| New category    | `projects.ts` + `pages/<category>/`     | Update Category type + add entry   |
| Change category | `projects.ts`                           | Change `category` field on project |
| Project icon    | `projects.ts`                           | Import Lucide icon                 |
| Category icon   | `projects.ts`                           | Import Lucide icon                 |

### Valid Tag Colors

```typescript
type BadgeColor = "primary" | "secondary" | "accent" | "destructive" | "outline";
```

### Valid Categories

```typescript
type Category = "generative" | "color" | "image" | "data-viz";
```
