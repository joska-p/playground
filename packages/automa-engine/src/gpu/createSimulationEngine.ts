import type { Rule } from '../rules/registry';
import { createGPGPUPipeline } from '@repo/graphics/2d/createGPGPUPipeline';

export type SimulationEngine = ReturnType<typeof createSimulationEngine>;

export function createSimulationEngine(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  simShaderSource: string,
  paintShaderSource: string
) {
  const pipeline = createGPGPUPipeline(gl, width, height, simShaderSource);
  pipeline.addProgram('paint', paintShaderSource);

  const birthBuffer = new Int32Array(9);
  const surviveBuffer = new Int32Array(9);

  return {
    step(rule: Rule): void {
      for (let i = 0; i < 9; i++) {
        birthBuffer[i] = rule.birth[i] ? 1 : 0;
        surviveBuffer[i] = rule.survive[i] ? 1 : 0;
      }

      pipeline.useProgram('default');
      pipeline.setUniforms({
        u_gridSize: [pipeline.width, pipeline.height],
        u_birth: birthBuffer,
        u_survive: surviveBuffer,
        u_stateCount: rule.stateCount
      });
      pipeline.step();
    },

    paint(col: number, row: number, value: number): void {
      pipeline.useProgram('paint');
      pipeline.setUniforms({
        u_targetCell: [col, row],
        u_value: value
      });
      pipeline.step();
    },

    init(data: Uint8Array): void {
      pipeline.init(data);
    },

    getDisplayTexture(): WebGLTexture {
      return pipeline.getStateTexture();
    },

    get width() {
      return pipeline.width;
    },

    get height() {
      return pipeline.height;
    },

    resize(width: number, height: number): void {
      pipeline.resize(width, height);
    },

    destroy(): void {
      pipeline.dispose();
    }
  };
}
