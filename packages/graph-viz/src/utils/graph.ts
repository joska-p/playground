import type { GraphEdge } from "../types.js";

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

export function confidenceLabel(
  confidence: GraphEdge["confidence"],
): string {
  return confidence.charAt(0) + confidence.slice(1).toLowerCase();
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
