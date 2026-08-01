import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot.glsl?raw';

function Scene() {
  return (
    <ShaderCanvas
      interactive
      fragmentShader={fragmentShader}
      webGLContextAttributes={{ antialias: true }}
      interactionOptions={{
        maxZoom: 1e6,
        zoomToCursor: true,
        scalePanWithZoom: true,
        zoomSpeed: 250
      }}
    />
  );
}

export { Scene };
