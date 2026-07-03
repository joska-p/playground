import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { helperTextVariants } from './helperTextVariants';

type HelperTextProps = {
  children: ReactNode;
  id?: string;
  className?: string;
} & VariantProps<typeof helperTextVariants>;

function HelperText({ children, id, variant, className }: HelperTextProps) {
  return (
    <p
      id={id}
      className={cn(helperTextVariants({ variant }), className)}
    >
      {children}
    </p>
  );
}

export { HelperText };
