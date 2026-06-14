import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { selectNode } from '../stores/graph/actions';
import { useSelectedNodeIdx, useVisibleCommunities } from '../stores/graph/selectors';
import type { GraphNode } from './graphData.types';

const PALETTE_SIZE = 24;
const paletteCache: THREE.Color[] = [];

function getPaletteColor(index: number): THREE.Color {
  const slot = index % PALETTE_SIZE;
  if (!paletteCache[slot]) {
    const css = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-palette-${slot}`)
      .trim();
    paletteCache[slot] = new THREE.Color(css);
  }
  return paletteCache[slot];
}

function getSize(node: GraphNode): number {
  const degree = node.inDegree + node.outDegree;
  return Math.log(degree + 1) * 0.3 + 0.8;
}

const DIM_COLOR = new THREE.Color(0x333333);

type NodesProps = {
  nodes: GraphNode[];
};

function Nodes({ nodes }: NodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const tmpColor = useRef(new THREE.Color());
  const { raycaster, camera } = useThree();

  const selectedNodeIdx = useSelectedNodeIdx();
  const visibleCommunities = useVisibleCommunities();

  // Update instance matrices and colors when nodes or visibility changes
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const count = nodes.length;
    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      const s = getSize(node);
      const isVisible = visibleCommunities.has(node.community);

      dummy.current.position.set(node.x, node.y, node.z);
      // Scale to 0 for hidden nodes to avoid raycasting them
      const scale = isVisible ? s : 0.001;
      dummy.current.scale.set(scale, scale, scale);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);

      // Color: dim hidden nodes, normal visible ones, bright highlight selected
      if (!isVisible) {
        tmpColor.current.copy(DIM_COLOR);
      } else if (i === selectedNodeIdx) {
        tmpColor.current.copy(getPaletteColor(node.community));
        tmpColor.current.lerp(new THREE.Color(0xffffff), 0.4);
      } else {
        tmpColor.current.copy(getPaletteColor(node.community));
      }
      mesh.setColorAt(i, tmpColor.current);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  }, [nodes, visibleCommunities, selectedNodeIdx]);

  // Handle click on instancedMesh — raycast to find which instance was hit
  const handleClick = useCallback(
    (event: THREE.Event) => {
      const mesh = meshRef.current;
      if (!mesh) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nativeEvent = (event as any).nativeEvent ?? event;
      const pointer = new THREE.Vector2(
        ((nativeEvent.clientX ?? 0) / window.innerWidth) * 2 - 1,
        -((nativeEvent.clientY ?? 0) / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(mesh, false);

      if (intersects.length > 0) {
        const instanceId = intersects[0].instanceId;
        if (instanceId !== undefined && instanceId < nodes.length) {
          const node = nodes[instanceId];
          if (visibleCommunities.has(node.community)) {
            selectNode(selectedNodeIdx === instanceId ? null : instanceId);
          }
        }
      } else {
        selectNode(null);
      }
    },
    [nodes, selectedNodeIdx, visibleCommunities, raycaster, camera]
  );

  return (
    <instancedMesh
      ref={meshRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args={[null as any, null as any, nodes.length]}
      frustumCulled={false}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial toneMapped={false} />
    </instancedMesh>
  );
}

export { Nodes };
