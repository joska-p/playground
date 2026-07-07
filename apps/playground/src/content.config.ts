import type { IconName } from '@repo/ui/icons';
import { iconMap } from '@repo/ui/icons';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const iconSchema = z.enum(Object.keys(iconMap) as [IconName, ...IconName[]]);

const tags = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/tags' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    icon: iconSchema.optional(),
    order: z.number().default(0)
  })
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // First tag is the main tag — controls the visual style
    tags: z.array(z.string()).default([])
  })
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // First tag is the main tag — controls the visual style
    tags: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: iconSchema,
    packageDir: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    // First tag is the main tag — controls the visual style
    tags: z.array(z.string()).default([])
  })
});

export const collections = {
  tags,
  docs,
  notes,
  projects
};
