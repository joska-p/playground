import { z } from 'astro/zod';
import { categoryIds } from './docs';

export const docSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  draft: z.boolean().default(false),
  category: z.enum(categoryIds),
  tags: z.array(z.string()).default([]).optional(),
});
