// graph/EdgeLines.tsx
// Renders all graph edges as a single <lineSegments> updated via useFrame.
// Avoids computeBoundingSphere by pre-setting a static bounding sphere.

import { useRef, useEffect, useMemo } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GraphLink } from './types';

type Props = {
  links: GraphLink[];
  idToIdx: Map<string, number>;
  posRef: RefObject<Float32Array | null>;
};

const EdgeLines = ({ links, idToIdx, posRef }: Props) => {
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const lineBuf = useRef(new Float32Array(links.length * 6));
  const firstWrite = useRef(false);

  const lineArray = useMemo(
    () => new Float32Array(links.length * 6),
    [links.length]
  );

  // Pre-set bounding sphere once — never let Three.js compute it from the buffer
  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.boundingSphere = new THREE.Sphere(
        new THREE.Vector3(),
        2000
      );
    }
  }, []);

  useFrame(() => {
    const pos = posRef.current;
    const geo = geoRef.current;
    const segs = linesRef.current;
    if (!pos || !geo || !segs) return;

    const arr = lineBuf.current;
    let anyWritten = false;

    for (let e = 0; e < links.length; e++) {
      const si = idToIdx.get(links[e].source);
      const ti = idToIdx.get(links[e].target);
      if (si === undefined || ti === undefined) continue;

      const sx = pos[si * 3],
        sy = pos[si * 3 + 1],
        sz = pos[si * 3 + 2];
      const tx = pos[ti * 3],
        ty = pos[ti * 3 + 1],
        tz = pos[ti * 3 + 2];
      if (
        !isFinite(sx) ||
        !isFinite(sy) ||
        !isFinite(sz) ||
        !isFinite(tx) ||
        !isFinite(ty) ||
        !isFinite(tz)
      )
        continue;

      arr[e * 6] = sx;
      arr[e * 6 + 1] = sy;
      arr[e * 6 + 2] = sz;
      arr[e * 6 + 3] = tx;
      arr[e * 6 + 4] = ty;
      arr[e * 6 + 5] = tz;
      anyWritten = true;
    }

    if (anyWritten) {
      const attr = geo.attributes.position as THREE.BufferAttribute;
      attr.needsUpdate = true;
      if (!firstWrite.current) {
        segs.visible = true;
        firstWrite.current = true;
      }
    }
  });

  if (links.length === 0) return null;

  return (
    <lineSegments
      ref={linesRef}
      frustumCulled={false}
      visible={false}
    >
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[lineArray, 3]}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={0x2a4060}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </lineSegments>
  );
};

export { EdgeLines };
