import { encode } from 'fast-png';
import type { ExpressionNode } from '../types';
import { renderTreesToImageDataAsync } from './cpu-renderer';

async function renderTreesToPngBlobAsync(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time: number = 0
): Promise<Blob> {
  const imageData = await renderTreesToImageDataAsync(
    treeR,
    treeG,
    treeB,
    size,
    time
  );

  const pngBuffer = encode({
    width: size,
    height: size,
    data: imageData.data,
    channels: 4,
    depth: 8
  });

  return new Blob([new Uint8Array(pngBuffer)], { type: 'image/png' });
}

export { renderTreesToPngBlobAsync };
