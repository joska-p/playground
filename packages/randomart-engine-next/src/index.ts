/**
 * randomart-engine-next — public API surface.
 *
 * Generates visual (PNG) and symbolic (GLSL / math / tree / node) hash
 * visualizations of a text seed, using the random-art expression-tree scheme of
 * Perrig & Song. The grammar-rules registry is the core extensibility point.
 */

export { generate } from './generate.js';
export { DEFAULT_RULE_ID, getRule, hasRule, listRules } from './rules.js';

export type {
  ExprNode,
  ExprNodeType,
  GenerateError,
  GenerateOptions,
  GenerateResult,
  GrammarRule,
  TreeView
} from './types.js';
