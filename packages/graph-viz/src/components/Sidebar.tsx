import { useState, useMemo, type ReactNode } from "react";
import type { GraphData, GraphEdge, GraphNode } from "../types.js";
import {
  edgesForNode,
  neighborIds,
  fileTypeIcon,
  confidenceLabel,
} from "../utils/graph.js";
import { communityColor } from "../colors.js";
import { useGraphStore } from "../store/useGraphStore.js";

export type SidebarProps = {
  data: GraphData;
  onNodeClick: (nodeId: string) => void;
  onResetView: () => void;
  theme: "dark" | "light";
};

function NodeInfo({ node, edges, isDark }: {
  node: GraphNode;
  edges: GraphEdge[];
  isDark: boolean;
}) {
  const muted = isDark ? "#888" : "#6b7280";
  return (
    <div className="space-y-2 text-sm">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: muted }}>
          Node
        </span>
        <p className="mt-0.5 font-medium">{node.label}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <span style={{ color: muted }}>Type</span>
        <span>{fileTypeIcon(node.file_type)} {node.file_type}</span>
        <span style={{ color: muted }}>Source</span>
        <span className="truncate" title={node.source_file}>{node.source_file}</span>
        <span style={{ color: muted }}>Community</span>
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ background: communityColor(node.community) }}
          />
          {node.community ?? "none"}
        </span>
        <span style={{ color: muted }}>Connections</span>
        <span>{edges.length} edges</span>
      </div>
      {node.source_url && (
        <div className="pt-1 text-xs">
          <a href={node.source_url} target="_blank" rel="noopener noreferrer"
            style={{ color: "#818cf8" }} className="underline-offset-2 hover:underline"
          >
            source url
          </a>
        </div>
      )}
    </div>
  );
}

function EdgeInfo({ edge, isDark }: { edge: GraphEdge; isDark: boolean }) {
  const muted = isDark ? "#888" : "#6b7280";
  return (
    <div className="space-y-2 text-sm">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: muted }}>
          Edge
        </span>
        <p className="mt-0.5 font-medium">{edge.relation}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <span style={{ color: muted }}>From</span>
        <span className="truncate">{edge.source}</span>
        <span style={{ color: muted }}>To</span>
        <span className="truncate">{edge.target}</span>
        <span style={{ color: muted }}>Confidence</span>
        <span>{confidenceLabel(edge.confidence)}</span>
        <span style={{ color: muted }}>Score</span>
        <span>{edge.confidence_score}</span>
      </div>
    </div>
  );
}

function EmptyInfo({ isDark, onResetView }: { isDark: boolean; onResetView: () => void }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: isDark ? "#555" : "#9ca3af" }}
      >
        Knowledge Graph
      </span>
      <p className="mt-0.5 text-xs italic" style={{ color: isDark ? "#555" : "#9ca3af" }}>
        Click a node or edge to inspect
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={onResetView}
          className="rounded px-2 py-1 text-xs transition-colors"
          style={{ background: isDark ? "#2a2a4e" : "#f3f4f6", color: isDark ? "#ccc" : "#374151" }}
        >
          Reset view
        </button>
      </div>
    </div>
  );
}

function SearchResults({ results, isDark, onSelect }: {
  results: GraphNode[];
  isDark: boolean;
  onSelect: (id: string) => void;
}) {
  if (results.length === 0) return null;
  return (
    <div className="mt-1 max-h-32 overflow-y-auto rounded-md"
      style={{ background: isDark ? "#0f0f1a" : "#f3f4f6", border: `1px solid ${isDark ? "#3a3a5e" : "#d1d5db"}` }}
    >
      {results.map((n) => (
        <button key={n.id}
          onClick={() => onSelect(n.id)}
          className="w-full cursor-pointer px-3 py-1 text-left text-xs"
          style={{ color: isDark ? "#ccc" : "#374151" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? "#2a2a4e" : "#e5e7eb"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ background: communityColor(n.community) }}
          />
          {n.label}
        </button>
      ))}
    </div>
  );
}

export function Sidebar({
  data,
  onNodeClick,
  onResetView,
  theme,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedNode = useGraphStore((s) => s.selectedNode);
  const selectedEdge = useGraphStore((s) => s.selectedEdge);

  const isDark = theme === "dark";
  const borderColor = isDark ? "#2a2a4e" : "#e5e7eb";

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return data.nodes
      .filter((n) => n.label.toLowerCase().includes(q))
      .slice(0, 20);
  }, [searchQuery, data.nodes]);

  const selectedEdges = useMemo(
    () => (selectedNode ? edgesForNode(data.links, selectedNode.id) : []),
    [selectedNode, data.links],
  );

  const selectedNeighborIds = useMemo(
    () => (selectedNode ? neighborIds(data.links, selectedNode.id) : []),
    [selectedNode, data.links],
  );

  const neighborNodes = useMemo(
    () =>
      selectedNeighborIds
        .map((id) => data.nodes.find((n) => n.id === id))
        .filter((n): n is GraphNode => n !== undefined),
    [selectedNeighborIds, data.nodes],
  );

  let infoPanel: ReactNode;
  if (selectedNode) {
    infoPanel = <NodeInfo node={selectedNode} edges={selectedEdges} isDark={isDark} />;
  } else if (selectedEdge) {
    infoPanel = <EdgeInfo edge={selectedEdge} isDark={isDark} />;
  } else {
    infoPanel = <EmptyInfo isDark={isDark} onResetView={onResetView} />;
  }

  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{
        background: isDark ? "#1a1a2e" : "#ffffff",
        color: isDark ? "#e0e0e0" : "#1a1a2e",
        borderLeft: `1px solid ${borderColor}`,
      }}
    >
      {/* Search */}
      <div className="border-b px-3 py-3" style={{ borderColor }}>
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md px-3 py-1.5 text-sm outline-none"
          style={{
            background: isDark ? "#0f0f1a" : "#f3f4f6",
            color: isDark ? "#e0e0e0" : "#1a1a2e",
            border: `1px solid ${isDark ? "#3a3a5e" : "#d1d5db"}`,
          }}
        />
        <SearchResults results={searchResults} isDark={isDark} onSelect={(id) => { onNodeClick(id); setSearchQuery(""); }} />
      </div>

      {/* Info Panel */}
      <div className="border-b px-3 py-3" style={{ borderColor }}>
        {infoPanel}
      </div>

      {/* Neighbors */}
      {neighborNodes.length > 0 && (
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: isDark ? "#888" : "#6b7280" }}
          >
            Neighbors ({neighborNodes.length})
          </span>
          <div className="mt-2 space-y-1">
            {neighborNodes.map((n) => {
              const edge = selectedEdges.find(
                (e) => e.source === n.id || e.target === n.id,
              );
              return (
                <button key={n.id}
                  onClick={() => onNodeClick(n.id)}
                  className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors"
                  style={{ borderLeft: `3px solid ${communityColor(n.community)}`, color: isDark ? "#ccc" : "#374151" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? "#2a2a4e" : "#f3f4f6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span className="min-w-0 flex-1 truncate">{n.label}</span>
                  {edge && (
                    <span className="shrink-0 text-[10px]" style={{ color: isDark ? "#666" : "#9ca3af" }}>
                      {edge.relation}
                    </span>
                  )}
                  <span className="shrink-0 text-[10px]" style={{ color: isDark ? "#555" : "#9ca3af" }}>
                    {confidenceLabel(edge?.confidence ?? "EXTRACTED").charAt(0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
