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
  Word
} from './types';

// Helpers
export { symbol, symbolWithMeta } from './symbol';

// Rule factories
export { contextSensitiveRule } from './rules/context-sensitive-rule';
export type { ContextSensitiveOptions } from './rules/context-sensitive-rule';
export { deterministicRule } from './rules/deterministic-rule';
export { parametricRule } from './rules/parametric-rule';
export type { ParametricOptions } from './rules/parametric-rule';
export { stochasticRule } from './rules/stochastic-rule';
export type { StochasticProduction } from './rules/stochastic-rule';

// Engine
export { expand } from './expand';
export { steps } from './steps';
export { validate } from './validate';
