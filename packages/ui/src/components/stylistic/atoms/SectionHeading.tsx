import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';

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
} & ComponentProps<'div'>;

function SectionHeading({
  label,
  title,
  description,
  labelColor = 'primary',
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(className)}
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
