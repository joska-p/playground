export type Sample = [number, number, number, number];

export type SurfaceProof = {
        circle: boolean;
        rect: boolean;
        line: boolean;
        text: boolean;
        samples: Record<string, Sample>;
        textCoverage: number;
};

export type ProgramCpuProof = {
        frame20: { sample: Sample; ok: boolean };
        frame36: { sample: Sample; ok: boolean; present: boolean } | null;
};

export type ProgramGpuProof = {
        frameA: Record<string, Sample>;
        frameB: Record<string, Sample> | null;
        changed: boolean;
        maxDelta: number;
};

export type GlazeProof = {
        surfaceCpu?: SurfaceProof;
        surfaceGpu?: SurfaceProof;
        programCpu?: ProgramCpuProof;
        programGpu?: ProgramGpuProof;
};

declare global {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- global augmentation must be an interface
        interface Window {
                __glazeProof?: GlazeProof;
        }
}

export function stashProof<K extends keyof GlazeProof>(
        key: K,
        value: NonNullable<GlazeProof[K]>
): void {
        window.__glazeProof = { ...(window.__glazeProof ?? {}), [key]: value };
}
