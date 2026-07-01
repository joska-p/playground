import * as THREE from 'three';
import type { GraphNode } from '../core/pipeline/graphData.schema';
import { CONFIG } from './config.ts';

const DIM_COLOR = new THREE.Color(CONFIG.nodes.dimColor);
const HIGHLIGHT_COLOR = new THREE.Color(CONFIG.nodes.highlightColor);
const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function getNodeSize(node: GraphNode): number {
  const degree = node.inDegree + node.outDegree;
  return Math.log(degree + 1) * CONFIG.nodes.sizeScale + CONFIG.nodes.sizeBase;
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
    const scale = isVisible ? getNodeSize(node) : CONFIG.nodes.hiddenScale;

    dummy.position.set(node.x, node.y, node.z);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(localIdx, dummy.matrix);

    if (!isVisible) {
      tmpColor.copy(DIM_COLOR);
    } else {
      tmpColor.set(node.color);
      if (globalIdx === selectedNodeIdx) {
        tmpColor.lerp(HIGHLIGHT_COLOR, CONFIG.nodes.highlightLerp);
      }
    }
    mesh.setColorAt(localIdx, tmpColor);
    localIdx++;
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingSphere();
}

export function splitNodeIndices(nodes: GraphNode[]): {
  codeToGlobal: number[];
  docToGlobal: number[];
} {
  const codeToGlobal: number[] = [];
  const docToGlobal: number[] = [];

  nodes.forEach((n, globalIdx) => {
    if (n.file_type === 'code') codeToGlobal.push(globalIdx);
    else docToGlobal.push(globalIdx);
  });

  return { codeToGlobal, docToGlobal };
}
