import type { CpuRuntime } from '@repo/glaze/cpu/createCpuRuntime';
import type { Sample } from './types';

export const readGpuPixel = (
        gl: WebGL2RenderingContext,
        height: number,
        dpr: number,
        x: number,
        y: number
): Sample => {
        const pixel = new Uint8Array(4);
        gl.readPixels(
                Math.round(x * dpr),
                Math.round(height * dpr - 1 - y * dpr),
                1,
                1,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                pixel
        );
        return [pixel[0] ?? 0, pixel[1] ?? 0, pixel[2] ?? 0, pixel[3] ?? 0];
};

export const readCpuPixel = (door: CpuRuntime, x: number, y: number, dpr: number): Sample => {
        const data = door.context.getImageData(Math.round(x * dpr), Math.round(y * dpr), 1, 1).data;
        return [data[0] ?? 0, data[1] ?? 0, data[2] ?? 0, data[3] ?? 0];
};
