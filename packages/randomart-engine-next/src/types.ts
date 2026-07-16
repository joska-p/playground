/**
 * Shared types for the randomart engine.
 *
 * The engine implements the "random art" hash-visualization scheme described by
 * Perrig & Song ("Hash Visualization: A New Technique to Improve Real-World
 * Security"). A text seed is expanded into a deterministic pseudo-random stream
 * which is used to grow an expression tree from a small context-free grammar.
 * The tree is a function f(x, y) -> [-1, 1] that is evaluated per pixel to paint
 * an image, and it can also be rendered as GLSL, a math string, or a tree view.
 */

/**
 * A single node of the generated expression tree.
 *
 * Every node evaluates to a scalar in the range [-1, 1] given normalized
 * coordinates (x, y) each in [-1, 1]. Terminal nodes (`x`, `y`, `const`) have no
 * children; operator nodes combine one or more child expressions.
 */
export type ExprNode = {
  /** The grammar production used to build this node. */
  readonly type: ExprNodeType;
  /** Constant value, only present when `type === "const"`. */
  readonly value?: number;
  /** Child sub-expressions, present for operator nodes. */
  readonly children?: ExprNode[];
};

/** The set of grammar productions understood by the evaluator. */
export type ExprNodeType =
  // Terminals (9)
  | 'x'
  | 'y'
  | 'const'
  | 'random'
  | 'radial'
  | 'sweep'
  | 'fbm'
  | 'recaman-pattern'
  | 'nested-oscillation'
  // Transforms — unary (7)
  | 'sin'
  | 'cos'
  | 'abs'
  | 'sqrt'
  | 'exp'
  | 'log'
  | 'fract'
  // Combinators — binary (7)
  | 'sum'
  | 'product'
  | 'mod'
  | 'pow'
  | 'less-than'
  | 'greater-than'
  | 'step'
  // Combinators — ternary (1)
  | 'if';

/** A structured, presentation-friendly tree view of an {@link ExprNode}. */
export type TreeView = {
  /** Human readable label for the node, e.g. `sin` or `const(0.42)`. */
  label: string;
  /** Grammar production type. */
  type: ExprNodeType;
  /** Constant value when applicable. */
  value?: number;
  /** Nested child tree views. */
  children?: TreeView[];
};

/** Options accepted by {@link generate}. */
export type GenerateOptions = {
  /** Id of the grammar rule to use. Defaults to `"classic"`. */
  ruleId?: string;
  /**
   * Subset of rule ids that are currently enabled. When provided, `generate()`
   * rejects any `ruleId` not in this list — the consumer is expected to iterate
   * over `listRules()`, filter by this set, and call `generate()` for each
   * enabled rule.  Composes with weight presets: the preset selects relative
   * weights; the enabled-list restricts which rules can appear at all.
   */
  enabledRuleIds?: string[];
  /** Ordered list of hex colors (e.g. `"#ff0000"`) used to map output values. */
  colorPalette?: string[];
  /** Square output size in pixels. Defaults to 256. */
  size?: number;
};

/** Successful result returned by {@link generate}. */
export type GenerateResult = {
  /** Encoded PNG image data. */
  png: Buffer;
  /** GLSL fragment-shader snippet reproducing the image. */
  shader: string;
  /** Human-readable mathematical expression. */
  math: string;
  /** Nested tree view of the expression. */
  tree: TreeView;
  /** Serializable expression node for further processing. */
  node: ExprNode;
};

/** Structured error result returned by {@link generate}. */
export type GenerateError = {
  error: string;
};

/** Context variable keys passed to AnimationBehavior#applyCode. */
export type ApplyCodeContext = {
  time: string;
  speed: string;
  spatial: string;
  color: string;
};

/**
 * An animation behavior that modifies spatial coordinates or the final color.
 * The glsl definition and noise dependencies are resolved into the compiled
 * shader preamble; applyCode emits the line(s) injected at the appropriate
 * point in the fragment shader main body.
 */
export type AnimationBehavior = {
  id: string;
  name: string;
  /** GLSL function definition emitted in the shader preamble. Omit for
   *  behaviors whose applyCode is a self-contained snippet that needs no
   *  helper function. */
  glslFunction?: string;
  type: 'spatial' | 'color';
  applyCode: (ctx: ApplyCodeContext) => string;
  noiseDependencies?: string[];
};

export type { AnimationBehaviorId, animationRegistry } from './animation';

export type { OperatorId } from './grammar/operators/registry';
