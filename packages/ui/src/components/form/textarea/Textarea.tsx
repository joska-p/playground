import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import { cn } from '../../../utils/cn';
import { HelperText } from '../../elements/helper-text/HelperText';
import { textareaVariants } from './textareaVariants';

type TextareaProps = {
  label?: string;
  helperText?: string;
} & ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants>;

function Textarea({ ref, className, variant, label, helperText, id, ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-muted-foreground text-xs"
        >
          {label}
        </label>
      )}
      <div className={cn(textareaVariants({ variant }), className)}>
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'placeholder:text-foreground-dim field-sizing-content max-h-[15lh] min-h-[3lh] w-full resize-y bg-transparent py-2 outline-none'
          )}
          {...props}
        />
      </div>
      {helperText && (
        <HelperText variant={variant === 'destructive' ? 'destructive' : 'default'}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}

export { Textarea };
