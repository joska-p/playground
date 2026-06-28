import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';

// 1. VERTEX SHADER
// Runs once per vertex of the mesh (4 times for our plane).
// Assigns position and forwards the geometry's UV map to the fragment shader.
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv; // Three.js injects 'uv' automatically as an attribute
    gl_Position = vec4(position, 1.0); // Map vertex to clip coordinates
  }
`;

// 2. FRAGMENT SHADER
// Runs once per screen pixel. Computes color using math.
const fragmentShader = `
  uniform float u_time;
  varying vec2 vUv;

  void main() {
    // Phase 1: Center coordinates to range from -0.5 to 0.5
    vec2 uv = vUv - 0.5;

    // Phase 2: Compute math pattern (Distance from center)
    float d = length(uv);

    // Phase 3: Create an algorithmic ripple over time
    float wave = sin(d * 40.0 - u_time * 5.0) * 0.5 + 0.5;

    // Phase 4: Construct dynamic color channels (RGB)
    vec3 color = vec3(wave * 0.4, wave * (uv.x + 0.5), wave * 0.9);

    // Assign final RGBA color to built-in system variable
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // useFrame hooks directly into the R3F render loop (60 FPS)
  useFrame((state) => {
    if (materialRef.current) {
      // Direct mutation of uniform value for high performance
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      {/* A full-viewport clipping plane */}
      <planeGeometry args={[2, 2]} />

      {/* Low-level WebGL compilation wrapper */}
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

export function ArtCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
