import { useMemo } from 'react';
import { detailView, nodeLabel, nodes as nodeConfig } from '../../config';
import { useDataStore } from '../../stores/dataStore';
import { useUiStore } from '../../stores/uiStore';
import {
  filterByCommunity,
  normalizeCommunityPositions
} from '../../utils/communities';
import { CommunityLinks } from '../graph/CommunityLinks';
import { GraphCommunitySpheres } from '../graph/GraphCommunitySpheres';
import { GraphEdges } from '../graph/GraphEdges';
import { GraphNodes } from '../graph/GraphNodes';
import { HighlightedEdges } from '../graph/HighlightedEdges';
import { NodeLabel } from '../annotation/NodeLabel';
import { NodeTypeIndicators } from '../annotation/NodeTypeIndicators';

type SceneDetailProps = {
  selectedCommunityId: number;
};

/**
 * Detail mode: shows a single community's nodes, edges, labels,
 * file-type indicators, and cross-community links in a compact,
 * normalized coordinate space.
 *
 * All derived data (filtered subset, search highlights, connected
 * node sets) is memoized on the selected community ID.
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
  const detailData = useMemo(() => {
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
      )
    };
  }, [selectedCommunityId, graphData, positions, degrees]);

  // ── Search highlight indices within this detail subset ──
  const searchHighlightIndices = useMemo(() => {
    if (!searchQuery.trim() || !detailData) return null;
    const q = searchQuery.toLowerCase();
    const indices = new Set<number>();
    for (let i = 0; i < detailData.nodes.length; i++) {
      const node = detailData.nodes[i]!;
      if (
        node.label.toLowerCase().includes(q) ||
        node.id.toLowerCase().includes(q)
      ) {
        indices.add(i);
      }
    }
    return indices.size > 0 ? indices : null;
  }, [searchQuery, detailData]);

  // ── Hovered node ──
  const hoveredNode = useMemo(() => {
    if (hoveredNodeIndex === null || !detailData) return null;
    return detailData.nodes[hoveredNodeIndex] ?? null;
  }, [hoveredNodeIndex, detailData]);

  const hoveredNodePos = useMemo((): [number, number, number] | null => {
    if (hoveredNodeIndex === null || !detailData) return null;
    const i = hoveredNodeIndex;
    const pos = detailData.positions;
    return [pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!];
  }, [hoveredNodeIndex, detailData]);

  // ── Connected node indices (for selected node highlight) ──
  const connectedNodeIndices = useMemo(() => {
    if (!selectedNode || !detailData) return new Set<number>();
    const ids = new Set<string>();
    ids.add(selectedNode.id);
    for (const link of detailData.links) {
      if (link.source === selectedNode.id) ids.add(link.target);
      if (link.target === selectedNode.id) ids.add(link.source);
    }
    const indices = new Set<number>();
    for (let i = 0; i < detailData.nodes.length; i++) {
      if (ids.has(detailData.nodes[i]!.id)) {
        indices.add(i);
      }
    }
    return indices;
  }, [selectedNode, detailData]);

  // ── Selected node position ──
  const selectedNodePos = useMemo((): [number, number, number] | null => {
    if (!selectedNode || !detailData) return null;
    const idx = detailData.nodes.indexOf(selectedNode);
    if (idx === -1) return null;
    return [
      detailData.positions[idx * 3],
      detailData.positions[idx * 3 + 1],
      detailData.positions[idx * 3 + 2]
    ];
  }, [selectedNode, detailData]);

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
