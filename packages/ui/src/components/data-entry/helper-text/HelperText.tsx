import type { VariantProps } from 'class-variance-authority';
import { CheckCircle2, Circle, Info, TriangleAlert, XCircle } from 'lucide-react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { helperTextVariants } from './variants';

const defaultIcon: Record<string, ReactNode> = {
  default: <Circle className="h-3 w-3" />,
  primary: <Info className="h-3 w-3" />,
  secondary: <CheckCircle2 className="h-3 w-3" />,
  accent: <Info className="h-3 w-3" />,
  warning: <TriangleAlert className="h-3 w-3" />,
  destructive: <XCircle className="h-3 w-3" />
};

export type HelperTextProps = {
  icon?: boolean | ReactNode;
  ref?: Ref<HTMLParagraphElement>;
} & HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof helperTextVariants>;

export function HelperText({
  className,
  variant = 'default',
  icon,
  children,
  ref,
  ...props
}: HelperTextProps) {
  const key = variant ?? 'default';
  const resolvedIcon = icon === true ? defaultIcon[key] : (icon ?? null);

  return (
    <p
      ref={ref}
      className={cn(helperTextVariants({ variant }), className)}
      {...props}
    >
      {resolvedIcon && <span className="mt-0.5 shrink-0">{resolvedIcon}</span>}
      <span>{children}</span>
    </p>
  );
}
