import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useDepth, useSeed } from '../../stores/ui/selectors';
import { generateShaderFromSeed } from '../../assembly/from-seed';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function SeedCanvas() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const seed = useSeed();
  const depth = useDepth();

  const fragmentShader = generateShaderFromSeed(seed, depth);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.fragmentShader = fragmentShader;
      materialRef.current.needsUpdate = true;
    }
  }, [fragmentShader]);

  useFrame((state) => {
    if (materialRef.current) {
      if (materialRef.current.uniforms['u_time']) {
        materialRef.current.uniforms['u_time'].value = state.clock.getElapsedTime();
      }
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

export { SeedCanvas };
