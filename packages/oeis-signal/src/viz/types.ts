import type { Signal } from '../core/types';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';

export type Viz = {
    readonly id: string;
    readonly name: string;

    /** Called every frame. The viz is free to pull from the signal as needed. */
    render(
        signal: Signal,
        surface: CpuSurface // Surface | GpuRuntime – we keep it loose for now
    ): void;
};
