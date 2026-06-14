import * as THREE from 'three';
import type { GraphNode } from '../data/graphData.schema';

const DIM_COLOR = new THREE.Color(0x333333);
const WHITE = new THREE.Color(0xffffff);
const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function getNodeSize(node: GraphNode): number {
  const degree = node.inDegree + node.outDegree;
  return Math.log(degree + 1) * 0.3 + 0.8;
}

export function writeInstanceData(
  mesh: THREE.InstancedMesh,
  nodes: GraphNode[],
  globalIndices: number[],
  visibleCommunities: Set<number>,
  selectedNodeIdx: number | null
): void {
  let localIdx = 0;
  for (const globalIdx of globalIndices) {
    const node = nodes[globalIdx];
    const isVisible = visibleCommunities.has(node.community);
    const scale = isVisible ? getNodeSize(node) : 0.001;

    dummy.position.set(node.x, node.y, node.z);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(localIdx, dummy.matrix);

    if (!isVisible) {
      tmpColor.copy(DIM_COLOR);
    } else {
      tmpColor.set(node.color);
      if (globalIdx === selectedNodeIdx) {
        tmpColor.lerp(WHITE, 0.4);
      }
    }
    mesh.setColorAt(localIdx, tmpColor);
    localIdx++;
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}

export function splitNodeIndices(
  nodes: GraphNode[]
): { codeToGlobal: number[]; docToGlobal: number[] } {
  const codeToGlobal: number[] = [];
  const docToGlobal: number[] = [];

  nodes.forEach((n, globalIdx) => {
    if (n.file_type === 'code') codeToGlobal.push(globalIdx);
    else docToGlobal.push(globalIdx);
  });

  return { codeToGlobal, docToGlobal };
}
