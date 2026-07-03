import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { sectionHeadingVariants } from './sectionHeadingVariants';

type LabelColor = 'primary' | 'secondary' | 'accent' | 'destructive' | 'warning' | 'blue';

const labelColorMap: Record<LabelColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  destructive: 'text-destructive',
  warning: 'text-warning',
  blue: 'text-blue'
};

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: ReactNode;
  labelColor?: LabelColor;
} & ComponentProps<'div'> &
  VariantProps<typeof sectionHeadingVariants>;

function SectionHeading({
  label,
  title,
  description,
  labelColor = 'primary',
  align,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(sectionHeadingVariants({ align }), className)}
      {...props}
    >
      <p
        className={cn(
          labelColorMap[labelColor],
          'mb-1 text-xs font-medium tracking-[2px] uppercase'
        )}
      >
        {label}
      </p>
      <h2
        className="text-foreground font-light tracking-tight"
        style={{ fontSize: 'clamp(24px,3.5vw,32px)' }}
      >
        {title}
      </h2>
      {description && <p className="text-foreground-muted mt-1.5 text-[13px]">{description}</p>}
    </div>
  );
}

export { SectionHeading };
export type { LabelColor, SectionHeadingProps };
