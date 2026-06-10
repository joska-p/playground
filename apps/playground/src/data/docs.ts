import type { IconName } from '@repo/ui/icons';
import { getCollection } from 'astro:content';

const baseUrl = import.meta.env.BASE_URL || '/';
export const docsBaseUrl = `${baseUrl}docs/`;

type CategoryMeta = {
  label: string;
  description: string;
  iconName: IconName;
};

const CATEGORY_METADATA = {
  tutorial: {
    label: 'Tutorials',
    description: 'Step-by-step guides.',
    iconName: 'book',
  },
  'how-to': {
    label: 'How-To Guides',
    description: 'Practical recipes.',
    iconName: 'wrench',
  },
  explanation: {
    label: 'Explanations',
    description: 'Deep dives.',
    iconName: 'lightbulb',
  },
  reference: {
    label: 'Reference',
    description: 'Technical specs.',
    iconName: 'code',
  },
} as const satisfies Record<string, CategoryMeta>;

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
