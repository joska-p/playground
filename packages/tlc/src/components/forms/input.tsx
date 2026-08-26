import { inputVariants } from './input.variants';
import { cn } from '../../lib/cn';
import { useFieldContext } from '../../lib/field-context';
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
    id: idProp,
    ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
    const fallbackId = undefined;
    const field = useFieldContext();
    const id = idProp ?? field?.id ?? fallbackId;

    return (
        <input
            ref={ref}
            id={id}
            className={cn(inputVariants({ variant, size }), className)}
            disabled={disabled}
            {...props}
        />
    );
}

export { Input };
export type { InputProps };
