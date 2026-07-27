import { FBOManager } from '@repo/graphics/webgl/FBOManager';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Graphics / FBOManager / Feedback Trail',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

const FEEDBACK_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D u_prevFrame;
uniform vec2 u_particlePos;
void main() {
  vec4 prev = texture(u_prevFrame, vUv);
  float d = distance(vUv, u_particlePos);
  float particle = exp(-d * d * 800.0);
  vec3 color = mix(prev.rgb * 0.97, vec3(1.0, 0.4, 0.1), particle);
  fragColor = vec4(color, 1.0);
}`;

const FULLSCREEN_VS = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  vUv = pos[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

export const FeedbackTrail: Story = {
  render: () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const gl = canvas.getContext('webgl2');
      if (!gl) return;

      const w = 500;
      const h = 400;
      const fbo = new FBOManager(gl, w, h);

      // Compile feedback shader
      const vs = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vs, FULLSCREEN_VS);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fs, FEEDBACK_FS);
      gl.compileShader(fs);

      const program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      const prevFrameLoc = gl.getUniformLocation(program, 'u_prevFrame');
      const particlePosLoc = gl.getUniformLocation(program, 'u_particlePos');

      let time = 0;

      function frame() {
        time += 0.015;
        const px = Math.sin(time) * 0.3 + 0.5;
        const py = Math.cos(time * 0.7) * 0.3 + 0.5;

        // Write to FBO, reading from the other texture
        fbo.bindWrite();
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, fbo.getReadTexture());
        gl.uniform1i(prevFrameLoc, 0);
        gl.uniform2f(particlePosLoc, px, py);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        fbo.unbind();
        fbo.swap();

        rafRef.current = requestAnimationFrame(frame);
      }

      rafRef.current = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(rafRef.current);
        fbo.destroy();
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    }, []);

    return (
      <div style={{ width: 500, height: 400 }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
          Moving particle with fading trail — no tearing or flickering
        </p>
      </div>
    );
  }
};
