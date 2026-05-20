"use client";

import { useCallback, useRef } from "react";
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
  /** Graph data object as produced by graphify */
  data: GraphData;
  /** Container height (default: "100vh") */
  height?: string;
  /** Show the info/legend sidebar (default: true) */
  showSidebar?: boolean;
  /** Show the community legend in the sidebar (default: true) */
  showLegend?: boolean;
  /** Callback when a node is clicked */
  onNodeClick?: (node: GraphNode) => void;
  /** Callback when a node is double-clicked */
  onNodeDoubleClick?: (node: GraphNode) => void;
  /** vis-network options overrides (merged with defaults) */
  networkOptions?: Record<string, unknown>;
};

export function GraphViewer({
  data,
  height = "100vh",
  showSidebar = true,
  showLegend = true,
  onNodeClick,
  onNodeDoubleClick,
  networkOptions,
}: GraphViewerProps) {
  const canvasRef = useRef<GraphCanvasHandle>(null);

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
    const member = data.nodes.find((n) => n.community === communityId);
    if (member) canvasRef.current?.focusNode(member.id);
  }, [data.nodes]);

  const infoPanel = (
    <>
      <Search nodes={data.nodes} onSelect={handleSearchSelect} />
      <div className="border-border border-b px-3 py-3">
        {selectedNode && <NodeInfo links={data.links} />}
        {!selectedNode && selectedEdge && <EdgeInfo />}
        {!selectedNode && !selectedEdge && <EmptyInfo onResetView={handleResetView} />}
      </div>
      <NeighborList
        nodes={data.nodes}
        links={data.links}
        onSelect={handleSearchSelect}
      />
      {showLegend && (
        <div className="border-border border-t">
          <Legend
            nodes={data.nodes}
            onCommunityClick={handleCommunityClick}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="bg-background h-full w-full overflow-hidden" style={{ height }}>
      {showSidebar ? (
        <Sidebar desktopPosition="right" variant="normal">
          <Sidebar.Main>
            <GraphCanvas
              ref={canvasRef}
              data={data}
              onNodeSelect={handleNodeSelect}
              onNodeDoubleClick={handleNodeDoubleClick}
              onEdgeSelect={handleEdgeSelect}
              networkOptions={networkOptions}
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
          data={data}
          onNodeSelect={handleNodeSelect}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeSelect={handleEdgeSelect}
          networkOptions={networkOptions}
        />
      )}
    </div>
  );
}
