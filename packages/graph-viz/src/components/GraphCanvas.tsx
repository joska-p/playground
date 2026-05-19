import { useEffect, useRef, useImperativeHandle, type Ref } from "react";
import { Network, DataSet } from "vis-network/standalone";
import type {
  DataSetEdges,
  DataSetNodes,
  IdType,
  Node,
  Edge,
  Options,
} from "vis-network";
import type { GraphData, GraphEdge, GraphNode } from "../types.js";
import { communityColor } from "../colors.js";
import { edgesForNode, neighborIds } from "../utils/graph.js";

export type GraphCanvasHandle = {
  focusNode: (nodeId: string) => void;
  focusNeighbors: (nodeId: string) => void;
  resetView: () => void;
};

export type GraphCanvasProps = {
  ref?: Ref<GraphCanvasHandle>;
  data: GraphData;
  onNodeSelect?: (node: GraphNode | null) => void;
  onNodeDoubleClick?: (node: GraphNode) => void;
  onEdgeSelect?: (edge: GraphEdge | null) => void;
  networkOptions?: Record<string, unknown> | undefined;
  theme: "dark" | "light";
};

const VIS_NODE_SHAPE = {
  shape: "dot" as const,
  size: 8,
};

const EDGE_WIDTH_MAP: Record<string, number> = {
  EXTRACTED: 2,
  INFERRED: 1.2,
  AMBIGUOUS: 0.5,
};

export function GraphCanvas({
  ref,
  data,
  onNodeSelect,
  onNodeDoubleClick,
  onEdgeSelect,
  networkOptions,
  theme,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesRef = useRef<DataSetNodes | null>(null);
  const edgesRef = useRef<DataSetEdges | null>(null);

  const isDark = theme === "dark";

  const onNodeSelectRef = useRef(onNodeSelect);
  const onNodeDoubleClickRef = useRef(onNodeDoubleClick);
  const onEdgeSelectRef = useRef(onEdgeSelect);

  useEffect(() => {
    onNodeSelectRef.current = onNodeSelect;
  });
  useEffect(() => {
    onNodeDoubleClickRef.current = onNodeDoubleClick;
  });
  useEffect(() => {
    onEdgeSelectRef.current = onEdgeSelect;
  });

  const nodeColor = (n: GraphNode): string => communityColor(n.community);

  useImperativeHandle(
    ref,
    () => ({
      focusNode(nodeId: string) {
        const network = networkRef.current;
        if (!network) return;
        network.selectNodes([nodeId]);
        network.focus(nodeId, {
          scale: 1.5,
          animation: { duration: 400, easingFunction: "easeInOutQuad" },
        });
      },

      focusNeighbors(nodeId: string) {
        const network = networkRef.current;
        const nodes = nodesRef.current;
        const edges = edgesRef.current;
        if (!network || !nodes || !edges) return;

        const nids = neighborIds(data.links, nodeId);
        const highlight = new Set([nodeId, ...nids]);
        const neighborEdgeIds = new Set(
          edgesForNode(data.links, nodeId).map(
            (e) => `${e.source}→${e.target}`,
          ),
        );

        nodes.forEach((_item: Node, id: IdType) => {
          const nodeIdStr = id as string;
          nodes.update({
            id,
            opacity: highlight.has(nodeIdStr) ? 1.0 : 0.15,
          });
        });

        edges.forEach((_item: Edge, id: IdType) => {
          const edgeId = id as string;
          let edgeColor: string | { color: string; highlight: string; hover: string };
          if (neighborEdgeIds.has(edgeId)) {
            edgeColor = { color: "#818cf8", highlight: "#818cf8", hover: "#818cf8" };
          } else {
            edgeColor = isDark ? "#2a2a4e" : "#ddd";
          }
          edges.update({
            id,
            color: edgeColor,
            width: neighborEdgeIds.has(edgeId) ? 2 : 0.3,
          });
        });

        network.focus(nodeId, {
          scale: 2.0,
          animation: { duration: 400, easingFunction: "easeInOutQuad" },
        });
      },

      resetView() {
        const network = networkRef.current;
        const nodes = nodesRef.current;
        const edges = edgesRef.current;
        if (!network || !nodes || !edges) return;

        nodes.forEach((_item: Node, id: IdType) => {
          nodes.update({ id, opacity: 1.0 });
        });
        edges.forEach((_item: Edge, id: IdType) => {
          edges.update({
            id,
            color: isDark ? "#4a4a6a" : "#999",
            width: 1,
          });
        });
        network.fit({ animation: { duration: 400, easingFunction: "easeInOutQuad" } });
      },
    }),
    [data.links, isDark],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const visNodes: Node[] = data.nodes.map((n) => ({
      ...VIS_NODE_SHAPE,
      id: n.id,
      label: n.label,
      title: n.label,
      color: {
        background: nodeColor(n),
        border: nodeColor(n),
        highlight: {
          background: nodeColor(n),
          border: "#ffffff",
        },
      },
      font: {
        color: isDark ? "#e0e0e0" : "#1a1a2e",
        size: 12,
      },
      borderWidth: 1,
      borderWidthSelected: 2,
      group: String(n.community ?? "_none"),
    }));

    const visEdges: Edge[] = data.links.map((e) => {
      const edgeWidth = EDGE_WIDTH_MAP[e.confidence] ?? 1;

      return {
        id: `${e.source}→${e.target}`,
        from: e.source,
        to: e.target,
        label: e.relation,
        title: `${e.relation} [${e.confidence}] score=${e.confidence_score}`,
        color: {
          color: isDark ? "#4a4a6a" : "#999",
          highlight: "#818cf8",
          hover: "#818cf8",
        },
        font: {
          color: isDark ? "#888" : "#666",
          size: 10,
          strokeWidth: 0,
        },
        width: edgeWidth,
        dashes: e.confidence !== "EXTRACTED",
        smooth: {
          enabled: true,
          type: "continuous",
          forceDirection: "none" as const,
          roundness: 0.5,
        },
      };
    });

    const nodes = new DataSet(visNodes);
    const edges = new DataSet(visEdges);
    nodesRef.current = nodes;
    edgesRef.current = edges;

    const options: Options = {
      nodes: {
        shape: "dot",
        size: 8,
        font: { size: 12 },
        borderWidth: 1,
      },
      edges: {
        smooth: {
          enabled: true,
          type: "continuous",
          forceDirection: "none",
          roundness: 0.5,
        },
        font: { size: 10, strokeWidth: 0 },
      },
      physics: {
        solver: "forceAtlas2Based",
        forceAtlas2Based: {
          gravitationalConstant: -40,
          centralGravity: 0.005,
          springLength: 160,
          springConstant: 0.02,
          damping: 0.4,
        },
        stabilization: { iterations: 300 },
        maxVelocity: 30,
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectable: true,
        multiselect: false,
        navigationButtons: false,
        keyboard: false,
        tooltipDelay: 200,
      },
      ...(networkOptions as Omit<Options, "nodes" | "edges">),
    };

    const network = new Network(container, { nodes, edges }, options);
    networkRef.current = network;

    network.on("click", (raw) => {
      const params = raw as { nodes?: string[]; edges?: string[] };
      const selectedNodes = params.nodes;
      const selectedEdges = params.edges;

      if (selectedNodes && selectedNodes.length > 0) {
        const nodeId = selectedNodes[0];
        const node = data.nodes.find((n) => n.id === nodeId);
        if (node) onNodeSelectRef.current?.(node);
      } else if (selectedEdges && selectedEdges.length > 0) {
        const edgeId = selectedEdges[0];
        const edge = data.links.find(
          (e) => `${e.source}→${e.target}` === edgeId,
        );
        if (edge) onEdgeSelectRef.current?.(edge);
      } else {
        onNodeSelectRef.current?.(null);
        onEdgeSelectRef.current?.(null);
      }
    });

    network.on("doubleClick", (raw) => {
      const params = raw as { nodes?: string[] };
      const selected = params.nodes;
      if (selected && selected.length > 0) {
        const nodeId = selected[0];
        const node = data.nodes.find((n) => n.id === nodeId);
        if (node) onNodeDoubleClickRef.current?.(node);
      }
    });

    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, [data, networkOptions, isDark]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ background: isDark ? "#0f0f1a" : "#f8f8fa" }}
    />
  );
}
