import { SeededRandom } from '@repo/randomart-engine/random/SeededRandom';
import type { GrammarRule } from '@repo/randomart-engine/types';

/** Display-only names for previews. The third entry is a sample literal, not a variable. */
export const STRING_ARGS: string[] = ['x', 'y', '0.50'];

/**
 * Argument names for the live fragment shader. Unlike STRING_ARGS, 't' must be an actual variable
 * in scope: ValueCanvasGPU declares `float t = u_time;` and animates it per frame.
 */
export const GLSL_ARGS: string[] = ['x', 'y', 't'];

export function buildPreviewNode(rule: GrammarRule, seed: number) {
    const rng = new SeededRandom(String(seed));
    return rule.buildNode(rng, () => ({ ruleId: 'x', args: [] }));
}

export function makeDefaultEvalArgs(x: number, y: number): (() => number)[] {
    return [() => x, () => y, () => 0.5];
}
