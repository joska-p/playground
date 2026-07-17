import type { GrammarRule } from '@repo/randomart-engine-next/types';

/** Builds the same preview node for a rule+seed pair used by both CPU and GPU renderers. */
export function buildPreviewNode(rule: GrammarRule, seed: number) {
  return rule.buildNode(String(seed));
}

/** Default (x, y, 0.5) argument getters — retained for backward compatibility. */
export function makeDefaultEvalArgs(x: number, y: number): (() => number)[] {
  return [() => x, () => y, () => 0.5];
}
