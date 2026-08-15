import type { GrammarRule } from '@repo/randomart-engine/types';

/** Not memoized on purpose: the React Compiler handles the call site, no hand-rolled useMemo. */
export function useFilteredRules(
    rules: GrammarRule[],
    query: string,
    category: string
): GrammarRule[] {
    return rules.filter((rule) => {
        if (category !== 'all' && rule.category !== category) return false;
        if (!query) return true;
        const q = query.toLowerCase();
        return rule.name.toLowerCase().includes(q) || rule.id.toLowerCase().includes(q);
    });
}
