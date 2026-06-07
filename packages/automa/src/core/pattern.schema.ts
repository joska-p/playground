import { z } from 'zod';

const patternSchema = z.object({
  name: z.string(),
  cols: z.number().int().min(1).max(2000),
  rows: z.number().int().min(1).max(2000),
  generation: z.number().int().min(0),
  aliveCells: z.array(z.number().int().min(0)).max(4_000_000),
});

type Pattern = z.infer<typeof patternSchema>;

export { patternSchema };
export type { Pattern };
