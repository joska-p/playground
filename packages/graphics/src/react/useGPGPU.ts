import { useEffect, useRef } from 'react';
import { createGPGPUPipeline, type GPGPUPipeline } from '../webgl/createGPGPUPipeline';

export function useGPGPU(
  gl: WebGL2RenderingContext | null,
  width: number,
  height: number,
  simShader: string
) {
  const pipelineRef = useRef<GPGPUPipeline | null>(null);

  useEffect(() => {
    if (!gl || width === 0 || height === 0) return;

    const pipeline = createGPGPUPipeline(gl, width, height, simShader);
    pipelineRef.current = pipeline;

    return () => {
      pipeline.dispose();
      pipelineRef.current = null;
    };
  }, [gl, width, height, simShader]);

  const getStateTexture = (): WebGLTexture | null => {
    return pipelineRef.current?.getStateTexture() ?? null;
  };

  return { pipelineRef, getStateTexture };
}
