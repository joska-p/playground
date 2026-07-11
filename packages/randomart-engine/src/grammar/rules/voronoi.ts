import type { GrammarRule } from '../../types';

export const voronoiRule = {
  id: 'voronoi',
  name: 'Voronoi',
  arity: 0,
  weight: 0.7,
  category: 'structural',
  evaluate: (_args, x, y) => {
    const gx = Math.floor(x * 3.0);
    const gy = Math.floor(y * 3.0);
    let minDist = 999.0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const cx = gx + dx + 0.5 + Math.sin((gx + dx) * 127.1 + (gy + dy) * 311.7) * 0.4;
        const cy = gy + dy + 0.5 + Math.cos((gx + dx) * 269.5 + (gy + dy) * 183.3) * 0.4;
        const dist = Math.sqrt((x * 3.0 - cx) ** 2 + (y * 3.0 - cy) ** 2);
        if (dist < minDist) minDist = dist;
      }
    }
    return minDist * 2.0 - 1.0;
  },
  toMathString: () => 'voronoi(p)',
  toGLSL: () => 'voronoiCells(p)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── voronoi\n`,
  buildNode: () => ({ ruleId: 'voronoi', args: [] })
} satisfies GrammarRule;
