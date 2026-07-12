# Session 8: README rewrites — automa + automa-engine

## Context

You are continuing a series of package README rewrites for the Creative
Playground monorepo. Each session rewrites one or two READMEs using the Atlas
Explorer voice defined in `drafts/PLAN.md`.

**Read these files first:**
- `drafts/PLAN.md` — Phase 2 template, tone rules, creative packages table
- `packages/automa/README.md` — 87-line React + R3F cellular automaton UI README to rewrite
- `packages/automa-engine/README.md` — 71-line pure-engine README to rewrite
- `packages/art-canvas/README.md` — reference for voice and section handling (just completed)
- `packages/mosaic-maker/README.md` — reference for extensive body sections

## Scope

Rewrite two READMEs:

**`packages/automa/README.md`** (87 lines) — React + React Three Fiber UI for
an interactive cellular automaton simulator. Renders the grid as a
DataTexture on a fullscreen mesh, supports brush painting, camera fitting,
and a pluggable rule selector.

**`packages/automa-engine/README.md`** (71 lines) — Pure simulation engine.
Generic `evolve` function using birth/survive lookup tables, B/S notation
parser, multi-state aging, Web Worker stepping via `@repo/worker-pool`,
and a rule registry.

## Key characteristics

- Two-package split: `automa-engine` (pure logic, no UI) and `automa` (React layer)
- `automa-engine` uses `@repo/worker-pool` for off-main-thread stepping with Transferable buffers
- Rule system: plain data objects with B/S notation, parsed into birth/survive lookup arrays
- Multi-state rules (stateCount > 2) add aging/refractory layer
- `automa` ships: R3F canvas, orbit controls, camera fitter hook, cell painting hook, grid texture hook, step timer hook
- Zustand store with pure mutation functions and selector hooks
- Color picker driven by active rule's stateCount

## Template (from PLAN.md)

[Same template as previous sessions — frontmatter, blockquote, Essence, Quick Launch, Field Notes, body sections]

## Instructions

1. Read all the files listed above
2. Rewrite both READMEs using the template and voice
3. For each file:
- Add frontmatter (title, coordinates, status "Active", date_discovered)
- Write evocative blockquote
- Write Essence (concept-first, why it exists)
- Write Quick Launch with install commands
- Write Field Notes (Catalyst, Quirks, Future Horizons)
- Restructure existing Architecture/Controls/Hooks sections into Atlas Explorer body prose
- Preserve technical content (rule system, evolve function, hooks, drawing, camera) as reference material
- `automa-engine` should emphasize the data-driven rule model and the worker boundary
- `automa` should emphasize the R3F rendering strategy and the hook decomposition
4. Preserve the footer _Part of the [Creative Playground](...) line in both files
5. Cross-reference between the two: `automa` links to `automa-engine`, `automa-engine` can link back

## Validation

pnpm sync-package-docs

## Progress tracking

After completing, update drafts/PLAN.md checklist:
- Mark Session 8 as done
- Produce the new prompt for Session 9 (sequence-renderer + sequence-engine READMEs)
