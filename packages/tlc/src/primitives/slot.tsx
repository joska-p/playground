import { cloneElement, isValidElement, type ReactElement } from 'react';

export function Slot({
    children,
    ...props
}: {
    children: ReactElement;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>) {
    if (isValidElement(children)) {
        return cloneElement(children, props as Record<string, unknown>);
    }

    return null;
}
