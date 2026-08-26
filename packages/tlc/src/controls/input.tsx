import { inputVariants } from './input.variants';
import { cn } from '../lib/cn';
import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';

interface InputProps
    extends
        Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
        VariantProps<typeof inputVariants> {}

function Input({
    className,
    variant,
    size,
    disabled = false,
    ref,
    ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
    return (
        <input
            ref={ref}
            className={cn(inputVariants({ variant, size }), className)}
            disabled={disabled}
            {...props}
        />
    );
}

export { Input };
export type { InputProps };
