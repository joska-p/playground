import type { Point2D } from './Camera';

export type Brand<T, B extends string> = T & { readonly __brand: B };

export type ZoomFactor = Brand<number, 'ZoomFactor'>;
export type DurationSeconds = Brand<number, 'DurationSeconds'>;
export type TimeSpeed = Brand<number, 'TimeSpeed'>;
export type WheelSpeed = Brand<number, 'WheelSpeed'>;
export type Seconds = Brand<number, 'Seconds'>;
/**
 * Refinement of `Seconds` (assignable wherever `Seconds` is expected) rather than a sibling
 * `Brand`: stacking two brands on the same `__brand` key would intersect to `never`.
 */
export type NonNegativeSeconds = Seconds & { readonly __nonNegative: true };
export type Milliseconds = Brand<number, 'Milliseconds'>;

const MS_PER_SECOND = 1000;

export function assertFinite(value: number, label: string): void {
    if (!Number.isFinite(value)) {
        throw new Error(`Glaze: ${label} must be a finite number, received ${String(value)}`);
    }
}

export function assertStrictlyPositive(value: number, label: string): void {
    assertFinite(value, label);

    if (value <= 0) {
        throw new Error(`Glaze: ${label} must be strictly positive, received ${String(value)}`);
    }
}

export function createZoomFactor(value: number): ZoomFactor {
    assertStrictlyPositive(value, 'zoom factor');

    return value as ZoomFactor;
}

export function createDurationSeconds(value: number): DurationSeconds {
    assertStrictlyPositive(value, 'duration');

    return value as DurationSeconds;
}

export function createTimeSpeed(value: number): TimeSpeed {
    assertStrictlyPositive(value, 'time speed');

    return value as TimeSpeed;
}

export function createWheelSpeed(value: number): WheelSpeed {
    assertStrictlyPositive(value, 'wheel speed');

    return value as WheelSpeed;
}

export function createSeconds(value: number): Seconds {
    assertFinite(value, 'seconds');

    return value as Seconds;
}

export function createNonNegativeSeconds(value: number): NonNegativeSeconds {
    assertFinite(value, 'seconds');

    if (value < 0) {
        throw new Error(`Glaze: seconds must not be negative, received ${String(value)}`);
    }

    return value as NonNegativeSeconds;
}

export function createMilliseconds(value: number): Milliseconds {
    assertFinite(value, 'milliseconds');

    return value as Milliseconds;
}

export function msToSeconds(value: number): Seconds {
    return createSeconds(value / MS_PER_SECOND);
}

export function secondsToMs(value: number): Milliseconds {
    return createMilliseconds(value * MS_PER_SECOND);
}

// ---------------------------------------------------------------------------
// Shapes & rendering brands
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Shapes & rendering brands
// ---------------------------------------------------------------------------

export type CssColor = Brand<string, 'CssColor'>;
export type PositiveNumber = Brand<number, 'PositiveNumber'>;
export type FontSize = Brand<number, 'FontSize'>;
export type CanvasDimension = Brand<number, 'CanvasDimension'>;
export type BufferDimension = Brand<number, 'BufferDimension'>;
export type DevicePixelRatio = Brand<number, 'DevicePixelRatio'>;
export type StateData = Brand<Uint8Array, 'StateData'>;
export type NormalizedVec2 = Brand<{ readonly x: number; readonly y: number }, 'NormalizedVec2'>;
export type LineSegment = Brand<{ readonly a: Point2D; readonly b: Point2D }, 'LineSegment'>;

export function createNormalizedVec2(x: number, y: number): NormalizedVec2 {
    const lenSq = x * x + y * y;

    if (!Number.isFinite(lenSq) || Math.abs(lenSq - 1) > 1e-4) {
        throw new Error(
            `Glaze: vector must be normalized (x² + y² ≈ 1), received (${String(x)}, ${String(y)}) with length² ${String(lenSq)}`
        );
    }

    return { x, y } as NormalizedVec2;
}

export function createLineSegment(a: Point2D, b: Point2D): LineSegment {
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    if (Math.hypot(dx, dy) === 0) {
        throw new Error(
            `Glaze: line segment endpoints must be distinct, received a=(${String(a.x)}, ${String(a.y)}) and b=(${String(b.x)}, ${String(b.y)})`
        );
    }

    return { a, b } as LineSegment;
}

export function createBufferDimension(value: number): BufferDimension {
    if (!Number.isFinite(value) || value < 1) {
        throw new Error(`Glaze: buffer dimension must be >= 1, received ${String(value)}`);
    }

    return value as BufferDimension;
}

export function createStateData(
    data: Uint8Array,
    width: BufferDimension,
    height: BufferDimension
): StateData {
    const expectedLength = width * height;

    if (data.length !== expectedLength) {
        throw new Error(
            `Glaze: StateData length ${String(data.length)} does not match ${String(width)}x${String(height)} cells`
        );
    }

    return data as StateData;
}

export function createCssColor(value: string): CssColor {
    if (value.length === 0) {
        throw new Error('Glaze: color must not be empty');
    }

    return value as CssColor;
}

export function createPositiveNumber(value: number): PositiveNumber {
    assertStrictlyPositive(value, 'positive number');

    return value as PositiveNumber;
}

export function createFontSize(value: number): FontSize {
    assertStrictlyPositive(value, 'font size');

    return value as FontSize;
}

export function createCanvasDimension(value: number): CanvasDimension {
    if (!Number.isFinite(value) || value < 1) {
        throw new Error(`Glaze: canvas dimension must be >= 1, received ${String(value)}`);
    }

    return value as CanvasDimension;
}

export function createDevicePixelRatio(value: number): DevicePixelRatio {
    assertStrictlyPositive(value, 'device pixel ratio');

    return value as DevicePixelRatio;
}
