import { inputVariants, type InputVariants } from './variants';
import { cn } from '../../../lib/cn';

import type { InputHTMLAttributes, Ref } from 'react';

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariants {
    loading?: boolean;
    ref?: Ref<HTMLInputElement>;
}

export function Input({ className, variant, size, disabled = false, ref, ...props }: InputProps) {
    return (
        <input
            ref={ref}
            className={cn(inputVariants({ variant, size }), className)}
            disabled={disabled}
            {...props}
        />
    );
}
