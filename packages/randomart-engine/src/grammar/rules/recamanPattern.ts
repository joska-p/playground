import type { GrammarRule } from '../../types';

export const recamanPatternRule = {
  id: 'recaman-pattern',
  name: 'Recamán Signal',
  arity: 0,
  weight: 0.7,
  category: 'structural',

  // CPU-side evaluation matching the GLSL behavior
  evaluate: (_args, x, y) => {
    const d = Math.sqrt(x * x + y * y);
    // Mimic the pseudo-random step check without an actual history array
    const step = Math.floor(d * 10.0);
    let val = 0.0;
    for (let i = 1; i < 12; i++) {
      if (i > step) break;
      const flip = (Math.sin(val * 12.9898) * 43758.5453) % 1;
      if (flip > 0.5 && val - i > 0.0) {
        val -= i;
      } else {
        val += i;
      }
    }
    return (val % 5.0) / 5.0;
  },

  toMathString: () => 'recaman(p)',
  toGLSL: () => 'pseudoRecaman(p)',

  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── recaman-pattern\n`,

  buildNode: () => {
    const xNode = { ruleId: 'x', args: [] };
    const yNode = { ruleId: 'y', args: [] };
    return {
      ruleId: 'recaman-pattern',
      args: [xNode, yNode]
    };
  }
} satisfies GrammarRule;
