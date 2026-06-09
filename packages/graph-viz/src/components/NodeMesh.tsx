// graph/NodeMesh.tsx
// Renders all graph nodes as a single R3F <instancedMesh>.
// Reads positions from posRef each frame via useFrame — zero React re-renders.

import { useFrame } from '@react-three/fiber';
import type { Ref, RefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { communityColor } from './palette';
import type { GraphNode } from './types';

type Props = {
  nodes: GraphNode[];
  posRef: RefObject<Float32Array | null>;
  selectedId: string | null;
  hoveredId: string | null;
  /** Called with the InstancedMesh ref so the parent can raycast against it. */
  onMeshReady: (mesh: THREE.InstancedMesh) => void;
  ref?: Ref<THREE.InstancedMesh>;
};

const dummy = new THREE.Object3D();

const NodeMesh = ({
  nodes,
  posRef,
  selectedId,
  hoveredId,
  onMeshReady,
  ref,
}: Props) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  // Notify parent once the mesh is mounted
  useEffect(() => {
    if (meshRef.current) onMeshReady(meshRef.current);
  }, [onMeshReady]);

  // Handle the external ref if passed down (React 19 compatible)
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(meshRef.current);
    } else {
      ref.current = meshRef.current;
    }
  }, [ref]);

  const colorArray = useMemo(() => {
    const buf = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      const c = new THREE.Color(communityColor(n.community));
      buf[i * 3] = c.r;
      buf[i * 3 + 1] = c.g;
      buf[i * 3 + 2] = c.b;
    });
    return buf;
  }, [nodes]);

  // Update every frame: position + highlight scale
  useFrame(() => {
    const pos = posRef.current;
    const mesh = meshRef.current;
    if (!pos || !mesh) return;

    for (let i = 0; i < nodes.length; i++) {
      const x = pos[i * 3],
        y = pos[i * 3 + 1],
        z = pos[i * 3 + 2];
      if (!isFinite(x) || !isFinite(y) || !isFinite(z)) continue;

      dummy.position.set(x, y, z);
      const id = nodes[i].id;
      dummy.scale.setScalar(
        id === selectedId ? 3.5 : id === hoveredId ? 2.2 : 1
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, nodes.length]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1.2, 8, 8]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]} // Safe to pass memoized array directly now!
        />
      </sphereGeometry>
      <meshPhongMaterial vertexColors />
    </instancedMesh>
  );
};

export { NodeMesh };
