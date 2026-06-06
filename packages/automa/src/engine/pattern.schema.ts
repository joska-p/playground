import { z } from 'zod';

const patternSchema = z.object({
  name: z.string(),
  cols: z.number().int().min(1),
  rows: z.number().int().min(1),
  generation: z.number().int().min(0),
  aliveCells: z.array(z.number().int().min(0)),
});

type Pattern = z.infer<typeof patternSchema>;

export { patternSchema };
export type { Pattern };
