import type { SequenceRule } from './types';

/** Recamán's sequence rule: jump backward by n if positive and unseen, else jump forward. */
export const recamanRule = {
    id: 'recaman',
    name: "Recaman's Rule",
    description: "Jump back by 'n' if possible, otherwise jump forward.",
    maxSteps: 1000,
    getNext: ({ index, current, seen }) => {
        const backward = current - index;
        return backward > 0 && !seen.has(backward) ? backward : current + index;
    }
} as const satisfies SequenceRule;
