import type { GlslFunctionsIds } from './compile/glslLibrary';
import type { RuleId as RuleIdInternal } from './grammar/registry';
import type { SeededRandom } from './random/SeededRandom';

/**
 * A node in the expression tree — a recursive AST of mathematical operations.
 * `ruleId` names the grammar rule (e.g. `"sin"`, `"add"`, `"constant"`), `args`
 * hold the child nodes, and `constantValue` is set when `ruleId === "constant"`.
 */
export type ExpressionNode = {
    ruleId: string;
    args: ExpressionNode[];
    constantValue?: number;
};

/**
 * The contract every grammar operator implements — the plugin interface that
 * makes the grammar extensible. Each rule knows how to build a node, evaluate
 * it, and render it to GLSL, math notation, and a tree view.
 */
export type GrammarRule = {
    id: string;
    name: string;
    arity: number;
    weight: number;
    category: 'structural' | 'terminal';

    evaluate: (
        args: (() => number)[],
        x: number,
        y: number,
        t: number,
        node?: ExpressionNode
    ) => number;
    toMathString: (args: string[], node?: ExpressionNode) => string;
    toGLSL: (args: string[], node?: ExpressionNode) => string;
    toTreeView: (args: string[], depth: number, node?: ExpressionNode) => string;

    buildNode: (rng: SeededRandom, buildChild: () => ExpressionNode) => ExpressionNode;
    noiseDependencies?: GlslFunctionsIds[];
};

/**
 * Union of the ids of every rule registered in the grammar.
 */
export type RuleId = RuleIdInternal;

/**
 * A weight for every rule id — the full grammar weighting.
 */
export type RuleWeight = Record<RuleId, number>;

/**
 * A partial weight map for overriding selected rules' default weights.
 */
export type RuleWeights = Partial<RuleWeight>;

/**
 * The GLSL variable names injected into an {@link AnimationBehavior}'s
 * `applyCode` — the surface each behavior mutates.
 */
export type ApplyCodeContext = {
    time: string;
    speed: string;
    spatial: string;
    color: string;
};

/**
 * A post-processing effect (spatial or color) whose `applyCode` emits GLSL
 * against the compiled shader.
 */
export type AnimationBehavior = {
    id: string;
    name: string;
    glslFunction?: string;
    type: 'spatial' | 'color';
    applyCode: (ctx: ApplyCodeContext) => string;
    noiseDependencies?: GlslFunctionsIds[];
};
