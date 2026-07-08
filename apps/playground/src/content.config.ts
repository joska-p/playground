import { iconMap } from '@repo/ui/icons';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, reference } from 'astro:content';

const iconNameSchema = z.enum(Object.keys(iconMap));

export type IconNameSchemaType = z.infer<typeof iconNameSchema>;

const tags = defineCollection({
  loader: file('src/content/tags.yml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    iconName: iconNameSchema.optional(),
    order: z.number().default(0).optional()
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
    tags: z.array(reference('tags'))
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
    tags: z.array(reference('tags'))
  })
});

const projects = defineCollection({
  loader: file('src/content/projects.yml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    iconName: iconNameSchema,
    packageDir: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    // First tag is the main tag — controls the visual style
    tags: z.array(reference('tags'))
  })
});

export const collections = {
  tags,
  docs,
  notes,
  projects
};
