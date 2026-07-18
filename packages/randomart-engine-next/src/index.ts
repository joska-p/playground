// ── Animation ────────────────────────────────────────────────────
export {
  BEHAVIORS,
  getAnimation,
  hasAnimation,
  listAnimationGroups,
  listAnimations
} from './behaviours/registry.js';
export { compileToShader } from './compileToGLSL.js';
export { toMathString, toTreeView } from './format.js';
export { GLSL_PI, glslFunctionById, glslFunctions, resolveGlslDeps } from './glsl-library.js';
export { OPERATORS, getOperator, getOperatorCategories } from './grammar/operators/registry.js';
export {
  DEFAULT_RULE_ID,
  RULES,
  getRule,
  hasRule,
  listRuleGroups,
  listRules
} from './grammar/rules/registry.js';
export { SeededRandom, createCorrelatedRng, createDualRng } from './prng.js';
export {
  buildChannelTrees,
  buildTree,
  evaluate,
  serializeToBytes,
  toGLSL,
  toStructuredView
} from './tree.js';
