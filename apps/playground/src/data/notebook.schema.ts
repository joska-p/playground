import { z } from "astro/zod";
import { categoriesIds } from "./notebook";

export const notebookSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  draft: z.boolean().default(false),
  category: z.enum(categoriesIds),
  tags: z.array(z.string()).default([]).optional(),
});
