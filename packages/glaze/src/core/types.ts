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
