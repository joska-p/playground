import { useEffect } from 'react';
import type { InstancedMesh } from 'three';
import { Color, Object3D } from 'three';

export type InstanceConfig = {
  positions: Float32Array;
  indices: number[];
  scaleValues?: number[];
  colorValues?: string[];
  baseScale?: number;
};

/**
 * Set up an InstancedMesh with positions, scales, and colors from data.
 * Updates the instance matrix and color attributes when inputs change.
 * Does not create the mesh — callers create <instancedMesh> and pass the ref.
 *
 * @param meshRef - Ref to the InstancedMesh to update
 * @param config - Configuration with positions, indices, scales, colors
 * @param deps - Additional dependencies to trigger re-initialization
 */
export function useInstanceMesh(
  meshRef: React.RefObject<InstancedMesh | null>,
  config: InstanceConfig,
  deps: React.DependencyList = []
): void {
  const {
    positions,
    indices,
    scaleValues,
    colorValues,
    baseScale = 1
  } = config;

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || indices.length === 0) return;

    const dummy = new Object3D();
    const color = new Color();
    const count = indices.length;

    for (let i = 0; i < count; i++) {
      const idx = indices[i]!;
      const px = positions[idx * 3]!;
      const py = positions[idx * 3 + 1]!;
      const pz = positions[idx * 3 + 2]!;

      dummy.position.set(px, py, pz);

      if (scaleValues) {
        const s = scaleValues[i]! * baseScale;
        dummy.scale.set(s, s, s);
      } else {
        dummy.scale.set(baseScale, baseScale, baseScale);
      }

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      if (colorValues) {
        const hex = colorValues[i]!;
        color.set(hex);
        mesh.setColorAt(i, color);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    mesh.computeBoundingSphere();
    // deps is consumed by the effect but we intentionally use indices in the logic
     
  }, [
    positions,
    indices,
    scaleValues,
    colorValues,
    baseScale,
    meshRef,
    ...deps
  ]);
}

/**
 * Create a stable ref + update function for a companion mesh (e.g. ring or dimmed).
 * Returns a ref and a simple setter to update instance data.
 */
export function useCompanionMesh(
  meshRef: React.RefObject<InstancedMesh | null>,
  positions: Float32Array,
  indices: number[],
  deps: React.DependencyList = []
): void {
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || indices.length === 0) return;

    const dummy = new Object3D();

    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i]!;
      dummy.position.set(
        positions[idx * 3]!,
        positions[idx * 3 + 1]!,
        positions[idx * 3 + 2]!
      );
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    // deps is consumed by the effect but we intentionally use indices in the logic
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, indices, meshRef, ...deps]);
}
