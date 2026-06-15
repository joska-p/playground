import type { IconName } from '@repo/ui/icons';
import { iconMap } from '@repo/ui/icons';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, reference } from 'astro:content';

const iconSchema = z.enum(Object.keys(iconMap) as [IconName, ...IconName[]]);

const docCategories = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/doc-categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: iconSchema
  })
});

const notebookCategories = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/notebook-categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string()
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
    category: reference('doc-categories'),
    tags: z.array(z.string()).default([])
  })
});

const notebook = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notebook' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    category: reference('notebook-categories'),
    tags: z.array(z.string()).default([])
  })
});

const categories = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: iconSchema,
    order: z.number().default(0)
  })
});

const tags = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string()
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
    category: reference('categories'),
    tags: z.array(reference('tags')).default([])
  })
});

export const collections = {
  categories,
  tags,
  projects,
  'doc-categories': docCategories,
  'notebook-categories': notebookCategories,
  docs,
  notebook
};
