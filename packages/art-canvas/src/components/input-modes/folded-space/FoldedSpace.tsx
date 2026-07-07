import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';
import { foldedSpace } from './foldedSpace';

function FoldedSpace() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current?.uniforms['u_time']) {
      materialRef.current.uniforms['u_time'].value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={foldedSpace.vertexShader}
        fragmentShader={foldedSpace.fragmentShader}
        uniforms={{
          u_time: { value: 0.0 }
        }}
      />
    </mesh>
  );
}

export { FoldedSpace };
