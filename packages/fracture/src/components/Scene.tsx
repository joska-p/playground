import { ShaderCanvas } from '@repo/graphics/react/ShaderCanvas';
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
