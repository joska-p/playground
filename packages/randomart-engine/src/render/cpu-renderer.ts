import { evaluateNode } from '../tree/evaluate';
import type { ExpressionNode } from '../types';

// Maps an expression output in [-1, 1] to an 8-bit channel value in [0, 255],
// mirroring the `(value + 1.0) / 2.0` normalization used in the GLSL shader.
function toChannel(value: number): number {
  return Math.floor(((value + 1) / 2) * 255);
}

export function renderTreesToBuffer(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time = 0
): Uint8ClampedArray {
  const buffer = new Uint8ClampedArray(size * size * 4);

  for (let py = 0; py < size; py++) {
    const y = (py / size) * 2 - 1;

    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;
      const index = (py * size + px) * 4;

      buffer[index] = toChannel(evaluateNode(treeR, x, y, time));
      buffer[index + 1] = toChannel(evaluateNode(treeG, x, y, time));
      buffer[index + 2] = toChannel(evaluateNode(treeB, x, y, time));
      buffer[index + 3] = 255;
    }
  }

  return buffer;
}
