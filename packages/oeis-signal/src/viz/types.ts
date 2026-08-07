import type { Signal } from '../core/types';

/** Frame context we care about from glaze (both CPU & GPU) */
export type VizFrameContext = {
    width: number;
    height: number;
    time: number;
    // we can expand later with camera, input, etc.
};

/**
 * A visualization that knows how to draw a signal.
 * It receives a glaze runtime (CPU or GPU) and the current frame info.
 */
export type Viz = {
    readonly id: string;
    readonly name: string;

    /** Called every frame. The viz is free to pull from the signal as needed. */
    render(
        signal: Signal,
        runtime: any, // CpuRuntime | GpuRuntime – we keep it loose for now
        ctx: VizFrameContext
    ): void;
};
