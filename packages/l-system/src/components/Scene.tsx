import { OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import type { LineSegment } from '../core/interpreter';
import { GRUVBOX_DEPTH } from '../grammars';

function Segments({ segments }: { segments: LineSegment[] }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(segments.length * 6);
    const colors = new Float32Array(segments.length * 6);

    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      const c = new THREE.Color(GRUVBOX_DEPTH[s.depth % GRUVBOX_DEPTH.length]);
      const i6 = i * 6;

      positions[i6] = s.start.x;
      positions[i6 + 1] = s.start.y;
      positions[i6 + 2] = s.start.z;
      positions[i6 + 3] = s.end.x;
      positions[i6 + 4] = s.end.y;
      positions[i6 + 5] = s.end.z;

      colors[i6] = c.r;
      colors[i6 + 1] = c.g;
      colors[i6 + 2] = c.b;
      colors[i6 + 3] = c.r;
      colors[i6 + 4] = c.g;
      colors[i6 + 5] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [segments]);

  if (segments.length === 0) return null;

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors />
    </lineSegments>
  );
}

export function Scene({ segments }: { segments: LineSegment[] }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#ffffff', '#444444', 0.6]} />
      <Segments segments={segments} />
      <OrbitControls enableDamping />
    </>
  );
}
