// Public API of @repo/l-system-engine
// ---------------------------------------------------------------------------
// Types
export type {
  Context,
  ExpandOptions,
  Grammar,
  LSymbol,
  Parameter,
  Rule,
  ValidationError,
  Word,
} from './types';

// Helpers
export { symbol, symbolWithMeta } from './symbol';

// Rule factories
export { deterministicRule } from './rules/deterministic-rule';
export { stochasticRule } from './rules/stochastic-rule';
export type { StochasticProduction } from './rules/stochastic-rule';
export { contextSensitiveRule } from './rules/context-sensitive-rule';
export type { ContextSensitiveOptions } from './rules/context-sensitive-rule';
export { parametricRule } from './rules/parametric-rule';
export type { ParametricOptions } from './rules/parametric-rule';

// Engine
export { steps } from './steps';
export { expand } from './expand';
export { validate } from './validate';
