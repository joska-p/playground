import { evaluateNode } from './engine';
import type { RenderResult, RenderTask } from './render-types';

self.onmessage = (event: MessageEvent<RenderTask>) => {
  const { treeR, treeG, treeB, rowStart, rowEnd, size } = event.data;
  const height = rowEnd - rowStart;
  const buffer = new Uint8ClampedArray(height * size * 4);

  for (let py = rowStart; py < rowEnd; py++) {
    const y = (py / size) * 2 - 1;
    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;

      const r = Math.floor(((evaluateNode(treeR, x, y) + 1) / 2) * 255);
      const g = Math.floor(((evaluateNode(treeG, x, y) + 1) / 2) * 255);
      const b = Math.floor(((evaluateNode(treeB, x, y) + 1) / 2) * 255);

      const localRow = py - rowStart;
      const index = (localRow * size + px) * 4;
      buffer[index] = r;
      buffer[index + 1] = g;
      buffer[index + 2] = b;
      buffer[index + 3] = 255;
    }
  }

  self.postMessage({ rowStart, buffer } satisfies RenderResult, {
    transfer: [buffer.buffer]
  });
};
