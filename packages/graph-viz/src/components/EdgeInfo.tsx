import { useGraphStore } from "../store/useGraphStore.js";
import { confidenceLabel } from "../utils/graph.js";

export function EdgeInfo() {
  const selectedEdge = useGraphStore((s) => s.selectedEdge);

  if (!selectedEdge) return null;

  return (
    <div className="space-y-2 text-sm">
      <div>
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          Edge
        </span>
        <p className="mt-0.5 font-medium text-foreground">{selectedEdge.relation}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <span className="text-muted-foreground">From</span>
        <span className="text-foreground truncate">{selectedEdge.source}</span>
        <span className="text-muted-foreground">To</span>
        <span className="text-foreground truncate">{selectedEdge.target}</span>
        <span className="text-muted-foreground">Confidence</span>
        <span className="text-foreground">{confidenceLabel(selectedEdge.confidence)}</span>
        <span className="text-muted-foreground">Score</span>
        <span className="text-foreground">{selectedEdge.confidence_score}</span>
      </div>
    </div>
  );
}
