import { useRef } from 'react';
import type * as THREE from 'three';
import { manual } from './manual';
import { useChroma, useDivisions, useLightness } from './store';

function Manual() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const divisions = useDivisions();
  const lightness = useLightness();
  const chroma = useChroma();

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
          uChroma: { value: chroma }
        }}
      />
    </mesh>
  );
}

export { Manual };
