import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { directedEdge } from '../../../config';

type DirectedArrowheadProps = {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
};

/**
 * A small cone rendered at the target end of a directed edge,
 * oriented along the edge's direction vector.
 */
function DirectedArrowhead({ from, to, color }: DirectedArrowheadProps) {
  const ref = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const direction = new THREE.Vector3(
      to[0] - from[0],
      to[1] - from[1],
      to[2] - from[2]
    ).normalize();
    ref.current.position.set(to[0], to[1], to[2]);
    ref.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
  }, [from, to]);

  return (
    <mesh ref={ref}>
      <coneGeometry
        args={[directedEdge.arrowSize, directedEdge.arrowSize, 6]}
      />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={directedEdge.opacity}
      />
    </mesh>
  );
}

export { DirectedArrowhead };
