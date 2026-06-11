import type { Category } from '../../../../data/projects';
import { projects, SORTED_CATEGORIES } from '../../../../data/projects';
import { CategoryCard } from './CategoryCard';

type GroupedCategory = {
  id: Category;
  label: string;
  description: string;
  count: number;
};

function useGroupedExperiments(): GroupedCategory[] {
  return SORTED_CATEGORIES.map(([id, meta]) => ({
    id: id as Category,
    label: meta.name,
    description: meta.description,
    count: Object.values(projects).filter(
      (p: { category: Category }) => p.category === id
    ).length,
  })).filter((g: GroupedCategory) => g.count > 0);
}

export function ExperimentsPreview() {
  const groups = useGroupedExperiments();

  return (
    <section
      className="border-border border-b px-5 py-10 sm:px-6 lg:py-14"
      aria-label="Experiment categories"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm tracking-widest uppercase">
            experiments
          </span>
          <div
            className="bg-border h-px flex-1"
            aria-hidden
          />
          <span className="text-muted-foreground/60 text-sm">
            {groups.length}&nbsp;categories
          </span>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {groups.map((group, index) => (
            <CategoryCard
              key={group.id}
              {...group}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
