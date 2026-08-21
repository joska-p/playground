import { checkboxVariants, type CheckboxVariants } from './variants';
import { cn } from '../../../lib/cn';
import { Spinner } from '../../widgets/spinner/Spinner';

import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, CheckboxVariants {
    label?: ReactNode;
    labelClassName?: string;
    loading?: boolean;
    ref?: Ref<HTMLInputElement>;
}

export function Checkbox({
    className,
    labelClassName,
    variant = 'primary',
    label,
    disabled = false,
    loading = false,
    id,
    ref,
    ...props
}: CheckboxProps) {
    const input = (
        <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled || loading}
            aria-busy={loading}
            className={cn(checkboxVariants({ variant }), className)}
            {...props}
        />
    );

    if (!label) return input;

    return (
        <label
            htmlFor={id}
            className={cn(
                'flex items-center gap-2.5 text-sm select-none',
                disabled || loading ? 'pointer-events-none opacity-40' : 'cursor-pointer',
                labelClassName
            )}
        >
            {input}
            {loading && <Spinner />}
            {label}
        </label>
    );
}
