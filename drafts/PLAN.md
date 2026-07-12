# Cahier d'exercices — Visual Rework Plan
note: this plan is the final version of the ./PLAN-DRAFT.md

> Rewrite package READMEs with the Atlas Explorer voice. Rework the homepage to
> use `AtlasCard` for both discoveries and field notes. Keep data structures
> semantically neutral — the theme is a skin, not a schema change.

---

## Principle: data-level neutrality

`projects.yml`, `notes` schema, `docs` schema — all stay generic. The
atlas/explorer theme is purely visual: section titles, card rendering, README
tone. The data doesn't know it's themed.

---

## Phase 1: Homepage restructure

### Section renames (`index.astro`)

| Current            | New           | Notes                        |
| ------------------ | ------------- | ---------------------------- |
| "Engines & Labs"   | "Discoveries" | Projects / live experiments  |
| "Not a blog"       | "Field Notes" | Reflective writing, logs     |
| "Documentation"    | "Codex"       | Technical references         |

Update `SectionHeader` titles and descriptions to match the cahier d'exercices
tone. The `id` attributes (`#atlas`, `#notes`, `#documents`) stay as-is for
anchor compatibility.

### Swap `ProjectCard` → `AtlasCard` (`ProjectsList.astro`)

Replace the `ProjectCard` import with `AtlasCard` from `@repo/ui/cards`.

Prop mapping:

| AtlasCard prop   | Source                              |
| ---------------- | ----------------------------------- |
| `seed`           | `stringToSeed(project.data.title)`  |
| `cardId`         | `project.data.tags[0].id`           |
| `cardTitle`      | `project.data.title`                |
| `classification` | `project.data.description`          |
| `density`        | `project.data.packageDir`           |
| `resolution`     | `project.data.tags[0].id`           |
| `color`          | `` var(--tags-${mainTag}) ``        |

Each card stays wrapped in `<a href="/atlas/{id}/#main">`.

### Swap `EdgeCard` → `AtlasCard` (`NotesList.astro`)

Replace the `EdgeCard` import with `AtlasCard` from `@repo/ui/cards`. Keep the
existing `stringToSeed` helper (both components need it).

Prop mapping:

| AtlasCard prop   | Source                              |
| ---------------- | ----------------------------------- |
| `seed`           | `stringToSeed(note.data.title)`     |
| `cardId`         | `note.data.tags[0].id`              |
| `cardTitle`      | `note.data.description ?? 'NC'`     |
| `classification` | `note.data.title`                   |
| `density`        | `String(seed)`                      |
| `resolution`     | formatted date (existing logic)     |
| `color`          | `` var(--tags-${mainTag}) ``        |

Each card stays wrapped in `<a href="/notes/{id}/#main">`.

### Cleanup

- Remove unused `ProjectCard` import from `ProjectsList.astro`.
- Remove unused `EdgeCard` import from `NotesList.astro`.

---

## Phase 2: README rewrites (one by one)

### Template: Atlas Explorer

````markdown
---
title: "Evocative Name"
coordinates: "Sector/Category (e.g. /visuals, /algorithms, /math)"
status: "Active | Dormant | Unstable"
date_discovered: YYYY-MM-DD
---

# Package Name

> A one or two-sentence poetic description of what this experiment does
> when it runs.

---

## Essence

What is this, and why does it exist? Focus on the intent and the concept,
not the code.

## Quick Launch

Minimal commands to wake this experiment up.

```bash
pnpm dev --filter @repo/<package-name>
```

## Field Notes

- **The Catalyst:** What paper, concept, or late-night thought triggered this?
- **Quirks & Anomalies:** Beautiful glitches, intentional constraints.
- **Future Horizons:** Where this path might lead next.
````

### Tone rules

1. **Evocative, not dry.** Describe the output or experience, not the tech
   stack. "An engine that translates chaotic data into ordered visual
   landscapes" — not "A React component using HTML5 Canvas."
2. **Concept-first.** Tell the reader *why* the functions exist. Assume they
   can read the code.
3. **Embrace WIP.** Use `Active`, `Unstable`, `Dormant`, `Terraforming` as
   status values. Unfinished code is an intentional characteristic, not a
   failure.

### Creative packages (19)

Rewrite these one by one, in order:

| #  | Package                | Current lines | Status   |
| -- | ---------------------- | ------------- | -------- |
| 1  | `pixel`                | 183           | Active   |
| 2  | `pixel-engine`         | 40            | Active   |
| 3  | `pixel-manipulator`    | 191           | Active   |
| 4  | `mosaic-maker`         | 247           | Active   |
| 5  | `randomart`            | 170           | Active   |
| 6  | `randomart-engine`     | 192           | Active   |
| 7  | `art-canvas`           | 162           | Active   |
| 8  | `automa`               | 87            | Active   |
| 9  | `automa-engine`        | 71            | Active   |
| 10 | `sequence-renderer`    | 89            | Active   |
| 11 | `sequence-engine`      | 49            | Active   |
| 12 | `palette-generator`    | 55            | Active   |
| 13 | `palette-engine`       | 17            | Active   |
| 14 | `image-to-particles`   | 83            | Active   |
| 15 | `graph-viz`            | 408           | Active   |
| 16 | `three-stage`          | 96            | Active   |
| 17 | `l-system-engine`      | 336           | Active   |
| 18 | `l-system`             | 23 (stub)     | Dormant  |
| 19 | `radu-machine-learning`| 72            | Dormant  |

### Infrastructure packages (no rewrite)

| Package        | Reason                                    |
| -------------- | ----------------------------------------- |
| `ui`           | Component library docs, not an experiment |
| `worker-pool`  | Generic infrastructure                    |

### Skipped (no README)

`config-eslint`, `config-typescript`.

---

## Phase 3: Sync script adaptation

Update `scripts/sync-package-readmes.mjs` to handle the new README frontmatter.

### Changes needed

1. **Read new fields** from README frontmatter: `coordinates`, `status`,
   `date_discovered`.
2. **Map to Astro schema** (which stays neutral):
   - `title` — keep as-is (already maps)
   - `description` — extract from the `>` blockquote (already does this)
   - `tags` — keep `reference` + package name; optionally add `coordinates`
     as a tag if it makes sense
   - `order` — keep `20`
   - `draft` — derive from `status: Dormant` if desired, otherwise keep `false`
3. **Strip frontmatter** from the output markdown body (the new fields like
   `coordinates` and `status` are metadata, not rendered content).
4. **Preserve backward compatibility** — old-style READMEs (infrastructure
   packages) should still work without the new fields.

### Output format (unchanged structure)

The generated `.md` files in `apps/playground/src/content/docs/reference/packages/`
keep the same frontmatter schema:

```yaml
---
title: "Package Name"
description: "Tagline from blockquote"
category: "reference"
tags:
  - reference
  - package-name
order: 20
---
```

The body content changes to match the new README structure (Essence, Quick
Launch, Field Notes instead of Quick Start, Architecture, Exports).

---

## What's NOT in scope

- **Docs ↔ demo linking.** Will be considered later.
- **New content collections.** No new schemas, no new data structures.
- **DynamicProjectApp.tsx changes.** Atlas page routing stays as-is.
- **Sidebar navigation.** DocNav grouping stays as-is.
- **Individual note/atlas page templates.** Only the homepage cards change.

---

## Session protocol

Each session is one conversation. The goal is to finish a session with a
**clean, buildable state** — no half-done work left behind.

### Session structure

1. **Read context** — the session reads `drafts/PLAN.md` and the relevant source
   files. No assumption of prior conversation memory.
2. **Do the work** — edit files, rewrite READMEs, etc.
3. **Validate** — run the appropriate check (see per-session notes).
4. **Update PLAN.md** — mark the session's items as done in the checklist below.

### Validation commands

| Scope               | Command                                    |
| ------------------- | ------------------------------------------ |
| Homepage (Astro)    | `pnpm --filter @repo/playground build`     |
| README rewrites     | Visual check + `pnpm sync-package-docs`    |
| Sync script         | `pnpm sync-package-docs`                   |
| Full safety net     | `pnpm check-types`                         |

### Sessions

| #  | Scope                        | What changes                                      | Validate               |
| -- | ---------------------------- | ------------------------------------------------- | ---------------------- |
| 1  | Homepage restructure         | `index.astro`, `ProjectsList.astro`, `NotesList.astro` | `build`                |
| 2  | README: pixel                | `packages/pixel/README.md`                        | `sync-package-docs`    |
| 3  | README: pixel-engine         | `packages/pixel-engine/README.md`                 | `sync-package-docs`    |
| 4  | README: pixel-manipulator    | `packages/pixel-manipulator/README.md`            | `sync-package-docs`    |
| 5  | README: mosaic-maker         | `packages/mosaic-maker/README.md`                 | `sync-package-docs`    |
| 6  | README: randomart + engine   | `packages/randomart/README.md`, `packages/randomart-engine/README.md` | `sync-package-docs` |
| 7  | README: art-canvas           | `packages/art-canvas/README.md`                   | `sync-package-docs`    |
| 8  | README: automa + engine      | `packages/automa/README.md`, `packages/automa-engine/README.md` | `sync-package-docs` |
| 9  | README: sequence-*           | `packages/sequence-renderer/README.md`, `packages/sequence-engine/README.md` | `sync-package-docs` |
| 10 | README: palette-*            | `packages/palette-generator/README.md`, `packages/palette-engine/README.md` | `sync-package-docs` |
| 11 | README: image-to-particles   | `packages/image-to-particles/README.md`           | `sync-package-docs`    |
| 12 | README: graph-viz            | `packages/graph-viz/README.md` (408 lines, biggest) | `sync-package-docs` |
| 13 | README: three-stage          | `packages/three-stage/README.md`                  | `sync-package-docs`    |
| 14 | README: l-system-engine + stub | `packages/l-system-engine/README.md`, `packages/l-system/README.md` | `sync-package-docs` |
| 15 | README: radu-machine-learning | `packages/radu-machine-learning/README.md`       | `sync-package-docs`    |
| 16 | Sync script                  | `scripts/sync-package-readmes.mjs`               | `sync-package-docs`    |
| 17 | Final validation             | No changes — full `check-types` + `build`        | `check-types`, `build` |

### Progress checklist

- [x] Session 1: Homepage restructure
- [ ] Session 2: README — pixel
- [ ] Session 3: README — pixel-engine
- [ ] Session 4: README — pixel-manipulator
- [ ] Session 5: README — mosaic-maker
- [ ] Session 6: README — randomart + randomart-engine
- [ ] Session 7: README — art-canvas
- [ ] Session 8: README — automa + automa-engine
- [ ] Session 9: README — sequence-renderer + sequence-engine
- [ ] Session 10: README — palette-generator + palette-engine
- [ ] Session 11: README — image-to-particles
- [ ] Session 12: README — graph-viz
- [ ] Session 13: README — three-stage
- [ ] Session 14: README — l-system-engine + l-system
- [ ] Session 15: README — radu-machine-learning
- [ ] Session 16: Sync script adaptation
- [ ] Session 17: Final validation
