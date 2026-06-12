import { useState } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';

/**
 * Collapsible color legend showing all communities as swatches.
 * Click a swatch to navigate into that community.
 * Used inside GraphPanel, replacing the flat community list.
 */
function ColorLegend() {
  const communities = useDataStore((s) => s.communities);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const communityList = (() => {
    return [...communities.values()]
      .filter((c) => c.nodeCount >= minCommunitySize)
      .sort((a, b) => b.nodeCount - a.nodeCount)
      .slice(0, 50);
  })();

  if (communityList.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
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
        <div className="flex flex-col gap-0.5">
          {communityList.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCommunityFilter(String(c.id))}
              className="hover:bg-accent flex items-center gap-2 rounded px-1.5 py-1 text-xs transition-colors"
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
      )}
    </div>
  );
}

export { ColorLegend };
