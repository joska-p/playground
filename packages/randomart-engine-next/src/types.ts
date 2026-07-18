// ── Re-exports from sub-modules ──────────────────────────────────
// Types that originate in other modules are re-exported here so
// consumers can import everything from a single location.
export type { BehaviorId } from './behaviours/registry.js';
export type { GlslFunction, GlslFunctionsIds } from './glsl-library.js';
export type {
  Operator,
  OperatorCategory,
  OperatorGroup,
  OperatorId
} from './grammar/operators/registry.js';
export type { Rule, RuleCategory, RuleGroup, RuleId } from './grammar/rules/registry.js';
export type { DualRng } from './prng.js';

// ── Local type definitions ───────────────────────────────────────

import type { OperatorId } from './grammar/operators/registry.js';
import type { RuleId } from './grammar/rules/registry.js';

/** Supported color spaces for pre-evaluation coordinate wrapping. */
export type ColorSpaceId = 'srgb' | 'oklch' | 'oklab' | 'hsl';

/** A node in the expression tree. */
export type ExprNode = {
  /** The grammar production used to build this node. */
  readonly type: OperatorId;
  /** Constant value, only present when `type === "const"`. */
  readonly value?: number;
  /** Child sub-expressions, present for operator nodes. */
  readonly children?: ExprNode[];
};

/** A structured, presentation-friendly tree view of an {@link ExprNode}. */
export type TreeView = {
  /** Human readable label for the node, e.g. `sin` or `const(0.42)`. */
  label: string;
  /** Grammar production type. */
  type: OperatorId;
  /** Constant value when applicable. */
  value?: number;
  /** Nested child tree views. */
  children?: TreeView[];
};

/** Options accepted by {@link generate}. */
export type GenerateOptions = {
  /** Id of the grammar rule to use. Defaults to `"classic"`. */
  ruleId?: RuleId;
  /**
   * Subset of rule ids that are currently enabled. When provided, `generate()`
   * rejects any `ruleId` not in this list — the consumer is expected to iterate
   * over `listRules()`, filter by this set, and call `generate()` for each
   * enabled rule.
   */
  enabledRuleIds?: RuleId[];
  /** Square output size in pixels. Defaults to 256. */
  size?: number;
};

/** Successful result returned by {@link generate}. */
export type GenerateResult = {
  /** Encoded PNG image data. */
  png: Buffer;
  /** GLSL fragment-shader snippet reproducing the image. */
  shader: string;
  /** Human-readable mathematical expression for each channel. */
  mathR: string;
  mathG: string;
  mathB: string;
  /** Expression trees for each color channel. */
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
};

/** Structured error result returned by {@link generate}. */
export type GenerateError = {
  error: string;
};

export type { ApplyCodeContext, Behavior } from './behaviours/registry.js';
