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

import type { ExprNode, TreeView } from '../../types.js';
import type { OperatorId } from '../operators/registry.js';
import { arithmeticMixRule, blockyRule, classicRule, trigRule } from './classic.js';
import {
  combinatorGreaterThanRule,
  combinatorIfRule,
  combinatorLessThanRule,
  combinatorModRule,
  combinatorPowRule,
  combinatorProductRule,
  combinatorStepRule,
  combinatorSumRule
} from './combinators.js';
import { compareAndClampRule, flowArtRule } from './composites.js';
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
} from './terminals.js';
import {
  transformAbsRule,
  transformCosRule,
  transformExpRule,
  transformFractRule,
  transformLogRule,
  transformSinRule,
  transformSqrtRule
} from './transforms.js';

/** Configuration for a grammar composition. */
export type GrammarSpec = {
  /** Unique identifier for this rule. */
  id: string;
  /** Human readable name. */
  displayName: string;
  /** Which operators this grammar uses, by operator id. */
  operators: OperatorId[];
  /** Maximum tree depth. */
  maxDepth: number;
  /** Minimum depth before terminals are allowed. */
  minDepth: number;
};

/** A grammar rule with all rendering methods attached. */
export type GrammarRule = GrammarSpec & {
  /** Build the expression tree for a seed. */
  buildNode(textSeed: string): ExprNode;
  /** CPU byte-array representation. */
  toCPU(textSeed: string): Uint8Array;
  /** GLSL fragment-shader snippet. */
  toGPU(textSeed: string): string;
  /** Mathematical expression string. */
  toMathString(textSeed: string): string;
  /** Nested tree view. */
  toTreeView(textSeed: string): TreeView;
};

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
export const RULES: ReadonlyMap<string, GrammarRule> = new Map(
  RULE_DEFINITIONS.map((r) => [r.id, r])
);

/** Id of the rule used when none is specified. */
export const DEFAULT_RULE_ID = 'classic';

/** Return all registered rules. */
export function listRules(): GrammarRule[] {
  return [...RULES.values()];
}

/** Look up a rule by id, or `classicRule` if it does not exist. */
export function getRule(id: string): GrammarRule {
  return RULES.get(id) ?? classicRule;
}

/** Whether a rule id is registered. */
export function hasRule(id: string): boolean {
  return RULES.has(id);
}
