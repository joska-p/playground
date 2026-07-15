/**
 * randomart-engine-next — public API surface.
 *
 * Generates visual (PNG) and symbolic (GLSL / math / tree / node) hash
 * visualizations of a text seed, using the random-art expression-tree scheme of
 * Perrig & Song. The grammar-rules registry is the core extensibility point.
 */

export { animationRegistry } from './animation.js';
export { compileToGLSL } from './compileToGLSL.js';
export { buildTree, grow } from './expression.js';
export { generate } from './generate.js';
export { functionById, glslFunctions, resolveGlslDeps } from './glsl.js';
export { createCorrelatedRng, createDualRng } from './prng.js';
export { DEFAULT_RULE_ID, getRule, hasRule, listRules } from './rules.js';
export { WEIGHT_PRESETS, getPresetWeights } from './weight-presets.js';

export type { GlslFunction, GlslFunctionsIds } from './glsl.js';
export type { DualRng } from './prng.js';
export type {
  AnimationBehavior,
  ApplyCodeContext,
  ExprNode,
  ExprNodeType,
  GenerateError,
  GenerateOptions,
  GenerateResult,
  GrammarRule,
  TreeView
} from './types.js';
export type { PresetName, WeightOverrides } from './weight-presets.js';
