import type { Signal } from '../core/types';

/** No-op default middleware stage, so the pipeline always has one. */
export function identity(signal: Signal): Signal {
    return signal;
}
