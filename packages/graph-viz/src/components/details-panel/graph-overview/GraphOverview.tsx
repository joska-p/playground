import { Badge } from '@repo/ui/Badge';
import { useLinks, useNodes } from '../../../stores/content/selectors';
import { getStats } from '../utils';
import { Stat } from './Stat';

function GraphOverview() {
  const nodes = useNodes();
  const links = useLinks();
  const stats = getStats(nodes, links);

  return (
    <>
      <h2>Graph Overview</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Stat
            value={stats.nodeCount}
            label="Nodes"
            color="text-accent"
          />
          <Stat
            value={stats.edgeCount}
            label="Edges"
            color="text-primary"
          />
          <Stat
            value={stats.communityCount}
            label="Groups"
            color="text-secondary"
          />
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-xs">File Types</p>
          <ul className="space-y-1">
            {stats.fileTypes.map(([type, count]) => (
              <li
                key={type}
                className="flex items-center justify-between text-xs"
              >
                <Badge
                  variant="outline"
                  className="font-mono"
                >
                  {type}
                </Badge>
                <span className="text-muted-foreground font-mono">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-muted-foreground text-xs italic">
          Click a node to inspect it
        </p>
      </div>
    </>
  );
}

export { GraphOverview };
