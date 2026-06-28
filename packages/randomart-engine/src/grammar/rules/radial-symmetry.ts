import type { GrammarRule } from '../../types';

export const radialSymmetryRule = {
  id: 'radial-symmetry',
  name: 'Radial Symmetry',
  arity: 0,
  weight: 0.8,
  category: 'structural',
  evaluate: (_args, x, y) => Math.sqrt(x * x + y * y + 1e-10),
  toMathString: () => 'radial-symmetry',
  toGLSL: () => 'radial-symmetry',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── radial-symmetry\n`,
  buildNode: () => {
    const xNode = { ruleId: 'x', args: [] };
    const yNode = { ruleId: 'y', args: [] };
    return {
      ruleId: 'sqrt',
      args: [
        {
          ruleId: 'add',
          args: [
            { ruleId: 'multiply', args: [xNode, xNode] },
            { ruleId: 'multiply', args: [yNode, yNode] }
          ]
        }
      ]
    };
  }
} satisfies GrammarRule;
