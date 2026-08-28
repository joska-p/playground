import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

import { packagesLoader } from './content/loaders/packages';

import type { JSONOutput } from 'typedoc';

const docs = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: '../../codex/docs' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        draft: z.boolean().default(false)
    })
});

const notes = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        draft: z.boolean().default(false)
    })
});

const packages = defineCollection({
    loader: packagesLoader(),
    schema: z.object({
        title: z.string(),
        package: z.string(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        hasApp: z.boolean(),
        hasReference: z.boolean().default(false),
        typedoc: z.custom<JSONOutput.ProjectReflection>()
    })
});

export const collections = {
    docs,
    notes,
    packages
};
