import { createRule } from './create-rule';

export const triangularRule = createRule({
  id: 'triangular',
  name: 'Triangular',
  description: 'Sum of integers up to n: 1, 3, 6, 10, 15...',
  maxSteps: 500,
  getNext: ({ index }) => (index * (index + 1)) / 2
});
