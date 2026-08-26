import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from './button.variants';
import { cn } from '../../lib/cn';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

function Button({
    className,
    variant,
    size,
    ref,
    ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button };
export type { ButtonProps };
