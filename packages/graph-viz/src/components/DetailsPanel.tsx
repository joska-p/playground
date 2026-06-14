import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/Card';
import { useGraphStore } from '../store/graphStore';
import type { GraphLink, GraphNode } from './useGraphData';

type DetailsPanelProps = {
  nodes: GraphNode[];
  links: GraphLink[];
};

function getStats({ nodes, links }: DetailsPanelProps) {
  const communities = new Set(nodes.map((n) => n.community));
  const fileTypes = new Map<string, number>();
  for (const n of nodes) {
    fileTypes.set(n.file_type, (fileTypes.get(n.file_type) ?? 0) + 1);
  }
  return {
    nodeCount: nodes.length,
    edgeCount: links.length,
    communityCount: communities.size,
    fileTypes: Array.from(fileTypes.entries()).sort((a, b) => b[1] - a[1])
  };
}

function getConnexions({
  nodes,
  links,
  selectedNodeIdx
}: {
  nodes: GraphNode[];
  links: GraphLink[];
  selectedNodeIdx: number | null;
}) {
  if (selectedNodeIdx === null) return { incoming: [], outgoing: [] };
  const incoming: GraphNode[] = [];
  const outgoing: GraphNode[] = [];
  for (const link of links) {
    if (link.targetIdx === selectedNodeIdx) {
      incoming.push(nodes[link.sourceIdx]);
    }
    if (link.sourceIdx === selectedNodeIdx) {
      outgoing.push(nodes[link.targetIdx]);
    }
  }
  return { incoming, outgoing };
}

function DetailsPanel({ nodes, links }: DetailsPanelProps) {
  const selectedNodeIdx = useGraphStore((s) => s.selectedNodeIdx);
  const selectNode = useGraphStore((s) => s.selectNode);
  const stats = getStats({ nodes, links });
  const selectedNode = selectedNodeIdx !== null ? nodes[selectedNodeIdx] : null;
  const connections = getConnexions({ nodes, links, selectedNodeIdx });

  if (selectedNode) {
    return (
      <Card className="border-border w-80 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="truncate text-base leading-tight">
              {selectedNode.label}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={() => selectNode(null)}
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Community</span>
              <div>
                <Badge variant="accent">{selectedNode.community}</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Type</span>
              <div>
                <Badge variant="outline">{selectedNode.file_type}</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">In-degree</span>
              <p className="font-mono text-sm font-semibold">
                {selectedNode.inDegree}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Out-degree</span>
              <p className="font-mono text-sm font-semibold">
                {selectedNode.outDegree}
              </p>
            </div>
          </div>

          {/* Position */}
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">Position</span>
            <p className="text-muted-foreground font-mono text-xs">
              ({selectedNode.x.toFixed(1)}, {selectedNode.y.toFixed(1)},{' '}
              {selectedNode.z.toFixed(1)})
            </p>
          </div>

          {/* Connections */}
          {(connections.incoming.length > 0 ||
            connections.outgoing.length > 0) && (
            <div className="space-y-2">
              <span className="text-muted-foreground text-xs">
                Connections (
                {connections.incoming.length + connections.outgoing.length})
              </span>
              <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
                {connections.outgoing.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    className="bg-background/50 flex items-center gap-2 rounded-md px-2 py-1 text-xs"
                  >
                    <span className="text-accent">&#8594;</span>
                    <span className="truncate">{n.label}</span>
                  </div>
                ))}
                {connections.incoming.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    className="bg-background/50 flex items-center gap-2 rounded-md px-2 py-1 text-xs"
                  >
                    <span className="text-primary">&#8592;</span>
                    <span className="truncate">{n.label}</span>
                  </div>
                ))}
                {connections.incoming.length + connections.outgoing.length >
                  20 && (
                  <p className="text-muted-foreground px-2 text-xs italic">
                    +
                    {connections.incoming.length +
                      connections.outgoing.length -
                      20}{' '}
                    more
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default: show graph overview stats
  return (
    <Card className="w-80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-base">Graph Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-accent font-mono text-2xl font-bold">
              {stats.nodeCount.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-xs">Nodes</p>
          </div>
          <div className="text-center">
            <p className="text-primary font-mono text-2xl font-bold">
              {stats.edgeCount.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-xs">Edges</p>
          </div>
          <div className="text-center">
            <p className="text-secondary font-mono text-2xl font-bold">
              {stats.communityCount}
            </p>
            <p className="text-muted-foreground text-xs">Groups</p>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-muted-foreground text-xs">File Types</span>
          <div className="space-y-1">
            {stats.fileTypes.map(([type, count]) => (
              <div
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
              </div>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-xs italic">
          Click a node to inspect it
        </p>
      </CardContent>
    </Card>
  );
}

export { DetailsPanel };
