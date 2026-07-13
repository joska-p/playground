import { ControlSection } from '@repo/ui/control-panel';
import { Input } from '@repo/ui/data-entry';
import { setCategory, setQuery, useCategory, useQuery } from '../store';

const CATEGORIES = ['all', 'terminal', 'structural'] as const;

export function SearchSection() {
  const query = useQuery();
  const category = useCategory();

  return (
    <ControlSection title="search" defaultOpen>
      <Input
        placeholder="Search rules…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="flex gap-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
            }}
            className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
              category === cat
                ? 'bg-neutral-600 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </ControlSection>
  );
}
