import type { Camera, Point2D } from '../core/coords/camera';

type PointerEventName = 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel';

type PointerHandlerName = 'onPointerDown' | 'onPointerMove' | 'onPointerUp' | 'onPointerCancel';

const POINTER_HANDLER_BY_EVENT: Record<PointerEventName, PointerHandlerName> = {
    pointerdown: 'onPointerDown',
    pointermove: 'onPointerMove',
    pointerup: 'onPointerUp',
    pointercancel: 'onPointerCancel'
};

export type InputHandlers = {
    onPointerDown?: (event: PointerEvent, point: Point2D) => void;
    onPointerMove?: (event: PointerEvent, point: Point2D) => void;
    onPointerUp?: (event: PointerEvent, point: Point2D) => void;
    onPointerCancel?: (event: PointerEvent, point: Point2D) => void;
    onWheel?: (event: WheelEvent, point: Point2D) => void;
    onContextMenu?: (event: MouseEvent) => void;
};

export class InputStore {
    readonly pointer: Point2D = { x: 0, y: 0 };
    readonly pointerDelta: Point2D = { x: 0, y: 0 };
    readonly wheelPosition: Point2D = { x: 0, y: 0 };
    wheelDelta = 0;
    readonly #keys = new Set<string>();
    readonly #pressed = new Set<string>();
    readonly #subscribers = new Set<InputHandlers>();
    #mouseDown = false;
    #mouseButtons = 0;
    #attached: HTMLElement | null = null;
    #lastPointer: Point2D = { x: 0, y: 0 };

    get mouseDown(): boolean {
        return this.#mouseDown;
    }

    get mouseButtons(): number {
        return this.#mouseButtons;
    }

    isKeyDown(code: string): boolean {
        return this.#keys.has(code);
    }

    wasKeyPressed(code: string): boolean {
        return this.#pressed.has(code);
    }

    getPointerWorldPos(camera: Camera): Point2D {
        return camera.screenToWorld(this.pointer);
    }

    subscribe(handlers: InputHandlers): () => void {
        this.#subscribers.add(handlers);
        return () => {
            this.#subscribers.delete(handlers);
        };
    }

    endFrame(): void {
        this.#pressed.clear();
        this.wheelDelta = 0;
    }

    attach(target: HTMLElement): void {
        this.#unbind();
        this.#attached = target;
        target.addEventListener('pointermove', this.#onPointerMove);
        target.addEventListener('pointerdown', this.#onPointerDown);
        target.addEventListener('pointerup', this.#onPointerUp);
        target.addEventListener('pointercancel', this.#onPointerCancel);
        target.addEventListener('wheel', this.#onWheel, { passive: false });
        target.addEventListener('contextmenu', this.#onContextMenu);
        window.addEventListener('keydown', this.#onKeyDown);
        window.addEventListener('keyup', this.#onKeyUp);
    }

    detach(): void {
        this.#unbind();
    }

    destroy(): void {
        this.#unbind();
        this.#keys.clear();
        this.#pressed.clear();
        this.#subscribers.clear();
    }

    #updatePointer(event: PointerEvent): void {
        const target = this.#attached;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
        this.pointerDelta.x = this.pointer.x - this.#lastPointer.x;
        this.pointerDelta.y = this.pointer.y - this.#lastPointer.y;
        this.#lastPointer = { x: this.pointer.x, y: this.pointer.y };
    }

    #notifyPointer(eventName: PointerEventName, event: PointerEvent): void {
        const handlerName = POINTER_HANDLER_BY_EVENT[eventName];
        for (const handlers of this.#subscribers) {
            handlers[handlerName]?.(event, this.pointer);
        }
    }

    #onPointerMove = (event: PointerEvent): void => {
        this.#updatePointer(event);
        this.#notifyPointer('pointermove', event);
    };

    #onPointerDown = (event: PointerEvent): void => {
        this.#mouseDown = true;
        this.#mouseButtons = event.buttons;
        this.#updatePointer(event);
        this.#notifyPointer('pointerdown', event);
    };

    #onPointerUp = (event: PointerEvent): void => {
        this.#mouseDown = false;
        this.#mouseButtons = event.buttons;
        this.#updatePointer(event);
        this.#notifyPointer('pointerup', event);
    };

    #onPointerCancel = (event: PointerEvent): void => {
        this.#mouseDown = false;
        this.#mouseButtons = 0;
        this.#notifyPointer('pointercancel', event);
    };

    #onWheel = (event: WheelEvent): void => {
        const target = this.#attached;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        this.wheelPosition.x = event.clientX - rect.left;
        this.wheelPosition.y = event.clientY - rect.top;
        this.wheelDelta += event.deltaY;
        for (const handlers of this.#subscribers) {
            handlers.onWheel?.(event, this.wheelPosition);
        }
    };

    #onContextMenu = (event: MouseEvent): void => {
        for (const handlers of this.#subscribers) {
            handlers.onContextMenu?.(event);
        }
    };

    #onKeyDown = (event: KeyboardEvent): void => {
        this.#keys.add(event.code);
        this.#pressed.add(event.code);
    };

    #onKeyUp = (event: KeyboardEvent): void => {
        this.#keys.delete(event.code);
    };

    #unbind(): void {
        const target = this.#attached;
        if (!target) return;
        target.removeEventListener('pointermove', this.#onPointerMove);
        target.removeEventListener('pointerdown', this.#onPointerDown);
        target.removeEventListener('pointerup', this.#onPointerUp);
        target.removeEventListener('pointercancel', this.#onPointerCancel);
        target.removeEventListener('wheel', this.#onWheel);
        target.removeEventListener('contextmenu', this.#onContextMenu);
        window.removeEventListener('keydown', this.#onKeyDown);
        window.removeEventListener('keyup', this.#onKeyUp);
        this.#attached = null;
    }
}

export function createInputStore(): InputStore {
    return new InputStore();
}
