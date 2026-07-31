import { ShaderCanvas } from '@repo/graphics/react/ShaderCanvas';

const fragmentShader = /* glsl */ `
#version 300 es
precision highp float;
uniform float u_time;

in vec2 vUv;

out vec4 fragColor;

  void main() {
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`.trim();

function Scene() {
  return (
    <ShaderCanvas
      fragmentShader={fragmentShader}
      onBeforeRender={(pipeline, time) => {
        pipeline.setUniforms({ u_time: time });
      }}
      webGLContextAttributes={{ antialias: true }}
    />
  );
}

export { Scene };
