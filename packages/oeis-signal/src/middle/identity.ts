import type { Signal } from '../core/types';

/** Middleware that does nothing. Useful as a starting point and as a default in the pipeline. */
export function identity(signal: Signal): Signal {
    return signal;
}
