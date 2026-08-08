import { GpuSurface, type GpuSurfaceConfig, type GpuDraw } from './GpuSurface';

export type { GpuSurfaceConfig, GpuDraw };
export { GpuSurface };

export function createGpuSurface(config: GpuSurfaceConfig): GpuSurface {
    return new GpuSurface(config);
}
