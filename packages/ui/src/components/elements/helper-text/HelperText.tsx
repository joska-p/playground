import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

type HelperTextProps = {
  children: ReactNode;
  destructive?: boolean;
  id?: string;
};

function HelperText({ children, destructive, id }: HelperTextProps) {
  return (
    <p
      id={id}
      className={cn('text-xs', destructive ? 'text-destructive' : 'text-muted-foreground')}
    >
      {children}
    </p>
  );
}

export { HelperText };
