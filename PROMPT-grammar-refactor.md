# Prompt: Start the Operator Registry Refactor

Read the plan at `/workspaces/playground/PLAN-operator-registry.md` — it contains the full architecture, file structure, type patterns, and migration order.

The package to refactor is `/workspaces/playground/packages/randomart-engine-next`.

## Key Context

**Current files to read first:**

- `src/types.ts` — `ExprNodeType` union (29 members, 5 to remove), `ExprNode`, `TreeView`, `GrammarRule`
- `src/expression.ts` — `evaluate()` switch (140 lines), `toGLSL()` switch (80 lines), `toBytes()` opcode table, `grow()`, `buildTree()`, `toStructuredView()`
- `src/format.ts` — `toMathString()` switch (65 lines), `toTreeView()`
- `src/rules.ts` — `createRule()` factory, `RULE_DEFINITIONS` array, `GrammarSpec` type
- `src/compileToGLSL.ts` — `collectNoiseDeps()` with `NOISE_DEPS_BY_NODE` map
- `src/weight-presets.ts` — weight overrides keyed by `ExprNodeType`
- `src/index.ts` — public API exports
- `src/animation.ts` — animation behaviors (composite operators like smoothstep/mix are available here as GLSL built-ins)
- `src/glsl-library.ts` — GLSL helper functions (pseudoRecaman, fbmNoise, etc.)

## What to Do

Follow the migration order in the plan:

1. **Create `src/grammar/operators/`** — one file per category, each operator is a plain object with `arity`, `opcode`, `argNames`, `evaluate`, `toGLSL`, `toMathString`
2. **Create `src/grammar/operators/registry.ts`** — `OPERATORS` record with inferred types and exhaustiveness check
3. **Remove 5 composite operators** from `ExprNodeType` in `types.ts`: `well`, `tent`, `mix`, `smoothstep`, `clamp`
4. **Create `src/grammar/types.ts`** — `GrammarSpec`, `GrammarRule` types
5. **Create `src/grammar/createRule.ts`** — factory function
6. **Create `src/grammar/rules/`** — rule definitions using only the 24 remaining operators
7. **Refactor `expression.ts`** — replace switch bodies with registry-based walkers (~15 lines each)
8. **Refactor `format.ts`** — replace `toMathString` switch with registry walker
9. **Update `compileToGLSL.ts`** — read `noiseDependencies` from operator registry
10. **Update `rules.ts`** — import from new grammar modules
11. **Update `weight-presets.ts`** — remove entries for deleted operators
12. **Update `index.ts`** — adjust exports

## Rules That Need Reworking

| Rule                | Change                                     |
| ------------------- | ------------------------------------------ |
| `classic`           | Replace `well` with `abs`, `mix` with `if` |
| `smooth`            | Remove entirely (relied on `well` + `mix`) |
| `flow-art`          | Replace `smoothstep` with `product`        |
| `compare-and-clamp` | Replace `clamp` with `if`                  |

## Type Safety Pattern

Each operator is a plain object — no `satisfies` needed:

```ts
export const sinOp = {
  arity: 1,
  opcode: 7,
  argNames: ['value'] as const,
  evaluate: ({ value }) => clamp(Math.sin(Math.PI * value)),
  toGLSL: ({ value }) => `sin(3.141592653589793 * (${value}))`,
  toMathString: ({ value }) => `sin(π·${value})`
};
```

Registry infers types — completeness checked at compile time:

```ts
export const OPERATORS = {
  x: xOp,
  y: yOp,
  sin: sinOp /* ... every ExprNodeType exactly once */
} as const;

type OperatorId = keyof typeof OPERATORS;
```

## After Implementation

Run `pnpm --filter @repo/randomart-engine-next typecheck` and fix any errors. Then run `pnpm --filter @repo/randomart-engine-next build` if available. Check that the public API exports from `index.ts` still work for consumers in `packages/randomart-next`.
