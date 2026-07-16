# UI Migration Session Prompt Template

Use this prompt to run one session of the randomart-next UI migration.

---

## Prompt

Read `packages/randomart-next/UI_MIGRATION_PLAN.md` in full. Find the first
unchecked session in the Session Checklist. Do ONLY that session.

### Your workflow

1. Read the session description and its dependencies. If a dependency is
   unchecked, stop and report that the dependency is not met.
2. Read the `Known Issues / Open Questions` section. If this session is marked
   as the resolver for an open question, you MUST resolve it now: pick an
   approach, document it in the Decisions Log, and proceed. Do not leave
   questions unresolved.
3. Read every file listed in the session's file list. Understand the current
   imports and usage of old engine APIs.
4. Read the relevant parts of `@repo/randomart-engine-next` to understand the
   new API you're migrating to. Key files:
   - `packages/randomart-engine-next/src/types.ts` — `ExprNode`, `ExprNodeType`,
     `GrammarRule`, `AnimationBehavior`, `GenerateOptions`, etc.
   - `packages/randomart-engine-next/src/index.ts` — full export surface.
   - `packages/randomart-engine-next/src/prng.ts` — `SeededRandom`,
     `createDualRng`, `createCorrelatedRng`, `DualRng`.
   - `packages/randomart-engine-next/src/rules.ts` — `listRules()`,
     `getRule()`, `hasRule()`.
   - `packages/randomart-engine-next/src/expression.ts` — `evaluate()`,
     `buildTree()`, `grow()`, `toGLSL()`.
   - `packages/randomart-engine-next/src/compileToGLSL.ts` — `compileToGLSL()`.
   - `packages/randomart-engine-next/src/glsl-library.ts` — `resolveGlslDeps()`.
   - `packages/randomart-engine-next/src/animation.ts` — `animationRegistry`.
   - `packages/randomart-engine-next/src/format.ts` — `toMathString()`,
     `toTreeView()`.
   - `packages/randomart-engine-next/src/weight-presets.ts` — `WEIGHT_PRESETS`,
     `getPresetWeights()`.
5. Make the changes. Follow existing code conventions. Do not add comments
   unless asked.
6. Run the typecheck command: `pnpm --filter @repo/randomart-next exec tsc
--noEmit`. If it fails, fix the errors.
7. Check off the session box in `UI_MIGRATION_PLAN.md`.
8. Add a one-paragraph note under the session with what was done and any
   follow-ups.
9. Log any non-obvious decisions you made in the Decisions Log.
10. Stop. Do not start the next session.

### What NOT to do

- Do not touch `@repo/randomart` (the old UI package).
- Do not touch `@repo/randomart-engine-next` source code (only read it).
- Do not add compatibility shims or keep old exports around.
- Do not start a second session.
- Do not guess at unresolved engine decisions — flag them.
