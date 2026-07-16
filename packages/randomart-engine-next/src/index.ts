/**
 * randomart-engine-next — public API surface.
 *
 * Generates visual (PNG) and symbolic (GLSL / math / tree / node) hash
 * visualizations of a text seed, using the random-art expression-tree scheme of
 * Perrig & Song. The grammar-rules registry is the core extensibility point.
 */

export { animationRegistry } from './animation.js';
export { compileToGLSL } from './compileToGLSL.js';
export { buildTree, evaluate, grow, toGLSL, toStructuredView } from './expression.js';
export { toMathString, toTreeView } from './format.js';
export { functionById, glslFunctions, resolveGlslDeps } from './glsl-library.js';
export { createRule } from './grammar/createRule.js';
export { OPERATORS } from './grammar/operators/registry.js';
export { createCorrelatedRng, createDualRng } from './prng.js';
export { DEFAULT_RULE_ID, getRule, hasRule, listRules } from './rules.js';
export { WEIGHT_PRESETS, getPresetWeights } from './weight-presets.js';

export type { GlslFunction, GlslFunctionsIds } from './glsl-library.js';
export type { OperatorDef, OperatorId } from './grammar/operators/registry.js';
export type { GrammarRule, GrammarSpec } from './grammar/types.js';
export type { DualRng } from './prng.js';
export type {
  AnimationBehavior,
  ApplyCodeContext,
  ExprNode,
  ExprNodeType,
  GenerateError,
  GenerateOptions,
  GenerateResult,
  TreeView
} from './types.js';
export type { PresetName, WeightOverrides } from './weight-presets.js';
