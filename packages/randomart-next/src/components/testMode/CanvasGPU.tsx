import { Canvas, useFrame } from '@react-three/fiber';
import type { Node } from '@repo/randomart-engine-next/types';
import { useMemo, useRef } from 'react';
import type * as THREE from 'three';
import { buildValueFragmentShader, VALUE_VERTEX_SHADER } from './buildValueShader';

type CanvasGPUProps = {
  node: Node;
  sizePx: number;
};

export function CanvasGPU({ node, sizePx }: CanvasGPUProps) {
  const { shader, error } = useMemo(() => {
    try {
      return { shader: buildValueFragmentShader(node), error: null as string | null };
    } catch (e) {
      return { shader: null, error: e instanceof Error ? e.message : 'GLSL build error' };
    }
  }, [node]);

  return (
    <div
      className="relative"
      style={{ width: sizePx, height: sizePx }}
    >
      {shader && (
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1], zoom: sizePx / 2 }}
          gl={{ antialias: false, preserveDrawingBuffer: false }}
          dpr={[1, 1]}
        >
          <ValuePlane fragmentShader={shader} />
        </Canvas>
      )}
      {error && (
        <div className="bg-surface text-destructive-foreground absolute inset-0 flex items-center justify-center p-1 text-center text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

function ValuePlane({ fragmentShader }: { fragmentShader: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = {
    u_time: { value: 0.0 }
  };

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
        vertexShader={VALUE_VERTEX_SHADER}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
