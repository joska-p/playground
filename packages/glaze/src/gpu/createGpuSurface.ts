import { GpuSurface, type GpuSurfaceConfig, type GpuDraw, type GpuFrameContext } from './GpuSurface';

export type { GpuSurfaceConfig, GpuDraw, GpuFrameContext };
export { GpuSurface };

export function createGpuSurface(config: GpuSurfaceConfig): GpuSurface {
    return new GpuSurface(config);
}
