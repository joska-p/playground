import { nodes as nodeConfig, nodeLabel } from '../../../config';
import {
  computeConnectedNodeIndices,
  computeSearchHighlights,
  findNodePosition
} from '../../../core/utils/searchUtils';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { NodeLabel } from '../../annotation/components/NodeLabel';
import { NodeTypeIndicators } from '../../annotation/components/NodeTypeIndicators';
import { CommunityLinks } from '../../graph/components/CommunityLinks';
import { GraphCommunitySpheres } from '../../graph/components/GraphCommunitySpheres';
import { GraphEdges } from '../../graph/components/GraphEdges';
import { GraphNodes } from '../../graph/components/GraphNodes';
import { HighlightedEdges } from '../../graph/components/HighlightedEdges';
import { useDetailData } from '../hooks/useDetailData';

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
  const entityTypeFilter = useUiStore((s) => s.entityTypeFilter);

  // ── Filtered + normalized subset for the selected community ──
  const detailData = useDetailData(
    selectedCommunityId,
    graphData,
    positions,
    degrees
  );

  // ── Entity type filter: narrow down displayed nodes ──
  const {
    filteredNodes,
    filteredPositions,
    filteredDegrees,
    filteredNodeIndex,
    filteredLinks
  } = (() => {
    if (!detailData || !entityTypeFilter) {
      return {
        filteredNodes: detailData?.nodes ?? [],
        filteredPositions: detailData?.positions ?? new Float32Array(0),
        filteredDegrees: detailData?.degrees ?? new Float32Array(0),
        filteredNodeIndex: detailData?.nodeIndex ?? new Map(),
        filteredLinks: detailData?.links ?? []
      };
    }
    const keep: number[] = [];
    for (let i = 0; i < detailData.nodes.length; i++) {
      if (detailData.nodes[i]!.entity_type === entityTypeFilter) {
        keep.push(i);
      }
    }
    const n = keep.length;
    const pos = new Float32Array(n * 3);
    const deg = new Float32Array(n);
    const nodes: typeof detailData.nodes = [];
    const idx = new Map<string, number>();
    for (let j = 0; j < n; j++) {
      const origI = keep[j]!;
      pos[j * 3] = detailData.positions[origI * 3]!;
      pos[j * 3 + 1] = detailData.positions[origI * 3 + 1]!;
      pos[j * 3 + 2] = detailData.positions[origI * 3 + 2]!;
      deg[j] = detailData.degrees[origI]!;
      nodes.push(detailData.nodes[origI]!);
      idx.set(detailData.nodes[origI]!.id, j);
    }
    // Only keep links where both endpoints are in the filtered set
    const links = detailData.links.filter(
      (l) => idx.has(l.source) && idx.has(l.target)
    );
    return {
      filteredNodes: nodes,
      filteredPositions: pos,
      filteredDegrees: deg,
      filteredNodeIndex: idx,
      filteredLinks: links
    };
  })();

  // ── Search highlight indices within this detail subset ──
  const searchHighlightIndices = (() => {
    if (!searchQuery.trim() || !detailData) return null;
    return computeSearchHighlights(searchQuery, filteredNodes);
  })();

  // ── Hovered node ──
  const hoveredNode =
    hoveredNodeIndex !== null
      ? (filteredNodes[hoveredNodeIndex] ?? null)
      : null;

  const hoveredNodePos = (() => {
    if (hoveredNodeIndex === null || !detailData) return null;
    const i = hoveredNodeIndex;
    const pos = filteredPositions;
    return [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]] as
      | [number, number, number]
      | null;
  })();

  // ── Connected node indices (for selected node highlight) ──
  const connectedNodeIndices = (() => {
    if (!selectedNode || !detailData) return new Set<number>();
    return computeConnectedNodeIndices(
      selectedNode.id,
      filteredNodes,
      detailData.links
    );
  })();

  // ── Selected node position ──
  const selectedNodePos = (() => {
    if (!selectedNode || !detailData) return null;
    return findNodePosition(selectedNode, filteredNodes, filteredPositions);
  })();

  if (!detailData) return null;

  return (
    <>
      <GraphCommunitySpheres ghost />

      <GraphNodes
        positions={filteredPositions}
        nodes={filteredNodes}
        degrees={filteredDegrees}
        size={nodeConfig.defaultSize}
        highlightIndices={searchHighlightIndices ?? connectedNodeIndices}
        onNodeClick={selectNode}
        onPointerMoveNode={setHoveredNodeIndex}
      />

      <NodeTypeIndicators
        positions={filteredPositions}
        nodes={filteredNodes}
        degrees={filteredDegrees}
        size={nodeConfig.defaultSize}
      />

      {showEdges && (
        <GraphEdges
          positions={filteredPositions}
          links={filteredLinks}
          nodeIndex={filteredNodeIndex}
        />
      )}

      {selectedNode && (
        <HighlightedEdges
          positions={filteredPositions}
          links={filteredLinks}
          nodeIndex={filteredNodeIndex}
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
        filteredNodes.map((node, i) => {
          if (
            (hoveredNode && node.id === hoveredNode.id) ||
            (selectedNode && node.id === selectedNode.id)
          ) {
            return null;
          }
          const pos = filteredPositions;
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
