---
title: "Adding Projects"
description: "Add new visualizations to the playground."
tags:
  - how-to
featured: true
---

# Adding Projects

## The Data Model

All project metadata lives in `apps/playground/src/data/projects.ts`.

```typescript
export const projects: Record<string, Project> = {
  myproject: {
    slug: "myproject",
    name: "My Project",
    description: "What it does.",
    category: "generative", // generative | color | image | data-viz
    tags: ["Canvas"],
    icon: Sparkles, // Lucide icon
  },
};
```

## Add a Project

**Step 1:** Edit `projects.ts` — add your project entry.

**Step 2:** Create the page at `apps/playground/src/pages/projects/<category>/<slug>/index.astro`:

```astro
---
import BaseLayout from "../../../../layouts/base-layout.astro";
import { projects } from "../../../../data/projects";

const { slug } = Astro.params;
const project = projects[slug!];
---

<BaseLayout title={project.name}>
  <h1>{project.name}</h1>
  <p>{project.description}</p>
</BaseLayout>
```

## That's It

The project automatically appears in:

- Projects landing page
- Category page
- Navigation
