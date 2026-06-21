import { evaluateNode } from '../tree/evaluate';
import type { ExpressionNode } from '../types';

export function renderTreesToBuffer(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time: number = 0
): Uint8ClampedArray {
  const buffer = new Uint8ClampedArray(size * size * 4);

  for (let py = 0; py < size; py++) {
    const y = (py / size) * 2 - 1;

    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;

      const r = Math.floor(((evaluateNode(treeR, x, y, time) + 1) / 2) * 255);
      const g = Math.floor(((evaluateNode(treeG, x, y, time) + 1) / 2) * 255);
      const b = Math.floor(((evaluateNode(treeB, x, y, time) + 1) / 2) * 255);

      const index = (py * size + px) * 4;
      buffer[index] = r;
      buffer[index + 1] = g;
      buffer[index + 2] = b;
      buffer[index + 3] = 255;
    }
  }

  return buffer;
}
