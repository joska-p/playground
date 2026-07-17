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
export type RuleCategory = 'classic' | 'terminal' | 'transform' | 'combinator' | 'composite';

export type GrammarSpec = {
  /** Unique identifier for this rule. */
  id: string;
  /** Human readable name. */
  displayName: string;
  /** Which category this rule belongs to. */
  category: RuleCategory;
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

// ── Category grouping ───────────────────────────────────────────

const RULE_CATEGORY_ORDER: RuleCategory[] = [
  'classic',
  'terminal',
  'transform',
  'combinator',
  'composite'
];

const RULE_CATEGORY_LABELS: Record<RuleCategory, string> = {
  classic: 'Classic',
  terminal: 'Terminal',
  transform: 'Transform',
  combinator: 'Combinator',
  composite: 'Composite'
};

export type RuleGroup = {
  label: string;
  rules: { id: string; displayName: string }[];
};

/**
 * Group all registered rules by their {@link GrammarSpec.category}.
 * The order is deterministic: Classic → Terminal → Transform → Combinator → Composite.
 */
export function listRuleGroups(): RuleGroup[] {
  const grouped = new Map<RuleCategory, { id: string; displayName: string }[]>();

  for (const cat of RULE_CATEGORY_ORDER) {
    grouped.set(cat, []);
  }

  for (const rule of RULES.values()) {
    grouped.get(rule.category)!.push({ id: rule.id, displayName: rule.displayName });
  }

  return RULE_CATEGORY_ORDER.map((cat) => ({
    label: RULE_CATEGORY_LABELS[cat],
    rules: grouped.get(cat)!
  }));
}
