import { stepConway } from './step.ts';

let scratch: Uint8Array | undefined;

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

  if (!scratch || scratch.length !== grid.length) {
    scratch = new Uint8Array(grid.length);
  }

  stepConway(grid, scratch, cols, rows);

  (self as unknown as Worker).postMessage(
    { type: 'step', grid: scratch } satisfies StepResponse,
    { transfer: [scratch.buffer] }
  );

  scratch = undefined;
};
