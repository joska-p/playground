import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: ReactNode;
  variant?: ColorVariant;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function SectionHeading({
  label,
  title,
  description,
  variant = 'primary',
  className,
  style,
  ref,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={colorVarStyle(variant, style)}
      {...props}
    >
      <p className="mb-1 text-xs font-medium tracking-[2px] text-(--_color) uppercase">{label}</p>
      <h2 className="text-foreground text-xl font-light tracking-tight landscape:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="text-foreground-muted mt-1.5 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export { SectionHeading };
export type { SectionHeadingProps };
