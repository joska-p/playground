import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSeed } from '../../stores/ui/selectors';
//import { generateShaderFromSeed } from './generator';
import { generateShaderFromSeed } from './generateShaderFromSeed';

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
    if (materialRef.current) {
      // 1. Update time uniform
      if (materialRef.current.uniforms['u_time']) {
        materialRef.current.uniforms['u_time'].value = state.clock.getElapsedTime(); //
      }
      // 2. Pass mouse uniforms: state.pointer holds normalized device coordinates (-1 to +1)
      if (materialRef.current.uniforms['u_mouse']) {
        materialRef.current.uniforms['u_mouse'].value.copy(state.pointer);
      }
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
          u_time: { value: 0.0 },
          u_mouse: { value: new THREE.Vector2(0, 0) }
        }}
      />
    </mesh>
  );
}

export { FromSeed };
