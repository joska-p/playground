import {
        useEffect,
        useEffectEvent,
        useRef,
        useState,
        type CSSProperties,
        type ReactNode
} from 'react';
import {
        createGpuDoor,
        type GpuDoor,
        type GpuDraw,
        type GpuFrameContext
} from '../gpu/createGpuDoor';
import type { Program } from '../gpu/shader/createProgram';
import type { Camera } from '../core/coords/camera';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';
import type { UniformValue } from '../gpu/shader/compileProgram';

export type GpuCanvasProps = {
        fragmentShader?: string;
        uniforms?: (context: GpuFrameContext) => Record<string, UniformValue>;
        onFrame?: GpuDraw | null;
        onDoor?: (door: GpuDoor | null) => void;
        camera?: Camera;
        cameraControls?: CameraControls;
        initialCamera?: CameraOptions;
        pan?: boolean;
        zoom?: boolean;
        dpr?: number;
        className?: string;
        style?: CSSProperties;
        children?: ReactNode;
};

export function GpuCanvas({
        fragmentShader,
        uniforms,
        onFrame,
        onDoor,
        camera: externalCamera,
        cameraControls,
        initialCamera,
        pan = true,
        zoom = true,
        dpr,
        className,
        style,
        children
}: GpuCanvasProps) {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const [internalCamera, internalControls] = useCamera(initialCamera);
        const camera = externalCamera ?? internalCamera;
        const controls = cameraControls ?? internalControls;
        const [door, setDoor] = useState<GpuDoor | null>(null);
        const programRef = useRef<Program | null>(null);
        const uniformsRef = useRef(uniforms);

        // Synchronisation de la ref sans re-render
        useEffect(() => {
                uniformsRef.current = uniforms;
        });

        // Action non-réactive au montage du Canvas (React 19)
        const initDoor = useEffectEvent((canvas: HTMLCanvasElement) => {
                return createGpuDoor({ canvas, camera, ...(dpr !== undefined ? { dpr } : {}) });
        });

        // Cycle de vie unique de la Door
        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const instance = initDoor(canvas);
                setDoor(instance);

                return () => {
                        instance.destroy();
                        setDoor(null);
                };
        }, []);

        // Gestion du program WebGL
        useEffect(() => {
                if (!door || !fragmentShader) return;
                const program = door.createProgram(fragmentShader);
                programRef.current = program;

                return () => {
                        program.destroy();
                        programRef.current = null;
                };
        }, [door, fragmentShader]);

        // Boucle de rendu (FrameLoop / RenderLoop)
        useEffect(() => {
                door?.setDraw(
                        (onFrame ?? fragmentShader)
                                ? (ctx) => {
                                          const program = programRef.current;
                                          if (program) {
                                                  program.setUniforms(
                                                          uniformsRef.current
                                                                  ? uniformsRef.current(ctx)
                                                                  : {}
                                                  );
                                                  door.renderProgram(program);
                                          }
                                          onFrame?.(ctx);
                                  }
                                : null
                );
        });

        // Notification du parent
        useEffect(() => {
                onDoor?.(door);
                return () => onDoor?.(null);
        }, [door, onDoor]);

        // Gestes : Pan via Pointer Events
        const gestures = pan ? controls.bindGestures({ pan: true, zoom: false }) : undefined;

        // Zoom : Attachement direct sur l'élément DOM (non-passive wheel listener)
        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas || !zoom) return;
                return controls.attachWheel(canvas);
        }, [controls, zoom]);

        return (
                <div
                        className={className}
                        style={{ position: 'relative', overflow: 'hidden', ...style }}
                >
                        <canvas
                                ref={canvasRef}
                                {...gestures}
                                style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'block',
                                        touchAction: pan || zoom ? 'none' : 'auto'
                                }}
                        />
                        {children}
                </div>
        );
}
