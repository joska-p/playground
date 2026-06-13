import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { CameraController } from './CameraController';
import { SceneDetail } from './SceneDetail';
import { SceneLighting } from './SceneLighting';
import { SceneOverview } from './SceneOverview';

/**
 * Scene orchestrator: reads view mode from the store, then delegates
 * rendering to focused sub-components.
 *
 * - `overview` mode: community spheres, inter-community edges, hyperedge hulls, smart labels
 * - `detail` mode: single community nodes/edges, file-type indicators, labels, cross-community links
 */
function Scene() {
  const positions = useDataStore((s) => s.positions);
  const graphData = useDataStore((s) => s.graphData);
  const communityFilter = useUiStore((s) => s.communityFilter);

  if (!positions || !graphData) return null;

  const selectedCommunityId = (() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  })();
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  return (
    <>
      <SceneLighting />
      <CameraController selectedCommunityId={selectedCommunityId} />

      {viewMode === 'overview' && <SceneOverview />}
      {viewMode === 'detail' && (
        <SceneDetail selectedCommunityId={selectedCommunityId!} />
      )}
    </>
  );
}

export { Scene };
