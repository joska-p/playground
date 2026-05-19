import type { GraphEdge, GraphNode, GraphData } from "../types.js";

export function findNodeById(
  nodes: GraphNode[],
  id: string,
): GraphNode | undefined {
  return nodes.find((n) => n.id === id);
}

export function edgesForNode(
  edges: GraphEdge[],
  nodeId: string,
): GraphEdge[] {
  return edges.filter(
    (e) => e.source === nodeId || e.target === nodeId,
  );
}

export function neighborIds(
  edges: GraphEdge[],
  nodeId: string,
): string[] {
  const ids = new Set<string>();
  for (const e of edges) {
    if (e.source === nodeId) ids.add(e.target);
    if (e.target === nodeId) ids.add(e.source);
  }
  return [...ids];
}

export function communityLabels(data: GraphData): Map<number, string> {
  const seen = new Map<number, string[]>();
  for (const n of data.nodes) {
    const c = n.community;
    if (c === undefined) continue;
    if (!seen.has(c)) seen.set(c, []);
    const arr = seen.get(c)!;
    if (arr.length < 3) arr.push(n.label);
  }
  const labels = new Map<number, string>();
  for (const [c, samples] of seen) {
    if (samples.length === 0) continue;
    labels.set(c, `Community ${c}`);
  }
  return labels;
}

export function confidenceLabel(
  confidence: "EXTRACTED" | "INFERRED" | "AMBIGUOUS",
): string {
  switch (confidence) {
    case "EXTRACTED":
      return "Extracted";
    case "INFERRED":
      return "Inferred";
    case "AMBIGUOUS":
      return "Ambiguous";
  }
}

export function fileTypeIcon(file_type: string): string {
  switch (file_type) {
    case "code":
      return "</>";
    case "document":
      return "📄";
    case "paper":
      return "📝";
    case "image":
      return "🖼";
    case "rationale":
      return "💡";
    default:
      return "•";
  }
}
