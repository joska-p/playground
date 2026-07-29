import type { Rule } from '@repo/automa-engine/rules/types';
import { GPGPUPipeline } from '@repo/graphics/webgl/GPGPUPipeline';

export class SimulationEngine {
  private pipeline: GPGPUPipeline;
  private birthBuffer = new Int32Array(9);
  private surviveBuffer = new Int32Array(9);

  constructor(
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    simShaderSource: string,
    paintShaderSource: string
  ) {
    this.pipeline = new GPGPUPipeline(gl, width, height, simShaderSource);
    this.pipeline.compile();
    this.pipeline.addProgram('paint', paintShaderSource);
  }

  step(rule: Rule): void {
    for (let i = 0; i < 9; i++) {
      this.birthBuffer[i] = rule.birth[i] ? 1 : 0;
      this.surviveBuffer[i] = rule.survive[i] ? 1 : 0;
    }

    this.pipeline.useProgram('default');
    this.pipeline.setUniforms({
      u_gridSize: [this.pipeline.width, this.pipeline.height],
      u_birth: this.birthBuffer,
      u_survive: this.surviveBuffer,
      u_stateCount: rule.stateCount
    });
    this.pipeline.step();
  }

  paint(col: number, row: number, value: number): void {
    this.pipeline.useProgram('paint');
    this.pipeline.setUniforms({
      u_targetCell: [col, row],
      u_value: value
    });
    this.pipeline.step();
  }

  init(data: Uint8Array): void {
    this.pipeline.init(data);
  }

  getDisplayTexture(): WebGLTexture {
    return this.pipeline.getStateTexture();
  }

  get width(): number {
    return this.pipeline.width;
  }

  get height(): number {
    return this.pipeline.height;
  }

  resize(width: number, height: number): void {
    this.pipeline.resize(width, height);
  }

  destroy(): void {
    this.pipeline.destroy();
  }
}
