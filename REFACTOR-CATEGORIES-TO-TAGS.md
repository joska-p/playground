# Refactor: Categories → Tags

## Goal

Replace the `categories` collection system with a `tags` array across all content entries (`projects`, `docs`, `notes`). The first tag in `tags` becomes the main tag, controlling the visual style/Tailwind design token (just like `category` did).

## Why

- Simpler, flatter content model
- Tags are more flexible (multiple per entry)
- First tag replaces category for styling — no loss of expressiveness
- Opens the door for tag-based search/filter later

## How it works

Before:

```yaml
# content entry
category: generative
tags:
  - canvas
```

After:

```yaml
tags:
  - generative # first tag = main tag (was category)
  - canvas
```

The old category YAML files (`projects-categories/*.yml`, `docs-categories/*.yml`, `notes-categories/*.yml`) are deleted. Their metadata (name, description, icon, order) moves into the existing `tags` collection at `src/content/tags/*.yml`.

CSS variables are unchanged — `--color-projects-generative`, `--color-docs-conventions`, etc. still work because the first tag IS the old category ID.

## Phases

### Phase 1 — Build rich tags collection

Create/enhance `src/content/tags/*.yml` files with `name`, `description`, `icon`, `order` derived from old category metadata + package READMEs. See `src/content/tags/` for the full set.

### Phase 2 — Update collection schema (`src/content.config.ts`)

- Remove `docsCategories`, `notesCategories`, `projectsCategories` definitions
- Remove 3 `reference('...-categories')` fields from docs/notes/projects
- Change projects' `tags: z.array(reference('tags'))` → `tags: z.array(z.string())`
- Add `icon: iconSchema.optional()`, `order: z.number().default(0)` to tags schema
- Export only remaining collections from `collections`

### Phase 3 — Migrate content files

For every file in `src/content/projects/`, `src/content/docs/`, `src/content/notes/`:

- Move `category: <value>` into `tags` array as first element
- Remove `category` field
- Deduplicate if old `tags` already contained the category

### Phase 4 — Update pages/components (10 files)

All category references → `tags[0]`:

- `pages/index.astro` — featured projects/docs use `tags[0]` for color/URL
- `pages/projects/index.astro` — group by `tags[0]`, metadata from `getCollection('tags')`
- `pages/projects/[category]/index.astro` — static paths from unique `tags[0]` values
- `pages/projects/[...slug].astro` — slug + hero from `tags[0]`
- `pages/docs/index.astro` — group by `tags[0]`
- `pages/docs/[...slug].astro` — tag metadata instead of `getEntry(doc.data.category)`
- `pages/notes/index.astro` — group by `tags[0]`
- `pages/notes/[...slug].astro` — tag metadata instead of `getEntry(note.data.category)`
- `components/ui/docs/DocNav.astro` — nav grouped by `tags[0]`
- `components/ui/features/ExperimentsPreview.astro` — group by `tags[0]`

### Phase 5 — Clean up

- Delete `src/content/projects-categories/`, `docs-categories/`, `notes-categories/`
- Update `src/content/docs/how-to/adding-projects.md` inline example
- Update Storybook `CategoryCard.stories.tsx`
