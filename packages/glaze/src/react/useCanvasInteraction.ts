import { useEffect, useEffectEvent, useRef, type RefObject } from 'react';
import type { InputStore } from '../cpu/createInputStore';
import type { Camera } from '../core/coords/camera';
import {
    createInteractionController,
    type FrameSnapshot,
    type InteractionContextBase,
    type InteractionControllerOptions,
    type InteractionOptions
} from './interaction';
import type { CameraControls } from './useCamera';

export type CanvasInteraction = {
    camera: Camera;
    controls: CameraControls;
    input: InputStore | null;
    getFrame(): FrameSnapshot | null;
};

export function useCanvasInteraction(
    target: RefObject<HTMLCanvasElement | null>,
    interaction: CanvasInteraction,
    options: InteractionOptions = {}
): void {
    const { camera, controls, input } = interaction;
    const { pan, zoom, panButton, pointerHandlers } = options;

    const controllerOptionsRef = useRef<InteractionControllerOptions | null>(null);
    const cameraRef = useRef(camera);
    const controlsRef = useRef(controls);
    const interactionRef = useRef(interaction);

    const getContext = useEffectEvent((): InteractionContextBase => {
        const canvas = target.current;
        const frame = interactionRef.current.getFrame();

        if (!canvas) {
            throw new Error('Canvas target is not available');
        }

        return {
            camera: cameraRef.current,
            input: input,
            width: canvas.clientWidth,
            height: canvas.clientHeight,
            dpr: frame?.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio),
            time: frame?.time ?? 0,
            deltaTime: frame?.deltaTime ?? 0,
            frameCount: frame?.frameCount ?? 0
        };
    });

    // Keep mutable refs and live options in sync without re-attaching listeners
    useEffect(() => {
        interactionRef.current = interaction;
        cameraRef.current = camera;
        controlsRef.current = controls;

        const opts = controllerOptionsRef.current;
        if (opts) {
            opts.handlers = pointerHandlers ?? {};
            opts.pan = pan ?? true;
            opts.zoom = zoom ?? true;
            opts.panButton = panButton;
        }
    });

    useEffect(() => {
        const canvas = target.current;
        if (!canvas || !input) return;

        input.attach(canvas);

        const opts: InteractionControllerOptions = {
            handlers: pointerHandlers ?? {},
            pan: pan ?? true,
            zoom: zoom ?? true,
            panButton: panButton,
            getContext,
            onPan(dx, dy) {
                const cam = cameraRef.current;
                cam.x += dx;
                cam.y += dy;
            },
            onZoom(deltaY, focalPoint) {
                const cam = cameraRef.current;
                controlsRef.current.zoomTo(cam.zoom * Math.exp(-deltaY * 0.002), focalPoint);
            }
        };

        controllerOptionsRef.current = opts;
        const controller = createInteractionController(opts);

        canvas.addEventListener('pointerdown', controller.onPointerDown);
        canvas.addEventListener('pointermove', controller.onPointerMove);
        canvas.addEventListener('pointerup', controller.onPointerUp);
        canvas.addEventListener('pointercancel', controller.onPointerCancel);
        canvas.addEventListener('wheel', controller.onWheel, { passive: false });
        canvas.addEventListener('contextmenu', controller.onContextMenu);

        return () => {
            canvas.removeEventListener('pointerdown', controller.onPointerDown);
            canvas.removeEventListener('pointermove', controller.onPointerMove);
            canvas.removeEventListener('pointerup', controller.onPointerUp);
            canvas.removeEventListener('pointercancel', controller.onPointerCancel);
            canvas.removeEventListener('wheel', controller.onWheel);
            canvas.removeEventListener('contextmenu', controller.onContextMenu);
            input.detach();
            controllerOptionsRef.current = null;
        };
    }, [target, input, pointerHandlers, pan, zoom, panButton]);
}
