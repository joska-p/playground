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

- [ ] **S1 — Store types + adapter foundation.** Rewrite `types.ts` to use new
      engine types. Create adapter utilities (e.g. `generateTrees` replacement,
      `SeededRandom` wrapper if needed). Files: `types.ts`, new adapter file if
      created. **Depends on:** resolution of Open Questions #1 (SeededRandom
      properties), #2 (generateTrees replacement), #4 (ruleWeights concept).

- [ ] **S2 — Store + config action.** Rewrite `store.ts` and `actions/config.ts`
      to use new engine's `listRules()`, `createDualRng()`/`createCorrelatedRng()`,
      `buildTree()`. Files: `store.ts`, `actions/config.ts`. **Depends on:** S1.

- [ ] **S3 — Selectors + inspector components.** Fix selectors that reference
      `rng.initialHash`/`rng.choiceHistory`. Update `MathFormula.tsx` and
      `AstTreeView.tsx` to import from new engine's `format.ts`. Files:
      `selectors.ts`, `MathFormula.tsx`, `AstTreeView.tsx`. **Depends on:** S1.

- [ ] **S4 — Control panel: Grammar, Animation, Display, Weights.** Update
      `GrammarSection.tsx` (`listRules()` + `string` IDs), `AnimationSection.tsx`
      (import path), `DisplaySection.tsx` (replace `renderTreesToPngBlob` — see
      Open Question #3), `WeightSliders.tsx` (`listRules()` + `string` IDs),
      `WeightPresets.ts` (rethink weight presets — see Open Question #4). Files:
      `GrammarSection.tsx`, `AnimationSection.tsx`, `DisplaySection.tsx`,
      `WeightSliders.tsx`, `WeightPresets.ts`. **Depends on:** S1, S2.

- [ ] **S5 — WebGL hooks.** Update `useShaderProgram.ts` and
      `useWebGLRenderer.ts` to use new engine types (`ExprNode`, `AnimationBehavior`)
      and import paths (`compileToGLSL`, `animationRegistry`). Files:
      `useShaderProgram.ts`, `useWebGLRenderer.ts`. **Depends on:** S1.

- [ ] **S6 — Test mode: eval helpers + GLSL builder.** Rewrite `evalHelpers.ts`
      (replace `SeededRandom` constructor, rethink `buildPreviewNode` — see Open
      Question #5), rewrite `buildValueShader.ts` (replace `rule.toGLSL()` and
      `rule.noiseDependencies` — see Open Question #6), update `TestMode.tsx`
      (`listRules()`), update `useFilteredRules.ts` (new `GrammarRule` shape — see
      Open Question #7). Files: `evalHelpers.ts`, `buildValueShader.ts`,
      `TestMode.tsx`, `useFilteredRules.ts`. **Depends on:** S1.

- [ ] **S7 — Test mode: canvases.** Rewrite `ValueCanvasCPU.tsx` (replace
      `rule.evaluate()` with standalone `evaluate()` — see Open Question #5),
      rewrite `ValueCanvasGPU.tsx` (adapt to new `GrammarRule`), update
      `RuleCanvas.tsx` (type remap). Files: `ValueCanvasCPU.tsx`,
      `ValueCanvasGPU.tsx`, `RuleCanvas.tsx`. **Depends on:** S6.

- [ ] **S8 — Test mode: grammar UI.** Rewrite `DetailPanel.tsx` (replace
      `rule.toMathString(args, node)`, `rule.toGLSL(args, node)`,
      `rule.toTreeView(args, depth, node)` with new API — see Open Question #6),
      rewrite `SpecimenCard.tsx` (same), update `GrammarTestBench.tsx` (type
      remap). Files: `DetailPanel.tsx`, `SpecimenCard.tsx`,
      `GrammarTestBench.tsx`. **Depends on:** S6.

- [ ] **S9 — Cutover.** Point the real app entry point at `randomart-next` and
      retire the old UI package (`@repo/randomart`). Verify the app builds and
      runs. **Depends on:** all previous sessions.

## Decisions Log

_(Empty — to be filled in as sessions run.)_

## Known Issues / Open Questions

These must be resolved by the session that first encounters them. Do not guess —
flag and log.

1. **`SeededRandom.initialHash` and `SeededRandom.choiceHistory` missing from
   new engine.** The selectors `useSelectedInitialHash()` and
   `useSelectedChoiceCount()` in `selectors.ts` access these properties on the
   old engine's `SeededRandom`. The new engine's `SeededRandom` has private
   state with no `initialHash` or `choiceHistory`. Options: (a) add these
   properties to the new engine's `SeededRandom` (requires engine change), (b)
   compute them in the UI from the seed text, (c) drop these selectors if the
   inspector UI doesn't need them. **Session S1 or S3 must resolve.**

2. **`generateTrees()` has no direct equivalent in the new engine.** The old
   engine's `generateTrees(config)` accepts `enabledRuleIds`, `correlated`,
   `ruleWeights`, and `maxDepth`, then builds three expression trees using
   weighted multi-rule selection. The new engine's `buildTree()` takes a single
   `GrammarSpec` (one rule). Options: (a) build a `generateTrees` adapter in
   the UI that picks a rule per channel and calls `buildTree`, (b) restructure
   the store to generate one tree per enabled rule and pick at render time, (c)
   add a `generateTrees`-equivalent to the new engine. **Session S1 or S2 must
   resolve.**

3. **`renderTreesToPngBlob()` has no equivalent in the new engine.** The old
   engine exports `renderTreesToPngBlob(treeR, treeG, treeB, size, time)` which
   evaluates expression trees per-pixel and returns a PNG `Blob`. The new
   engine's `generate()` does this internally but returns the PNG as part of
   `GenerateResult` — it's not exported as a standalone function. Options: (a)
   add `renderTreesToPngBlob` to the new engine, (b) implement it in the UI
   using the new engine's `evaluate()` and `encodePNG()`, (c) use the canvas
   `toBlob()` approach (already the primary path in `DisplaySection.tsx` — the
   PNG function is a fallback). **Session S4 must resolve.**

4. **`ruleWeights` concept mismatch.** The old engine's `ruleWeights` are
   per-rule weights (which grammar rule to select during multi-rule tree
   building). The new engine's `WEIGHT_PRESETS` are per-node-type weights
   (which expression node to pick within a single rule's grammar). These are
   fundamentally different concepts. Options: (a) drop `ruleWeights` from the
   store if the new engine doesn't support multi-rule weighted selection, (b)
   reimplement weighted rule selection in the UI adapter, (c) use the new
   engine's `WeightOverrides` for per-node-type weights instead. **Session S1
   or S4 must resolve.**

5. **`rule.evaluate()` removed from new `GrammarRule`.** The old engine's
   `GrammarRule` had an `evaluate(args, x, y, t, node)` method. The new engine
   has a standalone `evaluate(node, x, y)` function in `expression.ts` (no `t`
   parameter, no lazy args). The test mode's `ValueCanvasCPU.tsx` uses
   `rule.evaluate(makeDefaultEvalArgs(x, y), x, y, t, node)`. Options: (a) use
   the new engine's standalone `evaluate(node, x, y)` (drops `t` support), (b)
   add `t`-aware evaluation to the new engine, (c) accept that CPU preview
   doesn't animate (matching the engine plan's S8.5 decision that CPU is static
   preview only). **Session S6 or S7 must resolve.**

6. **`rule.toGLSL(args, node)` and `rule.noiseDependencies` removed from new
   `GrammarRule`.** The test mode's `buildValueShader.ts` calls
   `rule.toGLSL(GLSL_ARGS, node)` to get a GLSL expression string, and
   `rule.noiseDependencies` to resolve GLSL library functions. The new engine's
   `GrammarRule` has `toGPU(textSeed)` which returns a complete shader, not
   just the expression. The new engine has standalone `toGLSL(node)` in
   `expression.ts` and noise deps are collected via `NOISE_DEPS_BY_NODE` map.
   Options: (a) use the new engine's `toGLSL(node)` and
   `resolveGlslDeps(collectNoiseDeps(node))`, (b) use `rule.toGPU(textSeed)`
   directly (loses per-rule shader customization). **Session S6 or S8 must
   resolve.**

7. **`rule.category`, `rule.arity`, `rule.name`, `rule.weight` removed from new
   `GrammarRule`.** The test mode's `useFilteredRules.ts` filters by
   `rule.category` and searches by `rule.name`/`rule.id`. `SpecimenCard.tsx`
   and `DetailPanel.tsx` display `rule.category`, `rule.arity`, `rule.name`.
   The new `GrammarRule` only has `id` and `displayName`. Options: (a) derive
   `category`/`arity` from the rule's `GrammarSpec` (available via
   `getRule(id)` internals), (b) add these fields to the new engine's
   `GrammarRule` type, (c) drop category filtering in the test mode. **Session
   S6 or S8 must resolve.**

8. **`ExpressionNode.args` → `ExprNode.children` rename.** `DisplaySection.tsx`
   accesses `treeR.args[0]`, `treeR.args[1]`, `treeR.args[2]` for correlated
   RGB export. Must become `treeR.children?.[0]` etc. Straightforward rename
   but must be done consistently. **Session S4.**

9. **Weight preset keys use old rule names.** `WeightPresets.ts` defines presets
   with keys like `modulo`, `multiply` that match old rule IDs. The new
   engine's `WEIGHT_PRESETS` use `mod`, `product` (S3 decision). The UI's
   presets need updating to match. **Session S4.**

10. **`getInitialWeights()` returns per-rule weights; new engine has no
    equivalent.** The store初始化 calls `getInitialWeights()` to populate
    `ruleWeights`. The new engine doesn't have this function. If `ruleWeights`
    is kept, a new source for initial values is needed. **Session S1 or S2
    must resolve.**
