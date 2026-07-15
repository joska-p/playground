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
}

/** The set of grammar productions understood by the evaluator. */
export type ExprNodeType =
  | "x"
  | "y"
  | "const"
  | "sum"
  | "product"
  | "mod"
  | "sin"
  | "cos"
  | "abs"
  | "well"
  | "tent"
  | "mix";

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
}

/** Options accepted by {@link generate}. */
export type GenerateOptions = {
  /** Id of the grammar rule to use. Defaults to `"classic"`. */
  ruleId?: string;
  /** Ordered list of hex colors (e.g. `"#ff0000"`) used to map output values. */
  colorPalette?: string[];
  /** Square output size in pixels. Defaults to 256. */
  size?: number;
}

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
}

/** Structured error result returned by {@link generate}. */
export type GenerateError = {
  error: string;
}

/**
 * A grammar rule in the registry. Each rule knows how to turn a text seed into
 * every supported representation. All methods are deterministic in the seed.
 */
export type GrammarRule = {
  /** Unique identifier used to select the rule. */
  readonly id: string;
  /** Human readable name. */
  readonly displayName: string;
  /** Raw byte-array representation of the generated expression. */
  toCPU(textSeed: string): Uint8Array;
  /** GLSL shader snippet reproducing the expression. */
  toGPU(textSeed: string): string;
  /** Mathematical expression string. */
  toMathString(textSeed: string): string;
  /** Structured tree representation. */
  toTreeView(textSeed: string): TreeView;
  /** The underlying expression node for further processing. */
  buildNode(textSeed: string): ExprNode;
}
