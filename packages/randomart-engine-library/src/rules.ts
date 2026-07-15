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

import type { ExprNode, GrammarRule, TreeView } from "./types.js";
import type { GrammarSpec } from "./expression.js";
import { SeededRandom } from "./prng.js";
import {
  grow,
  toBytes,
  toGLSL,
  toMathString as nodeToMathString,
  toTreeView as nodeToTreeView,
} from "./expression.js";

/**
 * Create a {@link GrammarRule} from a spec. Handles per-seed memoization of the
 * built node so every representation is derived from the exact same tree.
 */
function createRule(
  id: string,
  displayName: string,
  spec: GrammarSpec,
): GrammarRule {
  const cache = new Map<string, ExprNode>();

  const build = (textSeed: string): ExprNode => {
    if (!textSeed || textSeed.length === 0) {
      throw new Error("textSeed must be a non-empty string.");
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
      const expr = toGLSL(build(textSeed));
      // A self-contained fragment shader that reproduces the CPU output.
      return [
        "precision highp float;",
        "uniform vec2 uResolution;",
        "float channel(vec2 p) {",
        `  return ${expr};`,
        "}",
        "void main() {",
        "  vec2 p = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;",
        "  float v = channel(p);",
        "  float t = v * 0.5 + 0.5;",
        "  gl_FragColor = vec4(vec3(t), 1.0);",
        "}",
      ].join("\n");
    },
    toMathString: (textSeed: string): string => nodeToMathString(build(textSeed)),
    toTreeView: (textSeed: string): TreeView => nodeToTreeView(build(textSeed)),
  };
}

const RULE_DEFINITIONS: GrammarRule[] = [
  createRule("classic", "Classic Random Art", {
    operators: [
      { type: "sum", arity: 2 },
      { type: "product", arity: 2 },
      { type: "sin", arity: 1 },
      { type: "cos", arity: 1 },
      { type: "well", arity: 1 },
      { type: "mix", arity: 3 },
    ],
    terminalBias: 0.28,
    minDepth: 4,
    maxDepth: 11,
  }),
  createRule("trig", "Trigonometric Waves", {
    operators: [
      { type: "sin", arity: 1 },
      { type: "cos", arity: 1 },
      { type: "sum", arity: 2 },
      { type: "product", arity: 2 },
    ],
    terminalBias: 0.3,
    minDepth: 4,
    maxDepth: 10,
  }),
  createRule("blocky", "Blocky Modular", {
    operators: [
      { type: "mod", arity: 2 },
      { type: "abs", arity: 1 },
      { type: "tent", arity: 1 },
      { type: "product", arity: 2 },
      { type: "sum", arity: 2 },
    ],
    terminalBias: 0.32,
    minDepth: 3,
    maxDepth: 8,
  }),
  createRule("smooth", "Smooth Wells", {
    operators: [
      { type: "well", arity: 1 },
      { type: "mix", arity: 3 },
      { type: "sin", arity: 1 },
      { type: "sum", arity: 2 },
    ],
    terminalBias: 0.28,
    minDepth: 4,
    maxDepth: 11,
  }),
];

/** Immutable registry of grammar rules keyed by id. */
const REGISTRY: ReadonlyMap<string, GrammarRule> = new Map(
  RULE_DEFINITIONS.map((r) => [r.id, r]),
);

/** Id of the rule used when none is specified. */
export const DEFAULT_RULE_ID = "classic";

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
