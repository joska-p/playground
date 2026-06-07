import { useMemo } from 'react';
import * as THREE from 'three';

type GridLinesProps = {
  cols: number;
  rows: number;
};

function GridLines({ cols, rows }: GridLinesProps) {
  const geo = useMemo(() => {
    const vertices: number[] = [];
    for (let i = 0; i <= cols; i++) {
      vertices.push(i, 0, 0.01, i, rows, 0.01);
    }
    for (let j = 0; j <= rows; j++) {
      vertices.push(0, j, 0.01, cols, j, 0.01);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, [cols, rows]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="white"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export { GridLines };
