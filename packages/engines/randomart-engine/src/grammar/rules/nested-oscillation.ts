import type { GrammarRule } from '../../types';

export const nestedOscillationRule = {
  id: 'nested-oscillation',
  name: 'Nested Oscillation',
  arity: 0,
  weight: 0.05, // Treat macro-macros with lower weights so normal generation can build unique combinations
  category: 'structural',
  evaluate: (_args, x, y) => Math.sin(x * Math.sin(y * Math.PI) * Math.PI), // Added explicit fallback matching the syntax tree intent
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
