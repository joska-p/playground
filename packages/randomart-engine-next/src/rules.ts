/**
 * The grammar-rules registry — the core feature of the library.
 *
 * Each rule is a self-contained recipe that knows how to turn a text seed into
 * every representation the library supports. Rules differ only in their
 * {@link GrammarSpec} (which operators are available and how the tree grows),
 * which produces visually distinct families of art from the same engine.
 *
 * Rules are cached per-seed internally so that the potentially expensive tree
 * construction happens once even when multiple representations are requested.
 */

import { compileToGLSL } from './compileToGLSL.js';
import type { GrammarSpec } from './expression.js';
import {
  grow,
  toMathString as nodeToMathString,
  toTreeView as nodeToTreeView,
  toBytes
} from './expression.js';
import { SeededRandom } from './prng.js';
import type { ExprNode, GrammarRule, TreeView } from './types.js';

/**
 * Create a {@link GrammarRule} from a spec. Handles per-seed memoization of the
 * built node so every representation is derived from the exact same tree.
 */
function createRule(id: string, displayName: string, spec: GrammarSpec): GrammarRule {
  const cache = new Map<string, ExprNode>();

  const build = (textSeed: string): ExprNode => {
    if (!textSeed || textSeed.length === 0) {
      throw new Error('textSeed must be a non-empty string.');
    }
    const cached = cache.get(textSeed);
    if (cached) return cached;
    // Namespace the seed by rule id so different rules diverge for one seed.
    const rng = new SeededRandom(`${id}:${textSeed}`);
    const node = grow(rng, spec, spec.maxDepth);
    cache.set(textSeed, node);
    return node;
  };

  return {
    id,
    displayName,
    buildNode: (textSeed: string): ExprNode => build(textSeed),
    toCPU: (textSeed: string): Uint8Array => toBytes(build(textSeed)),
    toGPU: (textSeed: string): string => {
      const node = build(textSeed);
      // Single-channel rule: use the same tree for all three RGB channels.
      // This produces the same grayscale output as the CPU path, but via the
      // full WebGL 2 compiler with noise library resolution.
      return compileToGLSL(node, node, node, []);
    },
    toMathString: (textSeed: string): string => nodeToMathString(build(textSeed)),
    toTreeView: (textSeed: string): TreeView => nodeToTreeView(build(textSeed))
  };
}

const RULE_DEFINITIONS: GrammarRule[] = [
  // S1 — original library rules (kept as-is)
  createRule('classic', 'Classic Random Art', {
    operators: [
      { type: 'sum', arity: 2 },
      { type: 'product', arity: 2 },
      { type: 'sin', arity: 1 },
      { type: 'cos', arity: 1 },
      { type: 'well', arity: 1 },
      { type: 'mix', arity: 3 }
    ],
    terminalBias: 0.28,
    minDepth: 4,
    maxDepth: 11
  }),
  createRule('trig', 'Trigonometric Waves', {
    operators: [
      { type: 'sin', arity: 1 },
      { type: 'cos', arity: 1 },
      { type: 'sum', arity: 2 },
      { type: 'product', arity: 2 }
    ],
    terminalBias: 0.3,
    minDepth: 4,
    maxDepth: 10
  }),
  createRule('blocky', 'Blocky Modular', {
    operators: [
      { type: 'mod', arity: 2 },
      { type: 'abs', arity: 1 },
      { type: 'tent', arity: 1 },
      { type: 'product', arity: 2 },
      { type: 'sum', arity: 2 }
    ],
    terminalBias: 0.32,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('smooth', 'Smooth Wells', {
    operators: [
      { type: 'well', arity: 1 },
      { type: 'mix', arity: 3 },
      { type: 'sin', arity: 1 },
      { type: 'sum', arity: 2 }
    ],
    terminalBias: 0.28,
    minDepth: 4,
    maxDepth: 11
  }),

  // S2 — individual terminal rules (0-arity operators)
  createRule('terminal-x', 'Terminal: x', {
    operators: [{ type: 'x', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-y', 'Terminal: y', {
    operators: [{ type: 'y', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-const', 'Terminal: const', {
    operators: [{ type: 'const', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-random', 'Terminal: random', {
    operators: [{ type: 'random', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-radial', 'Terminal: radial', {
    operators: [{ type: 'radial', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-sweep', 'Terminal: sweep', {
    operators: [{ type: 'sweep', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-fbm', 'Terminal: fbm', {
    operators: [{ type: 'fbm', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-recaman', 'Terminal: recaman-pattern', {
    operators: [{ type: 'recaman-pattern', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),
  createRule('terminal-nested-oscillation', 'Terminal: nested-oscillation', {
    operators: [{ type: 'nested-oscillation', arity: 0 }],
    terminalBias: 0.3,
    minDepth: 2,
    maxDepth: 6
  }),

  // S2 — individual transform rules (unary operators)
  createRule('transform-sin', 'Transform: sin', {
    operators: [{ type: 'sin', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('transform-cos', 'Transform: cos', {
    operators: [{ type: 'cos', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('transform-abs', 'Transform: abs', {
    operators: [{ type: 'abs', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('transform-sqrt', 'Transform: sqrt', {
    operators: [{ type: 'sqrt', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('transform-exp', 'Transform: exp', {
    operators: [{ type: 'exp', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('transform-log', 'Transform: log', {
    operators: [{ type: 'log', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('transform-fract', 'Transform: fract', {
    operators: [{ type: 'fract', arity: 1 }],
    terminalBias: 0.35,
    minDepth: 3,
    maxDepth: 8
  }),

  // S3 — individual combinator rules (binary)
  createRule('combinator-sum', 'Combinator: sum', {
    operators: [{ type: 'sum', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-product', 'Combinator: product', {
    operators: [{ type: 'product', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-mod', 'Combinator: mod', {
    operators: [{ type: 'mod', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-pow', 'Combinator: pow', {
    operators: [{ type: 'pow', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-less-than', 'Combinator: less-than', {
    operators: [{ type: 'less-than', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-greater-than', 'Combinator: greater-than', {
    operators: [{ type: 'greater-than', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-step', 'Combinator: step', {
    operators: [{ type: 'step', arity: 2 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),

  // S3 — individual combinator rules (ternary)
  createRule('combinator-if', 'Combinator: if', {
    operators: [{ type: 'if', arity: 3 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-smoothstep', 'Combinator: smoothstep', {
    operators: [{ type: 'smoothstep', arity: 3 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),
  createRule('combinator-clamp', 'Combinator: clamp', {
    operators: [{ type: 'clamp', arity: 3 }],
    terminalBias: 0.3,
    minDepth: 3,
    maxDepth: 8
  }),

  // S3 — composite rules mixing new combinators with existing operators
  createRule('arithmetic-mix', 'Arithmetic Mix', {
    operators: [
      { type: 'sum', arity: 2 },
      { type: 'product', arity: 2 },
      { type: 'pow', arity: 2 },
      { type: 'mod', arity: 2 },
      { type: 'sin', arity: 1 },
      { type: 'abs', arity: 1 }
    ],
    terminalBias: 0.3,
    minDepth: 4,
    maxDepth: 10
  }),
  createRule('flow-art', 'Flow Art', {
    operators: [
      { type: 'if', arity: 3 },
      { type: 'smoothstep', arity: 3 },
      { type: 'sum', arity: 2 },
      { type: 'sin', arity: 1 }
    ],
    terminalBias: 0.28,
    minDepth: 4,
    maxDepth: 10
  }),
  createRule('compare-and-clamp', 'Compare and Clamp', {
    operators: [
      { type: 'clamp', arity: 3 },
      { type: 'less-than', arity: 2 },
      { type: 'greater-than', arity: 2 },
      { type: 'step', arity: 2 },
      { type: 'sum', arity: 2 },
      { type: 'product', arity: 2 }
    ],
    terminalBias: 0.3,
    minDepth: 4,
    maxDepth: 10
  })
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
