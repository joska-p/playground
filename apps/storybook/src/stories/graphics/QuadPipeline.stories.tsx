import { SpaceMapper } from '@repo/graphics/math/SpaceMapper';
import { QuadPipeline } from '@repo/graphics/webgl/QuadPipeline';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

const meta: Meta = {
  title: 'Graphics / QuadPipeline / Shader Diagnostic',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

function useWebGLPipeline(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  fragmentSrc: string,
  dpr = 1,
  width?: number,
  height?: number
) {
  const pipelineRef = useRef<QuadPipeline | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const mapper = new SpaceMapper({
      cssWidth: canvas.clientWidth,
      cssHeight: canvas.clientHeight,
      dpr
    });

    const pipeline = new QuadPipeline(gl, mapper);
    pipeline.compileFragmentShader(fragmentSrc);
    pipelineRef.current = pipeline;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    pipeline.render();

    return () => {
      pipeline.dispose();
      pipelineRef.current = null;
    };
  }, [canvasRef, fragmentSrc, dpr, width, height]);

  return pipelineRef;
}

const UV_VERIFICATION_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
void main() {
  fragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);
}`;

export const UVVerification: Story = {
  render: () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useWebGLPipeline(canvasRef, UV_VERIFICATION_FS);
    return (
      <div style={{ width: 400, height: 400 }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
          Bottom-left = black, Bottom-right = green, Top-left = red, Top-right = yellow
        </p>
      </div>
    );
  }
};

const ASPECT_CIRCLE_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float u_aspect;
void main() {
  vec2 uv = vUv;
  uv.x *= u_aspect;
  vec2 center = vec2(0.5 * u_aspect, 0.5);
  float d = length(uv - center);
  float circle = smoothstep(0.305, 0.295, d);
  fragColor = vec4(circle, circle * 0.6, circle * 0.2, 1.0);
}`;

export const AspectCircleTest: Story = {
  render: () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({ w: 400, h: 300 });
    useWebGLPipeline(canvasRef, ASPECT_CIRCLE_FS, 1, size.w, size.h);

    return (
      <div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button onClick={() => setSize({ w: 400, h: 300 })}>4:3</button>
          <button onClick={() => setSize({ w: 500, h: 300 })}>Wide</button>
          <button onClick={() => setSize({ w: 300, h: 400 })}>Tall</button>
        </div>
        <div style={{ width: size.w, height: size.h }}>
          <canvas
            ref={canvasRef}
            width={size.w}
            height={size.h}
            style={{ width: '100%', height: '100%', display: 'block', background: '#000' }}
          />
        </div>
        <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
          Circle must stay perfectly round when container size changes
        </p>
      </div>
    );
  }
};

const MOUSE_SPOTLIGHT_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2 u_mouse;
void main() {
  vec2 uv = vUv;
  float d = distance(uv, u_mouse);
  float glow = exp(-d * d * 20.0);
  vec3 color = mix(vec3(0.02), vec3(1.0, 0.8, 0.2), glow);
  fragColor = vec4(color, 1.0);
}`;

export const MouseUniformTest: Story = {
  render: () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pipelineRef = useRef<QuadPipeline | null>(null);
    const mapperRef = useRef<SpaceMapper | null>(null);
    const glRef = useRef<WebGL2RenderingContext | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const gl = canvas.getContext('webgl2');
      if (!gl) return;
      glRef.current = gl;

      const mapper = new SpaceMapper({
        cssWidth: canvas.clientWidth,
        cssHeight: canvas.clientHeight,
        dpr: 1
      });
      mapperRef.current = mapper;

      const pipeline = new QuadPipeline(gl, mapper);
      pipeline.compileFragmentShader(MOUSE_SPOTLIGHT_FS);
      pipelineRef.current = pipeline;

      return () => {
        pipeline.dispose();
        pipelineRef.current = null;
        glRef.current = null;
      };
    }, []);

    const handleMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const pipeline = pipelineRef.current;
      const mapper = mapperRef.current;
      const gl = glRef.current;
      if (!canvas || !pipeline || !mapper || !gl) return;

      const rect = canvas.getBoundingClientRect();
      const uv = mapper.screenToUV({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      pipeline.render({ x: uv.x, y: 1.0 - uv.y });
    };

    return (
      <div style={{ width: 500, height: 400 }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
          onPointerMove={handleMove}
        />
        <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
          Glowing spotlight must track the cursor precisely
        </p>
      </div>
    );
  }
};
