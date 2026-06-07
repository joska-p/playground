import { evolveGrid } from './step.ts';

let nextGrid: Uint8Array | undefined;

type StepRequest = {
  type: 'step';
  grid: Uint8Array;
  cols: number;
  rows: number;
};

type StepResponse = {
  type: 'step';
  grid: Uint8Array;
};

self.onmessage = (e: MessageEvent<StepRequest>) => {
  const { type, grid, cols, rows } = e.data;

  if (type !== 'step') return;

  if (!nextGrid || nextGrid.length !== grid.length) {
    nextGrid = new Uint8Array(grid.length);
  }

  evolveGrid(grid, nextGrid, cols, rows);

  (self as unknown as Worker).postMessage(
    { type: 'step', grid: nextGrid } satisfies StepResponse,
    { transfer: [nextGrid.buffer] }
  );

  nextGrid = undefined;
};
