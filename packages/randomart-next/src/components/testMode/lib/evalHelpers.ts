import { buildTree, SeededRandom } from '@repo/randomart-engine-next';
import type { Rule } from '@repo/randomart-engine-next/types';

/** Builds the same preview node for a rule+seed pair used by both CPU and GPU renderers. */
export function buildPreviewNode(spec: Rule, seed: number) {
  const rng = new SeededRandom(String(seed));
  return buildTree(spec, spec.maxDepth, () => rng);
}

/** Default (x, y, 0.5) argument getters — retained for backward compatibility. */
export function makeDefaultEvalArgs(x: number, y: number): (() => number)[] {
  return [() => x, () => y, () => 0.5];
}
