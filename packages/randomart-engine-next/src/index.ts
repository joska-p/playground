/**
 * randomart-engine-next — public API surface.
 *
 * Generates visual (PNG) and symbolic (GLSL / math / tree / node) hash
 * visualizations of a text seed, using the random-art expression-tree scheme of
 * Perrig & Song. The grammar-rules registry is the core extensibility point.
 *
 * Pipeline overview:
 *   1. Text seed → PRNG (prng.ts)
 *   2. Grammar rule selection (grammar/rules/)
 *   3. Expression tree growth (expression.ts)
 *   4. Output generation:
 *      a. CPU rasterization → PNG (generate.ts, png.ts)
 *      b. GPU shader compilation (compileToGLSL.ts)
 *      c. Math string formatting (format.ts)
 *      d. Tree view (expression.ts, format.ts)
 *   5. Animation behaviors (animation/)
 */

// ── Animation ────────────────────────────────────────────────────
export { animationRegistry } from './animation/index.js';
export type { AnimationBehaviorId } from './animation/index.js';

// ── Shader compilation ───────────────────────────────────────────
export { compileToShader } from './compileToGLSL.js';

// ── Expression tree core ─────────────────────────────────────────
export {
  buildExpressionTree,
  evaluate,
  grow,
  serializeToBytes,
  toGLSL,
  toStructuredView
} from './expression.js';

// ── Human-readable formatting ────────────────────────────────────
export { toMathString, toTreeView } from './format.js';

// ── Multi-channel tree generation ────────────────────────────────
export { generateTrees } from './generateTrees.js';
export type { GenerateTreesConfig, GenerateTreesOutput } from './generateTrees.js';

// ── GLSL library ────────────────────────────────────────────────
export { GLSL_PI, glslFunctionById, glslFunctions, resolveGlslDeps } from './glsl-library.js';
export type { GlslFunction, GlslFunctionsIds } from './glsl-library.js';

// ── Operators ────────────────────────────────────────────────────
export { OPERATORS, getOperator, getOperatorCategories } from './grammar/operators/registry.js';
export type {
  OperatorCategory,
  OperatorDef,
  OperatorGroup,
  OperatorId
} from './grammar/operators/registry.js';

// ── Grammar rules ────────────────────────────────────────────────
export { createRule } from './grammar/rules/createRule.js';
export {
  DEFAULT_RULE_ID,
  RULES,
  getRule,
  hasRule,
  listRuleGroups,
  listRules
} from './grammar/rules/registry.js';
export type { GrammarRule, RuleCategory, RuleGroup } from './grammar/rules/registry.js';

// ── PRNG ─────────────────────────────────────────────────────────
export { createCorrelatedRng, createDualRng } from './prng.js';
export type { DualRng } from './prng.js';

// ── Color ────────────────────────────────────────────────────────
export { createColorMapper, parseHex } from './color.js';
export type { RGB } from './color.js';

// ── Shared types ─────────────────────────────────────────────────
export type {
  AnimationBehavior,
  ApplyCodeContext,
  ColorSpaceId,
  ExprNode,
  GenerateError,
  GenerateOptions,
  GenerateResult,
  TreeView
} from './types.js';
