import { encode } from 'fast-png';
import type { ExpressionNode } from './types';
import { SeededRandom } from './SeededRandom';
import { buildTree, evaluateNode } from './engine';

function renderTreesToBuffer(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number
): Uint8ClampedArray {
  const buffer = new Uint8ClampedArray(size * size * 4);

  for (let py = 0; py < size; py++) {
    const y = (py / size) * 2 - 1;
    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;

      const r = Math.floor(((evaluateNode(treeR, x, y) + 1) / 2) * 255);
      const g = Math.floor(((evaluateNode(treeG, x, y) + 1) / 2) * 255);
      const b = Math.floor(((evaluateNode(treeB, x, y) + 1) / 2) * 255);

      const index = (py * size + px) * 4;
      buffer[index] = r;
      buffer[index + 1] = g;
      buffer[index + 2] = b;
      buffer[index + 3] = 255;
    }
  }

  return buffer;
}

function renderTreesToImageData(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number
): ImageData {
  const imageData = new ImageData(size, size);
  const buffer = renderTreesToBuffer(treeR, treeG, treeB, size);
  imageData.data.set(buffer);
  return imageData;
}

function renderTreesToPngBase64(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number
): string {
  const buffer = renderTreesToBuffer(treeR, treeG, treeB, size);

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

function renderPixelBuffer(
  seedString: string,
  size: number,
  maxDepth: number
): Uint8ClampedArray {
  const rngR = new SeededRandom(seedString + '_red');
  const rngG = new SeededRandom(seedString + '_green');
  const rngB = new SeededRandom(seedString + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth);
  const treeG = buildTree(rngG, 0, maxDepth);
  const treeB = buildTree(rngB, 0, maxDepth);

  return renderTreesToBuffer(treeR, treeG, treeB, size);
}

function renderPixelMapAsBase64(
  seedString: string,
  size: number,
  maxDepth: number
): string {
  const buffer = renderPixelBuffer(seedString, size, maxDepth);

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
  renderTreesToBuffer,
  renderTreesToImageData,
  renderTreesToPngBase64,
  renderPixelBuffer,
  renderPixelMapAsBase64
};
