import { iconNames } from '@repo/ui/icons';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, reference } from 'astro:content';

const iconNameSchema = z.enum(iconNames);

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

const api = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/api' }),
    schema: z.object({
        title: z.string(),
        package: z.string(),
        kind: z.enum(['package', 'module', 'internal']),
        module: z.string().optional(),
        description: z.string().optional(),
        // Package-level metadata, present on `kind === 'package'` entries
        hasApp: z.boolean().default(false)
    })
});

export const collections = {
    tags,
    docs,
    notes,
    api
};
