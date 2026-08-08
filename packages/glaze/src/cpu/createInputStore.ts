import type { Camera, Point2D } from '../core/coords/camera';

export class InputStore {
    readonly pointer: Point2D = { x: 0, y: 0 };
    readonly pointerDelta: Point2D = { x: 0, y: 0 };
    readonly #keys = new Set<string>();
    readonly #pressed = new Set<string>();
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

    endFrame(): void {
        this.#pressed.clear();
    }

    attach(target: HTMLElement): void {
        this.#unbind();
        this.#attached = target;
        target.addEventListener('pointermove', this.#onPointerMove);
        target.addEventListener('pointerdown', this.#onPointerDown);
        target.addEventListener('pointerup', this.#onPointerUp);
        target.addEventListener('pointercancel', this.#onPointerCancel);
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

    #onPointerMove = (event: PointerEvent): void => {
        this.#updatePointer(event);
    };

    #onPointerDown = (event: PointerEvent): void => {
        this.#mouseDown = true;
        this.#mouseButtons = event.buttons;
        this.#updatePointer(event);
    };

    #onPointerUp = (event: PointerEvent): void => {
        this.#mouseDown = false;
        this.#mouseButtons = event.buttons;
        this.#updatePointer(event);
    };

    #onPointerCancel = (): void => {
        this.#mouseDown = false;
        this.#mouseButtons = 0;
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
        window.removeEventListener('keydown', this.#onKeyDown);
        window.removeEventListener('keyup', this.#onKeyUp);
        this.#attached = null;
    }
}

export function createInputStore(): InputStore {
    return new InputStore();
}
