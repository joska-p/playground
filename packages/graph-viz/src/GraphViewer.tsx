"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { GraphData, GraphEdge, GraphNode } from "./types.js";
import { Sidebar } from "@repo/ui";
import { GraphCanvas, type GraphCanvasHandle } from "./components/GraphCanvas.js";
import { Search } from "./components/Search.js";
import { NodeInfo } from "./components/NodeInfo.js";
import { EdgeInfo } from "./components/EdgeInfo.js";
import { EmptyInfo } from "./components/EmptyInfo.js";
import { NeighborList } from "./components/NeighborList.js";
import { Legend } from "./components/Legend.js";
import { useGraphStore, selectNode, selectEdge, clearSelection } from "./store/useGraphStore.js";

export type GraphViewerProps = {
  /** Graph data object as produced by graphify (pass at build time) */
  data?: GraphData;
  /** Alternative: fetch graph JSON from this URL at runtime */
  url?: string;
  /** Container height (default: "100vh") */
  height?: string;
  /** Show the info/legend sidebar (default: true) */
  showSidebar?: boolean;
  /** Show the community legend in the sidebar (default: true) */
  showLegend?: boolean;
  /** Callback when a node is clicked */
  onNodeClick?: (node: GraphNode) => void;
  /** Callback when a node is double-clicked (drills into neighbors) */
  onNodeDoubleClick?: (node: GraphNode) => void;
  /** Force dark or light theme. Auto-detects from document if unset. */
  theme?: "dark" | "light";
  /** vis-network options overrides (merged with defaults) */
  networkOptions?: Record<string, unknown>;
};

function detectTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  const html = document.documentElement;
  const cls = html.className;
  if (cls.includes("dark")) return "dark";
  if (cls.includes("light")) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function GraphViewer({
  data: propData,
  url,
  height = "100vh",
  showSidebar = true,
  showLegend = true,
  onNodeClick,
  onNodeDoubleClick,
  theme: forcedTheme,
  networkOptions,
}: GraphViewerProps) {
  const theme = forcedTheme ?? detectTheme();
  const isDark = theme === "dark";

  const [loadedData, setLoadedData] = useState<GraphData | null>(propData ?? null);
  const [loading, setLoading] = useState(!!url && !propData);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<GraphCanvasHandle>(null);

  useEffect(() => {
    if (!url || propData) return;

    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load graph: ${res.status}`);
        return res.json() as Promise<GraphData>;
      })
      .then((graphData) => {
        if (!cancelled) {
          setLoadedData(graphData);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [propData, url]);

  const handleNodeSelect = useCallback(
    (node: GraphNode | null) => {
      selectNode(node);
      if (node) onNodeClick?.(node);
    },
    [onNodeClick],
  );

  const handleEdgeSelect = useCallback(
    (edge: GraphEdge | null) => {
      selectEdge(edge);
    },
    [],
  );

  const handleNodeDoubleClick = useCallback(
    (node: GraphNode) => {
      onNodeDoubleClick?.(node);
      canvasRef.current?.focusNode(node.id);
    },
    [onNodeDoubleClick],
  );

  const handleSearchSelect = useCallback((nodeId: string) => {
    canvasRef.current?.focusNode(nodeId);
  }, []);

  const handleResetView = useCallback(() => {
    clearSelection();
    canvasRef.current?.resetView();
  }, []);

  const selectedNode = useGraphStore((s) => s.selectedNode);
  const selectedEdge = useGraphStore((s) => s.selectedEdge);

  const handleCommunityClick = useCallback((communityId: number) => {
    const data = loadedData;
    if (!data) return;
    const member = data.nodes.find((n) => n.community === communityId);
    if (member) canvasRef.current?.focusNode(member.id);
  }, [loadedData]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height,
          background: isDark ? "#0f0f1a" : "#f8f8fa",
          color: isDark ? "#888" : "#6b7280",
        }}
      >
        <div className="text-center">
          <div
            className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
            style={{
              borderColor: isDark ? "#4a4a6a" : "#d1d5db",
              borderTopColor: "#818cf8",
            }}
          />
          <span className="text-sm">Loading graph...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height,
          background: isDark ? "#0f0f1a" : "#f8f8fa",
          color: "#ef4444",
        }}
      >
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!loadedData) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height,
          background: isDark ? "#0f0f1a" : "#f8f8fa",
          color: isDark ? "#888" : "#6b7280",
        }}
      >
        <p className="text-sm">
          Provide graph data via the <code>data</code> or <code>url</code> prop.
        </p>
      </div>
    );
  }

  const infoPanel = (
    <>
      <Search nodes={loadedData.nodes} onSelect={handleSearchSelect} />
      <div className="border-border border-b px-3 py-3">
        {selectedNode && <NodeInfo links={loadedData.links} />}
        {!selectedNode && selectedEdge && <EdgeInfo />}
        {!selectedNode && !selectedEdge && <EmptyInfo onResetView={handleResetView} />}
      </div>
      <NeighborList
        nodes={loadedData.nodes}
        links={loadedData.links}
        onSelect={handleSearchSelect}
      />
      {showLegend && (
        <div className="border-border border-t">
          <Legend
            nodes={loadedData.nodes}
            onCommunityClick={handleCommunityClick}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="h-full w-full overflow-hidden" style={{ height }}>
      {showSidebar ? (
        <Sidebar desktopPosition="right" variant="normal">
          <Sidebar.Main>
            <GraphCanvas
              ref={canvasRef}
              data={loadedData}
              onNodeSelect={handleNodeSelect}
              onNodeDoubleClick={handleNodeDoubleClick}
              onEdgeSelect={handleEdgeSelect}
              networkOptions={networkOptions}
              theme={theme}
            />
          </Sidebar.Main>
          <Sidebar.Toggle />
          <Sidebar.Panel>
            {infoPanel}
          </Sidebar.Panel>
        </Sidebar>
      ) : (
        <GraphCanvas
          ref={canvasRef}
          data={loadedData}
          onNodeSelect={handleNodeSelect}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeSelect={handleEdgeSelect}
          networkOptions={networkOptions}
          theme={theme}
        />
      )}
    </div>
  );
}
