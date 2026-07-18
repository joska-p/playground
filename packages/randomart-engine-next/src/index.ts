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
export { generateTrees } from './generateTrees.js';
export type { GenerateTreesConfig, GenerateTreesOutput } from './generateTrees.js';
export { functionById, glslFunctions, resolveGlslDeps } from './glsl-library.js';
export { OPERATORS, getOperator, getOperatorCategories } from './grammar/operators/registry.js';
export type { OperatorCategory, OperatorGroup } from './grammar/operators/registry.js';
export { createRule } from './grammar/rules/createRule.js';
export {
  DEFAULT_RULE_ID,
  RULES,
  getRule,
  hasRule,
  listRuleGroups,
  listRules
} from './grammar/rules/registry.js';
export type { RuleCategory, RuleGroup } from './grammar/rules/registry.js';
export { createCorrelatedRng, createDualRng } from './prng.js';
export type { ColorSpaceId } from './types.js';
