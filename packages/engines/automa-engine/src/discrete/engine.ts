import type { Rule } from './discrete/rules/types';

function countActiveNeighbors(
  current: Uint8Array,
  col: number,
  row: number,
  cols: number,
  rows: number
): number {
  const rowAbove = ((row - 1 + rows) % rows) * cols;
  const rowBelow = ((row + 1) % rows) * cols;
  const colLeft = (col - 1 + cols) % cols;
  const colRight = (col + 1) % cols;
  const rCurrent = row * cols;

  return (
    (current[rowAbove + colLeft] === 1 ? 1 : 0) +
    (current[rowAbove + col] === 1 ? 1 : 0) +
    (current[rowAbove + colRight] === 1 ? 1 : 0) +
    (current[rCurrent + colLeft] === 1 ? 1 : 0) +
    (current[rCurrent + colRight] === 1 ? 1 : 0) +
    (current[rowBelow + colLeft] === 1 ? 1 : 0) +
    (current[rowBelow + col] === 1 ? 1 : 0) +
    (current[rowBelow + colRight] === 1 ? 1 : 0)
  );
}

function evolve(
  rule: Rule,
  current: Uint8Array,
  next: Uint8Array,
  cols: number,
  rows: number
): void {
  const maxState = rule.stateCount - 1;

  for (let index = 0; index < current.length; index++) {
    const cellState = current[index]!;
    const row = (index / cols) | 0;
    const col = index % cols;

    if (cellState > 1) {
      next[index] = cellState === maxState ? 0 : cellState + 1;
      continue;
    }

    const neighbors = countActiveNeighbors(current, col, row, cols, rows);

    if (cellState === 1) {
      next[index] = rule.survive[neighbors] ? 1 : rule.stateCount > 2 ? 2 : 0;
    } else {
      next[index] = rule.birth[neighbors] ? 1 : 0;
    }
  }
}

export { evolve };
