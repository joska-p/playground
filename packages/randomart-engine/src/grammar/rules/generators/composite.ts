import type { GrammarRule } from '../../../types';

export const nestedOscillationRule = {
  id: 'nested-oscillation',
  name: 'Nested Oscillation',
  arity: 0,
  weight: 0.05, // Treat macro-macros with lower weights so normal generation can build unique combinations
  category: 'terminal',
  evaluate: (_args, x, y) => Math.sin(x * Math.sin(y * Math.PI) * Math.PI), // Added explicit fallback matching the syntax tree intent
  toMathString: () => 'nested-oscillation',
  toGLSL: (args) =>
    `sin(${args[0] ?? 'x'} * sin(${args[1] ?? 'y'} * 3.141592653589793) * 3.141592653589793)`,
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
} as const satisfies GrammarRule;
