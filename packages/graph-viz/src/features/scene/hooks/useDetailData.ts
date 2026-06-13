import { detailView } from '../../../config';
import type { GraphData } from '../../../types';
import {
  filterByCommunity,
  normalizeCommunityPositions,
} from '../../../utils/communities';
import type { FilteredSubset } from '../../../utils/communities';

/**
 * Compute the filtered + normalized data subset for a single community's detail view.
 */
export function useDetailData(
  selectedCommunityId: number,
  graphData: GraphData | null,
  positions: Float32Array | null,
  degrees: Float32Array | null
): FilteredSubset | null {
  if (!graphData || !positions) return null;
  const filtered = filterByCommunity(
    selectedCommunityId,
    positions,
    graphData.nodes,
    graphData.links,
    degrees ?? undefined
  );
  if (!filtered) return null;
  return {
    ...filtered,
    positions: normalizeCommunityPositions(
      filtered.positions,
      detailView.maxSpread
    ),
  };
}
