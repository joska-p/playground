import { useEffect, useMemo, useRef } from 'react';
import type { InstancedMesh } from 'three';
import { Color, Object3D, TorusGeometry } from 'three';
import { degree, fileTypeColors, nodes as nodeConfig, torusRing } from '../config';
import type { GraphNode } from '../types';
import { degreeToSize } from '../utils/nodes';

const torusGeometry = new TorusGeometry(
  torusRing.radius,
  torusRing.tube,
  torusRing.radialSegments,
  torusRing.tubularSegments
);

type NodeTypeIndicatorsProps = {
  positions: Float32Array;
  nodes: GraphNode[];
  degrees?: Float32Array | null;
  size?: number;
};

/**
 * Renders thin torus rings around non-code nodes (document, image)
 * so the user can instantly identify file types in the 3D scene.
 */
function NodeTypeIndicators({
  positions,
  nodes,
  degrees = null,
  size = nodeConfig.defaultSize
}: NodeTypeIndicatorsProps) {
  const docRef = useRef<InstancedMesh>(null);
  const imgRef = useRef<InstancedMesh>(null);

  // Collect indices per file type (stable reference via useMemo)
  const { docIndices, imgIndices } = useMemo(() => {
    const doc: number[] = [];
    const img: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const ft = nodes[i]!.file_type;
      if (ft === 'document') {
        doc.push(i);
      } else if (ft === 'image') {
        img.push(i);
      }
    }
    return { docIndices: doc, imgIndices: img };
  }, [nodes]);

  // Find max degree for normalization
  const maxDegree = useMemo(() => {
    let max = 0;
    if (degrees) {
      for (let i = 0; i < degrees.length; i++) {
        if (degrees[i]! > max) max = degrees[i]!;
      }
    }
    return max;
  }, [degrees]);

  const baseScale = size / nodeConfig.defaultSizeBase;

  useEffect(() => {
    const dummy = new Object3D();
    const color = new Color();

    function updateMesh(
      ref: React.RefObject<InstancedMesh | null>,
      indices: number[],
      hexColor: string
    ) {
      const mesh = ref.current;
      if (!mesh || indices.length === 0) return;

      const rgb = new Color(hexColor);

      for (let i = 0; i < indices.length; i++) {
        const ni = indices[i]!;
        const px = positions[ni * 3]!;
        const py = positions[ni * 3 + 1]!;
        const pz = positions[ni * 3 + 2]!;

        const deg = degrees?.[ni] ?? 0;
        const s =
          degreeToSize(deg, maxDegree, degree.sizeMin, degree.sizeMax) *
          baseScale;

        dummy.position.set(px, py, pz);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        mesh.setColorAt(i, color.copy(rgb));
      }

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    updateMesh(docRef, docIndices, fileTypeColors.document);
    updateMesh(imgRef, imgIndices, fileTypeColors.image);
  }, [
    positions,
    nodes,
    degrees,
    maxDegree,
    size,
    baseScale,
    docIndices,
    imgIndices
  ]);

  // Use a shared material — color is on the instance
  const sharedMaterial = <meshBasicMaterial />;

  return (
    <>
      {docIndices.length > 0 && (
        <instancedMesh
          ref={docRef}
          args={[torusGeometry, undefined, docIndices.length]}
          frustumCulled={false}
        >
          {sharedMaterial}
        </instancedMesh>
      )}
      {imgIndices.length > 0 && (
        <instancedMesh
          ref={imgRef}
          args={[torusGeometry, undefined, imgIndices.length]}
          frustumCulled={false}
        >
          {sharedMaterial}
        </instancedMesh>
      )}
    </>
  );
}

export { NodeTypeIndicators };
