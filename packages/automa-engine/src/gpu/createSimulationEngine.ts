import type { Rule } from '../rules/registry';
import { createGpuPass } from '@repo/glaze/gpu/createGpuPass';

export type SimulationEngine = ReturnType<typeof createSimulationEngine>;

export function createSimulationEngine(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  simShaderSource: string,
  paintShaderSource: string
) {
  const pass = createGpuPass(gl, width, height);
  pass.addProgram('default', simShaderSource);
  pass.addProgram('paint', paintShaderSource);

  const birthBuffer = new Int32Array(9);
  const surviveBuffer = new Int32Array(9);

  return {
    step(rule: Rule): void {
      for (let i = 0; i < 9; i++) {
        birthBuffer[i] = rule.birth[i] ? 1 : 0;
        surviveBuffer[i] = rule.survive[i] ? 1 : 0;
      }

      pass.useProgram('default');
      pass.setUniforms({
        u_gridSize: [pass.width, pass.height],
        u_birth: birthBuffer,
        u_survive: surviveBuffer,
        u_stateCount: rule.stateCount
      });
      pass.step();
    },

    paint(col: number, row: number, value: number): void {
      pass.useProgram('paint');
      pass.setUniforms({
        u_targetCell: [col, row],
        u_value: value
      });
      pass.step();
    },

    init(data: Uint8Array): void {
      pass.init(data);
    },

    getDisplayTexture(): WebGLTexture {
      return pass.getTexture();
    },

    get width() {
      return pass.width;
    },

    get height() {
      return pass.height;
    },

    resize(width: number, height: number): void {
      pass.resize(width, height);
    },

    destroy(): void {
      pass.destroy();
    }
  };
}
