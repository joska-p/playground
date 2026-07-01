import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import { Switch } from '@repo/ui/Switch';
import { useCommunities, useNodes } from '../../stores/content/selectors';
import {
  hideAllCommunities,
  showAllCommunities,
  toggleCommunity,
  toggleEdges,
  toggleLabels
} from '../../stores/view/actions';
import {
  useEdgesVisible,
  useLabelsVisible,
  useVisibleCommunities
} from '../../stores/view/selectors';

function FilterControls() {
  const nodes = useNodes();
  const communities = useCommunities();
  const edgesVisible = useEdgesVisible();
  const labelsVisible = useLabelsVisible();
  const visibleCommunities = useVisibleCommunities();

  const counts = new Map<number, number>();
  const communityColor = new Map<number, string>();
  const communityName = new Map<number, string>();
  for (const n of nodes) {
    counts.set(n.community, (counts.get(n.community) ?? 0) + 1);
    if (!communityColor.has(n.community)) {
      communityColor.set(n.community, n.color);
    }
  }
  for (const c of communities) {
    communityName.set(c.id, c.name);
  }
  const commList = Array.from(counts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([id, count]) => ({
      id,
      count,
      name: communityName.get(id) ?? `Group ${String(id)}`
    }));

  return (
    <>
      <h2 className="text-base">Filters</h2>
      <div className="space-y-4">
        <div className="item-center grid grid-cols-2 gap-4">
          <Switch
            checked={edgesVisible}
            onCheckedChange={toggleEdges}
            label="Show edges"
            size="sm"
          />
          <Switch
            checked={labelsVisible}
            onCheckedChange={toggleLabels}
            label="Show labels"
            size="sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              Communities ({visibleCommunities.size}/{commList.length})
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
            {commList.map((c) => {
              const isActive = visibleCommunities.has(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    toggleCommunity(c.id);
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                    isActive
                      ? 'bg-background/50 text-foreground'
                      : 'text-muted-foreground/50 bg-transparent'
                  } `}
                >
                  <span
                    style={
                      {
                        '--node-color': communityColor.get(c.id) ?? '#888'
                      } as React.CSSProperties
                    }
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? 'bg-(--node-color)' : 'border border-current bg-transparent'}`}
                  />
                  <span className="flex-1 truncate">{c.name}</span>
                  <Badge
                    variant="ghost"
                    className="px-1.5 py-0 font-mono text-xs"
                  >
                    {c.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export { FilterControls };
