import type { CommunityData, GraphData, InterCommunityEdge } from '../../../types';
import { computeGraphInsights } from '../services/insightsCalculator';
import type { GraphInsights } from '../services/insightsCalculator';

/**
 * Hook that computes codebase health insights from graph data.
 */
export function useCommunityInsights(
  graphData: GraphData | null,
  degrees: Float32Array | null,
  nodeIndex: Map<string, number>,
  communities: Map<number, CommunityData>,
  interCommunityEdges: Map<string, InterCommunityEdge>
): GraphInsights | null {
  if (!graphData || !degrees) return null;
  return computeGraphInsights(
    graphData,
    degrees,
    nodeIndex,
    communities,
    interCommunityEdges
  );
}
