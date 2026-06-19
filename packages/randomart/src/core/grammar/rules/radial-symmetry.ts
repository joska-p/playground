import type { GrammarRule } from '../../types';

export const radialSymmetryRule: GrammarRule = {
  id: 'radial-symmetry',
  name: 'Radial Symmetry',
  arity: 0,
  weight: 8,
  category: 'structural',
  evaluate: () => 0.0,
  toMathString: () => 'radial-symmetry',
  toGLSL: () => 'radial-symmetry',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── radial-symmetry\n`,
  buildNode: () => {
    const xNode = { ruleId: 'x', args: [] };
    const yNode = { ruleId: 'y', args: [] };

    // sqrt(add(multiply(x,x), multiply(y,y)))
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
