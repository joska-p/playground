# mosaic-maker — Conventions

## File structure

- **One conceptual unit per directory.** A directory must contain 2+ files. If it would hold only one, place the file in the parent directory instead.
- **Group by domain, not by type.** Controls live together in `controls/`, tiles in `tiles/`. Never create `components/`, `hooks/`, `utils/` as top-level grouping dirs — that's organisation by type, not domain.
- **`core/`** for constants, types, and pure data. No React, no store, no side effects.
- **`store/`** for Zustand state management. Split into `store.ts` (create call), `actions.ts` (mutations), `selectors.ts` (hooks), and `types.ts` if the store types are substantial.
- **`utils/`** for reusable pure functions. Each file must serve a single clear purpose. Empty catch-all files (`paletteUtils.ts`, `styleUtils.ts`, `utils.ts`) are forbidden.

## Naming

- **Functions are verbs.** The name must describe the action: `regenerateMosaicTiles`, `toggleTileInSet`, `applyMosaicPalette`, `cycleMosaicPalettes`. Avoid generic `update*` — "update what, how?"
- **Components are nouns.** `MosaicDisplay`, `Tile`, `Controls`, `SliderControls`.
- **Files match the export.** `Controls.tsx` exports `{ Controls }`. No default exports unless the consuming framework requires it (it doesn't).
- **No re-aliasing without reason.** `const initialTileSize = defaultTileSize` adds a name to remember for zero value. Export the original directly.

## Store

- **Keep store files focused on state management.** Pure functions that compute tiles, generate colors, or shuffle arrays belong in `utils/` or `core/`, not in `store/`.
- **Actions mutate state, selectors read it.** Don't mix concerns in one exported function.
- **Avoid guards that silently skip.** An early return that prevents an action from executing must be impossible to reach when the user explicitly triggered that action.

## Code style

- **No comments.** The code should be self-explanatory through naming and structure.
- **No empty files.** Delete them.
- **`array.sort()` mutates.** If you need a sorted copy, spread first: `[...array].sort()`. Prefer immutable patterns.
- **Unused code is deleted, not commented out.**