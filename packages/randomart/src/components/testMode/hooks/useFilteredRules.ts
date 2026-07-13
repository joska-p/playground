import type { GrammarRule } from '@repo/randomart-engine/types';

/**
 * Filters rules by category and a case-insensitive name/id search query.
 * Plain function (not memoized) - the React Compiler handles memoizing the
 * call site, so there's no need to hand-roll useMemo here.
 */
export function useFilteredRules(rules: GrammarRule[], query: string, category: string): GrammarRule[] {
  return rules.filter((rule) => {
    if (category !== 'all' && rule.category !== category) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return rule.name.toLowerCase().includes(q) || rule.id.toLowerCase().includes(q);
  });
}
