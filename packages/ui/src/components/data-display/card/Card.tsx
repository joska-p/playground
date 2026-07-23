import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { cardVariants, type CardVariantProps } from './variants';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardVariantProps {
  ref?: Ref<HTMLDivElement>;
}

export function Card({ className, variant, ref, children, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
