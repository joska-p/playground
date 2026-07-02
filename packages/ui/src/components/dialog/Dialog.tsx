import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { dialogVariants } from './dialogVariants';

type DialogProps = {
  children: ReactNode;
} & ComponentProps<'dialog'> &
  VariantProps<typeof dialogVariants>;

function Dialog({ children, className, variant, ...props }: DialogProps) {
  return (
    <dialog
      className={cn(dialogVariants({ variant }), className)}
      {...props}
    >
      {children}
    </dialog>
  );
}

export { Dialog };
export type { DialogProps };
