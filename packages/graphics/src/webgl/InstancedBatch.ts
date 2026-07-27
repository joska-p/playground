export type InstanceData = {
  x: number;
  y: number;
  z: number;
  scale: number;
  color?: [number, number, number, number];
};

export class InstancedBatch {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private instanceBuffer: WebGLBuffer | null = null;
  private maxInstances: number;

  constructor(gl: WebGL2RenderingContext, maxInstances = 10_000) {
    this.gl = gl;
    this.maxInstances = maxInstances;
  }

  init(vertexSource: string, fragmentSource: string): boolean {
    const gl = this.gl;

    const vs = this.compileShader(gl.VERTEX_SHADER, vertexSource);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) return false;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('InstancedBatch link error:', gl.getProgramInfoLog(program));
      return false;
    }

    this.program = program;
    this.vao = gl.createVertexArray();
    this.instanceBuffer = gl.createBuffer();

    return true;
  }

  render(instances: InstanceData[]): void {
    const gl = this.gl;
    if (!this.program || !this.vao || !this.instanceBuffer) return;

    const count = Math.min(instances.length, this.maxInstances);
    if (count === 0) return;

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    const stride = 7 * 4;
    const data = new Float32Array(count * 7);
    for (let i = 0; i < count; i++) {
      const inst = instances[i];
      if (!inst) continue;
      const o = i * 7;
      data[o] = inst.x;
      data[o + 1] = inst.y;
      data[o + 2] = inst.z;
      data[o + 3] = inst.scale;
      data[o + 4] = inst.color?.[0] ?? 1;
      data[o + 5] = inst.color?.[1] ?? 1;
      data[o + 6] = inst.color?.[2] ?? 1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

    const posLoc = gl.getAttribLocation(this.program, 'a_position');
    if (posLoc >= 0) {
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    }

    const offsetLoc = gl.getAttribLocation(this.program, 'a_offset');
    if (offsetLoc >= 0) {
      gl.enableVertexAttribArray(offsetLoc);
      gl.vertexAttribPointer(offsetLoc, 3, gl.FLOAT, false, stride, 0);
      gl.vertexAttribDivisor(offsetLoc, 1);
    }

    const scaleLoc = gl.getAttribLocation(this.program, 'a_scale');
    if (scaleLoc >= 0) {
      gl.enableVertexAttribArray(scaleLoc);
      gl.vertexAttribPointer(scaleLoc, 1, gl.FLOAT, false, stride, 12);
      gl.vertexAttribDivisor(scaleLoc, 1);
    }

    const colorLoc = gl.getAttribLocation(this.program, 'a_color');
    if (colorLoc >= 0) {
      gl.enableVertexAttribArray(colorLoc);
      gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, stride, 16);
      gl.vertexAttribDivisor(colorLoc, 1);
    }

    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, count);

    gl.bindVertexArray(null);
  }

  dispose(): void {
    const gl = this.gl;
    if (this.vao) gl.deleteVertexArray(this.vao);
    if (this.instanceBuffer) gl.deleteBuffer(this.instanceBuffer);
    if (this.program) gl.deleteProgram(this.program);
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
}
