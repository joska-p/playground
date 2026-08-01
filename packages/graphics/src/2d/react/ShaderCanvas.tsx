import type { QuadPipeline } from '../createQuadPipeline';
import type { UniformValue } from '../../core/compileShaderProgram';
import { useFrame } from './FrameLoopContext';
import { useInteractiveCanvas } from './useInteractiveCanvas';
import { useShaderRunner } from './useShaderRunner';
import type { WebGLContextAttributes } from '../../core/createWebGLContext';

export type ShaderCanvasProps = {
  className?: string;
  onBeforeRender: (pipeline: QuadPipeline, time: number) => void;
  fragmentShader: string;
  dpr?: number | undefined;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
  interactive?: boolean;
};

export function ShaderCanvas({
  className,
  onBeforeRender,
  fragmentShader,
  dpr,
  webGLContextAttributes,
  interactive = false
}: ShaderCanvasProps) {
  const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader, dpr, webGLContextAttributes });
  const interactionState = useInteractiveCanvas(canvasRef, interactive);

  useFrame((time) => {
    const runner = runnerRef.current;
    if (runner) {
      onBeforeRender(runner.pipeline, time);
      if (interactive) {
        const interaction = interactionState.current;
        const hasPan = runner.pipeline.hasUniform('u_panOffset');
        const hasZoom = runner.pipeline.hasUniform('u_zoom');
        if (hasPan || hasZoom) {
          const values: Record<string, UniformValue> = {};
          if (hasPan) {
            values['u_panOffset'] = [
              interaction.pan.x / runner.canvas.clientWidth,
              -interaction.pan.y / runner.canvas.clientHeight
            ];
          }
          if (hasZoom) {
            values['u_zoom'] = interaction.zoom;
          }
          runner.pipeline.setUniforms(values);
        }
      }
    }
    runner?.render();
  });

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        runnerRef.current?.setMouse({
          x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        });
      }}
    />
  );
}
