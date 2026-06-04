import { z } from 'zod';

export const rawNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  ft: z.string(),
  c: z.number(),
  sf: z.string(),
});

export const rawLinkSchema = z.object({
  s: z.string(),
  t: z.string(),
  r: z.string(),
  w: z.number(),
});

export const rawHyperedgeSchema = z.object({
  id: z.string(),
  label: z.string(),
  nodes: z.array(z.string()),
  rel: z.string(),
});

export const graphDataSchema = z.object({
  nodes: z.array(rawNodeSchema),
  links: z.array(rawLinkSchema),
  hyperedges: z.array(rawHyperedgeSchema),
});

export type RawNode = z.infer<typeof rawNodeSchema>;
export type RawLink = z.infer<typeof rawLinkSchema>;
export type RawHyperedge = z.infer<typeof rawHyperedgeSchema>;
export type GraphData = z.infer<typeof graphDataSchema>;
