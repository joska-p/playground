# Progress: `@repo/automa` — Cellular Automaton

## ✅ Complete

### Engine Layer (`src/engine/`)
- [x] `types.ts` — `CellValue`, `Grid`, `RuleFn`
- [x] `rng.ts` — mulberry32 seeded PRNG
- [x] `grid.ts` — `createGrid`, `fillRandom`, `cloneEmpty`
- [x] `step.ts` — Conway step with toroidal boundary, zero allocation
- [x] `pattern.schema.ts` — Zod v4 schema + `Pattern` type
- [x] `worker.ts` — Web Worker with Transferable ownership protocol

### Store Layer (`src/stores/automaton/`)
- [x] `types.ts` — `UISlice`, `SimSlice`, `CAState`, `CAStoreInit`, `CAStore`
- [x] `context.ts` — `CAStoreContext`, `useCAStore`, `CameraControl` ref for zoom/pan
- [x] `store.ts` — `createCAStore()` factory (vanilla Zustand `createStore`)
- [x] `actions.ts` — `useActions` hook
- [x] `selectors.ts` — `useRunning`, `useSpeedMs`, `useToolMode`, `useGeneration`, `useShowDebug`

### Components Layer (`src/components/`)
- [x] `ErrorBoundary.tsx` — Class-based error boundary with fallback UI
- [x] `AutomatonProvider.tsx` — Context provider, isolated per-island stores, auto-init/destroy
- [x] `AutomatonCanvas.tsx` — WebGL via R3F: `DataTexture` (RedFormat), orthographic camera, mouse paint/erase/pan, dirty-flag GPU upload
- [x] `Controls.tsx` — Play/Pause/Step/Clear/Randomize, speed slider, tool modes, keyboard shortcuts (Space/N/R/C/D/+/-/arrows), JSON export/import, debug overlay, error toasts

### Public API (`src/index.ts`)
- [x] Named exports: `AutomatonProvider`, `AutomatonCanvas`, `Controls`
- [x] Type exports: `CAProviderProps`, `CACanvasProps`, `ControlsProps`, `Pattern`

### App
- [x] `App.tsx` — 100×100 grid demo with canvas + controls overlay
- [x] Lint ✅ | Typecheck ✅ | Build ✅ | Dev server ✅

## 📋 Remaining (v1 out of scope or unstarted)

- [ ] Unit tests (Vitest) — `stepConway`, `createRng`, `patternSchema`, `fillRandom`, round-trip
- [ ] Integration tests — store isolation, worker protocol
- [ ] Storybook stories — Default, LargeGrid, CustomColors, Seeded
- [ ] Performance measurement (render time in debug overlay)
- [ ] README.md — source-of-truth documentation
