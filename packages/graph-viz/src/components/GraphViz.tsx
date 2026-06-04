import { useRef } from 'react';
import type { CSSProperties } from 'react';
import graphData from '../data/graph.json';
import type {
  GraphData,
  GraphHyperedge,
  GraphLink,
  GraphNode,
  GraphVizProps,
} from '../core/graph.types';
import { useForceSimulation } from '../hooks/useForceSimulation';
import { useGraphData } from '../hooks/useGraphData';
import { useHighlight } from '../hooks/useHighlight';
import { usePointerInteraction } from '../hooks/usePointerInteraction';
import { useThreeScene } from '../hooks/useThreeScene';
import { Legend } from './Legend';
import { NodePanel } from './NodePanel';
import { ProgressBar } from './ProgressBar';
import { StatsBar } from './StatsBar';

// ── Component ───────────────────────────────────────────────────────────────

function GraphViz({
  data = graphData as GraphData,
  width,
  height,
  maxNodes = 4000,
  onNodeSelect,
}: GraphVizProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Core data derivation
  const { nodes, links, hyperedges } = useGraphData(data, maxNodes);

  // Three.js scene lifecycle + render loop
  const { threeRef, sphericalRef, draggingRef } = useThreeScene(
    mountRef,
    nodes,
    links,
    width,
    height
  );

  // Force-directed layout simulation (web worker)
  const { simProgress, simDone } = useForceSimulation(threeRef, nodes, links);

  // Pointer events: orbit, raycast, selection
  const { selectedNode, hoveredNode, setSelectedNode } = usePointerInteraction(
    threeRef,
    sphericalRef,
    draggingRef,
    nodes,
    onNodeSelect
  );

  // Highlight selected / hovered nodes
  useHighlight(threeRef, selectedNode, hoveredNode);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Canvas target — must have explicit size from parent */}
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Progress bar */}
      {!simDone && <ProgressBar progress={simProgress} />}

      {/* Stats */}
      <StatsBar
        nodeCount={nodes.length}
        edgeCount={links.length}
        hyperedgeCount={hyperedges.length}
      />

      {/* Node detail panel */}
      {selectedNode && (
        <NodePanel
          node={selectedNode}
          links={links}
          nodes={nodes}
          onClose={() => {
            setSelectedNode(null);
            onNodeSelect?.(null);
          }}
        />
      )}

      {/* Hover tooltip */}
      {hoveredNode && !selectedNode && (
        <div style={tooltipStyle}>{hoveredNode.label}</div>
      )}

      <Legend />
      <div style={controlsStyle}>
        Drag to rotate · Scroll to zoom · Click node for details
      </div>
    </div>
  );
}

// ── Inline styles for tiny overlay elements ─────────────────────────────────

const tooltipStyle: CSSProperties = {
  position: 'absolute',
  bottom: 100,
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(8,12,20,0.9)',
  border: '1px solid rgba(76,201,240,0.2)',
  borderRadius: 6,
  padding: '5px 12px',
  color: '#c0d8f0',
  fontSize: 12,
  fontFamily: 'monospace',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
};

const controlsStyle: CSSProperties = {
  position: 'absolute',
  bottom: 16,
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'rgba(100,140,180,0.6)',
  fontSize: 11,
  fontFamily: 'monospace',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
};

// Re-export public types so the package entry point stays unchanged
export { GraphViz };
export type { GraphData, GraphHyperedge, GraphLink, GraphNode, GraphVizProps };
