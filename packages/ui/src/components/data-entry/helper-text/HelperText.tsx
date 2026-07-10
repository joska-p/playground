import { CheckCircle2, Circle, Info, TriangleAlert, XCircle } from 'lucide-react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { helperTextVariants, type HelperTextVariants } from './variants';

const defaultIcon: Record<string, ReactNode> = {
  default: <Circle className="h-3 w-3" />,
  primary: <Info className="h-3 w-3" />,
  secondary: <CheckCircle2 className="h-3 w-3" />,
  accent: <Info className="h-3 w-3" />,
  warning: <TriangleAlert className="h-3 w-3" />,
  destructive: <XCircle className="h-3 w-3" />
};

export interface HelperTextProps extends HTMLAttributes<HTMLParagraphElement>, HelperTextVariants {
  icon?: boolean | ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

export function HelperText({ className, variant, icon, children, ref, ...props }: HelperTextProps) {
  const resolvedIcon = icon === true ? defaultIcon[variant ?? 'default'] : (icon ?? null);

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
