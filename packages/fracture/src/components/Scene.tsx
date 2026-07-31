import { ShaderCanvas } from '@repo/graphics/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot.glsl?raw';

function Scene() {
  return (
    <ShaderCanvas
      fragmentShader={fragmentShader}
      onBeforeRender={(pipeline) => {
        pipeline.setUniforms({});
      }}
      webGLContextAttributes={{ antialias: true }}
    />
  );
}

export { Scene };
