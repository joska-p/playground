import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

type HyperedgeHullData = {
  id: string;
  label: string;
  confidence?: string;
  nodeIndices: number[];
};

function computeHyperedgeHull(
  positions: Float32Array,
  nodeIndices: number[]
): THREE.BufferGeometry | null {
  if (nodeIndices.length < 3) return null;

  const points: THREE.Vector3[] = nodeIndices.map((idx) => {
    return new THREE.Vector3(
      positions[idx * 3],
      positions[idx * 3 + 1],
      positions[idx * 3 + 2]
    );
  });

  const geometry = new ConvexGeometry(points);
  return geometry;
}

export type { HyperedgeHullData };
export { computeHyperedgeHull };
