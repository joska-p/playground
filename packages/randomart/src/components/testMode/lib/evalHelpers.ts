import { SeededRandom } from '@repo/randomart-engine/random/SeededRandom';
import type { GrammarRule } from '@repo/randomart-engine/types';

/**
 * Display-only argument names used for toMathString/toTreeView/toGLSL previews in the UI (the third
 * slot is a literal sample value, not a live variable).
 */
export const STRING_ARGS: string[] = ['x', 'y', '0.50'];

/**
 * Argument names used when generating a _live_ fragment shader. Unlike STRING_ARGS, 't' here must
 * resolve to an actual GLSL variable name because ValueCanvasGPU declares `float t = u_time;` in
 * scope and animates it per-frame (u_time is one of '@repo/glaze''s built-in shader uniforms).
 */
export const GLSL_ARGS: string[] = ['x', 'y', 't'];

/** Builds the same preview node for a rule+seed pair used by both CPU and GPU renderers. */
export function buildPreviewNode(rule: GrammarRule, seed: number) {
    const rng = new SeededRandom(String(seed));
    return rule.buildNode(rng, () => ({ ruleId: 'x', args: [] }));
}

/** Default (x, y, 0.5) argument getters used by the CPU evaluator. */
export function makeDefaultEvalArgs(x: number, y: number): (() => number)[] {
    return [() => x, () => y, () => 0.5];
}
