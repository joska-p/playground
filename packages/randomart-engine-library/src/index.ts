/**
 * randomart-engine — public API surface.
 *
 * Generates visual (PNG) and symbolic (GLSL / math / tree / node) hash
 * visualizations of a text seed, using the random-art expression-tree scheme of
 * Perrig & Song. The grammar-rules registry is the core extensibility point.
 */

export { generate } from "./generate.js";
export {
  listRules,
  getRule,
  hasRule,
  DEFAULT_RULE_ID,
} from "./rules.js";

export type {
  ExprNode,
  ExprNodeType,
  TreeView,
  GrammarRule,
  GenerateOptions,
  GenerateResult,
  GenerateError,
} from "./types.js";
