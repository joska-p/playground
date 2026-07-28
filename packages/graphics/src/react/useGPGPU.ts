import { useEffect, useRef } from 'react';
import { GPGPUPipeline } from '../webgl/GPGPUPipeline';

export function useGPGPU(
  gl: WebGL2RenderingContext | null,
  width: number,
  height: number,
  simShader: string
) {
  const pipelineRef = useRef<GPGPUPipeline | null>(null);

  useEffect(() => {
    if (!gl || width === 0 || height === 0) return;

    const pipeline = new GPGPUPipeline(gl, width, height, simShader);
    pipeline.compile();
    pipelineRef.current = pipeline;

    return () => {
      pipeline.destroy();
      pipelineRef.current = null;
    };
  }, [gl, width, height, simShader]);

  const getStateTexture = (): WebGLTexture | null => {
    return pipelineRef.current?.getStateTexture() ?? null;
  };

  return { pipelineRef, getStateTexture };
}
