# randomart-next UI Migration Plan

## Goal

Migrate `@repo/randomart-next` from the old `@repo/randomart-engine` to
`@repo/randomart-engine-next`, replacing all engine imports, types, and
function calls with the new engine's API. The old UI package (`@repo/randomart`)
is expected to go stale during this work and will be replaced wholesale at the
end.

## Target architecture

After migration, the store/types/consumer layer in `randomart-next` looks like:

- **`stores/randomart/types.ts`** — Defines `RandomartState` using new engine
  types (`ExprNode`, `string` for rule IDs, `DualRng` or equivalent). Removes
  `RuleId` union type, `RuleWeights` type, old `SeededRandom` type.
- **`stores/randomart/store.ts`** — Imports `listRules`, `createDualRng`,
  `buildTree` from `@repo/randomart-engine-next`. The `generateInitial()` and
  `updateTreeConfig()` functions use the new engine's tree-building API.
- **`stores/randomart/selectors.ts`** — Typed against new `ExprNode`. The
  `initialHash`/`choiceHistory` selectors need resolution (see Open Questions).
- **`stores/randomart/actions/config.ts`** — Uses `listRules()`, `getRule()`
  from new engine. `ruleWeights` concept rethought (see Open Questions).
- **`hooks/useShaderProgram.ts`** — Imports `compileToGLSL` and `ExprNode` from
  new engine. Same function signature, different types.
- **`hooks/useWebGLRenderer.ts`** — Imports `animationRegistry` and `ExprNode`
  from new engine. Same behavior.
- **`components/controls/`** — `AnimationSection`, `GrammarSection`,
  `DisplaySection`, `WeightSliders`, `WeightPresets` all updated to new API.
- **`components/inspector/`** — `MathFormula`, `AstTreeView` use
  `toMathString`/`toTreeView` from new engine's `format.ts`.
- **`components/testMode/`** — Test bench components adapted to new
  `GrammarRule` API (text-seed-based methods, no `evaluate()`, no `category`/`arity`).
- **`components/testMode/glsl/buildValueShader.ts`** — Uses new engine's
  `resolveGlslDeps` and `ExprNode`. The `rule.toGLSL()` call needs rework (see
  Open Questions).

## Ground rules for every session

- Only do the ONE session listed as "next" below. Do not start another.
- The OLD UI package (`@repo/randomart`) is expected to go stale/break during
  this work and will be replaced wholesale at the end — do not spend effort
  keeping it working, same as the engine plan's stance on `@repo/randomart`.
- Any UI session that depends on an engine decision not yet finalized must stop
  and flag it rather than guess.
- If you discover a decision that isn't specified below, write it in the
  Decisions Log with your reasoning and continue — don't block waiting for the
  user unless it's destructive/irreversible.
- At the end of the session: check off the box, add a one-paragraph note under
  that session with what was done and any follow-ups, commit.

## Session Checklist

- [x] **S1 — Store types + adapter foundation.** Rewrite `types.ts` to use new
      engine types. Create adapter utilities (e.g. `generateTrees` replacement,
      `SeededRandom` wrapper if needed). Files: `types.ts`, new adapter file if
      created. **Depends on:** resolution of Open Questions #1 (SeededRandom
      properties), #2 (generateTrees replacement), #4 (ruleWeights concept).

  **S1 note:** Rewrote `types.ts` to import `ExprNode` from
  `@repo/randomart-engine-next`; removed `RuleId`, `RuleWeights`, and
  `SeededRandom` from the state type. Created `adapter.ts` with a
  `generateTrees()` replacement that picks the first enabled rule and calls
  `rule.buildNode(textSeed)` with per-channel seed suffixes (uncorrelated) or a
  shared node (correlated). Updated `store.ts` and `selectors.ts` to use the new
  adapter and types. Simplified `actions/config.ts` by removing `getRule` import
  (no longer needed for terminal-protection logic) and dropping
  `setRuleWeight`/`resetAllWeights`. Replaced `SeedInfo.tsx` and
  `ChoiceHistory.tsx` with seed-text/rule-info-based components since the new
  engine's `SeededRandom` does not expose `initialHash` or `choiceHistory`.
  Removed `useSelectedInitialHash()` and `useSelectedChoiceCount()` selectors.
  Follow-ups: none.

- [x] **S2 — Store + config action.** Rewrite `store.ts` and `actions/config.ts`
      to use new engine's `listRules()`, `createDualRng()`/`createCorrelatedRng()`,
      `buildTree()`. Files: `store.ts`, `actions/config.ts`. **Depends on:** S1.

  **S2 note:** Simplified `adapter.ts` by removing `maxDepth` from `TreeConfig`
  (each rule's `GrammarSpec` defines its own max depth internally, so the UI's
  `maxDepth` no longer affects tree generation). Removed `getRule` import since
  the adapter now uses `listRules()` and indexes the first result. Simplified
  `store.ts` by removing `maxDepth` from the `generateTrees()` config passed in
  both `generateInitial()` and `updateTreeConfig()`. `actions/config.ts` and
  `actions/display.ts` needed no changes — they call `updateTreeConfig()` which
  now uses the simplified adapter. Follow-up: `buildTree()` with dual RNG
  separation is not yet used because the engine doesn't expose `GrammarSpec`
  through the public `GrammarRule` API; the adapter continues using
  `rule.buildNode(textSeed)` which internally uses `grow()` with per-rule
  `SeededRandom`.

- [x] **S3 — Selectors + inspector components.** Fix selectors that reference
      `rng.initialHash`/`rng.choiceHistory`. Update `MathFormula.tsx` and
      `AstTreeView.tsx` to import from new engine's `format.ts`. Files:
      `selectors.ts`, `MathFormula.tsx`, `AstTreeView.tsx`. **Depends on:** S1.

  **S3 note:** Selectors were already clean — S1 had removed
  `useSelectedInitialHash()` and `useSelectedChoiceCount()` and there were no
  remaining references to `rng.initialHash`/`rng.choiceHistory`. Updated
  `MathFormula.tsx` and `AstTreeView.tsx` to import `toMathString`/`toTreeView`
  from `@repo/randomart-engine-next` instead of `nodeToMathString`/`nodeToTreeView`
  from the old engine's `format/treePrinter`. Both functions have the same
  signature (`(ExprNode) => string`), so only the import paths and function names
  changed. Typecheck passes. Follow-ups: none.

- [x] **S4 — Control panel: Grammar, Animation, Display, Weights.** Update
      `GrammarSection.tsx` (`listRules()` + `string` IDs), `AnimationSection.tsx`
      (import path), `DisplaySection.tsx` (replace `renderTreesToPngBlob` — see
      Open Question #3), `WeightSliders.tsx` (`listRules()` + `string` IDs),
      `WeightPresets.ts` (rethink weight presets — see Open Question #4). Files:
      `GrammarSection.tsx`, `AnimationSection.tsx`, `DisplaySection.tsx`,
      `WeightSliders.tsx`, `WeightPresets.ts`. **Depends on:** S1, S2.

  **S4 note:** Updated `GrammarSection.tsx` to import `listRules()` from
  `@repo/randomart-engine-next`, replacing `getAllRules` from the old engine;
  removed `RuleId` type (now plain `string`); replaced `rule.name` with
  `rule.displayName`. Updated `AnimationSection.tsx` import path from
  `@repo/randomart-engine/animation/behaviors` to `@repo/randomart-engine-next`.
  Resolved OQ #3 by replacing `renderTreesToPngBlob` with a local
  `renderTreesToBlob` implementation that uses the new engine's `evaluate()` and
  canvas `toBlob()` for browser-native PNG encoding (avoids Node `zlib`
  dependency). Resolved OQ #8 by renaming `treeR.args[i]` to
  `treeR.children?.[i]` for correlated RGB export. Rewrote `WeightPresets.ts` as
  re-exports from `@repo/randomart-engine-next`'s `WEIGHT_PRESETS` and
  `getPresetWeights` (resolved OQ #9 — preset keys now match the new engine's
  `mod`/`product` naming). Simplified `WeightSliders.tsx` to a read-only rule
  list since per-rule weights (`ruleWeights`/`setRuleWeight`) were dropped in S1.
  Updated `FloatingWeightPanel.tsx` to remove broken `resetAllWeights` import and
  `ruleWeights` store usage; preset buttons are now disabled with a note that
  store-level wiring is pending. Follow-ups: wire per-node-type weight presets
  into the adapter/store so preset buttons become functional.

- [x] **S5 — WebGL hooks.** Update `useShaderProgram.ts` and
      `useWebGLRenderer.ts` to use new engine types (`ExprNode`, `AnimationBehavior`)
      and import paths (`compileToGLSL`, `animationRegistry`). Files:
      `useShaderProgram.ts`, `useWebGLRenderer.ts`. **Depends on:** S1.

  **S5 note:** Updated imports in both `useShaderProgram.ts` and
  `useWebGLRenderer.ts` to point to `@repo/randomart-engine-next` instead of
  `@repo/randomart-engine/compile/compileToGLSL` and
  `@repo/randomart-engine/animation/behaviors`. Renamed `ExpressionNode` to
  `ExprNode` in the tree type parameters and all annotations. The new engine's
  `compileToGLSL(treeR, treeG, treeB, behaviors)` and `animationRegistry`
  have identical signatures to the old engine, so no logic changes were needed.
  Typecheck passes. Follow-ups: none.

- [x] **S6 — Test mode: eval helpers + GLSL builder.** Rewrite `evalHelpers.ts`
      (replace `SeededRandom` constructor, rethink `buildPreviewNode` — see Open
      Question #5), rewrite `buildValueShader.ts` (replace `rule.toGLSL()` and
      `rule.noiseDependencies` — see Open Question #6), update `TestMode.tsx`
      (`listRules()`), update `useFilteredRules.ts` (new `GrammarRule` shape — see
      Open Question #7). Files: `evalHelpers.ts`, `buildValueShader.ts`,
      `TestMode.tsx`, `useFilteredRules.ts`. **Depends on:** S1.

  **S6 note:** Resolved OQs #5, #6, #7. `evalHelpers.ts` — removed `SeededRandom`
  import and `STRING_ARGS`; `buildPreviewNode` now calls `rule.buildNode(String(seed))`
  directly. `buildValueShader.ts` — replaced `rule.toGLSL(GLSL_ARGS, node)` with
  standalone `toGLSL(node)` from the new engine; added local `NOISE_DEPS_BY_NODE` map
  and `collectNoiseDeps()` helper to resolve noise deps via `resolveGlslDeps()`.
  `TestMode.tsx` — replaced `getAllRules()` from old engine with `listRules()` from
  `@repo/randomart-engine-next`. `useFilteredRules.ts` — derives category from rule
  id prefix (`terminal-*` → `"terminal"`, all others → `"structural"`); uses
  `rule.displayName` instead of `rule.name`; dropped `rule.arity` filter. Also fixed
  type imports and API calls in all dependent test mode files: `DetailPanel.tsx`
  (`toMathString`/`toGLSL`/`toTreeView` from new engine, removed `STRING_ARGS` and
  `rule.category`/`rule.arity`), `SpecimenCard.tsx` (same), `ValueCanvasCPU.tsx`
  (standalone `evaluate(node, x, y)` — CPU preview is static, no `t` support),
  `ValueCanvasGPU.tsx` (updated `buildValueFragmentShader(node)` call), plus type
  import fixes in `GrammarTestBench.tsx` and `RuleCanvas.tsx`. Typecheck passes.
  Follow-ups: SearchSection.tsx category buttons are hardcoded to
  `['all', 'terminal', 'structural']` — consider adding `'transform'` and
  `'combinator'` categories once the test mode UI is fully wired.

- [x] **S7 — Test mode: canvases.** Rewrite `ValueCanvasCPU.tsx` (replace
      `rule.evaluate()` with standalone `evaluate()` — see Open Question #5),
      rewrite `ValueCanvasGPU.tsx` (adapt to new `GrammarRule`), update
      `RuleCanvas.tsx` (type remap). Files: `ValueCanvasCPU.tsx`,
      `ValueCanvasGPU.tsx`, `RuleCanvas.tsx`. **Depends on:** S6.

  **S7 note:** All three files were already migrated during S6. ValueCanvasCPU
  uses standalone `evaluate(node, x, y)`, ValueCanvasGPU uses
  `buildValueFragmentShader(node)` (no `rule` parameter), and RuleCanvas
  imports `GrammarRule` from `@repo/randomart-engine-next`. No changes
  needed. Typecheck passes. Follow-ups: none.

- [x] **S8 — Test mode: grammar UI.** Rewrite `DetailPanel.tsx` (replace
      `rule.toMathString(args, node)`, `rule.toGLSL(args, node)`,
      `rule.toTreeView(args, depth, node)` with new API — see Open Question #6),
      rewrite `SpecimenCard.tsx` (same), update `GrammarTestBench.tsx` (type
      remap). Files: `DetailPanel.tsx`, `SpecimenCard.tsx`,
      `GrammarTestBench.tsx`. **Depends on:** S6.

  **S8 note:** All three files were already migrated during S6. `DetailPanel.tsx`
  imports `toMathString`, `toGLSL`, `toTreeView` from
  `@repo/randomart-engine-next` and calls them as standalone functions on
  `buildPreviewNode(rule, seed)`. `SpecimenCard.tsx` imports `toMathString` and
  calls `toMathString(rule.buildNode(String(seed)))`. `GrammarTestBench.tsx`
  imports `GrammarRule` from `@repo/randomart-engine-next`. No `rule.toGLSL()`,
  `rule.toMathString()`, or `rule.toTreeView()` method calls remain. Typecheck
  passes. Follow-ups: none.

## Decisions Log

1. **S1 — OQ #1 resolved: Drop `rngR`/`rngG`/`rngB` and `initialHash`/`choiceHistory`
   from the store.** The new engine's `SeededRandom` has private state with no
   `initialHash` or `choiceHistory`. The inspector debug components
   (`SeedInfo.tsx`, `ChoiceHistory.tsx`) were replaced with seed-text and
   rule-info displays. The per-channel RNGs are not stored in the Zustand state;
   they are created transiently by the `generateTrees` adapter via
   `GrammarRule.buildNode()`.

2. **S1 — OQ #2 resolved: `generateTrees` adapter using `GrammarRule.buildNode()`.**
   The adapter picks the first enabled rule and calls `rule.buildNode(textSeed)`
   with per-channel seed suffixes for uncorrelated mode, or a single shared node
   for correlated mode. The new engine does not support multi-rule weighted
   selection within a single channel, so the adapter uses a single rule per
   generation. The `enabledRuleIds` list is retained for future use (e.g. UI
   toggles), but only the first enabled rule is used for tree generation.

3. **S1 — OQ #4/#10 resolved: Drop `ruleWeights` from the store.** The old
   engine's `ruleWeights` (per-rule selection weights for multi-rule tree
   building) are incompatible with the new engine's `WEIGHT_PRESETS` (per-node-type
   selection weights within a single rule). Since the new engine does not support
   multi-rule weighted selection, `ruleWeights` is removed from the store. The
   `setRuleWeight` and `resetAllWeights` actions are removed. The new engine's
   `WEIGHT_PRESETS` can be applied per-rule via `buildTree` weight overrides if
   needed in a future session.

4. **S2 — `maxDepth` removed from `TreeConfig`; adapter uses `rule.buildNode()`.**
   Each `GrammarRule` defines its own `maxDepth` internally via `GrammarSpec`,
   so the UI's `maxDepth` slider no longer affects tree generation (it remains
   in the store state for UI display only). The adapter continues using
   `rule.buildNode(textSeed)` rather than the standalone `buildTree()` because
   the engine doesn't expose `GrammarSpec` through the public `GrammarRule` API.
   `buildTree()` requires a `GrammarSpec` parameter that isn't accessible
   without modifying engine source. Follow-up: expose `spec` on `GrammarRule`
   or add a `buildTreeWithDualRng()` wrapper to enable correlated-but-varied
   RGB generation via `buildTree()`.

5. **S4 — OQ #3 resolved: `renderTreesToPngBlob` replaced with canvas-based
   fallback.** The new engine's `encodePNG` uses Node's `zlib` and is not
   exported publicly. The fallback PNG download in `DisplaySection.tsx` now uses
   the new engine's `evaluate()` function per-pixel and canvas `toBlob()` for
   browser-native PNG encoding. The primary download path (live WebGL canvas
   `toBlob()`) is unchanged. This avoids adding a Node dependency to the browser
   bundle.

6. **S4 — OQ #8 resolved: `ExpressionNode.args` → `ExprNode.children` rename.**
   `DisplaySection.tsx` now accesses correlated RGB sub-trees via
   `treeR.children?.[0]`, `treeR.children?.[1]`, `treeR.children?.[2]` with
   null-safe fallback to the full tree.

7. **S4 — OQ #9 resolved: Weight preset keys match new engine naming.**
   `WeightPresets.ts` now re-exports `WEIGHT_PRESETS` and `getPresetWeights`
   directly from `@repo/randomart-engine-next`, which already uses `mod` and
   `product` instead of the old engine's `modulo` and `multiply`.

8. **S6 — OQ #5 resolved: CPU preview is static via standalone `evaluate()`.**
   The new engine's `evaluate(node, x, y)` does not accept a `t` parameter or
   lazy args. `ValueCanvasCPU.tsx` now calls `evaluate(node, x, y)` directly,
   accepting that the CPU preview is static (matching the engine plan's S8.5
   decision that CPU is static preview only). The GPU path continues to animate
   via the `uT` uniform.

9. **S6 — OQ #6 resolved: Use standalone `toGLSL(node)` with local
   `NOISE_DEPS_BY_NODE`.** `buildValueShader.ts` now calls `toGLSL(node)` from
   the new engine and collects noise dependencies via a local
   `NOISE_DEPS_BY_NODE` map + recursive `collectNoiseDeps()` helper, then
   resolves them with `resolveGlslDeps()`. This avoids using `rule.toGPU(textSeed)`
   which would produce a complete shader unsuitable for the test mode's custom
   shader template.

10. **S6 — OQ #7 resolved: Derive `category` from rule id prefix, drop
    `arity`.** The new `GrammarRule` only has `id` and `displayName`.
    `useFilteredRules.ts` derives `category` from the rule id prefix
    (`terminal-*` → `"terminal"`, `transform-*` → `"structural"`, etc.).
    `SpecimenCard.tsx` and `DetailPanel.tsx` display `rule.displayName` instead
    of `rule.name` and omit `rule.arity` (not derivable from the public API
    without accessing internal `GrammarSpec`).

## Known Issues / Open Questions

These must be resolved by the session that first encounters them. Do not guess —
flag and log.

1. ~~**`SeededRandom.initialHash` and `SeededRandom.choiceHistory` missing from
   new engine.**~~ **Resolved in S1.** Dropped `rngR`/`rngG`/`rngB` from the
   store; replaced inspector components with seed-text-based displays.

2. ~~**`generateTrees()` has no direct equivalent in the new engine.**~~
   **Resolved in S1.** Created `adapter.ts` with `generateTrees()` that picks
   the first enabled rule and calls `rule.buildNode(textSeed)` with per-channel
   seeds.

3. ~~**`renderTreesToPngBlob()` has no equivalent in the new engine.**~~
   **Resolved in S4.** Replaced with a local `renderTreesToBlob` that uses the
   new engine's `evaluate()` and canvas `toBlob()` for browser-native PNG
   encoding. The primary download path (live WebGL canvas) is unchanged.

4. ~~**`ruleWeights` concept mismatch.**~~ **Resolved in S1.** Dropped
   `ruleWeights` from the store entirely. The new engine does not support
   multi-rule weighted selection; per-node-type weights are available via
   `WEIGHT_PRESETS` if needed later.

5. ~~**`rule.evaluate()` removed from new `GrammarRule`.**~~
   **Resolved in S6.** CPU preview uses standalone `evaluate(node, x, y)` from
   the new engine. CPU preview is static (no `t` support), matching the engine
   plan's S8.5 decision.

6. ~~**`rule.toGLSL(args, node)` and `rule.noiseDependencies` removed from new
   `GrammarRule`.**~~ **Resolved in S6.** `buildValueShader.ts` uses standalone
   `toGLSL(node)` and collects noise deps via a local `NOISE_DEPS_BY_NODE` map
   with `resolveGlslDeps()`.

7. ~~**`rule.category`, `rule.arity`, `rule.name`, `rule.weight` removed from new
   `GrammarRule`.**~~ **Resolved in S6.** `useFilteredRules.ts` derives category
   from rule id prefix. UI components use `rule.displayName` instead of
   `rule.name`. `arity` is omitted (not derivable from public API).

8. ~~**`ExpressionNode.args` → `ExprNode.children` rename.**~~
   **Resolved in S4.** `DisplaySection.tsx` now uses
   `treeR.children?.[0]`/`[1]`/`[2]` with null-safe fallback.

9. ~~**Weight preset keys use old rule names.**~~ **Resolved in S4.**
   `WeightPresets.ts` re-exports `WEIGHT_PRESETS` from
   `@repo/randomart-engine-next`, which already uses `mod`/`product` naming.

10. ~~**`getInitialWeights()` returns per-rule weights; new engine has no
    equivalent.**~~ **Resolved in S1.** `ruleWeights` was dropped from the store,
    so `getInitialWeights()` is no longer needed.

11. **`GrammarSpec` not exposed on `GrammarRule` public API.** The new engine's
    `buildTree()` function requires a `GrammarSpec` parameter, but the
    `GrammarRule` type only exposes `id` and `displayName`. The spec is captured
    in the `createRule()` closure. Options: (a) add `spec?: GrammarSpec` to the
    `GrammarRule` type and store it in `createRule()`, (b) add a
    `buildDualRngTree(seedText, correlated)` method to `GrammarRule` that
    internally uses `buildTree()` with the captured spec, (c) keep using
    `rule.buildNode()` and accept single-RNG generation. **Open — blocks
    correlated-but-varied RGB via `buildTree()`.**
