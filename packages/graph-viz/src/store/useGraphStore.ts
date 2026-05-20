import { create } from "zustand";
import type { GraphNode, GraphEdge } from "../types.js";

type GraphState = {
  selectedNode: GraphNode | null;
  selectedEdge: GraphEdge | null;
};

const useGraphStore = create<GraphState>()(() => ({
  selectedNode: null,
  selectedEdge: null,
}));

function selectNode(node: GraphNode | null) {
  useGraphStore.setState({ selectedNode: node, selectedEdge: null });
}

function selectEdge(edge: GraphEdge | null) {
  useGraphStore.setState({ selectedEdge: edge });
}

function clearSelection() {
  useGraphStore.setState({ selectedNode: null, selectedEdge: null });
}

export { useGraphStore, selectNode, selectEdge, clearSelection };
