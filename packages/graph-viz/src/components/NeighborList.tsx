import { useMemo } from "react";
import type { GraphNode, GraphEdge } from "../types.js";
import { useGraphStore } from "../store/useGraphStore.js";
import { edgesForNode, neighborIds, confidenceLabel } from "../utils/graph.js";
import { communityColor } from "../colors.js";

type NeighborListProps = {
  nodes: GraphNode[];
  links: GraphEdge[];
  onSelect: (nodeId: string) => void;
};

export function NeighborList({ nodes, links, onSelect }: NeighborListProps) {
  const selectedNode = useGraphStore((s) => s.selectedNode);

  const neighborNodeIds = useMemo(
    () => (selectedNode ? neighborIds(links, selectedNode.id) : []),
    [selectedNode, links],
  );

  const neighborNodes = useMemo(
    () => {
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      return neighborNodeIds
        .map((id) => nodeMap.get(id))
        .filter((n): n is GraphNode => n !== undefined);
    },
    [neighborNodeIds, nodes],
  );

  const incidentEdges = useMemo(
    () => (selectedNode ? edgesForNode(links, selectedNode.id) : []),
    [selectedNode, links],
  );

  if (!selectedNode || neighborNodes.length === 0) return null;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
      <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
        Neighbors ({neighborNodes.length})
      </span>
      <div className="mt-2 space-y-1">
        {neighborNodes.map((n) => {
          const edge = incidentEdges.find(
            (e) => e.source === n.id || e.target === n.id,
          );
          return (
            <button
              key={n.id}
              onClick={() => onSelect(n.id)}
              className="hover:bg-accent text-foreground flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors"
              style={{ borderLeft: `3px solid ${communityColor(n.community)}` }}
            >
              <span className="min-w-0 flex-1 truncate">{n.label}</span>
              {edge && (
                <span className="text-muted-foreground shrink-0 text-[10px]">
                  {edge.relation}
                </span>
              )}
              <span className="text-muted-foreground shrink-0 text-[10px]">
                {confidenceLabel(edge?.confidence ?? "EXTRACTED").charAt(0)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
