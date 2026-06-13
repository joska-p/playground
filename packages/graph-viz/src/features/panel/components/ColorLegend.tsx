import { Input } from '@repo/ui/Input';
import { useEffect, useRef, useState } from 'react';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { buildCommunityList } from '../services/communityFilterUtils';

type ColorLegendProps = {
  focusedIndex?: number;
  onFocusChange?: (index: number) => void;
};

/**
 * Collapsible color legend showing all communities as swatches.
 * Click a swatch to navigate into that community.
 * Used inside GraphPanel, replacing the flat community list.
 * Supports keyboard navigation via focusedIndex/onFocusChange props.
 */
function ColorLegend({ focusedIndex, onFocusChange }: ColorLegendProps) {
  const communities = useDataStore((s) => s.communities);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const communityList = (() => {
    return buildCommunityList(communities, minCommunitySize).filter((c) => {
      if (!searchFilter) return true;
      const q = searchFilter.toLowerCase();
      return c.label.toLowerCase().includes(q) || String(c.id).includes(q);
    });
  })();

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex === undefined || !listRef.current) return;
    const buttons = listRef.current.querySelectorAll('button');
    const btn = buttons[focusedIndex];
    if (btn) {
      btn.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, communityList.length]);

  if (communityList.length === 0 && !searchFilter) return null;

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setIsCollapsed((v) => !v)}
        className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium hover:opacity-80"
      >
        <span className="inline-block w-2 text-center text-[10px]">
          {isCollapsed ? '▶' : '▼'}
        </span>
        Communities
      </button>

      {!isCollapsed && (
        <>
          <Input
            placeholder="Filter communities..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            fullWidth
            className="text-xs"
          />
          <div ref={listRef} className="flex flex-col gap-0.5">
            {communityList.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCommunityFilter(String(c.id))}
                className={`flex items-center gap-2 rounded px-1.5 py-1 text-xs transition-colors ${
                  focusedIndex === i ? 'bg-accent' : 'hover:bg-accent'
                }`}
                onMouseEnter={() => onFocusChange?.(i)}
              >
                <span
                  className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                <span className="flex-1 truncate text-left">{c.label}</span>
                <span className="text-muted-foreground flex-shrink-0">
                  {c.nodeCount}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { ColorLegend };
