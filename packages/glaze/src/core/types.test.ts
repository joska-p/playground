import { describe, expect, expectTypeOf, it } from 'vitest';

import {
    createDurationSeconds,
    createMilliseconds,
    createSeconds,
    createTimeSpeed,
    createWheelSpeed,
    createZoomFactor,
    msToSeconds,
    secondsToMs
} from './types';

const positiveFactories = [
    createZoomFactor,
    createDurationSeconds,
    createTimeSpeed,
    createWheelSpeed
] as const;

describe('strictly positive brands', () => {
    it.each(positiveFactories)('accepts strictly positive finite values (%#)', (create) => {
        expect(create(0.5)).toBe(0.5);
        expect(create(1)).toBe(1);
        expect(create(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    });

    it.each(positiveFactories)('rejects zero, negatives and non-finite values (%#)', (create) => {
        expect(() => create(0)).toThrow();
        expect(() => create(-1)).toThrow();
        expect(() => create(Number.NaN)).toThrow();
        expect(() => create(Number.POSITIVE_INFINITY)).toThrow();
        expect(() => create(Number.NEGATIVE_INFINITY)).toThrow();
    });

    it('reports the violated invariant in its error', () => {
        expect(() => createZoomFactor(-2)).toThrow(
            'Glaze: zoom factor must be strictly positive, received -2'
        );
        expect(() => createZoomFactor(Number.NaN)).toThrow(
            'Glaze: zoom factor must be a finite number, received NaN'
        );
    });
});

describe('time brands', () => {
    it('accepts zero and negative finite values', () => {
        expect(createSeconds(0)).toBe(0);
        expect(createSeconds(-1.5)).toBe(-1.5);
        expect(createMilliseconds(0)).toBe(0);
        expect(createMilliseconds(-16.6)).toBe(-16.6);
    });

    it('rejects non-finite values', () => {
        expect(() => createSeconds(Number.NaN)).toThrow();
        expect(() => createSeconds(Number.POSITIVE_INFINITY)).toThrow();
        expect(() => createMilliseconds(Number.NaN)).toThrow();
        expect(() => createMilliseconds(Number.NEGATIVE_INFINITY)).toThrow();
    });

    it('keeps second and millisecond brands distinct', () => {
        expectTypeOf(createSeconds(1)).not.toEqualTypeOf(createMilliseconds(1));
        expectTypeOf(createZoomFactor(1)).not.toEqualTypeOf(createTimeSpeed(1));
    });
});

describe('unit conversions', () => {
    it('converts milliseconds to seconds', () => {
        expect(msToSeconds(1000)).toBe(1);
        expect(msToSeconds(250)).toBe(0.25);
        expect(msToSeconds(-500)).toBe(-0.5);
    });

    it('converts seconds to milliseconds', () => {
        expect(secondsToMs(2)).toBe(2000);
        expect(secondsToMs(0.25)).toBe(250);
    });

    it('round-trips through both directions', () => {
        expect(secondsToMs(msToSeconds(1234))).toBeCloseTo(1234, 9);
        expect(msToSeconds(secondsToMs(0.75))).toBeCloseTo(0.75, 12);
    });

    it('rejects non-finite inputs', () => {
        expect(() => msToSeconds(Number.NaN)).toThrow();
        expect(() => msToSeconds(Number.POSITIVE_INFINITY)).toThrow();
        expect(() => secondsToMs(Number.NaN)).toThrow();
        expect(() => secondsToMs(Number.NEGATIVE_INFINITY)).toThrow();
    });
});
