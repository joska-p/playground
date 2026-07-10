import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { sectionHeadingVariants, type SectionHeadingVariants } from './variants';

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLDivElement>, SectionHeadingVariants {
  label: string;
  title: string;
  description?: ReactNode;
  loading?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function SectionHeading({
  label,
  title,
  description,
  variant = 'primary',
  loading = false,
  className,
  ref,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      ref={ref}
      className={cn(sectionHeadingVariants({ variant }), className)}
      aria-busy={loading}
      {...props}
    >
      <p className="text-foreground-dim mb-4 text-xs font-medium tracking-tight uppercase">
        {label}
      </p>
      <h2 className="mb-2 text-xl font-light tracking-tight landscape:text-2xl">{title}</h2>
      {description && <p className="mb-6 text-sm leading-relaxed text-current/80">{description}</p>}
    </div>
  );
}
