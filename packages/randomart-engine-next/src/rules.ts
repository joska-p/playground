/**
 * The grammar-rules registry — the core feature of the library.
 *
 * Each rule is a self-contained recipe that knows how to turn a text seed into
 * every representation the library supports. Rules differ only in their
 * grammar spec (which operators are available and how the tree grows),
 * which produces visually distinct families of art from the same engine.
 *
 * Rules are cached per-seed internally so that the potentially expensive tree
 * construction happens once even when multiple representations are requested.
 */

import { arithmeticMixRule, blockyRule, classicRule, trigRule } from './grammar/rules/classic.js';
import {
  combinatorGreaterThanRule,
  combinatorIfRule,
  combinatorLessThanRule,
  combinatorModRule,
  combinatorPowRule,
  combinatorProductRule,
  combinatorStepRule,
  combinatorSumRule
} from './grammar/rules/combinators.js';
import { compareAndClampRule, flowArtRule } from './grammar/rules/composites.js';
import {
  terminalConstRule,
  terminalFbmRule,
  terminalNestedOscillationRule,
  terminalRadialRule,
  terminalRandomRule,
  terminalRecamanRule,
  terminalSweepRule,
  terminalXRule,
  terminalYRule
} from './grammar/rules/terminals.js';
import {
  transformAbsRule,
  transformCosRule,
  transformExpRule,
  transformFractRule,
  transformLogRule,
  transformSinRule,
  transformSqrtRule
} from './grammar/rules/transforms.js';
import type { GrammarRule } from './grammar/types.js';

const RULE_DEFINITIONS: GrammarRule[] = [
  classicRule,
  trigRule,
  blockyRule,

  terminalXRule,
  terminalYRule,
  terminalConstRule,
  terminalRandomRule,
  terminalRadialRule,
  terminalSweepRule,
  terminalFbmRule,
  terminalRecamanRule,
  terminalNestedOscillationRule,

  transformSinRule,
  transformCosRule,
  transformAbsRule,
  transformSqrtRule,
  transformExpRule,
  transformLogRule,
  transformFractRule,

  combinatorSumRule,
  combinatorProductRule,
  combinatorModRule,
  combinatorPowRule,
  combinatorLessThanRule,
  combinatorGreaterThanRule,
  combinatorStepRule,
  combinatorIfRule,

  arithmeticMixRule,
  flowArtRule,
  compareAndClampRule
];

/** Immutable registry of grammar rules keyed by id. */
const REGISTRY: ReadonlyMap<string, GrammarRule> = new Map(RULE_DEFINITIONS.map((r) => [r.id, r]));

/** Id of the rule used when none is specified. */
export const DEFAULT_RULE_ID = 'classic';

/** Return all registered rules. */
export function listRules(): GrammarRule[] {
  return [...REGISTRY.values()];
}

/** Look up a rule by id, or `undefined` if it does not exist. */
export function getRule(id: string): GrammarRule | undefined {
  return REGISTRY.get(id);
}

/** Whether a rule id is registered. */
export function hasRule(id: string): boolean {
  return REGISTRY.has(id);
}
