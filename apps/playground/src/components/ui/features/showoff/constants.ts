import type { Category, CategoryMeta } from './types';

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  generative: {
    label: 'Generative Art',
    order: 0,
    description: 'Algorithms as brushes',
  },
  color: {
    label: 'Color & Design',
    order: 1,
    description: 'Palettes & perception',
  },
  image: {
    label: 'Image Processing',
    order: 2,
    description: 'Pixels transformed',
  },
  'data-viz': {
    label: 'Data Visualization',
    order: 3,
    description: 'Data made visible',
  },
  random: {
    label: 'Random & Misc',
    order: 4,
    description: 'Controlled chaos',
  },
  simulation: {
    label: 'Simulation',
    order: 5,
    description: 'Systems in motion',
  },
} as const;

export const SORTED_CATEGORIES = (
  Object.entries(CATEGORY_META) as [Category, CategoryMeta][]
).sort((a, b) => a[1].order - b[1].order);
