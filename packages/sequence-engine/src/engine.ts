import type { SequenceRule } from './rules/types';

/**
 * Options for generating a sequence.
 */
export type GenerateSequenceOptions = {
    /** The sequence rule to evaluate step-by-step. */
    sequenceRule: SequenceRule;
    /** Number of terms to generate. */
    steps: number;
    /** Optional random seed passed to rules supporting seed determinism. */
    seed?: string;
};

/**
 * Generates a sequence of numbers by evaluating a sequence rule in sequence.
 *
 * @param options - Configuration containing the rule, step count, and optional seed.
 * @returns An array of numbers starting from 0.
 */
function generateSequence({
    sequenceRule,
    steps,
    seed
}: GenerateSequenceOptions): number[] {
    const sequence: number[] = [0];
    const seen = new Set([0]);
    let current = 0;
    const safeSteps = sequenceRule.maxSteps === 0 ? steps : Math.min(steps, sequenceRule.maxSteps);

    for (let i = 1; i < safeSteps; i++) {
        current = sequenceRule.getNext({
            index: i,
            current,
            sequence,
            seen,
            ...(seed && { seed })
        });
        sequence.push(current);
        seen.add(current);
    }
    return sequence;
}

export { generateSequence };
