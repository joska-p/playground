import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';

type LabelProps = {} & ComponentProps<'label'>;

function Label({ children, ref, className, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm font-medium', className)} ref={ref} {...props}>
      {children}
    </label>
  );
}

export { Label };
