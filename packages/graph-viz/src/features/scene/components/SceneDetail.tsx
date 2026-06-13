import { nodeLabel, nodes as nodeConfig } from '../../../config';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { useDetailData } from '../hooks/useDetailData';
import {
  computeSearchHighlights,
  computeConnectedNodeIndices,
  findNodePosition,
} from '../../../core/utils/searchUtils';
import { CommunityLinks } from '../../graph/components/CommunityLinks';
import { GraphCommunitySpheres } from '../../graph/components/GraphCommunitySpheres';
import { GraphEdges } from '../../graph/components/GraphEdges';
import { GraphNodes } from '../../graph/components/GraphNodes';
import { HighlightedEdges } from '../../graph/components/HighlightedEdges';
import { NodeLabel } from '../../annotation/components/NodeLabel';
import { NodeTypeIndicators } from '../../annotation/components/NodeTypeIndicators';

type SceneDetailProps = {
  selectedCommunityId: number;
};

/**
 * Detail mode: shows a single community's nodes, edges, labels,
 * file-type indicators, and cross-community links in a compact,
 * normalized coordinate space.
 *
 * All derived data is delegated to the useDetailData hook and
 * pure utility functions — no useMemo wrappers needed (React 19).
 */
function SceneDetail({ selectedCommunityId }: SceneDetailProps) {
  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const degrees = useDataStore((s) => s.degrees);

  const hoveredNodeIndex = useUiStore((s) => s.hoveredNodeIndex);
  const selectedNode = useUiStore((s) => s.selectedNode);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const showEdges = useUiStore((s) => s.showEdges);
  const showNodeLabels = useUiStore((s) => s.showNodeLabels);
  const selectNode = useUiStore((s) => s.selectNode);
  const setHoveredNodeIndex = useUiStore((s) => s.setHoveredNodeIndex);

  // ── Filtered + normalized subset for the selected community ──
  const detailData = useDetailData(
    selectedCommunityId,
    graphData,
    positions,
    degrees,
  );

  // ── Search highlight indices within this detail subset ──
  const searchHighlightIndices = (() => {
    if (!searchQuery.trim() || !detailData) return null;
    return computeSearchHighlights(searchQuery, detailData.nodes);
  })();

  // ── Hovered node ──
  const hoveredNode =
    hoveredNodeIndex !== null
      ? detailData?.nodes[hoveredNodeIndex] ?? null
      : null;

  const hoveredNodePos = (() => {
    if (hoveredNodeIndex === null || !detailData) return null;
    const i = hoveredNodeIndex;
    const pos = detailData.positions;
    return [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]] as
      | [number, number, number]
      | null;
  })();

  // ── Connected node indices (for selected node highlight) ──
  const connectedNodeIndices = (() => {
    if (!selectedNode || !detailData) return new Set<number>();
    return computeConnectedNodeIndices(
      selectedNode.id,
      detailData.nodes,
      detailData.links,
    );
  })();

  // ── Selected node position ──
  const selectedNodePos = (() => {
    if (!selectedNode || !detailData) return null;
    return findNodePosition(selectedNode, detailData.nodes, detailData.positions);
  })();

  if (!detailData) return null;

  return (
    <>
      <GraphCommunitySpheres ghost />

      <GraphNodes
        positions={detailData.positions}
        nodes={detailData.nodes}
        degrees={detailData.degrees}
        size={nodeConfig.defaultSize}
        highlightIndices={searchHighlightIndices ?? connectedNodeIndices}
        onNodeClick={selectNode}
        onPointerMoveNode={setHoveredNodeIndex}
      />

      <NodeTypeIndicators
        positions={detailData.positions}
        nodes={detailData.nodes}
        degrees={detailData.degrees}
        size={nodeConfig.defaultSize}
      />

      {showEdges && (
        <GraphEdges
          positions={detailData.positions}
          links={detailData.links}
          nodeIndex={detailData.nodeIndex}
        />
      )}

      {selectedNode && (
        <HighlightedEdges
          positions={detailData.positions}
          links={detailData.links}
          nodeIndex={detailData.nodeIndex}
          selectedNodeId={selectedNode.id}
        />
      )}

      <CommunityLinks selectedCommunityId={selectedCommunityId} />

      {selectedNode && selectedNodePos && (
        <NodeLabel
          node={selectedNode}
          position={selectedNodePos}
          fontSize={nodeLabel.selectedFontSize}
          color="#ffd166"
        />
      )}

      {hoveredNode && hoveredNodePos && (
        <NodeLabel
          node={hoveredNode}
          position={hoveredNodePos}
          fontSize={nodeLabel.hoveredFontSize}
          color="#ffffff"
        />
      )}

      {showNodeLabels &&
        detailData.nodes.map((node, i) => {
          if (
            (hoveredNode && node.id === hoveredNode.id) ||
            (selectedNode && node.id === selectedNode.id)
          ) {
            return null;
          }
          const pos = detailData.positions;
          return (
            <NodeLabel
              key={`node-label-${node.id}`}
              node={node}
              position={[pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!]}
              fontSize={nodeLabel.defaultFontSize}
            />
          );
        })}
    </>
  );
}

export { SceneDetail };
