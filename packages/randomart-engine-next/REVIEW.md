# Code Review — randomart-engine-next/src

Review of TypeScript implementation for duplication, type safety, and code quality.

---

## High Severity

### 1. ~~`clamp` function duplicated 6 times~~ ✅ Resolved

Extracted to `src/util.ts` and imported everywhere.

### 2. `as never` casts bypass type safety on operator arg objects

`expression.ts` and `format.ts` use `as Record<string, T>` to bridge the gap
between `OperatorDef`'s `Record<string, T>` method signatures and the per-operator
typed arguments. The method-syntax bivariance in `OperatorDef` eliminates most
`as never` casts, but the dynamic `Object.fromEntries` + `argNames.map` pattern
still requires the cast at the call site.

**Fix:** Make `OperatorDef` generic over its `argNames` tuple so TypeScript can
verify argument objects at compile time. This is a larger redesign.

---

## Medium Severity

### 3. `string` used where union types exist — 3 locations

| Location                                              | Current Type | Should Be           |
| ----------------------------------------------------- | ------------ | ------------------- |
| `src/types.ts` — `GenerateOptions.ruleId`             | `string`     | Rule-ID union       |
| `src/types.ts` — `GenerateOptions.enabledRuleIds`     | `string[]`   | Rule-ID union array |
| `src/grammar/rules/registry.ts` — `getRule`/`hasRule` | `string`     | Rule-ID union       |

Rule IDs can be derived from the `RULES` map or from `GrammarRule['id']` if
rule definitions use `as const`.

### 4. ~~Duplicate entries in `animationRegistry`~~ ✅ Resolved

No duplicate entries remain. Animation registry split into `animation/spatial.ts`
and `animation/color.ts`.

### 5. `GenerateResult | GenerateError` — fragile discriminated union

`generate.ts` returns `GenerateResult | GenerateError`. Consumers narrow via
`'error' in result`. If `GenerateResult` ever gains an `error` field, this
breaks silently.

**Fix:** Add a `kind: 'ok' | 'error'` discriminator field.

---

## Low Severity

### 6. ~~`GL_PI` string constant duplicated~~ ✅ Resolved

Extracted to shared `GLSL_PI` constant in `glsl-library.ts`, imported by
`trigonometric.ts` and `derived.ts`.

### 7. `noiseDependencies` access is untyped

`compileToGLSL.ts` accesses `op.noiseDependencies` via duck-type check. The
`OperatorDef` type now includes this as optional — already resolved.

### 8. ~~`GrammarSpec.id` is `string` not a literal union~~

Could be improved with `as const` on rule definitions and a derived `RuleId`
union type.

---

## Refactoring Completed

- [x] Extract `clamp` to `src/util.ts` (issue #1)
- [x] Remove dead weight-presets feature (engine + UI)
- [x] Split `animation.ts` (769 lines) into `animation/spatial.ts`, `animation/color.ts`, `animation/index.ts`
- [x] Rename `classic.ts` → `rule-definitions.ts` (misleading filename)
- [x] Extract `GLSL_PI` shared constant to `glsl-library.ts` (issue #6)
- [x] Extract color-space GLSL blocks into `glsl-color-spaces.ts`
- [x] Rename functions for consistency: `makeColorMapper` → `createColorMapper`, `buildTree` → `buildExpressionTree`, `toBytes` → `serializeToBytes`, `compileToGLSL` → `compileToShader`, `functionById` → `glslFunctionById`
- [x] Rename internal functions for clarity: `buildPool` → `buildOperatorPool`, `weightedPick` → `weightedRandomPick`, `toEntry` → `operatorToPoolEntry`, `buildPreamble` → `buildShaderPreamble`, `collectNoiseDeps` → `collectNoiseDependencies`, `applyBehaviors` → `applyAnimationBehaviors`, `colorSpaceWrap` → `wrapWithColorSpaceConversion`, `compileColorExpr` → `compileColorExpression`
- [x] Clean up `types.ts`: separate local types from re-exports
- [x] Add `noiseDependencies?` to `OperatorDef` (issue #7)

## Remaining Improvements

- [ ] Add `RuleId` type derived from rule definitions (issue #3)
- [ ] Replace `string` with `RuleId` in public APIs (issue #3)
- [ ] Add `kind` discriminator to error union (issue #5)
- [ ] (Optional) Make `OperatorDef` generic over `argNames` (issue #2)
