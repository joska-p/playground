import { Canvas, useFrame } from '@react-three/fiber';
import type { GrammarRule } from '@repo/randomart-engine-next';
import { useMemo, useRef } from 'react';
import type * as THREE from 'three';
import { buildValueFragmentShader, VALUE_VERTEX_SHADER } from '../../glsl/buildValueShader';
import { buildPreviewNode } from '../../lib/evalHelpers';
import { Corners } from '../ui/Corners';

type ValueCanvasGPUProps = {
  rule: GrammarRule;
  seed: number;
  t: number;
  sizePx: number;
};

export function ValueCanvasGPU({ rule, seed, t, sizePx }: ValueCanvasGPUProps) {
  // Rebuilding the shader is relatively cheap (string templating) so doing it
  // eagerly and catching failures here is simpler than trying to recover
  // from a broken THREE.ShaderMaterial after the fact - WebGL shader compile
  // errors are logged by the driver/three.js, not thrown as catchable JS
  // exceptions, so this only catches errors from toGLSL() itself (e.g. a
  // rule that doesn't implement GLSL output at all).
  const { shader, error } = useMemo(() => {
    try {
      const node = buildPreviewNode(rule, seed);
      return { shader: buildValueFragmentShader(node), error: null as string | null };
    } catch (e) {
      return { shader: null, error: e instanceof Error ? e.message : 'GLSL build error' };
    }
  }, [rule, seed]);

  return (
    <Corners sizePx={sizePx}>
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-1 text-center text-[10px] text-red-400">
          {error}
        </div>
      )}
    </Corners>
  );
}

function ValuePlane({ fragmentShader, t }: { fragmentShader: string; t: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uT: { value: t } }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uT.value = t;
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
