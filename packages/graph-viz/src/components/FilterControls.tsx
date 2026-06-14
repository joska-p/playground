import { type FC, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/Card';
import { Switch } from '@repo/ui/Switch';
import { Button } from '@repo/ui/Button';
import { Badge } from '@repo/ui/Badge';
import { useGraphStore } from '../store/graphStore';
import type { GraphNode } from './useGraphData';

interface FilterControlsProps {
  nodes: GraphNode[];
}

/** Deterministic hue for each community — mirrors Nodes.tsx golden angle logic */
const GOLDEN_ANGLE = 0.618033988749895;
const communityColorCache = new Map<number, string>();
let hueAccum = 0;

function communityColor(communityId: number): string {
  let css = communityColorCache.get(communityId);
  if (!css) {
    hueAccum = (hueAccum + GOLDEN_ANGLE) % 1;
    css = `hsl(${Math.round(hueAccum * 360)}, 70%, 55%)`;
    communityColorCache.set(communityId, css);
  }
  return css;
}

const FilterControls: FC<FilterControlsProps> = ({ nodes }) => {
  const edgesVisible = useGraphStore((s) => s.edgesVisible);
  const toggleEdges = useGraphStore((s) => s.toggleEdges);
  const visibleCommunities = useGraphStore((s) => s.visibleCommunities);
  const toggleCommunity = useGraphStore((s) => s.toggleCommunity);
  const showAllCommunities = useGraphStore((s) => s.showAllCommunities);
  const hideAllCommunities = useGraphStore((s) => s.hideAllCommunities);

  // Extract unique community IDs sorted, with node counts
  const communities = useMemo(() => {
    const counts = new Map<number, number>();
    for (const n of nodes) {
      counts.set(n.community, (counts.get(n.community) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([id, count]) => ({ id, count, color: communityColor(id) }));
  }, [nodes]);

  return (
    <Card variant="secondary" className="w-80 backdrop-blur-md bg-secondary/80 border-secondary/30">
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Edge visibility toggle */}
        <div className="flex items-center justify-between">
          <Switch
            checked={edgesVisible}
            onCheckedChange={toggleEdges}
            label="Show edges"
            size="sm"
          />
        </div>

        {/* Community filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Communities ({visibleCommunities.size}/{communities.length})
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={showAllCommunities}
              >
                All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={hideAllCommunities}
              >
                None
              </Button>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1">
            {communities.map((c) => {
              const isActive = visibleCommunities.has(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCommunity(c.id)}
                  className={`
                    flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs
                    transition-colors cursor-pointer
                    ${isActive
                      ? 'bg-background/50 text-foreground'
                      : 'bg-transparent text-muted-foreground/50'
                    }
                  `}
                >
                  <span
                    style={{ '--community-color': c.color } as React.CSSProperties}
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? 'bg-(--community-color)' : 'border-[1.5px] border-currentColor bg-transparent'}`}
                  />
                  <span className="flex-1 truncate">Group {c.id}</span>
                  <Badge variant="ghost" className="font-mono text-[10px] px-1.5 py-0">
                    {c.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterControls;
