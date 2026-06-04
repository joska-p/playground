import { z } from 'zod';

const nodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  norm_label: z.string().nullable().optional(),
  community: z.number().nullable().optional(),
  file_type: z.string().nullable().optional(),
  source_file: z.string().nullable().optional(),
  source_location: z.union([z.string(), z.number()]).nullable().optional(),
  source_url: z.string().nullable().optional(),
  captured_at: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  contributor: z.string().nullable().optional(),
});

const linkSchema = z.object({
  source: z.string(),
  target: z.string(),
  relation: z.string(),
  weight: z.number().default(1),
  confidence: z.string().nullable().optional(),
  confidence_score: z.number().nullable().optional(),
  source_file: z.string().nullable().optional(),
  source_location: z.union([z.string(), z.number()]).nullable().optional(),
});

const hyperedgeSchema = z.object({
  id: z.string(),
  label: z.string(),
  nodes: z.array(z.string()),
  relation: z.string(),
  confidence: z.string().nullable().optional(),
  confidence_score: z.number().nullable().optional(),
  source_file: z.string().nullable().optional(),
});

export const graphSchema = z.object({
  directed: z.boolean(),
  multigraph: z.boolean(),
  graph: z.record(z.string(), z.unknown()).optional(),
  nodes: z.array(nodeSchema),
  links: z.array(linkSchema),
  hyperedges: z.array(hyperedgeSchema).optional(),
  built_at_commit: z.string().optional(),
});

export type NodeData = z.infer<typeof nodeSchema>;
export type LinkData = z.infer<typeof linkSchema>;
export type HyperedgeData = z.infer<typeof hyperedgeSchema>;
export type GraphDataType = z.infer<typeof graphSchema>;
