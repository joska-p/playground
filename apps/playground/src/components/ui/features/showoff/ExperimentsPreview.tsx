import { CategoryCard } from './CategoryCard';
import { useGroupedExperiments } from './hooks/useGroupedExperiments';
import { useStaggeredMount } from './hooks/useStaggeredMount';

/**
 * Section placed directly below the hero, giving a visual overview of all
 * experiment categories available on the site.
 *
 * Responsive grid:
 *   - 2 columns on mobile
 *   - 3 columns on sm (640 px+)
 *   - 6 columns on lg (1024 px+)
 */
export function ExperimentsPreview() {
  const groups = useGroupedExperiments();
  const { mounted, delayFor } = useStaggeredMount(70);

  return (
    <section
      className="border-b border-[#504945] px-5 py-10 sm:px-6 lg:py-14"
      aria-label="Experiment categories"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Section header */}
        <header className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#a89984]">
            experiments
          </span>
          <div className="h-px flex-1 bg-[#504945]" aria-hidden />
          <span className="font-mono text-[11px] text-[#665c54]">
            {groups.length}&nbsp;categories
          </span>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {groups.map((group, index) => (
            <div
              key={group.id}
              className="transition-[opacity,transform] duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(14px)',
                transitionDelay: delayFor(index),
              }}
            >
              <CategoryCard {...group} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
