import type { Rule } from '@repo/randomart-engine-next/types';

export function useFilteredRules(rules: Rule[], query: string, category: string): Rule[] {
  return rules.filter((rule) => {
    if (category !== 'all') return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return rule.displayName.toLowerCase().includes(q) || rule.id.toLowerCase().includes(q);
  });
}
