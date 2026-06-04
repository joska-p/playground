import { Button } from '@repo/ui/Button';
import { Input } from '@repo/ui/Input';
import { Select } from '@repo/ui/Select';
import { cn } from '@repo/ui/cn';
import { FT_LABEL, REL_COLORS } from '../constants';
import type { ColorMode } from '../stores/graph/store';
import {
  resetFilters,
  setColorMode,
  setFilterFT,
  setFilterRel,
  setSearch,
  toggleHyper,
  useColorMode,
  useFilterFT,
  useFilterRel,
  useSearch,
  useShowHyper,
  useStats,
} from '../stores/graph/store';

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_OPTIONS = Object.keys(REL_COLORS);

type TopBarProps = {
  onResetZoom: () => void;
};

export function TopBar({ onResetZoom }: TopBarProps) {
  const colorMode = useColorMode();
  const filterFT = useFilterFT();
  const filterRel = useFilterRel();
  const search = useSearch();
  const showHyper = useShowHyper();
  const stats = useStats();

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-4 py-2 text-xs text-foreground">
      <span className="mr-2 text-sm font-bold tracking-wider text-primary">
        ◈ GRAPHIFY
      </span>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search nodes…"
        className="w-40"
      />

      <Select
        value={filterFT ?? ''}
        onChange={(e) => setFilterFT(e.target.value || undefined)}
        className="w-40"
      >
        <option value="">All file types</option>
        {FT_OPTIONS.map((ft) => (
          <option
            key={ft}
            value={ft}
          >
            {FT_LABEL[ft]}
          </option>
        ))}
      </Select>

      <Select
        value={filterRel ?? ''}
        onChange={(e) => setFilterRel(e.target.value || undefined)}
        className="w-40"
      >
        <option value="">All relations</option>
        {REL_OPTIONS.map((r) => (
          <option
            key={r}
            value={r}
          >
            {r}
          </option>
        ))}
      </Select>

      <div className="flex gap-1.5">
        {(['community', 'filetype'] as ColorMode[]).map((m) => (
          <Button
            key={m}
            variant={colorMode === m ? 'primary' : 'outline'}
            size="small"
            onClick={() => setColorMode(m)}
            className={cn(
              'text-[10px] uppercase tracking-wider',
              colorMode === m
                ? 'border-primary bg-secondary text-secondary-foreground'
                : 'border-border text-muted-foreground'
            )}
          >
            {m === 'community' ? 'Community' : 'File Type'}
          </Button>
        ))}
      </div>

      <Button
        variant={showHyper ? 'secondary' : 'outline'}
        size="small"
        onClick={toggleHyper}
        className={cn(
          'text-xs uppercase tracking-wider',
          showHyper
            ? 'border-accent bg-accent text-accent-foreground'
            : 'border-border text-muted-foreground'
        )}
      >
        {showHyper ? 'Hyper ✓' : 'Hyper ○'}
      </Button>

      <Button
        onClick={resetFilters}
        variant="ghost"
        size="small"
        className="text-xs uppercase text-muted-foreground"
      >
        ✕ Clear
      </Button>
      <Button
        onClick={onResetZoom}
        variant="ghost"
        size="small"
        className="text-xs uppercase text-muted-foreground"
      >
        ⊡ Reset
      </Button>

      <span className="ml-auto text-xs text-muted-foreground">
        {stats.nodes.toLocaleString()} nodes · {stats.links.toLocaleString()}{' '}
        edges
      </span>
    </div>
  );
}
