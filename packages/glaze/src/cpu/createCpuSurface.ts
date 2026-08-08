import { CpuSurface, type CpuSurfaceConfig, type CpuDraw } from './CpuSurface';

export type { CpuSurfaceConfig, CpuDraw };
export { CpuSurface };

export function createCpuSurface(config: CpuSurfaceConfig): CpuSurface {
    return new CpuSurface(config);
}
