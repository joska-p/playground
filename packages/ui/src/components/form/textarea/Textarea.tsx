import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { HelperText } from '../../elements/helper-text/HelperText';
import { textareaVariants } from './textareaVariants';

export type TextAreaProps = {
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
} & ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants>;

function TextArea({
  ref,
  className,
  variant,
  label,
  helperText,
  fullWidth = true,
  id,
  ...props
}: TextAreaProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={id}
          className="text-muted-foreground text-xs"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(textareaVariants({ variant }), className)}
        {...props}
      />
      {helperText && (
        <HelperText variant={variant === 'destructive' ? 'destructive' : 'default'}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}

export { TextArea };
