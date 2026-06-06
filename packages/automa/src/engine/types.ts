type CellValue = 0 | 1;

type Grid = Uint8Array;

type RuleFn = (
  index: number,
  grid: Uint8Array,
  cols: number,
  rows: number
) => CellValue;

export type { CellValue, Grid, RuleFn };
