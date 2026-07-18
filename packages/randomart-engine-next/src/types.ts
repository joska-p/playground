import type { OperatorId } from './grammar/operators/registry';
export type { AnimationBehaviorId } from './animation';
export type { GlslFunction, GlslFunctionsIds } from './glsl-library.js';
export type { OperatorDef, OperatorId } from './grammar/operators/registry.js';
export type { GrammarRule } from './grammar/rules/registry.js';
export type { DualRng } from './prng.js';

/** Supported color spaces for pre-evaluation coordinate wrapping. */
export type ColorSpaceId = 'srgb' | 'oklch' | 'oklab' | 'hsl';

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
  ruleId?: string;
  /**
   * Subset of rule ids that are currently enabled. When provided, `generate()`
   * rejects any `ruleId` not in this list — the consumer is expected to iterate
   * over `listRules()`, filter by this set, and call `generate()` for each
   * enabled rule.
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
