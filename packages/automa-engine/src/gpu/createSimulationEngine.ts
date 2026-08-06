import type { Rule } from '../rules/registry';
import { createStateBuffer } from '@repo/glaze/gpu/createStateBuffer';

export type SimulationEngine = ReturnType<typeof createSimulationEngine>;

export function createSimulationEngine(
        gl: WebGL2RenderingContext,
        width: number,
        height: number,
        simShaderSource: string,
        paintShaderSource: string
) {
        const buffer = createStateBuffer(gl, width, height);
        buffer.addProgram('default', simShaderSource);
        buffer.addProgram('paint', paintShaderSource);

        const birthBuffer = new Int32Array(9);
        const surviveBuffer = new Int32Array(9);

        return {
                step(rule: Rule): void {
                        for (let i = 0; i < 9; i++) {
                                birthBuffer[i] = rule.birth[i] ? 1 : 0;
                                surviveBuffer[i] = rule.survive[i] ? 1 : 0;
                        }

                        buffer.useProgram('default');
                        buffer.setUniforms({
                                u_gridSize: [buffer.width, buffer.height],
                                u_birth: birthBuffer,
                                u_survive: surviveBuffer,
                                u_stateCount: rule.stateCount
                        });
                        buffer.step();
                },

                paint(col: number, row: number, value: number): void {
                        buffer.useProgram('paint');
                        buffer.setUniforms({
                                u_targetCell: [col, row],
                                u_value: value
                        });
                        buffer.step();
                },

                init(data: Uint8Array): void {
                        buffer.init(data);
                },

                getDisplayTexture(): WebGLTexture {
                        return buffer.getTexture();
                },

                get width() {
                        return buffer.width;
                },

                get height() {
                        return buffer.height;
                },

                resize(width: number, height: number): void {
                        buffer.resize(width, height);
                },

                destroy(): void {
                        buffer.destroy();
                }
        };
}
