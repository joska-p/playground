import { screenToWorld, type Camera, type Point2D } from '../core/coords/camera';

export type InputStore = {
    readonly pointer: Point2D;
    readonly pointerDelta: Point2D;
    readonly mouseDown: boolean;
    readonly mouseButtons: number;
    isKeyDown(code: string): boolean;
    wasKeyPressed(code: string): boolean;
    getPointerWorldPos(camera: Camera): Point2D;
    endFrame(): void;
    attach(target: HTMLElement): void;
    detach(): void;
    destroy(): void;
};

export function createInputStore(): InputStore {
    const pointer = { x: 0, y: 0 };
    const pointerDelta = { x: 0, y: 0 };
    const state = { mouseDown: false, mouseButtons: 0 };
    const keys = new Set<string>();
    const pressed = new Set<string>();
    let attached: HTMLElement | null = null;
    let lastPointer = { x: 0, y: 0 };

    const updatePointer = (event: PointerEvent): void => {
        const target = attached;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointerDelta.x = pointer.x - lastPointer.x;
        pointerDelta.y = pointer.y - lastPointer.y;
        lastPointer = { x: pointer.x, y: pointer.y };
    };

    const onPointerMove = (event: PointerEvent): void => {
        updatePointer(event);
    };
    const onPointerDown = (event: PointerEvent): void => {
        state.mouseDown = true;
        state.mouseButtons = event.buttons;
        updatePointer(event);
    };
    const onPointerUp = (event: PointerEvent): void => {
        state.mouseDown = false;
        state.mouseButtons = event.buttons;
        updatePointer(event);
    };
    const onPointerCancel = (): void => {
        state.mouseDown = false;
        state.mouseButtons = 0;
    };
    const onKeyDown = (event: KeyboardEvent): void => {
        keys.add(event.code);
        pressed.add(event.code);
    };
    const onKeyUp = (event: KeyboardEvent): void => {
        keys.delete(event.code);
    };

    const unbind = (): void => {
        if (!attached) return;
        attached.removeEventListener('pointermove', onPointerMove);
        attached.removeEventListener('pointerdown', onPointerDown);
        attached.removeEventListener('pointerup', onPointerUp);
        attached.removeEventListener('pointercancel', onPointerCancel);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        attached = null;
    };

    return {
        get pointer(): Point2D {
            return pointer;
        },
        get pointerDelta(): Point2D {
            return pointerDelta;
        },
        get mouseDown(): boolean {
            return state.mouseDown;
        },
        get mouseButtons(): number {
            return state.mouseButtons;
        },
        isKeyDown: (code: string): boolean => keys.has(code),
        wasKeyPressed: (code: string): boolean => pressed.has(code),
        getPointerWorldPos: (camera: Camera): Point2D => screenToWorld(camera)(pointer),
        endFrame(): void {
            pressed.clear();
        },
        attach(target: HTMLElement): void {
            unbind();
            attached = target;
            target.addEventListener('pointermove', onPointerMove);
            target.addEventListener('pointerdown', onPointerDown);
            target.addEventListener('pointerup', onPointerUp);
            target.addEventListener('pointercancel', onPointerCancel);
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);
        },
        detach(): void {
            unbind();
        },
        destroy(): void {
            unbind();
            keys.clear();
            pressed.clear();
        }
    };
}
