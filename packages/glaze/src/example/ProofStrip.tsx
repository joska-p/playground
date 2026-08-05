import { useEffect, useState } from 'react';
import type { GlazeProof, ProgramCpuProof, ProgramGpuProof, SurfaceProof } from './proof/types';

const CHECKS = [
        { key: 'surfaceCpu', label: 'surface cpu' },
        { key: 'surfaceGpu', label: 'surface gpu' },
        { key: 'programCpu', label: 'program cpu' },
        { key: 'programGpu', label: 'program gpu' }
] as const;

type CheckKey = (typeof CHECKS)[number]['key'];

function isPass(key: CheckKey, value: GlazeProof[keyof GlazeProof] | undefined): boolean {
        if (key === 'surfaceCpu' || key === 'surfaceGpu') {
                const surface = value as SurfaceProof | undefined;
                return !!surface && surface.circle && surface.rect && surface.line && surface.text;
        }
        if (key === 'programCpu') {
                const program = value as ProgramCpuProof | undefined;
                return (
                        !!program?.frame36 &&
                        program.frame20.ok &&
                        program.frame36.ok &&
                        program.frame36.present
                );
        }
        const gpu = value as ProgramGpuProof | undefined;
        return !!gpu?.changed;
}

export function ProofStrip() {
        const [, setTick] = useState(0);

        useEffect(() => {
                const id = setInterval(() => {
                        setTick((tick) => tick + 1);
                }, 300);
                return () => {
                        clearInterval(id);
                };
        }, []);

        const proof = window.__glazeProof;

        return (
                <div className="flex flex-wrap items-center gap-2">
                        {CHECKS.map(({ key, label }) => {
                                const value = proof?.[key];
                                const status =
                                        value === undefined
                                                ? 'pending'
                                                : isPass(key, value)
                                                  ? 'pass'
                                                  : 'fail';
                                const className =
                                        status === 'pending'
                                                ? 'bg-white/5 text-neutral-500'
                                                : status === 'pass'
                                                  ? 'bg-emerald-400/15 text-emerald-300'
                                                  : 'bg-rose-400/15 text-rose-300';
                                return (
                                        <span
                                                key={key}
                                                className={`rounded px-2 py-0.5 font-mono text-[10px] ${className}`}
                                        >
                                                {label} · {status}
                                        </span>
                                );
                        })}
                </div>
        );
}
