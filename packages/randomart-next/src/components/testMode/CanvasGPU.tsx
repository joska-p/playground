import type { Node } from '@repo/randomart-engine-next/types';
import { useMemo } from 'react';
import { buildValueFragmentShader } from './buildValueShader';
import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import { FrameLoopProvider } from '@repo/graphics/2d/react/FrameLoopContext';

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
        <FrameLoopProvider>
          <ShaderCanvas fragmentShader={shader} />
        </FrameLoopProvider>
      )}
      {error && (
        <div className="bg-surface text-destructive-foreground absolute inset-0 flex items-center justify-center p-1 text-center text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
