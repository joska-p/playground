import type { GrammarRule } from '@repo/randomart-engine/types';
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
    <div className="min-h-screen bg-neutral-950 p-6 text-neutral-100">
      <h1 className="mb-4 text-lg font-bold">Grammar Rule Test Bench</h1>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((rule, i) => (
          <SpecimenCard key={rule.id} rule={rule} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-500">No rules match your filters.</p>
      )}

      <DetailPanel rules={rules} />
    </div>
  );
}
