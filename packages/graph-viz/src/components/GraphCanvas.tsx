import { useEffect, useRef, useImperativeHandle } from "react";
import type { Ref } from "react";
import { Network, DataSet } from "vis-network/standalone";
import type { Node, Edge, Options } from "vis-network";
import type { GraphData, GraphEdge, GraphNode } from "../types.js";
import { communityColor } from "../colors.js";

export type GraphCanvasHandle = {
  focusNode: (nodeId: string) => void;
  resetView: () => void;
};

export type GraphCanvasProps = {
  ref?: Ref<GraphCanvasHandle>;
  data: GraphData;
  onNodeSelect?: (node: GraphNode | null) => void;
  onNodeDoubleClick?: (node: GraphNode) => void;
  onEdgeSelect?: (edge: GraphEdge | null) => void;
  networkOptions?: Record<string, unknown> | undefined;
};

const EDGE_WIDTH_MAP: Record<GraphEdge["confidence"], number> = {
  EXTRACTED: 2,
  INFERRED: 1.2,
  AMBIGUOUS: 0.5,
};

function readCSSVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function GraphCanvas({
  ref,
  data,
  onNodeSelect,
  onNodeDoubleClick,
  onEdgeSelect,
  networkOptions,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

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

  useImperativeHandle(ref, () => ({
    focusNode(nodeId: string) {
      const network = networkRef.current;
      if (!network) return;
      network.selectNodes([nodeId]);
      network.focus(nodeId, {
        scale: 1.5,
        animation: { duration: 400, easingFunction: "easeInOutQuad" },
      });
    },
    resetView() {
      networkRef.current?.fit({
        animation: { duration: 400, easingFunction: "easeInOutQuad" },
      });
    },
  }), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const foreground = readCSSVar("--foreground") || "#e0e0e0";
    const borderColor = readCSSVar("--border") || "#4a4a6a";
    const mutedFg = readCSSVar("--muted-foreground") || "#888";

    const visNodes: Node[] = data.nodes.map((n) => ({
      id: n.id,
      label: n.label,
      title: n.label,
      color: {
        background: communityColor(n.community),
        border: communityColor(n.community),
        highlight: {
          background: communityColor(n.community),
          border: "#ffffff",
        },
      },
      font: {
        color: foreground,
        size: 12,
      },
      borderWidth: 1,
      borderWidthSelected: 2,
      group: String(n.community ?? "_none"),
    }));

    const visEdges: Edge[] = data.links.map((e) => ({
      id: `${e.source}→${e.target}→${e.relation}`,
      from: e.source,
      to: e.target,
      label: e.relation,
      title: `${e.relation} [${e.confidence}] score=${e.confidence_score}`,
      color: {
        color: borderColor,
        highlight: "#818cf8",
        hover: "#818cf8",
      },
      font: {
        color: mutedFg,
        size: 10,
        strokeWidth: 0,
      },
      width: EDGE_WIDTH_MAP[e.confidence],
      dashes: e.confidence !== "EXTRACTED",
      smooth: {
        enabled: true,
        type: "continuous",
        forceDirection: "none" as const,
        roundness: 0.5,
      },
    }));

    const nodes = new DataSet(visNodes);
    const edges = new DataSet(visEdges);

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
      if (params.nodes && params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = data.nodes.find((n) => n.id === nodeId);
        if (node) onNodeSelectRef.current?.(node);
      } else if (params.edges && params.edges.length > 0) {
        const edgeId = params.edges[0];
        const edge = data.links.find(
          (e) => `${e.source}→${e.target}→${e.relation}` === edgeId,
        );
        if (edge) onEdgeSelectRef.current?.(edge);
      } else {
        onNodeSelectRef.current?.(null);
        onEdgeSelectRef.current?.(null);
      }
    });

    network.on("doubleClick", (raw) => {
      const params = raw as { nodes?: string[] };
      if (params.nodes && params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = data.nodes.find((n) => n.id === nodeId);
        if (node) onNodeDoubleClickRef.current?.(node);
      }
    });

    network.once("stabilizationIterationsDone", () => {
      network.fit({ animation: false });
    });

    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, [data, networkOptions]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-background"
    />
  );
}
