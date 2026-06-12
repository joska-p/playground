import { getCollection } from 'astro:content';

const baseUrl = import.meta.env.BASE_URL || '/';
export const notebookBaseUrl = `${baseUrl}notebook/`;

const CATEGORY_METADATA = {
  maths: {
    label: 'Maths',
    description: 'Maths notes'
  },
  canvas: {
    label: 'Canvas',
    description: 'Canvas notes'
  },
  tailwind: {
    label: 'Tailwind',
    description: 'Tailwind notes'
  }
} as const;

export type CategoryId = keyof typeof CATEGORY_METADATA;
export const categoriesIds = Object.keys(CATEGORY_METADATA) as [
  CategoryId,
  ...CategoryId[]
];

export async function getNotesByCategory() {
  const notes = await getCollection('notebook', ({ data }) => !data.draft);

  return Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
    id: id as CategoryId,
    ...meta,
    articles: notes
      .filter((note) => note.data.category === (id as CategoryId))
      .sort((a, b) => a.data.order - b.data.order)
  }));
}
