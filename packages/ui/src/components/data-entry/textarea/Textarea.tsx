import type { Ref, TextareaHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { textareaVariants } from './variants';

export type TextareaProps = {
    variant?: ColorVariant;
    autoGrow?: boolean;
    ref?: Ref<HTMLTextAreaElement>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
    className,
    variant,
    autoGrow = true,
    style,
    ref,
    ...props
}: TextareaProps) {
    return (
        <textarea
            ref={ref}
            className={cn(
                textareaVariants({ variant }),
                autoGrow && 'field-sizing-content max-h-[15lh] min-h-[3lh]',
                className
            )}
            style={style}
            {...props}
        />
    );
}
