import { useEffect, useRef, useState } from 'react';
import type { CpuRuntime } from '@repo/glaze/cpu/createCpuRuntime';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import type { Point2D } from '@repo/glaze/core/coords/camera';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { useCamera } from '@repo/glaze/react/useCamera';
import { useFrame } from '@repo/glaze/react/useFrame';
import { readCpuPixel } from '../proof/sample';
import { stashProof, type Sample } from '../proof/types';

const isRed = (pixel: Sample): boolean =>
        pixel[0] > 150 && pixel[0] > pixel[1] + 50 && pixel[0] > pixel[2] + 50;

const CENTER: Point2D = { x: 200, y: 150 };
const ORBIT = 90;
const RADIUS = 24;
const SPEED = 8;

export function ProgramCpu() {
        const [runtime, setRuntime] = useState<CpuRuntime | null>(null);
        const [camera, controls] = useCamera({ zoom: 1 });
        const phaseRef = useRef(0);

        useFrame((time) => {
                phaseRef.current = time * SPEED;
        });

        useEffect(() => {
                if (!runtime) return;
                let frame20: { position: Point2D; sample: Sample; ok: boolean } | null = null;
                return runtime.subscribe((ctx) => {
                        const angle = phaseRef.current;
                        const position: Point2D = {
                                x: CENTER.x + ORBIT * Math.cos(angle),
                                y: CENTER.y + ORBIT * Math.sin(angle)
                        };
                        runtime.clear('#0f172a');
                        runtime.applyCamera();
                        drawCircle(runtime.context, { fill: '#e11d48' }, position, RADIUS);
                        drawCircle(runtime.context, { fill: '#38bdf8' }, CENTER, 5);
                        if (ctx.frameCount === 20) {
                                const sample = readCpuPixel(runtime, position.x, position.y, ctx.dpr);
                                frame20 = { position, sample, ok: isRed(sample) };
                                stashProof('programCpu', {
                                        frame20: { sample, ok: isRed(sample) },
                                        frame36: null
                                });
                        }
                        if (ctx.frameCount === 36 && frame20) {
                                const left = readCpuPixel(
                                        runtime,
                                        frame20.position.x,
                                        frame20.position.y,
                                        ctx.dpr
                                );
                                const present = readCpuPixel(runtime, position.x, position.y, ctx.dpr);
                                stashProof('programCpu', {
                                        frame20: { sample: frame20.sample, ok: frame20.ok },
                                        frame36: {
                                                sample: left,
                                                ok: !isRed(left),
                                                present: isRed(present)
                                        }
                                });
                        }
                });
        }, [runtime]);

        return (
                <div className="h-[300px] w-[400px]">
                        <CpuCanvas
                                onRuntime={setRuntime}
                                camera={camera}
                                cameraControls={controls}
                                className="h-full w-full"
                        />
                </div>
        );
}
