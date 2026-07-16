import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';
import { manual } from './manual';
import { useChroma, useDivisions, useIsPlaying, useLightness } from './store';

function Manual() {
  const isPlaying = useIsPlaying();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const divisions = useDivisions();
  const lightness = useLightness();
  const chroma = useChroma();
  const timeRef = useRef(0); // Track total elapsed time

  useFrame((_, delta) => {
    if (!isPlaying) return;
    timeRef.current += delta;
    if (materialRef.current?.uniforms['uTime']) {
      materialRef.current.uniforms['uTime'].value = timeRef.current;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={manual.vertexShader}
        fragmentShader={manual.fragmentShader}
        uniforms={{
          uDivisions: { value: divisions },
          uLightness: { value: lightness },
          uChroma: { value: chroma },
          uTime: { value: 0 }
        }}
      />
    </mesh>
  );
}

export { Manual };
