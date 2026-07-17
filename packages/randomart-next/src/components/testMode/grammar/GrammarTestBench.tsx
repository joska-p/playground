import type { GrammarRule } from '@repo/randomart-engine-next/types';
import { useAnimationLoop } from '../hooks/useAnimationLoop';
import { useFilteredRules } from '../hooks/useFilteredRules';
import { setT, testModeStore, useAnimate, useCategory, useQuery } from '../store';
import { DetailPanel } from './DetailPanel';
import { SpecimenCard } from './SpecimenCard';

export function GrammarTestBench({ rules }: { rules: GrammarRule[] }) {
  const query = useQuery();
  const category = useCategory();
  const animate = useAnimate();
  const filtered = useFilteredRules(rules, query, category);

  useAnimationLoop(animate, (delta) => {
    const currentT = testModeStore.getState().t;
    setT(currentT + delta);
  });

  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      <h1 className="text-foreground mb-4 text-lg font-bold">Grammar Rule Test Bench</h1>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((rule, i) => (
          <SpecimenCard
            key={rule.id}
            rule={rule}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-foreground-muted mt-8 text-center text-sm">
          No rules match your filters.
        </p>
      )}

      <DetailPanel rules={rules} />
    </div>
  );
}
