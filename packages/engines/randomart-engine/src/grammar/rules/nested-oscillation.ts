import type { GrammarRule } from '../../types';

export const nestedOscillationRule: GrammarRule = {
  id: 'nested-oscillation',
  name: 'Nested Oscillation',
  arity: 0,
  weight: 1,
  category: 'structural',
  evaluate: () => 0.0,
  toMathString: () => 'nested-oscillation',
  toGLSL: () => 'nested-oscillation',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── nested-oscillation\n`,
  buildNode: () => {
    // sin(multiply(x, sin(y)))
    return {
      ruleId: 'sin',
      args: [
        {
          ruleId: 'multiply',
          args: [
            { ruleId: 'x', args: [] },
            {
              ruleId: 'sin',
              args: [{ ruleId: 'y', args: [] }]
            }
          ]
        }
      ]
    };
  }
} satisfies GrammarRule;
