import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Text,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { REL_COLORS } from '../constants';
import { useGraphSimulation } from '../hooks/useGraphSimulation';
import { setSelectedNode, useHierarchyVisibility } from '../stores/graph/store';
import { HierarchyInfo } from './HierarchyInfo';
import { LoadingOverlay } from './LoadingOverlay';

import type { SimLink, SimNode } from '../hooks/use-graph-simulation.types';
import type { NodeHierarchy } from '../utils/hierarchy';

const DPR = Math.min(window.devicePixelRatio, 2);

type GraphCanvasProps = {
  onResetZoomReady: (fn: () => void) => void;
};

export function GraphCanvas({ onResetZoomReady }: GraphCanvasProps) {
  const {
    containerRef,
    simRef,
    nodePositionsRef,
    nodeColorsRef,
    linkPositionsRef,
    nodesRef,
    linksRef,
    hullsRef,
    highlightedNodeRef,
    connectedNodesRef,
    nodes,
    links,
    hierarchyRef,
  } = useGraphSimulation();

  const readyRef = useRef(false);
  const resetFnRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    onResetZoomReady(() => resetFnRef.current());
  }, [onResetZoomReady]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onBgClick = () => {
      setSelectedNode(undefined);
      highlightedNodeRef.current = null;
      connectedNodesRef.current = new Set();
    };
    el.addEventListener('click', onBgClick);
    return () => el.removeEventListener('click', onBgClick);
  }, [containerRef, highlightedNodeRef, connectedNodesRef]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
    >
      <LoadingOverlay />
      <Canvas
        dpr={DPR}
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <color
          attach="background"
          args={['#0f172a']}
        />
        <SceneContent
          nodePositionsRef={nodePositionsRef}
          nodeColorsRef={nodeColorsRef}
          linkPositionsRef={linkPositionsRef}
          nodesRef={nodesRef}
          linksRef={linksRef}
          hullsRef={hullsRef}
          highlightedNodeRef={highlightedNodeRef}
          connectedNodesRef={connectedNodesRef}
          simRef={simRef}
          resetFnRef={resetFnRef}
          nodes={nodes}
          links={links}
          hierarchyRef={hierarchyRef}
        />
      </Canvas>
      <HierarchyInfo />
    </div>
  );
}

type SceneContentProps = {
  nodePositionsRef: React.RefObject<Float32Array>;
  nodeColorsRef: React.RefObject<Float32Array>;
  linkPositionsRef: React.RefObject<Float32Array>;
  nodesRef: React.RefObject<SimNode[]>;
  linksRef: React.RefObject<SimLink[]>;
  hullsRef: React.RefObject<Array<Array<[number, number]>>>;
  highlightedNodeRef: React.RefObject<string | null>;
  connectedNodesRef: React.RefObject<Set<string>>;
  simRef: React.RefObject<d3.Simulation<SimNode, SimLink> | null>;
  resetFnRef: React.RefObject<() => void>;
  nodes: SimNode[];
  links: SimLink[];
  hierarchyRef: React.RefObject<Map<string, NodeHierarchy>>;
};

function SceneContent({
  nodePositionsRef,
  nodeColorsRef,
  linkPositionsRef,
  nodesRef,
  linksRef,
  hullsRef,
  highlightedNodeRef,
  connectedNodesRef,
  simRef,
  resetFnRef,
  nodes,
  links,
  hierarchyRef,
}: SceneContentProps) {
  const gl = useThree((state) => state.gl);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const orbitControlsRef = useRef<any>(null);

  const hierarchyVisibility = useHierarchyVisibility();

  // Simple reset function for OrbitControls
  const resetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.object.position.set(0, 0, 250);
      orbitControlsRef.current.update();
    }
  };

  useEffect(() => {
    resetFnRef.current = resetCamera;
  }, [resetFnRef]);

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      setSelectedNode(node);

      const connected = new Set<string>();
      connected.add(nodeId);
      links.forEach((l) => {
        const s =
          typeof l.source === 'object'
            ? (l.source as SimNode).id
            : String(l.source);
        const t =
          typeof l.target === 'object'
            ? (l.target as SimNode).id
            : String(l.target);
        if (s === nodeId) connected.add(t);
        if (t === nodeId) connected.add(s);
      });
      highlightedNodeRef.current = nodeId;
      connectedNodesRef.current = connected;
    },
    [nodes, links, highlightedNodeRef, connectedNodesRef]
  );

  useEffect(() => {
    const canvas = gl.domElement;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragNode: SimNode | undefined = undefined;
    let isPanning = false;
    let lastPanX = 0;
    let lastPanY = 0;

    function ndcToWorld(clientX: number, clientY: number) {
      const cam = cameraRef.current;
      if (!cam) return new THREE.Vector3(0, 0, 0);
      const rect = canvas.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0);
      vec.unproject(cam);
      return vec;
    }

    function findNode(world: THREE.Vector3): SimNode | undefined {
      const simNodes = nodesRef.current;
      const positions = nodePositionsRef.current;
      let closest: SimNode | undefined = undefined;
      let closestDist = 20;
      for (let i = 0; i < simNodes.length; i++) {
        const nx = positions[i * 3];
        const ny = positions[i * 3 + 1];
        const r = positions[i * 3 + 2];
        const dx = world.x - nx;
        const dy = world.y - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist && dist < r + 4) {
          closestDist = dist;
          closest = simNodes[i];
        }
      }
      return closest;
    }

    function onPointerDown(e: PointerEvent) {
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;

      const world = ndcToWorld(e.clientX, e.clientY);
      const hit = findNode(world);

      if (hit) {
        dragNode = hit;
        hit.fx = world.x;
        hit.fy = world.y;
        simRef.current?.alphaTarget(0.3).restart();
        canvas.style.cursor = 'grabbing';
      } else if (e.button === 1 || e.button === 0) {
        isPanning = true;
        lastPanX = e.clientX;
        lastPanY = e.clientY;
        canvas.style.cursor = 'grabbing';
      }
    }

    function onPointerMove(e: PointerEvent) {
      const cam = cameraRef.current;
      if (!cam) return;
      if (dragNode) {
        const world = ndcToWorld(e.clientX, e.clientY);
        dragNode.fx = world.x;
        dragNode.fy = world.y;
      }
      if (isPanning) {
        // For perspective camera, scale pan by distance from camera
        const zDistance = cam.position.z;
        const scale = zDistance / 200; // normalize to default distance
        const dx = (e.clientX - lastPanX) * 0.1 * scale;
        const dy = (e.clientY - lastPanY) * 0.1 * scale;
        cam.position.x -= dx;
        cam.position.y += dy;
        lastPanX = e.clientX;
        lastPanY = e.clientY;
      }
    }

    function onPointerUp(e: PointerEvent) {
      canvas.style.cursor = 'default';
      if (dragNode) {
        const moved = Math.hypot(
          e.clientX - pointerStartX,
          e.clientY - pointerStartY
        );
        if (moved < 5) {
          handleNodeClick(dragNode.id);
        }
        dragNode.fx = undefined;
        dragNode.fy = undefined;
        simRef.current?.alphaTarget(0);
        dragNode = undefined;
      }
      if (isPanning) {
        isPanning = false;
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const cam = cameraRef.current;
      if (!cam) return;

      // For perspective camera, adjust FOV for zoom effect
      const oldFov = cam.fov;
      const delta = e.deltaY > 0 ? 1.1 : 0.9;
      const newFov = Math.max(10, Math.min(100, oldFov * delta));
      cam.fov = newFov;
      cam.updateProjectionMatrix();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [
    gl,
    cameraRef,
    nodesRef,
    nodePositionsRef,
    simRef,
    highlightedNodeRef,
    connectedNodesRef,
    linksRef,
    handleNodeClick,
  ]);

  const degMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of links) {
      const s =
        typeof l.source === 'object'
          ? (l.source as SimNode).id
          : String(l.source);
      const t =
        typeof l.target === 'object'
          ? (l.target as SimNode).id
          : String(l.target);
      map.set(s, (map.get(s) ?? 0) + 1);
      map.set(t, (map.get(t) ?? 0) + 1);
    }
    return map;
  }, [links]);

  const labelNodes = useMemo(() => {
    return nodes.filter((n) => (degMap.get(n.id) ?? 0) >= 4);
  }, [nodes, degMap]);

  const idToIdx = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 0; i < nodes.length; i++) {
      map.set(nodes[i].id, i);
    }
    return map;
  }, [nodes]);

  // Track current camera zoom
  useFrame(() => {
    if (cameraRef.current) {
      currentZoomRef.current = cameraRef.current.position.z / 200;
    }
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={2000}
        position={[0, 0, 250]}
      />
      <OrbitControls
        ref={orbitControlsRef}
        target={[0, 0, 0]}
        enablePan
        enableRotate
        enableZoom
        autoRotate={false}
      />
      <GizmoHelper
        alignment="bottom-right"
        margin={[80, 80]}
      >
        <GizmoViewport
          axisHeadScale={1.1}
        />
      </GizmoHelper>
      <OrbitControls
        ref={orbitControlsRef}
        target={[0, 0, 0]}
        enablePan
        enableRotate
        enableZoom
        autoRotate={false}
      />
      <NodesRenderer
        nodePositionsRef={nodePositionsRef}
        nodeColorsRef={nodeColorsRef}
        nodesRef={nodesRef}
        highlightedNodeRef={highlightedNodeRef}
        connectedNodesRef={connectedNodesRef}
        hierarchyRef={hierarchyRef}
        hierarchyVisibility={hierarchyVisibility}
      />
      <LinksRenderer
        linkPositionsRef={linkPositionsRef}
        linksRef={linksRef}
        highlightedNodeRef={highlightedNodeRef}
        nodesRef={nodesRef}
        hierarchyRef={hierarchyRef}
        hierarchyVisibility={hierarchyVisibility}
      />
      <HullsRenderer hullsRef={hullsRef} />
      <LabelsRenderer
        labelNodes={labelNodes}
        nodePositionsRef={nodePositionsRef}
        idToIdx={idToIdx}
      />
      <HighlightRing
        nodePositionsRef={nodePositionsRef}
        nodesRef={nodesRef}
        highlightedNodeRef={highlightedNodeRef}
      />
    </>
  );
}

type NodesProps = {
  nodePositionsRef: React.MutableRefObject<Float32Array>;
  nodeColorsRef: React.MutableRefObject<Float32Array>;
  nodesRef: React.MutableRefObject<SimNode[]>;
  highlightedNodeRef: React.MutableRefObject<string | null>;
  connectedNodesRef: React.MutableRefObject<Set<string>>;
  hierarchyRef: React.MutableRefObject<Map<string, NodeHierarchy>>;
  hierarchyVisibility: string;
};

function NodesRenderer({
  nodePositionsRef,
  nodeColorsRef,
  nodesRef,
  highlightedNodeRef,
  connectedNodesRef,
  hierarchyRef,
  hierarchyVisibility,
}: NodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const tempColorRef = useRef(new THREE.Color());

  // Determine which nodes should be visible based on hierarchy level
  const shouldShowNode = (nodeId: string) => {
    const hierarchy = hierarchyRef.current.get(nodeId);
    if (!hierarchy) return true;

    const { level } = hierarchy;
    switch (hierarchyVisibility) {
      case 'core':
        return level === 'core';
      case 'core-secondary':
        return level === 'core' || level === 'secondary';
      case 'all':
        return true;
      default:
        return true;
    }
  };

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const positions = nodePositionsRef.current;
    const colors = nodeColorsRef.current;
    const allNodes = nodesRef.current;
    const hl = highlightedNodeRef.current;
    const conn = connectedNodesRef.current;

    // Count visible nodes
    let visibleCount = 0;
    const visibilityMap = new Map<number, boolean>();

    for (let i = 0; i < allNodes.length; i++) {
      const isVisible = shouldShowNode(allNodes[i].id);
      visibilityMap.set(i, isVisible);
      if (isVisible) visibleCount++;
    }

    mesh.count = visibleCount;

    let instanceIndex = 0;
    for (let i = 0; i < allNodes.length; i++) {
      if (!visibilityMap.get(i)) continue;

      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const r = positions[i * 3 + 2];

      dummyRef.current.position.set(x, y, 0);
      dummyRef.current.scale.setScalar(r);
      dummyRef.current.updateMatrix();
      mesh.setMatrixAt(instanceIndex, dummyRef.current.matrix);

      if (hl && !conn.has(allNodes[i].id)) {
        tempColorRef.current.setRGB(0.06, 0.09, 0.16);
      } else {
        tempColorRef.current.setRGB(
          colors[i * 3],
          colors[i * 3 + 1],
          colors[i * 3 + 2]
        );
      }
      mesh.setColorAt(instanceIndex, tempColorRef.current);
      instanceIndex++;
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, 5000]}
    >
      <circleGeometry args={[1, 16]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

type LinksProps = {
  linkPositionsRef: React.MutableRefObject<Float32Array>;
  linksRef: React.MutableRefObject<SimLink[]>;
  highlightedNodeRef: React.MutableRefObject<string | null>;
  nodesRef: React.MutableRefObject<SimNode[]>;
  hierarchyRef: React.MutableRefObject<Map<string, NodeHierarchy>>;
  hierarchyVisibility: string;
};

function LinksRenderer({
  linkPositionsRef,
  linksRef,
  highlightedNodeRef,
  nodesRef,
  hierarchyRef,
  hierarchyVisibility,
}: LinksProps) {
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const lastHlRef = useRef<string | null>(null);

  // Determine which nodes are visible
  const shouldShowNode = (nodeId: string) => {
    const hierarchy = hierarchyRef.current.get(nodeId);
    if (!hierarchy) return true;

    const { level } = hierarchy;
    switch (hierarchyVisibility) {
      case 'core':
        return level === 'core';
      case 'core-secondary':
        return level === 'core' || level === 'secondary';
      case 'all':
        return true;
      default:
        return true;
    }
  };

  useFrame(() => {
    const geom = geomRef.current;
    const line = lineRef.current;
    if (!geom || !line) return;
    const positions = linkPositionsRef.current;
    const allLinks = linksRef.current;
    const hl = highlightedNodeRef.current;

    // Filter visible links (both endpoints visible)
    const visibleLinks: number[] = [];
    for (let i = 0; i < allLinks.length; i++) {
      const link = allLinks[i];
      const s =
        typeof link.source === 'object'
          ? (link.source as SimNode).id
          : String(link.source);
      const t =
        typeof link.target === 'object'
          ? (link.target as SimNode).id
          : String(link.target);

      if (shouldShowNode(s) && shouldShowNode(t)) {
        visibleLinks.push(i);
      }
    }

    const count = visibleLinks.length;

    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    if (!posAttr || posAttr.count !== count * 2) {
      const arr = new Float32Array(count * 6);
      for (let vi = 0; vi < count; vi++) {
        const i = visibleLinks[vi];
        arr[vi * 6] = positions[i * 4];
        arr[vi * 6 + 1] = positions[i * 4 + 1];
        arr[vi * 6 + 2] = 0;
        arr[vi * 6 + 3] = positions[i * 4 + 2];
        arr[vi * 6 + 4] = positions[i * 4 + 3];
        arr[vi * 6 + 5] = 0;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    } else {
      const arr = posAttr.array as Float32Array;
      for (let vi = 0; vi < count; vi++) {
        const i = visibleLinks[vi];
        arr[vi * 6] = positions[i * 4];
        arr[vi * 6 + 1] = positions[i * 4 + 1];
        arr[vi * 6 + 2] = 0;
        arr[vi * 6 + 3] = positions[i * 4 + 2];
        arr[vi * 6 + 4] = positions[i * 4 + 3];
        arr[vi * 6 + 5] = 0;
      }
      posAttr.needsUpdate = true;
    }

    const colorAttr = geom.getAttribute('color') as THREE.BufferAttribute;
    if (
      !colorAttr ||
      colorAttr.count !== count * 2 ||
      hl !== lastHlRef.current
    ) {
      lastHlRef.current = hl;
      const colArr =
        colorAttr && colorAttr.count === count * 2
          ? (colorAttr.array as Float32Array)
          : new Float32Array(count * 6);
      for (let vi = 0; vi < count; vi++) {
        const i = visibleLinks[vi];
        const link = allLinks[i];
        const hex = REL_COLORS[link.r] ?? '#334155';
        const col = new THREE.Color(hex);
        let dim = 0.55;
        if (hl) {
          const s =
            typeof link.source === 'object'
              ? (link.source as SimNode).id
              : String(link.source);
          const t =
            typeof link.target === 'object'
              ? (link.target as SimNode).id
              : String(link.target);
          dim = s === hl || t === hl ? 0.9 : 0.05;
        }
        colArr[vi * 6] = col.r * dim;
        colArr[vi * 6 + 1] = col.g * dim;
        colArr[vi * 6 + 2] = col.b * dim;
        colArr[vi * 6 + 3] = col.r * dim;
        colArr[vi * 6 + 4] = col.g * dim;
        colArr[vi * 6 + 5] = col.b * dim;
      }
      if (!colorAttr || colorAttr.count !== count * 2) {
        geom.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
      } else {
        colorAttr.needsUpdate = true;
      }
    }
  });

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    line.frustumCulled = false;
  }, []);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry ref={geomRef} />
      <lineBasicMaterial
        vertexColors
        depthWrite={false}
      />
    </lineSegments>
  );
}

type HullsProps = {
  hullsRef: React.MutableRefObject<Array<Array<[number, number]>>>;
};

function HullsRenderer({ hullsRef }: HullsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const hulls = hullsRef.current;
    while (group.children.length < hulls.length * 2) {
      const fillGeom = new THREE.BufferGeometry();
      const edgeGeom = new THREE.BufferGeometry();
      const fillMesh = new THREE.Mesh(
        fillGeom,
        new THREE.MeshBasicMaterial({
          color: '#334155',
          transparent: true,
          opacity: 0.12,
          depthWrite: false,
        })
      );
      const edgeLine = new THREE.LineLoop(
        edgeGeom,
        new THREE.LineBasicMaterial({
          color: '#475569',
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
        })
      );
      group.add(fillMesh, edgeLine);
    }
    while (group.children.length > hulls.length * 2) {
      const child = group.children[group.children.length - 1];
      if (child instanceof THREE.Mesh || child instanceof THREE.LineLoop) {
        child.geometry.dispose();
      }
      group.remove(child);
    }
    for (let i = 0; i < hulls.length; i++) {
      const pts = hulls[i];
      const fillMesh = group.children[i * 2] as THREE.Mesh;
      const edgeLine = group.children[i * 2 + 1] as THREE.LineLoop;
      const shape = new THREE.Shape(
        pts.map(([x, y]) => new THREE.Vector2(x, y))
      );
      fillMesh.geometry.dispose();
      fillMesh.geometry = new THREE.ShapeGeometry(shape);
      edgeLine.geometry.dispose();
      const flatPts: number[] = [];
      for (const [x, y] of pts) {
        flatPts.push(x, y, 0);
      }
      edgeLine.geometry = new THREE.BufferGeometry();
      edgeLine.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(flatPts, 3)
      );
    }
  });

  return <group ref={groupRef} />;
}

type LabelsProps = {
  labelNodes: SimNode[];
  nodePositionsRef: React.MutableRefObject<Float32Array>;
  idToIdx: Map<string, number>;
};

function LabelsRenderer({
  labelNodes,
  nodePositionsRef,
  idToIdx,
}: LabelsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const positions = nodePositionsRef.current;

    for (let i = 0; i < labelNodes.length; i++) {
      const node = labelNodes[i];
      const child = group.children[i];
      if (!child) continue;

      const idx = idToIdx.get(node.id);
      if (idx !== undefined) {
        const x = positions[idx * 3];
        const y = positions[idx * 3 + 1];
        const r = positions[idx * 3 + 2];
        child.position.set(x, y + r + 2, 1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {labelNodes.map((node) => {
        const text =
          node.label.length > 18 ? node.label.slice(0, 16) + '…' : node.label;
        return (
          <Text
            key={node.id}
            fontSize={7}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        );
      })}
    </group>
  );
}

type RingProps = {
  nodePositionsRef: React.MutableRefObject<Float32Array>;
  nodesRef: React.MutableRefObject<SimNode[]>;
  highlightedNodeRef: React.MutableRefObject<string | null>;
};

function HighlightRing({
  nodePositionsRef,
  nodesRef,
  highlightedNodeRef,
}: RingProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const hl = highlightedNodeRef.current;
    if (!hl) {
      mesh.count = 0;
      return;
    }
    const idx = nodesRef.current.findIndex((n) => n.id === hl);
    if (idx === -1) {
      mesh.count = 0;
      return;
    }
    const positions = nodePositionsRef.current;
    const x = positions[idx * 3];
    const y = positions[idx * 3 + 1];
    const r = positions[idx * 3 + 2];
    mesh.count = 1;
    dummyRef.current.position.set(x, y, 0);
    dummyRef.current.scale.setScalar(r * 1.6);
    dummyRef.current.updateMatrix();
    mesh.setMatrixAt(0, dummyRef.current.matrix);
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, 1]}
    >
      <ringGeometry args={[0.8, 1, 24]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

type ResetAnimatorProps = {
  targetZoomRef: React.MutableRefObject<number>;
  targetXRef: React.MutableRefObject<number>;
  targetYRef: React.MutableRefObject<number>;
  isAnimatingResetRef: React.MutableRefObject<boolean>;
  cameraRef: React.RefObject<THREE.OrthographicCamera | null>;
};

function ResetAnimator({
  targetZoomRef,
  targetXRef,
  targetYRef,
  isAnimatingResetRef,
  cameraRef,
}: ResetAnimatorProps) {
  useFrame(() => {
    const cam = cameraRef.current;
    if (!cam || !isAnimatingResetRef.current) return;
    const speed = 0.06;
    cam.position.x += (targetXRef.current - cam.position.x) * speed;
    cam.position.y += (targetYRef.current - cam.position.y) * speed;
    cam.zoom += (targetZoomRef.current - cam.zoom) * speed;

    if (
      Math.abs(cam.zoom - targetZoomRef.current) < 0.001 &&
      Math.abs(cam.position.x - targetXRef.current) < 0.01 &&
      Math.abs(cam.position.y - targetYRef.current) < 0.01
    ) {
      cam.zoom = targetZoomRef.current;
      cam.position.x = targetXRef.current;
      cam.position.y = targetYRef.current;
      isAnimatingResetRef.current = false;
    }
    cam.updateProjectionMatrix();
  });

  return null;
}
