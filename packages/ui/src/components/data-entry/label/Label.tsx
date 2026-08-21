import { labelVariants, type LabelVariants } from './variants';
import { cn } from '../../../lib/cn';

import type { LabelHTMLAttributes, Ref } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, LabelVariants {
    /** Visual only — shows a `*`; does NOT set the HTML `required` attribute. */
    required?: boolean;
    ref?: Ref<HTMLLabelElement>;
}

export function Label({
    className,
    variant,
    size,
    disabled = false,
    required,
    children,
    ref,
    ...props
}: LabelProps) {
    return (
        <label
            ref={ref}
            className={cn(labelVariants({ variant, size, disabled }), className)}
            aria-disabled={disabled ?? undefined}
            {...props}
        >
            {children}
            {required && (
                <span
                    className="text-destructive"
                    aria-hidden="true"
                >
                    *
                </span>
            )}
        </label>
    );
}
