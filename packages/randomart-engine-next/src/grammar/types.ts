/**
 * Grammar-layer types.
 *
 * `GrammarSpec` is the pure-data description of a grammar composition.
 * `GrammarRule` extends it with rendering methods — the rule is the public
 * API surface that consumers use.
 */

import type { ExprNode, TreeView } from '../types.js';
import type { OperatorId } from './operators/registry.js';

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
