---
title: 'Adding Projects'
description: 'Add new visualizations to the playground.'
category: 'how-to'
tags:
  - how-to
featured: true
---

# Adding Projects

## Overview

A project has two parts:

1. **A React app** in a `packages/<name>/` directory exporting an `App` component
2. **Metadata** in a YAML file at `apps/playground/src/content/projects/<slug>.yml`

The slug (YAML filename stem, e.g. `mosaic` from `mosaic.yml`) is used as the URL segment and maps to the React component.

## Step 1: Create the Package

```bash
mkdir -p packages/my-project/src
```

Create `packages/my-project/src/App.tsx`:

```tsx
export function App() {
  return <div>Hello from my project</div>;
}
```

The package does not need special Astro integration — the app is loaded directly via `DynamicProjectApp.tsx`.

## Step 2: Add Metadata

Create `apps/playground/src/content/projects/my-project.yml`:

```yaml
order: 10
name: My Project
description: What it does.
category: generative
tags:
  - canvas
icon: sparkles
featured: false
packageDir: my-project
```

**Fields:**

| Field         | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `order`       | Sort order on the projects index (1–9 reserved)                         |
| `name`        | Display name                                                            |
| `description` | Short description                                                       |
| `category`    | Reference to a category ID (`generative`, `color`, `image`, `data-viz`) |
| `tags`        | Array of tag ID references (e.g. `canvas`, `zustand`, `three`)          |
| `icon`        | Icon name from the `@repo/ui/icons` icon map                            |
| `featured`    | Show on the homepage                                                    |
| `packageDir`  | Package directory name under `packages/` (used only for reference)      |

## Step 3: Register the Component

Edit `apps/playground/src/components/DynamicProjectApp.tsx`:

```tsx
import { App as MyProjectApp } from '@repo/my-project';

const components: Record<string, React.ComponentType> = {
  // ... existing entries ...
  'my-project': MyProjectApp
};
```

**Note:** If your package's root export (`"."`) does not point to `src/App.tsx` (as with `@repo/pixel`, whose root export is the API module), use the subpath export instead:

```tsx
import { App as MyProjectApp } from '@repo/my-project/App';
```

Check the package's `package.json` `"exports"` field to confirm.

## Automatic Routing

The project is automatically available at:

- `/projects/<category>/<slug>/` — the project page
- `/projects/<category>/` — category listing
- `/projects/` — all projects index
- `/projects/tags/<tag>/` — tag-filtered listing
- Homepage (if `featured: true`)

No route files need to be created — the catch-all `[...slug].astro` handles rendering.
