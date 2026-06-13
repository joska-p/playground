import { useMemo, useRef } from 'react';
import type { InstancedMesh } from 'three';
import { TorusGeometry } from 'three';
import {
  degree,
  nodes as nodeConfig,
  torusRing
} from '../../../config';
import type { GraphNode } from '../../../types';
import { degreeToSize } from '../../../utils/nodes';
import { fileTypeColors } from '../../../config';
import { useInstanceMesh } from '../../graph/hooks/useInstanceMesh';

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
 * Uses useInstanceMesh for the Three.js instance matrix setup.
 */
function NodeTypeIndicators({
  positions,
  nodes,
  degrees = null,
  size = nodeConfig.defaultSize
}: NodeTypeIndicatorsProps) {
  const docRef = useRef<InstancedMesh>(null);
  const imgRef = useRef<InstancedMesh>(null);

  const baseScale = size / nodeConfig.defaultSizeBase;

  // Collect indices per file type
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

  // Compute scale values for each instance
  const docScaleValues = useMemo(() => {
    return docIndices.map((ni) => {
      const deg = degrees?.[ni] ?? 0;
      return degreeToSize(deg, maxDegree, degree.sizeMin, degree.sizeMax);
    });
  }, [docIndices, degrees, maxDegree]);

  const imgScaleValues = useMemo(() => {
    return imgIndices.map((ni) => {
      const deg = degrees?.[ni] ?? 0;
      return degreeToSize(deg, maxDegree, degree.sizeMin, degree.sizeMax);
    });
  }, [imgIndices, degrees, maxDegree]);

  // Color per instance
  const docColorValues = useMemo(
    () => docIndices.map(() => fileTypeColors.document),
    [docIndices]
  );
  const imgColorValues = useMemo(
    () => imgIndices.map(() => fileTypeColors.image),
    [imgIndices]
  );

  useInstanceMesh(docRef, {
    positions,
    indices: docIndices,
    scaleValues: docScaleValues,
    baseScale,
    colorValues: docColorValues,
  }, [nodes, maxDegree, size]);

  useInstanceMesh(imgRef, {
    positions,
    indices: imgIndices,
    scaleValues: imgScaleValues,
    baseScale,
    colorValues: imgColorValues,
  }, [nodes, maxDegree, size]);

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
