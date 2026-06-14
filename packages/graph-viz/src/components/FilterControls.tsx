import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/Card';
import { Switch } from '@repo/ui/Switch';
import {
  hideAllCommunities,
  showAllCommunities,
  toggleCommunity,
  toggleEdges
} from '../stores/graph/actions';
import {
  useEdgesVisible,
  useVisibleCommunities
} from '../stores/graph/selectors';
import type { GraphNode } from './graphData.types';

type FilterControlsProps = {
  nodes: GraphNode[];
};

function FilterControls({ nodes }: FilterControlsProps) {
  const edgesVisible = useEdgesVisible();
  const visibleCommunities = useVisibleCommunities();

  // Extract unique community IDs sorted, with node counts
  const counts = new Map<number, number>();
  for (const n of nodes) {
    counts.set(n.community, (counts.get(n.community) ?? 0) + 1);
  }
  const communities = Array.from(counts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([id, count]) => ({ id, count }));

  return (
    <Card>
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
            <span className="text-muted-foreground text-xs">
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

          <div className="max-h-60 space-y-0.5 overflow-y-auto pr-1">
            {communities.map((c) => {
              const isActive = visibleCommunities.has(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCommunity(c.id)}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                    isActive
                      ? 'bg-background/50 text-foreground'
                      : 'text-muted-foreground/50 bg-transparent'
                  } `}
                >
                  <span
                    style={
                      {
                        '--node-color': `var(--color-palette-${c.id % 24})`
                      } as React.CSSProperties
                    }
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? 'bg-(--node-color)' : 'border border-current bg-transparent'}`}
                  />
                  <span className="flex-1 truncate">Group {c.id}</span>
                  <Badge
                    variant="ghost"
                    className="px-1.5 py-0 font-mono text-[10px]"
                  >
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
}

export { FilterControls };
