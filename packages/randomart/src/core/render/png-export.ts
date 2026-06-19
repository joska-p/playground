import { encode } from 'fast-png';
import type { ExpressionNode } from '../types';
import {
  renderTreesToBuffer,
  renderTreesToImageDataAsync
} from './cpu-renderer';

function renderTreesToPngBase64(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time: number = 0
): string {
  const buffer = renderTreesToBuffer(treeR, treeG, treeB, size, time);

  const pngBuffer = encode({
    width: size,
    height: size,
    data: buffer,
    channels: 4,
    depth: 8
  });

  const binaryString = Array.from(pngBuffer)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  return `data:image/png;base64,${btoa(binaryString)}`;
}

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

function renderPixelMapAsBase64(
  buffer: Uint8ClampedArray,
  size: number
): string {
  const pngBuffer = encode({
    width: size,
    height: size,
    data: buffer,
    channels: 4,
    depth: 8
  });

  const binaryString = Array.from(pngBuffer)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  const base64 = btoa(binaryString);
  return `data:image/png;base64,${base64}`;
}

export {
  renderPixelMapAsBase64,
  renderTreesToPngBase64,
  renderTreesToPngBase64Async
};
