import { z } from 'zod';
import { MAX_COLS, MAX_ROWS, MAX_ALIVE_CELLS } from '../config.ts';

const patternSchema = z.object({
  name: z.string(),
  cols: z.number().int().min(1).max(MAX_COLS),
  rows: z.number().int().min(1).max(MAX_ROWS),
  generation: z.number().int().min(0),
  aliveCells: z.array(z.number().int().min(0)).max(MAX_ALIVE_CELLS),
});

type Pattern = z.infer<typeof patternSchema>;

export { patternSchema };
export type { Pattern };
