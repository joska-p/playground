import { z } from "astro/zod";
import { getCollection } from "astro:content";

const baseUrl = import.meta.env.BASE_URL || "/";
export const notebookBaseUrl = `${baseUrl}notebook/`;

export const CATEGORY_METADATA = {
  maths: {
    label: "Maths",
    description: "Maths notes",
  },
  canvas: {
    label: "Canvas",
    description: "Canvas notes",
  },
  tailwind: {
    label: "Tailwind",
    description: "Tailwind notes",
  },
} as const;

export type CategoryId = keyof typeof CATEGORY_METADATA;
const categoriesIds = Object.keys(CATEGORY_METADATA) as [CategoryId, ...CategoryId[]];

export const notebookSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  draft: z.boolean().default(false),
  category: z.enum(categoriesIds),
  tags: z.array(z.string()).default([]).optional(),
});

export function getTagMetadata(id: CategoryId) {
  return CATEGORY_METADATA[id];
}

export async function getNotesByCategory() {
  const notes = await getCollection("notebook", ({ data }) => !data.draft);

  return Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
    id: id as CategoryId,
    ...meta,
    articles: notes
      .filter((note) => note.data.category === (id as CategoryId))
      .sort((a, b) => a.data.order - b.data.order),
  }));
}

export async function getFeaturedNotes() {
  return getCollection("notebook", ({ data }) => data.featured && !data.draft);
}
