import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import {
  buildCommunityList,
  getSelectedCommunityId
} from '../services/communityFilterUtils';

/**
 * Derive the community list, selected community, and view mode from stores.
 * Handles filtering, sorting, and index clamping for keyboard navigation.
 */
export function useCommunityList() {
  const communities = useDataStore((s) => s.communities);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const communityFilter = useUiStore((s) => s.communityFilter);

  const selectedCommunityId = getSelectedCommunityId(communityFilter);

  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  const communityList = buildCommunityList(communities, minCommunitySize);

  const selectedCommunity =
    selectedCommunityId !== null ? communities.get(selectedCommunityId) : null;

  const maxIndex = communityList.length - 1;

  return {
    communityList,
    selectedCommunity,
    selectedCommunityId,
    viewMode,
    maxIndex
  };
}
