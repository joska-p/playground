import { useMemo } from "react";
import type { GraphEdge } from "../types.js";
import { useGraphStore } from "../store/useGraphStore.js";
import { edgesForNode, fileTypeIcon } from "../utils/graph.js";
import { communityColor } from "../colors.js";

type NodeInfoProps = {
  links: GraphEdge[];
};

export function NodeInfo({ links }: NodeInfoProps) {
  const selectedNode = useGraphStore((s) => s.selectedNode);

  const incidentEdges = useMemo(
    () => (selectedNode ? edgesForNode(links, selectedNode.id) : []),
    [selectedNode, links],
  );

  if (!selectedNode) return null;

  return (
    <div className="space-y-2 text-sm">
      <div>
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          Node
        </span>
        <p className="mt-0.5 font-medium text-foreground">{selectedNode.label}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <span className="text-muted-foreground">Type</span>
        <span className="text-foreground">{fileTypeIcon(selectedNode.file_type)} {selectedNode.file_type}</span>
        <span className="text-muted-foreground">Source</span>
        <span className="text-foreground truncate" title={selectedNode.source_file}>{selectedNode.source_file}</span>
        <span className="text-muted-foreground">Community</span>
        <span className="text-foreground">
          <span
            className="mr-1 inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ background: communityColor(selectedNode.community) }}
          />
          {selectedNode.community ?? "none"}
        </span>
        <span className="text-muted-foreground">Connections</span>
        <span className="text-foreground">{incidentEdges.length} edges</span>
      </div>
      {selectedNode.source_url && (
        <div className="pt-1 text-xs">
          <a
            href={selectedNode.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            source url
          </a>
        </div>
      )}
    </div>
  );
}
