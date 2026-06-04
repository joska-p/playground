import { z } from 'zod';

export const graphifyNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  file_type: z.string(),
  source_file: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
  source_location: z.union([z.string(), z.number()]).nullish(),
  community: z.number(),
  norm_label: z.string(),
  metadata: z.record(z.string(), z.unknown()).nullish(),
  confidence: z.string().nullish(),
  confidence_score: z.number().nullish(),
  source_url: z.string().nullish(),
  captured_at: z.string().nullish(),
  author: z.string().nullish(),
  contributor: z.string().nullish(),
});

export const graphifyLinkSchema = z.object({
  source: z.string(),
  target: z.string(),
  relation: z.string(),
  weight: z
    .number()
    .nullish()
    .transform((v) => v ?? 1),
  confidence: z.string(),
  confidence_score: z.number(),
  source_file: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
  source_location: z.union([z.string(), z.number()]).nullish(),
  context: z.string().nullish(),
});

export const graphifyHyperedgeSchema = z.object({
  id: z.string(),
  label: z.string(),
  nodes: z.array(z.string()),
  relation: z.string(),
  confidence: z.string(),
  confidence_score: z.number(),
  source_file: z.string(),
});

export const graphifyGraphSchema = z.object({
  nodes: z.array(graphifyNodeSchema),
  links: z.array(graphifyLinkSchema).optional().default([]),
  graph: z
    .object({
      hyperedges: z.array(graphifyHyperedgeSchema).optional().default([]),
    })
    .optional()
    .default({ hyperedges: [] }),
  hyperedges: z.array(graphifyHyperedgeSchema).optional().default([]),
});

export type GraphifyNode = z.infer<typeof graphifyNodeSchema>;
export type GraphifyLink = z.infer<typeof graphifyLinkSchema>;
export type GraphifyHyperedge = z.infer<typeof graphifyHyperedgeSchema>;
export type GraphifyGraph = z.infer<typeof graphifyGraphSchema>;
