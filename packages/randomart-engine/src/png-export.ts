import { encode } from 'fast-png';
import { renderTreesToBuffer } from './render/cpu-renderer';
import type { ExpressionNode } from './types';

export function renderTreesToPngBuffer(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time = 0
): Uint8Array {
  const buffer = renderTreesToBuffer(treeR, treeG, treeB, size, time);
  const encoded = encode({
    width: size,
    height: size,
    data: buffer,
    channels: 4,
    depth: 8
  });
  return new Uint8Array(encoded);
}

export function renderTreesToPngBlob(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time = 0
): Blob {
  const pngBuffer = renderTreesToPngBuffer(treeR, treeG, treeB, size, time);
  return new Blob([new Uint8Array(pngBuffer)], { type: 'image/png' });
}
