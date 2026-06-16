import { z } from 'zod';

const graphNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  inDegree: z.number(),
  outDegree: z.number(),
  community: z.number(),
  file_type: z.string(),
  color: z.string()
});

const graphLinkSchema = z.object({
  sourceIdx: z.number(),
  targetIdx: z.number(),
  relation: z.string()
});

const communitySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  centroid: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number()
  })
});

export const graphDataSchema = z.object({
  nodes: z.array(graphNodeSchema),
  links: z.array(graphLinkSchema),
  communities: z.array(communitySchema)
});

export type GraphNode = z.infer<typeof graphNodeSchema>;
export type GraphLink = z.infer<typeof graphLinkSchema>;
export type Community = z.infer<typeof communitySchema>;
export type GraphData = z.infer<typeof graphDataSchema>;
