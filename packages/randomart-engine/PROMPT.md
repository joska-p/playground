# Fresh Session Prompt — Grammar Weight System + Bug Fixes

## Context

This is a monorepo (pnpm workspaces + Turborepo). The `randomart-engine` package is a
pure TS generative-art engine that builds expression trees, evaluates them on CPU, and
compiles them to GLSL for WebGL rendering. The `randomart` package is the React UI that
controls it.

The engine has ~28 grammar rules (sin, cos, fbm, voronoi, etc.) each with a hardcoded
`weight` value used for probabilistic tree selection. The user can toggle rules on/off
but cannot adjust weights. We need to add a weight manipulation UI and fix 4 bugs.

## Read the plan first

The full plan is at `/workspaces/playground/packages/randomart-engine/PLAN.md`. Read it before doing anything.

## Project conventions

- Always run commands from repo root: `pnpm --filter @repo/<package> <cmd>`
- Typecheck: `pnpm --filter @repo/randomart-engine typecheck && pnpm --filter @repo/randomart typecheck`
- Lint: `pnpm --filter @repo/randomart lint && pnpm --filter @repo/randomart-engine lint`
- Use `satisfies GrammarRule` for all rule definitions
- UI components come from `@repo/ui/data-entry` (Button, Slider, etc.) and `@repo/ui/control-panel` (ControlRow, ControlSection, etc.)
- State management: zustand stores in `packages/randomart/src/stores/randomart/`
- The `FloatingInspector` pattern (floating button + slide-out sheet) in
  `packages/randomart/src/components/inspector/FloatingInspector.tsx` is the template
  for the new `FloatingWeightPanel`

## Key files to read before editing

**Engine (rules + tree building):**

- `packages/randomart-engine/src/types.ts` — GrammarRule type definition
- `packages/randomart-engine/src/grammar/registry.ts` — rule registry
- `packages/randomart-engine/src/grammar/rules/` — all rule implementations (inputs/, transforms/, combinators/, generators/)
- `packages/randomart-engine/src/tree/build.ts` — `weightedPick()` and `buildPool()` (the core selection logic)
- `packages/randomart-engine/src/tree/generate.ts` — `TreeConfig` type and `generateTrees()` entry point
- `packages/randomart-engine/src/compile/compileToGLSL.ts` — GLSL compilation + noise helper functions

**UI (store + controls):**

- `packages/randomart/src/stores/randomart/types.ts` — RandomartState type
- `packages/randomart/src/stores/randomart/store.ts` — zustand store + `updateTreeConfig()`
- `packages/randomart/src/stores/randomart/selectors.ts` — React selectors
- `packages/randomart/src/stores/randomart/actions/config.ts` — config actions (toggleRule, setSeedText, etc.)
- `packages/randomart/src/components/inspector/FloatingInspector.tsx` — the slide-out panel pattern to copy
- `packages/randomart/src/components/controls/GrammarSection.tsx` — current grammar toggle UI
- `packages/randomart/src/App.tsx` — top-level layout

**UI components (available for reuse):**

- `packages/ui/src/components/data-entry/slider/Slider.tsx` — Slider component (min/max/step/onChange)
- `packages/ui/src/components/control-panel/control-row/ControlRow.tsx` — label + control row layout
- `packages/ui/src/components/control-panel/control-section/ControlSection.tsx` — collapsible section

## What to do

### Step 1: Bug fixes (Part A in plan)

Do all four bug fixes first. They are independent of each other.

- **A1**: `exp` rule — change clamp from `[-5, 5]` to `[-1, 1]` in both `evaluate` and `toGLSL`
- **A2**: `recaman-pattern` — replace `% 1` with `raw - Math.floor(raw)` fract equivalent
- **A3**: `banded-noise` — drop `constantValue` from `buildNode`, simplify `evaluate` to not read seed
- **A4**: Change `category: 'structural'` to `category: 'terminal'` for: fbm, voronoi, banded-noise, recaman-pattern, nested-oscillation

### Step 2: Store + engine plumbing (Part B1–B2)

- Add `ruleWeights: Record<string, number>` to `RandomartState`
- Add `useRuleWeights()` selector
- Add `setRuleWeight(ruleId, weight)` and `resetAllWeights()` actions — both go through `updateTreeConfig`
- Add `ruleWeights?: Record<string, number>` to `TreeConfig` in generate.ts
- In `generateTrees`, after filtering by `enabledRuleIds`, apply weight overrides before building

### Step 3: UI components (Part B3–B5)

Create `packages/randomart/src/components/weights/` with three files:

- `WeightPresets.ts` — preset weight maps (balanced, organic, geometric, chaotic)
- `WeightSliders.tsx` — scrollable list: for each rule, show rule.name + Slider(min=0, max=3, step=0.1) + numeric readout
- `FloatingWeightPanel.tsx` — copy the FloatingInspector pattern: floating button (scale/balance icon) below the inspector button, slide-out panel (w-80, left side) containing header + preset buttons + WeightSliders

### Step 4: Wire into App

Add `<FloatingWeightPanel />` in `App.tsx` next to `<FloatingInspector />`.

### Step 5: Verify

Run typecheck and lint for both packages. Fix any issues.

## Important details

- Slider range: 0.0 to 3.0, step 0.1
- Default weight for each rule is defined in its `GrammarRule.weight` property
- Empty `ruleWeights` map means "use all defaults" — presets only contain overrides
- The `updateTreeConfig` function in store.ts handles atomic state updates + tree regeneration — new actions should use it
- The floating panel button should be positioned below the inspector toggle button (top-3 left-3, add a `top-12` or similar offset)
- Use a balance/scale SVG icon for the toggle button, not the microscope icon
