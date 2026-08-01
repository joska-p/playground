import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot.glsl?raw';

function Scene() {
  return (
    <ShaderCanvas
      interactive
      fragmentShader={fragmentShader}
      onBeforeRender={() => {
        return;
      }}
      webGLContextAttributes={{ antialias: true }}
    />
  );
}

export { Scene };
