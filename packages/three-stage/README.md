# @repo/three-stage

> Scaffolded demo showcasing Zustand + Zod.

---

## Quick Start

```bash
pnpm --filter @repo/three-stage dev
```

> **Note:** All `turbo` commands are run via `pnpm gen` (`pnpm gen` wraps `turbo gen`).

## Documentation

Full reference: [/docs/reference/packages/three-stage/](/docs/reference/packages/three-stage/)

After scaffolding, run `pnpm --filter @repo/playground sync-package-docs` to bootstrap the reference doc, then curate it with architecture details. See [Documenting a Package](/docs/how-to/documenting-packages/) for the full workflow.

## Adding to the Playground

Follow the official guide: [Adding Projects](/docs/how-to/adding-projects/).

Then apply the React-specific extras:

1. Add `"@repo/three-stage": "workspace:*"` to `apps/playground/package.json` (under `dependencies`).
2. Create the Astro page at `apps/playground/src/pages/projects/<category>/<slug>/index.astro`:
   ```astro
   ---
   import { Demo } from "@repo/three-stage/Demo";
   import { StrictMode } from "react";
   import BaseLayout from "../../../../layouts/base-layout.astro";
   ---

   <BaseLayout title="three-stage">
     <div class="min-h-screen">
       <StrictMode>
         <Demo client:only="react" />
       </StrictMode>
     </div>
   </BaseLayout>
   ```
3. Register the project in `apps/playground/src/data/projects.ts`.
4. Add the `@source` directive in `apps/playground/src/styles/styles.css`:
   ```css
   @source "../../node_modules/@repo/three-stage";
   ```

## Conventions

This package follows [project conventions](../../CONVENTIONS.md):

- **Named exports only** — no `export default`.
- **Function declarations** for components and top-level functions.
- **Zustand store** in `src/demoStore.ts` — unexported `create()`, getter hooks (`useDemo*`), setter functions.
- **Zod schema** in `src/demo.schema.ts` — runtime validation; TS types written independently.
- **`@repo/ui` components** for all UI.
- **No barrel files** — import directly from source paths.

---

_Part of the [Creative Playground](https://playground-beryl-omega.vercel.app)_
