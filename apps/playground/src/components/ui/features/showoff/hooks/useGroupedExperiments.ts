import { useMemo } from 'react';
import { projects } from '../../../../../data/projects';
import { SORTED_CATEGORIES } from '../constants';
import type { Category, GroupedCategory } from '../types';

export function useGroupedExperiments(): GroupedCategory[] {
  return useMemo(() => {
    return SORTED_CATEGORIES.map(([id, meta]) => ({
      id: id as Category,
      label: meta.label,
      description: meta.description,
      count: Object.values(projects).filter((p) => p.category === id).length,
    })).filter((g) => g.count > 0);
  }, []);
}
