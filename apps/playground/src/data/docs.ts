import { getCollection } from 'astro:content';

const baseUrl = import.meta.env.BASE_URL || '/';
export const docsBaseUrl = `${baseUrl}docs/`;

export const CATEGORY_METADATA = {
  tutorial: {
    label: 'Tutorials',
    description: 'Step-by-step guides.',
    icon: 'book',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  'how-to': {
    label: 'How-To Guides',
    description: 'Practical recipes.',
    icon: 'wrench',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  explanation: {
    label: 'Explanations',
    description: 'Deep dives.',
    icon: 'lightbulb',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  reference: {
    label: 'Reference',
    description: 'Technical specs.',
    icon: 'code',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
} as const;

export type CategoryId = keyof typeof CATEGORY_METADATA;
export const categoryIds = Object.keys(CATEGORY_METADATA) as [
  CategoryId,
  ...CategoryId[],
];

// 3. UI Helper Function
export function getCategoryMetadata(id: CategoryId) {
  return CATEGORY_METADATA[id];
}

export async function getDocsByCategory() {
  const allDocs = await getCollection('docs', ({ data }) => !data.draft);

  return Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
    id: id as CategoryId,
    ...meta,
    articles: allDocs
      .filter((doc) => doc.data.category === (id as CategoryId)) // Simple string check
      .sort((a, b) => a.data.order - b.data.order),
  }));
}

export async function getFeaturedDocs() {
  return getCollection('docs', ({ data }) => data.featured && !data.draft);
}
