import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { TAG_REGISTRY } from "./data/tags";
import type { TagId } from "./data/tags";

// Define valid tag keys as a Zod enum (derived from TAG_REGISTRY)
const tagEnum = z.enum(Object.keys(TAG_REGISTRY) as [TagId, ...TagId[]]);

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Tags are now validated against the registry at load time
    // Invalid tags will cause a build error with a clear message
    tags: z.array(tagEnum).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
