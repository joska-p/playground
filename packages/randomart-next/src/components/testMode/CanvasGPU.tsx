import { Canvas, useFrame } from '@react-three/fiber';
import type { ExprNode } from '@repo/randomart-engine-next/types';
import { useMemo, useRef } from 'react';
import type * as THREE from 'three';
import { buildValueFragmentShader, VALUE_VERTEX_SHADER } from './buildValueShader';

type CanvasGPUProps = {
  node: ExprNode;
  t: number;
  sizePx: number;
};

export function CanvasGPU({ node, t, sizePx }: CanvasGPUProps) {
  const { shader, error } = useMemo(() => {
    try {
      return { shader: buildValueFragmentShader(node), error: null as string | null };
    } catch (e) {
      return { shader: null, error: e instanceof Error ? e.message : 'GLSL build error' };
    }
  }, [node]);

  return (
    <>
      <div style={{ width: sizePx, height: sizePx }}>
        {shader && (
          <Canvas
            orthographic
            camera={{ position: [0, 0, 1], zoom: sizePx / 2 }}
            gl={{ antialias: false, preserveDrawingBuffer: false }}
            dpr={[1, 1]}
          >
            <ValuePlane
              fragmentShader={shader}
              t={t}
            />
          </Canvas>
        )}
      </div>
      {error && (
        <div className="bg-surface text-destructive-foreground absolute inset-0 flex items-center justify-center p-1 text-center text-sm">
          {error}
        </div>
      )}
    </>
  );
}

function ValuePlane({ fragmentShader, t }: { fragmentShader: string; t: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uT: { value: t } }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(() => {
    if (materialRef.current?.uniforms['uT']) {
      materialRef.current.uniforms['uT'].value = t;
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
