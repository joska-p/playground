import { createRule } from './create-rule';

export const collatzRule = createRule({
  id: 'collatz',
  name: 'Collatz',
  description: 'Even: n/2 | Odd: 3n + 1. Eventually hits 1.',
  maxSteps: 500,
  getNext: ({ current }) => {
    if (current <= 1) return 1;
    return current % 2 === 0 ? current / 2 : 3 * current + 1;
  }
});
