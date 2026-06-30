import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import { useSeed } from '../../stores/ui/selectors';
import { generateShaderFromSeed } from './generator';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv; // Three.js injects 'uv' automatically as an attribute
    gl_Position = vec4(position, 1.0); // Map vertex to clip coordinates
  }
`;

function FromSeed() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const seed = useSeed();
  const fragmentShader = generateShaderFromSeed(seed);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.fragmentShader = fragmentShader;
      materialRef.current.needsUpdate = true;
    }
  }, [fragmentShader]);

  useFrame((state) => {
    if (materialRef && materialRef.current?.uniforms['u_time']) {
      materialRef.current.uniforms['u_time'].value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0.0 }
        }}
      />
    </mesh>
  );
}

export { FromSeed };
