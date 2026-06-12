// graph/GraphVisualization.tsx
// Root component: R3F Canvas + UI overlays.
// Owns selection/hover state and wires everything together.

import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import graphify from '../data/graph.json';
import { EdgeLines } from './EdgeLines';
import { Dot, Legend } from './Legend';
import { NodeMesh } from './NodeMesh';
import { NodePanel } from './NodePanel';
import { SceneSetup } from './SceneSetup';
import { styles } from './styles';
import type {
  GraphData,
  GraphLink,
  GraphNode,
  GraphVisualizationProps
} from './types';
import { useSimulation } from './useSimulation';

// ─── Inner scene (has access to R3F context) ──────────────────────────────────

type SceneProps = {
  nodes: GraphNode[];
  links: GraphLink[];
  posRef: React.RefObject<Float32Array | null>;
  selectedId: string | null;
  hoveredId: string | null;
  onMeshReady: (mesh: THREE.InstancedMesh) => void;
  onCameraReady: (camera: THREE.Camera) => void; // Changed from ref to a callback function
};

const Scene = ({
  nodes,
  links,
  posRef,
  selectedId,
  hoveredId,
  onMeshReady,
  onCameraReady
}: SceneProps) => {
  const { camera } = useThree();

  // Safely pass the camera up via the callback function
  useEffect(() => {
    if (onCameraReady) {
      onCameraReady(camera);
    }
  }, [camera, onCameraReady]);

  const idToIdx = useMemo(
    () => new Map<string, number>(nodes.map((n, i) => [n.id, i])),
    [nodes]
  );

  return (
    <>
      <SceneSetup />
      <OrbitControls
        makeDefault
        dampingFactor={0.1}
      />
      <GizmoHelper
        alignment="bottom-right"
        margin={[80, 80]}
      >
        <GizmoViewport
          axisColors={['#f72585', '#06d6a0', '#4cc9f0']}
          labelColor="white"
        />
      </GizmoHelper>
      <NodeMesh
        nodes={nodes}
        posRef={posRef}
        selectedId={selectedId}
        hoveredId={hoveredId}
        onMeshReady={onMeshReady}
      />
      <EdgeLines
        links={links}
        idToIdx={idToIdx}
        posRef={posRef}
      />
    </>
  );
};

// ─── Root component ───────────────────────────────────────────────────────────

const GraphViz = ({
  data = graphify as GraphData,
  width,
  height,
  maxNodes = 4000,
  onNodeSelect
}: GraphVisualizationProps) => {
  // ── Derived graph data ──────────────────────────────────────────────────────
  const { nodes, links, hyperedges } = useMemo(() => {
    const raw = data ?? { nodes: [] };
    const nodes = raw.nodes.slice(0, maxNodes);
    const nodeSet = new Set(nodes.map((n) => n.id));
    const links = (raw.links ?? raw.edges ?? []).filter(
      (l) => nodeSet.has(l.source) && nodeSet.has(l.target)
    );
    const hyperedges = raw.hyperedges ?? raw.graph?.hyperedges ?? [];
    return { nodes, links, hyperedges };
  }, [data, maxNodes]);

  // ── Shared position ref (written by simulation, read by useFrame) ───────────
  const posRef = useRef<Float32Array | null>(null);

  // ── Instanced mesh ref for raycasting ───────────────────────────────────────
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const handleMeshReady = useCallback((m: THREE.InstancedMesh) => {
    meshRef.current = m;
  }, []);

  // ── Selection / hover state ─────────────────────────────────────────────────
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // ── Simulation ──────────────────────────────────────────────────────────────
  const [simProgress, setSimProgress] = useState(0);
  const [simDone, setSimDone] = useState(false);

  useSimulation({
    nodes,
    links,
    posRef,
    onProgress: setSimProgress,
    onDone: () => setSimDone(true)
  });

  // ── Camera ref & setter callback ────────────────────────────────────────────
  const cameraRef = useRef<THREE.Camera | null>(null);

  // This callback captures the camera. Because cameraRef is local to this component,
  // mutating its `.current` property here will not trigger the props-mutation lint error.
  const handleCameraReady = useCallback((cam: THREE.Camera) => {
    cameraRef.current = cam;
  }, []);

  // ── Raycasting (pointer events on the Canvas) ───────────────────────────────
  const raycaster = useRef(new THREE.Raycaster());

  const getNodeAtEvent = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): GraphNode | null => {
      const mesh = meshRef.current;
      const canvas = e.currentTarget.querySelector('canvas');
      if (!mesh || !canvas) return null;

      const cam = cameraRef.current;
      if (!cam) return null;

      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        ((e.clientY - rect.top) / rect.height) * -2 + 1
      );
      raycaster.current.setFromCamera(mouse, cam);
      const hits = raycaster.current.intersectObject(mesh);
      if (!hits.length) return null;
      return nodes[hits[0].instanceId ?? -1] ?? null;
    },
    [nodes]
  );

  // ── Pointer handlers on the wrapper div ────────────────────────────────────
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const n = getNodeAtEvent(e);
      setSelectedNode((prev) => (prev?.id === n?.id ? null : n));
      onNodeSelect?.(n);
    },
    [getNodeAtEvent, onNodeSelect]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setHoveredNode(getNodeAtEvent(e));
    },
    [getNodeAtEvent]
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  const canvasStyle: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? '100%'
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: hoveredNode ? 'pointer' : 'default'
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* ── R3F Canvas ─────────────────────────────────────────────────────── */}
      <Canvas
        style={canvasStyle}
        camera={{ fov: 60, near: 0.5, far: 3000, position: [0, 0, 300] }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(0x080c14, 1)}
      >
        <Scene
          nodes={nodes}
          links={links}
          posRef={posRef}
          selectedId={selectedNode?.id ?? null}
          hoveredId={hoveredNode?.id ?? null}
          onMeshReady={handleMeshReady}
          onCameraReady={handleCameraReady} // Passing the handler function instead
        />
      </Canvas>

      {/* ── Simulation progress bar ─────────────────────────────────────────── */}
      {!simDone && (
        <div style={styles.progressWrap}>
          <div style={styles.progressLabel}>
            Simulating layout… {simProgress}%
          </div>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressBar, width: `${simProgress}%` }} />
          </div>
        </div>
      )}

      {/* ── Stats pill ──────────────────────────────────────────────────────── */}
      <div style={styles.stats}>
        <span style={styles.statItem}>
          <Dot c="#4cc9f0" />
          {nodes.length.toLocaleString()} nodes
        </span>
        <span style={styles.statItem}>
          <Dot c="#7209b7" />
          {links.length.toLocaleString()} edges
        </span>
        <span style={styles.statItem}>
          <Dot c="#f72585" />
          {hyperedges.length} hyperedges
        </span>
      </div>

      {/* ── Node detail panel ───────────────────────────────────────────────── */}
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

      {/* ── Hover tooltip ───────────────────────────────────────────────────── */}
      {hoveredNode && !selectedNode && (
        <div style={styles.tooltip}>{hoveredNode.label}</div>
      )}

      <Legend />
      <div style={styles.controls}>
        Drag to orbit · Scroll to zoom · Right-drag to pan · Click node for
        details
      </div>
    </div>
  );
};

export { GraphViz };
