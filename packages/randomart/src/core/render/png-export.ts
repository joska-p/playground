import { encode } from 'fast-png';
import type { ExpressionNode } from '../types';
import { renderTreesToImageDataAsync } from './cpu-renderer';

async function renderTreesToPngBase64Async(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time: number = 0
): Promise<string> {
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

  const binaryString = Array.from(pngBuffer)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  return `data:image/png;base64,${btoa(binaryString)}`;
}

export { renderTreesToPngBase64Async };
