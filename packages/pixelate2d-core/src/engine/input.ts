import { type Camera, type Vec2, screenToWorld } from '@repo/pixelate2d-math';

/**
 * Non-blocking poll store for pointer and keyboard state. Events just update
 * a closure; nothing is pushed to React, so reading state inside the render
 * loop never triggers a re-render.
 */
export type InputStore = {
  /** Pointer position in CSS pixels relative to the attached element. */
  readonly pointer: Vec2;
  /** Pointer movement since the last event (not the last frame). */
  readonly pointerDelta: Vec2;
  readonly mouseDown: boolean;
  /** Bitmask of currently pressed mouse buttons (see `MouseEvent.buttons`). */
  readonly mouseButtons: number;
  isKeyDown(code: string): boolean;
  /** True if the key went down since the previous frame. */
  wasKeyPressed(code: string): boolean;
  /** Pointer position converted into world space for a camera. */
  getPointerWorldPos(camera: Camera): Vec2;
  /** Called by the engine at the end of each frame to consume edge events. */
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
    get pointer(): Vec2 {
      return pointer;
    },
    get pointerDelta(): Vec2 {
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
    getPointerWorldPos: (camera: Camera): Vec2 => screenToWorld(camera)(pointer),
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
    },
  };
}
