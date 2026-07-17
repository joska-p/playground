# Code Review — randomart-engine-next/src

Review of TypeScript implementation for duplication, type safety, and code quality.

---

## High Severity

### 1. `clamp` function duplicated 6 times

The identical function `(v) => (v < -1 ? -1 : v > 1 ? 1 : v)` is defined locally in:

- `src/expression.ts:23`
- `src/grammar/operators/combinators/arithmetic.ts:3`
- `src/grammar/operators/transforms/trigonometric.ts:5`
- `src/grammar/operators/transforms/math.ts:3`
- `src/grammar/operators/inputs/values.ts:3`
- `src/grammar/operators/inputs/derived.ts:3`

**Impact:** DRY violation. If clamping behavior changes (e.g. NaN handling, range), 6 files must be updated in sync.

**Fix:** Extract to `src/util.ts` and import everywhere.

### 2. `as never` casts bypass type safety on operator arg objects

`expression.ts:253,258,276,281` and `format.ts:25,30` use `as never` to silence TypeScript when passing dynamically-constructed argument objects to operator methods:

```ts
// expression.ts:253
if (op.arity === 0) return op.evaluate({} as never, x, y);

// expression.ts:257-258
const args = Object.fromEntries(
  op.argNames.map((name, i) => [name, evaluate(node.children![i]!, x, y)])
) as Record<string, number>;
return op.evaluate(args as never, x, y);
```

`OperatorDef` doesn't encode the `argNames` shape, so there's no compile-time check that `args` matches what the operator's `evaluate`/`toGLSL`/`toMathString` functions destructure.

**Fix:** Make `OperatorDef` generic over its `argNames` tuple so TypeScript can verify argument objects at compile time. This is a larger redesign.

---

## Medium Severity

### 3. `string` used where union types exist — 3 locations

| Location                                             | Current Type | Should Be           |
| ---------------------------------------------------- | ------------ | ------------------- |
| `src/types.ts:74` — `GenerateOptions.ruleId`         | `string`     | Rule-ID union       |
| `src/types.ts:82` — `GenerateOptions.enabledRuleIds` | `string[]`   | Rule-ID union array |
| `src/rules.ts:96,101` — `getRule`/`hasRule`          | `string`     | Rule-ID union       |

Rule IDs can be derived from the `REGISTRY` map in `rules.ts` or from `GrammarRule['id']` if rule definitions use `as const`.

### 4. Duplicate entries in `animationRegistry`

`src/animation.ts:798-844` — three behaviors appear twice in the registry array:

| Behavior                    | Lines    |
| --------------------------- | -------- |
| `neonReactivePulseBehavior` | 801, 837 |
| `thermalRadianceBehavior`   | 802, 836 |
| `iridescentSheenBehavior`   | 803, 835 |

These were moved from "Spatial — kept" to "Color — kept" during refactoring but the original entries were not removed.

### 5. `GenerateResult | GenerateError` — fragile discriminated union

`generate.ts:31` returns `GenerateResult | GenerateError`. Consumers narrow via `'error' in result` — a property-existence check. If `GenerateResult` ever gains an `error` field, this breaks silently.

**Fix:** Add a `kind: 'ok' | 'error'` discriminator field.

---

## Low Severity

### 6. `GL_PI` string constant duplicated

Defined identically in `src/grammar/operators/transforms/trigonometric.ts:3` and `src/grammar/operators/inputs/derived.ts:22` (and inside closures in `derived.ts:22,92`). Minor — could be a shared constant.

### 7. `noiseDependencies` access is untyped

`src/compileToGLSL.ts:30-42` uses `'noiseDependencies' in op` — a runtime duck-type check. The `OperatorDef` type doesn't include this field. Only `recamanPatternOp` uses it. Could be added as optional to `OperatorDef`.

### 8. `GrammarSpec.id` is `string` not a literal union

`src/grammar/types.ts:15` types `id: string`. If rule definitions used `as const` on their `id` field, a `RuleId` union could be derived from them.

---

## Summary

| #   | Severity   | Issue                                  | Files Affected                                                                 |
| --- | ---------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | **High**   | `clamp` duplicated 6x                  | expression.ts, arithmetic.ts, trigonometric.ts, math.ts, values.ts, derived.ts |
| 2   | **High**   | `as never` casts bypass type safety    | expression.ts, format.ts                                                       |
| 3   | **Medium** | `string` instead of union types        | types.ts, rules.ts, cli.ts                                                     |
| 4   | **Medium** | Duplicate entries in animationRegistry | animation.ts                                                                   |
| 5   | **Medium** | Fragile error discriminated union      | types.ts, generate.ts, cli.ts                                                  |
| 6   | Low        | `GL_PI` duplicated                     | trigonometric.ts, derived.ts                                                   |
| 7   | Low        | `noiseDependencies` untyped            | compileToGLSL.ts                                                               |
| 8   | Low        | `GrammarSpec.id` not a literal union   | grammar/types.ts                                                               |

## Planned Fixes

- [x] Step 1: Extract `clamp` to `src/util.ts` (issue #1)
- [x] Step 2: Remove dead weight-presets feature (engine + UI)
- [ ] Step 3: Add `RuleId` type derived from rule definitions (issue #3)
- [ ] Step 4: Replace `string` with `RuleId` in public APIs (issue #3)
- [ ] Step 5: Remove duplicate entries from animationRegistry (issue #4)
- [ ] Step 6: Add `kind` discriminator to error union (issue #5)
- [ ] Step 7: Add `noiseDependencies?` to OperatorDef (issue #7)
- [ ] Step 8: (Optional) Make OperatorDef generic over argNames (issue #2)
