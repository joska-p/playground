import type { IconName } from '@repo/ui/icons';
import { iconMap } from '@repo/ui/icons';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, reference } from 'astro:content';

const iconSchema = z.enum(Object.keys(iconMap) as [IconName, ...IconName[]]);

const docsCategories = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/docs-categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: iconSchema
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
    category: reference('docs-categories'),
    tags: z.array(z.string()).default([])
  })
});

const notesCategories = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/notes-categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string()
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
    category: reference('notes-categories'),
    tags: z.array(z.string()).default([])
  })
});

const projectsCategories = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/projects-categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: iconSchema,
    order: z.number().default(0)
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
    category: reference('projects-categories'),
    tags: z.array(reference('tags')).default([])
  })
});

const tags = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string()
  })
});

export const collections = {
  'docs-categories': docsCategories,
  docs,
  'notes-categories': notesCategories,
  notes,
  'projects-categories': projectsCategories,
  projects,
  tags
};
