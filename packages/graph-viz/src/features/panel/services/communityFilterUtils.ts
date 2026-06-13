import type { CommunityData } from '../../../types';

/**
 * Build a sorted, filtered community list for display.
 * Filters by min size, sorts by node count descending, limits to maxResults.
 */
export function buildCommunityList(
  communities: Map<number, CommunityData>,
  minCommunitySize: number,
  maxResults = 50
): CommunityData[] {
  return [...communities.values()]
    .filter((c) => c.nodeCount >= minCommunitySize)
    .sort((a, b) => b.nodeCount - a.nodeCount)
    .slice(0, maxResults);
}

/**
 * Parse the communityFilter string to determine view mode.
 * Single numeric ID → detail mode. Empty/multi → overview mode.
 */
export function getSelectedCommunityId(communityFilter: string): number | null {
  const trimmed = communityFilter.trim();
  return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
}
