import { useState } from "react";

export function useControllableState<T>(
    value: T | undefined,
    defaultValue: T,
    onChange?: (v: T) => void,
): readonly [T, (v: T) => void] {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;
    const state = isControlled ? value : internal;

    const setState = (v: T) => {
        if (!isControlled) {
            setInternal(v);
        }

        onChange?.(v);
    };

    return [state, setState] as const;
}
