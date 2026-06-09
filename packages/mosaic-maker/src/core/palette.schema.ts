import { z } from 'zod';

export const paletteRecordSchema = z.object({
  id: z.string(),
  '--color-0': z.string(),
  '--color-1': z.string(),
  '--color-2': z.string(),
  '--color-3': z.string(),
  '--color-4': z.string(),
});

export type Palette = z.infer<typeof paletteRecordSchema>;
