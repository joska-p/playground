import { createRule } from './create-rule';

export const recamanRule = createRule({
  id: 'recaman',
  name: "Recaman's Rule",
  description: "Jump back by 'n' if possible, otherwise jump forward.",
  maxSteps: 1000,
  getNext: ({ index, current, seen }) => {
    const backward = current - index;
    return backward > 0 && !seen.has(backward) ? backward : current + index;
  }
});
