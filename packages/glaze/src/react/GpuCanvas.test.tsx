import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GpuDoor } from '../gpu/createGpuDoor';
import type { UniformValue } from '../gpu/shader/compileProgram';
import { GpuCanvas } from './GpuCanvas';

let rafCallback: FrameRequestCallback | null = null;

const stubRaf = (): void => {
        rafCallback = null;
        vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback): number => {
                rafCallback = callback;
                return 1;
        });
        vi.stubGlobal('cancelAnimationFrame', vi.fn());
};

const fireRaf = (time: number): void => {
        const callback = rafCallback;
        rafCallback = null;
        if (callback) callback(time);
};

const FLOAT = 0x1406;
const ACTIVE_UNIFORMS = 0x8b86;

function createFakeGl() {
        const uniform1f = vi.fn();
        const drawArrays = vi.fn();
        const gl = {
                VERTEX_SHADER: 0x8b31,
                FRAGMENT_SHADER: 0x8b30,
                COMPILE_STATUS: 0x8b81,
                LINK_STATUS: 0x8b82,
                ACTIVE_UNIFORMS,
                DEPTH_TEST: 0x0b71,
                BLEND: 0x0be2,
                SRC_ALPHA: 0x0302,
                ONE_MINUS_SRC_ALPHA: 0x0303,
                COLOR_BUFFER_BIT: 0x4000,
                TRIANGLES: 0x0004,
                FLOAT,
                createShader: vi.fn(() => ({})),
                shaderSource: vi.fn(),
                compileShader: vi.fn(),
                getShaderParameter: vi.fn(() => true),
                getShaderInfoLog: vi.fn(() => ''),
                createProgram: vi.fn(() => ({})),
                attachShader: vi.fn(),
                linkProgram: vi.fn(),
                getProgramParameter: vi.fn((_program: unknown, pname: number) =>
                        pname === ACTIVE_UNIFORMS ? 2 : true
                ),
                getActiveUniform: vi.fn((_program: unknown, index: number) =>
                        index < 2
                                ? { name: ['u_time', 'u_custom'][index], type: FLOAT, size: 1 }
                                : null
                ),
                getUniformLocation: vi.fn((_program: unknown, name: string) => ({ name })),
                deleteShader: vi.fn(),
                deleteProgram: vi.fn(),
                createVertexArray: vi.fn(() => ({})),
                deleteVertexArray: vi.fn(),
                useProgram: vi.fn(),
                bindVertexArray: vi.fn(),
                viewport: vi.fn(),
                drawArrays,
                clear: vi.fn(),
                clearColor: vi.fn(),
                disable: vi.fn(),
                enable: vi.fn(),
                blendFunc: vi.fn(),
                uniform1f
        };
        return { gl, uniform1f, drawArrays };
}

const last = <T,>(values: T[]): T | undefined => values[values.length - 1];

let fake: ReturnType<typeof createFakeGl>;

beforeEach(() => {
        fake = createFakeGl();
        vi.stubGlobal(
                'WebGLTexture', // eslint-disable-next-line @typescript-eslint/no-extraneous-class
                class WebGLTexture {}
        );
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
                fake.gl as unknown as WebGL2RenderingContext
        );
});

afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
});

describe('GpuCanvas', () => {
        it('compiles the fragment shader, drives it every frame, and applies standard + custom uniforms', () => {
                stubRaf();
                const uniforms = (ctx: { time: number }): Record<string, UniformValue> => ({
                        u_custom: ctx.time
                });
                const doors: (GpuDoor | null)[] = [];
                const container = document.createElement('div');
                document.body.appendChild(container);
                const root = createRoot(container);

                act(() => {
                        root.render(
                                <GpuCanvas
                                        fragmentShader="void main() { out_color = vec4(1.0); }"
                                        uniforms={uniforms}
                                        onDoor={(door) => doors.push(door)}
                                />
                        );
                });
                expect(doors.some((door) => door !== null)).toBe(true);
                expect(fake.gl.createProgram).toHaveBeenCalledTimes(1);
                expect(fake.drawArrays).toHaveBeenCalledTimes(1);

                act(() => {
                        fireRaf(1500);
                });
                expect(fake.drawArrays).toHaveBeenCalledTimes(2);
                const uniformValues = (name: string): number[] =>
                        fake.uniform1f.mock.calls
                                .filter((call) => (call[0] as { name: string }).name === name)
                                .map((call) => call[1] as number);
                expect(last(uniformValues('u_time'))).toBe(1.5);
                expect(last(uniformValues('u_custom'))).toBe(1.5);

                act(() => {
                        fireRaf(2500);
                });
                expect(last(uniformValues('u_time'))).toBe(2.5);
                expect(last(uniformValues('u_custom'))).toBe(2.5);

                act(() => {
                        root.unmount();
                });
                container.remove();
        });

        it('recompiles when the fragment shader changes and frees programs on change and unmount', () => {
                stubRaf();
                const container = document.createElement('div');
                document.body.appendChild(container);
                const root = createRoot(container);

                act(() => {
                        root.render(
                                <GpuCanvas fragmentShader="void main() { out_color = vec4(1.0); }" />
                        );
                });
                expect(fake.gl.createProgram).toHaveBeenCalledTimes(1);

                act(() => {
                        root.render(
                                <GpuCanvas fragmentShader="void main() { out_color = vec4(0.5); }" />
                        );
                });
                expect(fake.gl.createProgram).toHaveBeenCalledTimes(2);
                expect(fake.gl.deleteProgram).toHaveBeenCalledTimes(1);

                act(() => {
                        root.unmount();
                });
                expect(fake.gl.deleteProgram).toHaveBeenCalledTimes(2);

                container.remove();
        });

        it('does not start the loop when there is nothing to draw', () => {
                stubRaf();
                const container = document.createElement('div');
                document.body.appendChild(container);
                const root = createRoot(container);

                act(() => {
                        root.render(<GpuCanvas />);
                });
                expect(fake.drawArrays).not.toHaveBeenCalled();

                act(() => {
                        fireRaf(1500);
                });
                expect(fake.drawArrays).not.toHaveBeenCalled();

                act(() => {
                        root.unmount();
                });
                container.remove();
        });
});
