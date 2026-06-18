import type { ExpressionNode } from './types';

export type RenderTask = {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rowStart: number;
  rowEnd: number;
  size: number;
  time: number;
};

export type RenderResult = {
  rowStart: number;
  buffer: Uint8ClampedArray;
};
