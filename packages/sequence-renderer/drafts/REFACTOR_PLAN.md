# Refactor Plan: Fourier Module & Sequence Renderer

Based on the original drafts (PRD.md, TDD.md) and code review.

## Problems Found

1. **`fourierPathRule` (in `modules/fourier/fourierPath.ts`) is misnamed and misplaced**
   - It's a parametric seed-based harmonic path generator, not a Fourier transform
   - Doesn't use the DFT worker at all
   - Module-level mutable state (`cachedSeed`, `harmonics`) breaks testability
   - `maxSteps: 0` sentinel is fragile

2. **`drawFourierEpicycles` ignores the layer contract**
   - TDD specified `layout.valueScale` and `layout.offsetX/Y` — implementation uses its own `fitScale` and hardcoded center
   - Three item of mutable module state (`coordinateTrail`, `trackedDataSignature`, `frozenTimestamp`) make draw non-idempotent
   - `_isPlaying` back-channel injected by `render.ts` (no type contract)
   - No rAF loop (TDD specified one inside draw) — relies on `useCanvasRenderer`'s event listener

3. **Store/cache has issues**
   - Cache key uses first 20 values — collision-prone
   - No eviction — unbounded growth
   - `maxPoolSize: 1` defeats pool purpose

4. **`render.ts` injects `_isPlaying` as a back-channel param**
   - Leaky cross-cutting concern — no layer type declares this

5. **`useCanvasRenderer` handles work that belongs in the layer**

## Steps

### Step 1: Move `fourierPathRule` → `rules/harmonicPath.ts`
- Rename to `harmonicPathRule`, id: `harmonic-path`
- Remove module-level mutable state (inline computation)
- Set `maxSteps: 1000` instead of `0`
- Update `rules/registry.ts`
- Delete old file from `modules/fourier/`

### Step 2: Refactor `drawFourierEpicycles`
- Encapsulate frame state in a single object (no module-level mutation)
- Use `layout.valueScale` and `layout.offsetX/Y` as TDD intended
- Remove `fitScale` computation
- Add rAF loop inside draw (self-scheduling per TDD)
- Remove `_isPlaying` dependency — use explicit `isPlaying` from params
- Use `performance.now()` delta for time progression instead of frozen timestamp
- Keep param names matching existing presets (`precision`, `orbitOverlays`, `paceMultiplier`)

### Step 3: Clean up `render.ts`
- Rename `_isPlaying` → `isPlaying` in injected params (clear intent, no underscore hack)

### Step 4: Clean up `store.ts`
- Fix cache key to use full data fingerprint
- Add LRU-style eviction (max 20 entries)

### Step 5: Clean up `useCanvasRenderer.ts`
- No major changes needed — the event listener pattern still works with the self-scheduling rAF loop

### Step 6: Verify
- `pnpm --filter @repo/sequence-engine lint && pnpm --filter @repo/sequence-engine check-types`
- `pnpm --filter @repo/sequence-renderer lint && pnpm --filter @repo/sequence-renderer check-types`
