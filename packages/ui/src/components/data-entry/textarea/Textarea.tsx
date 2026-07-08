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
  variant = 'primary',
  autoGrow = true,
  style,
  ref,
  ...props
}: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ variant }), autoGrow && 'textarea-auto', className)}
      style={style}
      {...props}
    />
  );
}
