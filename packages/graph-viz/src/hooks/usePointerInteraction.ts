import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import * as THREE from 'three';

import type { GraphNode } from '../core/graph.types';
import type { SphericalState, ThreeState } from './useThreeScene';

type UsePointerInteractionResult = {
  selectedNode: GraphNode | null;
  hoveredNode: GraphNode | null;
  setSelectedNode: Dispatch<SetStateAction<GraphNode | null>>;
};

/**
 * Attaches pointer event listeners to the Three.js canvas. Handles:
 * - Drag → orbital camera rotation (updates sphericalRef)
 * - Hover → raycasts to highlight the nearest node
 * - Click → toggles node selection
 * - Wheel → camera zoom
 */
function usePointerInteraction(
  threeRef: RefObject<ThreeState | null>,
  sphericalRef: RefObject<SphericalState>,
  draggingRef: RefObject<boolean>,
  nodes: GraphNode[],
  onNodeSelect?: (node: GraphNode | null) => void
): UsePointerInteractionResult {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const prevMouse = useRef({ x: 0, y: 0 });
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const getNodeAt = useCallback(
    (e: MouseEvent): GraphNode | null => {
      const t = threeRef.current;
      if (!t) return null;
      const canvas = t.renderer.domElement;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        ((e.clientY - rect.top) / rect.height) * -2 + 1
      );
      raycaster.setFromCamera(mouse, t.camera);
      const hits = raycaster.intersectObject(t.mesh);
      if (!hits.length) return null;
      return t.nodes[hits[0]!.instanceId ?? -1] ?? null;
    },
    [raycaster, threeRef]
  );

  useEffect(() => {
    const canvas = threeRef.current?.renderer.domElement;
    if (!canvas) return;

    function onDown(e: MouseEvent): void {
      draggingRef.current = false;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    }

    function onMove(e: MouseEvent): void {
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      if (e.buttons === 1) {
        draggingRef.current = true;
        sphericalRef.current.theta -= dx * 0.005;
        sphericalRef.current.phi = Math.max(
          0.1,
          Math.min(Math.PI - 0.1, sphericalRef.current.phi + dy * 0.005)
        );
        prevMouse.current = { x: e.clientX, y: e.clientY };
      } else {
        const n = getNodeAt(e);
        setHoveredNode(n);
        if (canvas) canvas.style.cursor = n ? 'pointer' : 'default';
      }
    }

    function onUp(e: MouseEvent): void {
      if (!draggingRef.current) {
        const n = getNodeAt(e);
        setSelectedNode((prev) => (prev?.id === n?.id ? null : n));
        onNodeSelect?.(n);
      }
      draggingRef.current = false;
    }

    function onWheel(e: WheelEvent): void {
      e.preventDefault();
      sphericalRef.current.radius = Math.max(
        60,
        Math.min(1200, sphericalRef.current.radius + e.deltaY * 0.4)
      );
    }

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('wheel', onWheel);
    };
    // Re-attach when nodes change (new canvas after scene rebuild)
  }, [nodes, getNodeAt, onNodeSelect, threeRef, sphericalRef, draggingRef]);

  return { selectedNode, hoveredNode, setSelectedNode };
}

export { usePointerInteraction };
