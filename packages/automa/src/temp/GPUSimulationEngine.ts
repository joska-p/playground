import { FBOManager } from '@repo/graphics/webgl/FBOManager';

export class GPUSimulationEngine {
  private gl: WebGL2RenderingContext;
  private fboManager: FBOManager;
  private simProgram: WebGLProgram;
  private paintProgram: WebGLProgram;

  constructor(
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    simProgram: WebGLProgram,
    paintProgram: WebGLProgram
  ) {
    this.gl = gl;
    this.fboManager = new FBOManager(gl, width, height);
    this.simProgram = simProgram;
    this.paintProgram = paintProgram;
  }

  /** Run one tick of the cellular automaton rules */
  public step(): void {
    const gl = this.gl;

    gl.useProgram(this.simProgram);

    // Set uniforms
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fboManager.getReadTexture());
    gl.uniform1i(gl.getUniformLocation(this.simProgram, 'u_stateTexture'), 0);
    gl.uniform2f(
      gl.getUniformLocation(this.simProgram, 'u_resolution'),
      this.fboManager.width,
      this.fboManager.height
    );

    // Bind destination FBO and render
    this.fboManager.bindWrite();
    this.drawFullscreenQuad();
    this.fboManager.unbind();

    // Swap read/write buffers
    this.fboManager.swap();
  }

  /** Draw/Erase cells directly on the GPU */
  public paint(normalizedX: number, normalizedY: number, radius: number, erase = false): void {
    const gl = this.gl;

    gl.useProgram(this.paintProgram);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fboManager.getReadTexture());
    gl.uniform1i(gl.getUniformLocation(this.paintProgram, 'u_stateTexture'), 0);
    gl.uniform2f(gl.getUniformLocation(this.paintProgram, 'u_mouse'), normalizedX, normalizedY);
    gl.uniform1f(gl.getUniformLocation(this.paintProgram, 'u_brushSize'), radius);
    gl.uniform1f(gl.getUniformLocation(this.paintProgram, 'u_value'), erase ? 0.0 : 1.0);
    gl.uniform2f(
      gl.getUniformLocation(this.paintProgram, 'u_resolution'),
      this.fboManager.width,
      this.fboManager.height
    );

    this.fboManager.bindWrite();
    this.drawFullscreenQuad();
    this.fboManager.unbind();

    this.fboManager.swap();
  }

  /** Returns current active state texture for display rendering */
  public getDisplayTexture(): WebGLTexture {
    return this.fboManager.getReadTexture();
  }

  private drawFullscreenQuad(): void {
    // Standard 6-vertex or 3-vertex quad draw call
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}
