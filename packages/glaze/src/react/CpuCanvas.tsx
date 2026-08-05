import {
        useEffect,
        useEffectEvent,
        useRef,
        useState,
        type CSSProperties,
        type ReactNode
} from 'react';
import { createCpuDoor, type CpuDoor, type CpuDraw } from '../cpu/createCpuDoor';
import type { Camera } from '../core/coords/camera';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type CpuCanvasProps = {
        onFrame?: CpuDraw | null;
        onDoor?: (door: CpuDoor | null) => void;
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

export function CpuCanvas({
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
}: CpuCanvasProps) {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const [internalCamera, internalControls] = useCamera(initialCamera);
        const camera = externalCamera ?? internalCamera;
        const controls = cameraControls ?? internalControls;
        const [door, setDoor] = useState<CpuDoor | null>(null);
        const onFrameRef = useRef(onFrame);

        // Synchronisation de la ref pour le callback
        useEffect(() => {
                onFrameRef.current = onFrame;
        });

        // Action d'initialisation non-réactive au montage (React 19)
        const initDoor = useEffectEvent((canvas: HTMLCanvasElement) => {
                return createCpuDoor({ canvas, camera, ...(dpr !== undefined ? { dpr } : {}) });
        });

        // Initialisation et nettoyage unique du CpuDoor
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

        // Transmission de la boucle de rendu
        useEffect(() => {
                door?.setDraw(onFrame ? (ctx) => onFrameRef.current?.(ctx) : null);
        });

        // Notification du door au parent
        useEffect(() => {
                onDoor?.(door);
                return () => onDoor?.(null);
        }, [door, onDoor]);

        // Gestes : Pan
        const gestures = pan ? controls.bindGestures({ pan: true }) : undefined;

        // Gestes : Zoom (évenement DOM non-passif)
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
