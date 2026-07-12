# Grammar Rule Weight System + Bug Fixes

## Overview

Add a dedicated floating panel (mirroring `FloatingInspector`) for manipulating per-rule
weights, plus fix three correctness bugs found during review.

---

## Part A — Bug Fixes

### A1. `exp` rule normalization mismatch

**File:** `packages/randomart-engine/src/grammar/rules/transforms/math.ts:41-44`

The input is clamped to `[-5, 5]` but the normalization constants assume `[-1, 1]`:

- `0.36787944117` = `exp(-1)`
- `2.35040238729` = `exp(1) - exp(-1)`

At `val=5` the output is ~125, way outside `[-1, 1]`.

**Fix:** Change the clamp range to `[-1, 1]` (both JS evaluate and GLSL toGLSL).
This keeps the existing normalization math correct and prevents whiteout.

### A2. `recaman-pattern` JS uses `% 1` instead of `fract`

**File:** `packages/randomart-engine/src/grammar/rules/generators/noise.ts:99`

JS `% 1` returns negative values for negative operands; GLSL `fract` always returns `[0, 1)`.
The `flip > 0.5` check has different behavior between the two paths.

**Fix:** Replace `(Math.sin(...) * 43758.5453) % 1` with a JS fract equivalent:

```ts
const raw = Math.sin(val * 12.9898) * 43758.5453;
const flip = raw - Math.floor(raw); // always [0, 1)
```

### A3. `banded-noise` GLSL ignores per-channel seed

**File:** `packages/randomart-engine/src/grammar/rules/generators/noise.ts:72-81`  
**File:** `packages/randomart-engine/src/compile/compileToGLSL.ts:57-61`

JS evaluate reads `node?.constantValue` as a seed offset for variation across R/G/B.
The GLSL `bandedNoise(vec2)` helper has no seed parameter — all channels get identical noise.

**Fix:** Drop the seed from JS evaluate (simpler, less hidden state) so both paths match.
Change `buildNode` to not set `constantValue`. This makes JS↔GLSL parity trivial.

### A4. Noise generators classified as `structural` but are leaf nodes

**Files:** `generators/noise.ts`, `generators/composite.ts`  
**File:** `tree/build.ts:30`

fbm, voronoi, banded-noise, recaman, and nested-oscillation are all `arity: 0` (leaf nodes)
but marked `category: 'structural'`. This means they disappear from the candidate pool at
deep tree levels when `structuralProbability → 0`, even though they're self-contained
generators that should appear at any depth.

**Fix:** Change `category` from `'structural'` to `'terminal'` for all five rules.
This makes them always available in the pool, like x/y/constant/random.

---

## Part B — Weight Manipulation System

### Architecture

Follow the `FloatingInspector` pattern: a separate floating toggle button in the top-left
area (below the inspector button) that opens a slide-out panel from the left, dedicated
to rule weight control. This keeps the main `ControlPanel` clean.

### B1. Store changes

**`packages/randomart/src/stores/randomart/types.ts`**  
Add to `RandomartState`:

```ts
ruleWeights: Record<string, number>; // per-rule weight overrides (key = rule id)
```

**`packages/randomart/src/stores/randomart/store.ts`**

- Initialize `ruleWeights: {}` in `generateInitial()`
- In `updateTreeConfig`: before calling `generateTrees`, apply `ruleWeights` overrides
  to the rule objects (clone weight per-rule, don't mutate the original GrammarRule)

**`packages/randomart/src/stores/randomart/selectors.ts`**  
Add: `useRuleWeights()`

**`packages/randomart/src/stores/randomart/actions/config.ts`**  
Add:

```ts
setRuleWeight(ruleId: string, weight: number): void
resetAllWeights(): void
```

Both call `updateTreeConfig` so trees regenerate with the new weights.

### B2. Engine changes

**`packages/randomart-engine/src/tree/generate.ts`**  
Add `ruleWeights?: Record<string, number>` to `TreeConfig`.  
In `generateTrees`, after filtering by `enabledRuleIds`, apply weight overrides:

```ts
if (config.ruleWeights) {
  for (const rule of rules) {
    const override = config.ruleWeights[rule.id];
    if (override !== undefined) rule.weight = override;
  }
}
```

This mutates the weight on the filtered copy — since `getAllRules()` returns new objects
from the Map (via `Array.from`), the originals in the registry are untouched.

**No changes needed to `tree/build.ts`** — `weightedPick` already reads `rule.weight`
dynamically.

### B3. UI — Floating Weight Panel

**New file:** `packages/randomart/src/components/weights/FloatingWeightPanel.tsx`

Pattern: identical to `FloatingInspector` — a floating button + slide-out sheet.

```
FloatingWeightPanel
├── Toggle button (scale/balance icon, positioned below inspector button)
├── Slide-out panel (w-80, left side, same z-index treatment)
│   ├── Header: "Rule Weights"
│   ├── Preset buttons row: [Balanced] [Organic] [Geometric] [Chaotic] [Reset]
│   ├── Scrollable list of rules, each row:
│   │   ├── Rule name (from rule.name)
│   │   ├── Slider (0.0 – 3.0, step 0.1, default from rule.weight)
│   │   └── Numeric readout of current value
│   └── Footer note: "Overrides applied on next generation"
```

**New file:** `packages/randomart/src/components/weights/WeightPresets.ts`

Export preset weight maps:

```ts
export const WEIGHT_PRESETS = {
  balanced: {}, // empty = use defaults
  organic: {
    sin: 2.0,
    cos: 1.5,
    sqrt: 1.2,
    abs: 1.5,
    fbm: 1.5,
    voronoi: 0.3,
    'banded-noise': 0.2,
    modulo: 0.1,
    'less-than': 0.1,
    'greater-than': 0.1,
    step: 0.1
  },
  geometric: {
    sin: 0.5,
    cos: 0.5,
    abs: 2.0,
    fract: 2.0,
    modulo: 1.5,
    fbm: 0.2,
    voronoi: 1.5,
    sweep: 1.5,
    radial: 1.5,
    'less-than': 1.0,
    'greater-than': 1.0,
    step: 1.0
  },
  chaotic: {
    sin: 2.5,
    cos: 2.0,
    multiply: 2.0,
    pow: 2.0,
    exp: 2.0,
    random: 1.5,
    fbm: 2.0,
    voronoi: 1.5,
    'recaman-pattern': 1.5,
    if: 1.5,
    smoothstep: 0.2
  }
} as const;
```

### B4. Integration into App

**`packages/randomart/src/App.tsx`**  
Add `<FloatingWeightPanel />` alongside `<FloatingInspector />`.

### B5. File structure

```
packages/randomart/src/components/weights/
├── FloatingWeightPanel.tsx   (toggle button + slide-out)
├── WeightSliders.tsx          (scrollable list of slider rows)
└── WeightPresets.ts           (preset weight maps)
```

---

## Implementation Order

1. Bug fixes (A1–A4) — independent, can be done first
2. Store changes (B1) — add `ruleWeights` to state + actions
3. Engine changes (B2) — accept `ruleWeights` in `generateTrees`
4. UI components (B3–B5) — build the floating panel
5. Integration (B4) — wire into App.tsx
6. Verify — run `pnpm --filter @repo/randomart typecheck` and `pnpm --filter @repo/randomart-engine typecheck`

---

## Files Modified

| File                                                                  | Change                                                                   |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `packages/randomart-engine/src/grammar/rules/transforms/math.ts`      | Fix exp clamp to [-1, 1]                                                 |
| `packages/randomart-engine/src/grammar/rules/generators/noise.ts`     | Fix recaman fract; drop banded-noise seed; change categories to terminal |
| `packages/randomart-engine/src/grammar/rules/generators/composite.ts` | Change nested-oscillation category to terminal                           |
| `packages/randomart-engine/src/tree/generate.ts`                      | Accept ruleWeights in TreeConfig                                         |
| `packages/randomart/src/stores/randomart/types.ts`                    | Add ruleWeights field                                                    |
| `packages/randomart/src/stores/randomart/store.ts`                    | Initialize ruleWeights; apply in updateTreeConfig                        |
| `packages/randomart/src/stores/randomart/selectors.ts`                | Add useRuleWeights                                                       |
| `packages/randomart/src/stores/randomart/actions/config.ts`           | Add setRuleWeight, resetAllWeights                                       |
| `packages/randomart/src/components/weights/FloatingWeightPanel.tsx`   | **New** — floating panel                                                 |
| `packages/randomart/src/components/weights/WeightSliders.tsx`         | **New** — slider list                                                    |
| `packages/randomart/src/components/weights/WeightPresets.ts`          | **New** — preset maps                                                    |
| `packages/randomart/src/App.tsx`                                      | Add FloatingWeightPanel                                                  |
