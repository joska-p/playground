import type { Rule } from '@repo/automa-engine/rules/types';
import { FBOManager } from '@repo/graphics/webgl/FBOManager';

const FULLSCREEN_TRIANGLE = `#version 300 es
precision highp float;

out vec2 v_uv;

void main() {
  vec2 pos[3] = vec2[3](
    vec2(-1.0, -1.0),
    vec2( 3.0, -1.0),
    vec2(-1.0,  3.0)
  );
  v_uv = pos[gl_VertexID] * 0.5 + 0.5; // Make sure this is v_uv, NOT vUv
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

export class SimulationEngine {
  private gl: WebGL2RenderingContext;
  private fbo: FBOManager;
  private simProgram: WebGLProgram;
  private paintProgram: WebGLProgram;
  private emptyVao: WebGLVertexArrayObject;
  private _width: number;
  private _height: number;

  // Reusable typed arrays to prevent GC allocations in tick loop
  private birthBuffer = new Int32Array(9);
  private surviveBuffer = new Int32Array(9);

  // Cached uniform locations
  private simUniforms: Record<string, WebGLUniformLocation | null> = {};
  private paintUniforms: Record<string, WebGLUniformLocation | null> = {};

  constructor(
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    simShaderSource: string,
    paintShaderSource: string
  ) {
    this.gl = gl;
    this._width = width;
    this._height = height;
    this.fbo = new FBOManager(gl, width, height);
    this.simProgram = this.compileProgram(simShaderSource);
    this.paintProgram = this.compileProgram(paintShaderSource);

    const vao = gl.createVertexArray();
    this.emptyVao = vao;

    this.cacheUniforms();
  }

  private cacheUniforms(): void {
    const gl = this.gl;
    const simNames = ['u_state', 'u_gridSize', 'u_birth', 'u_survive', 'u_stateCount'];
    for (const name of simNames) {
      this.simUniforms[name] = gl.getUniformLocation(this.simProgram, name);
    }

    const paintNames = ['u_state', 'u_mouse', 'u_brushSize', 'u_value', 'u_resolution'];
    for (const name of paintNames) {
      this.paintUniforms[name] = gl.getUniformLocation(this.paintProgram, name);
    }
  }

  private getSimLoc(name: string): WebGLUniformLocation | null {
    return this.simUniforms[name] ?? null;
  }

  private getPaintLoc(name: string): WebGLUniformLocation | null {
    return this.paintUniforms[name] ?? null;
  }

  step(rule: Rule): void {
    const gl = this.gl;
    gl.useProgram(this.simProgram);
    gl.bindVertexArray(this.emptyVao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fbo.getReadTexture());
    gl.uniform1i(this.getSimLoc('u_state'), 0);
    gl.uniform2f(this.getSimLoc('u_gridSize'), this._width, this._height);

    for (let i = 0; i < 9; i++) {
      this.birthBuffer[i] = rule.birth[i] ? 1 : 0;
      this.surviveBuffer[i] = rule.survive[i] ? 1 : 0;
    }
    gl.uniform1iv(this.getSimLoc('u_birth'), this.birthBuffer);
    gl.uniform1iv(this.getSimLoc('u_survive'), this.surviveBuffer);
    gl.uniform1i(this.getSimLoc('u_stateCount'), rule.stateCount);

    this.fbo.bindWrite();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.fbo.unbind();
    this.fbo.swap();
    gl.bindVertexArray(null);
  }

  paint(normalizedX: number, normalizedY: number, brushSize: number, value: number): void {
    const gl = this.gl;
    gl.useProgram(this.paintProgram);
    gl.bindVertexArray(this.emptyVao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fbo.getReadTexture());
    gl.uniform1i(this.getPaintLoc('u_state'), 0);
    gl.uniform2f(this.getPaintLoc('u_mouse'), normalizedX, normalizedY);
    gl.uniform1f(this.getPaintLoc('u_brushSize'), brushSize);
    gl.uniform1f(this.getPaintLoc('u_value'), value);
    gl.uniform2f(this.getPaintLoc('u_resolution'), this._width, this._height);

    this.fbo.bindWrite();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.fbo.unbind();
    this.fbo.swap();
    gl.bindVertexArray(null);
  }

  init(data: Uint8Array): void {
    const gl = this.gl;
    const rgba = new Uint8Array(data.length * 4);
    for (let i = 0; i < data.length; i++) {
      const cellState = data[i] ?? 0;
      const j = i * 4;
      rgba[j] = cellState; // Store raw state in Red channel
      rgba[j + 1] = 0;
      rgba[j + 2] = 0;
      rgba[j + 3] = 255;
    }

    const updateTex = (tex: WebGLTexture) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        this._width,
        this._height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        rgba
      );
    };

    updateTex(this.fbo.getReadTexture());
    updateTex(this.fbo.getWriteTexture());
  }

  getDisplayTexture(): WebGLTexture {
    return this.fbo.getReadTexture();
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  resize(width: number, height: number): void {
    this.fbo.resize(width, height);
    this._width = width;
    this._height = height;
  }

  destroy(): void {
    this.fbo.destroy();
    this.gl.deleteProgram(this.simProgram);
    this.gl.deleteProgram(this.paintProgram);
    this.gl.deleteVertexArray(this.emptyVao);
  }

  private compileProgram(fragmentSource: string): WebGLProgram {
    const gl = this.gl;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    if (!vs) throw new Error('Failed to create vertex shader');
    gl.shaderSource(vs, FULLSCREEN_TRIANGLE);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      throw new Error('Vertex shader compile error: ' + (gl.getShaderInfoLog(vs) ?? ''));
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fs) throw new Error('Failed to create fragment shader');
    gl.shaderSource(fs, fragmentSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      throw new Error('Fragment shader compile error: ' + (gl.getShaderInfoLog(fs) ?? ''));
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program) ?? '';
      gl.deleteProgram(program);
      throw new Error('Program link error: ' + log);
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return program;
  }
}
