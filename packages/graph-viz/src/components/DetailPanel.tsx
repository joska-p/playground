import { REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import { Badge, Button } from "@repo/ui";

export function DetailPanel() {
  const selectedNode = useGraphStore((s) => s.selectedNode);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);
  const graphData = useGraphStore((s) => s.graphData);

  if (!selectedNode) return null;

  const links = graphData?.links ?? [];
  const nodes = graphData?.nodes ?? [];
  const connections = links.filter((l) => l.s === selectedNode.id || l.t === selectedNode.id);

  return (
    <aside className="w-64 p-0">
      <div className="bg-background border-border overflow-y-auto border-l p-4 text-sm">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-primary text-sm font-semibold break-words">{selectedNode.label}</h3>
          <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
            ×
          </Button>
        </div>

        <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1">
          <span className="text-muted pt-1">ID</span>
          <span className="text-foreground break-all">{selectedNode.id}</span>

          <span className="text-muted pt-1">Type</span>
          <span className="text-foreground">
            <Badge variant="accent">{selectedNode.ft || "—"}</Badge>
          </span>

          <span className="text-muted pt-1">Community</span>
          <span className="text-foreground">
            <Badge variant="outline">{String(selectedNode.c)}</Badge>
          </span>

          <span className="text-muted pt-1">Source</span>
          <span className="text-foreground break-all">{selectedNode.sf || "—"}</span>
        </div>

        <div className="border-border mt-4 border-t pt-3">
          <div className="text-muted mb-2 text-xs tracking-wider uppercase">
            Connections ({connections.length})
          </div>

          {connections.slice(0, 20).map((l) => {
            const otherId = l.s === selectedNode.id ? l.t : l.s;
            const other = nodes.find((n) => n.id === otherId);
            return (
              <div
                key={otherId}
                onClick={() => other && setSelectedNode(other)}
                className="bg-muted mb-2 cursor-pointer rounded border-l-4 p-2"
                style={{ borderLeftColor: REL_COLORS[l.r] ?? "#334155" }}
              >
                <div className="mb-1">
                  <Badge variant="outline">{l.r}</Badge>
                </div>
                <div className="text-foreground text-sm break-words">{other?.label ?? otherId}</div>
              </div>
            );
          })}

          {connections.length > 20 && (
            <div className="text-muted pt-1 text-center text-xs">
              +{connections.length - 20} more
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
