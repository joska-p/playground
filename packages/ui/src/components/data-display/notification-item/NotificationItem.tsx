import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { notificationItemVariants, type NotificationItemVariants } from './variants';

export interface NotificationItemProps
  extends HTMLAttributes<HTMLDivElement>, NotificationItemVariants {
  icon: ReactNode;
  title: string;
  timestamp: string;
  loading?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function NotificationItem({
  icon,
  title,
  timestamp,
  variant,
  className,
  ref,
  ...props
}: NotificationItemProps) {
  return (
    <div
      ref={ref}
      className={cn(notificationItemVariants({ variant }), className)}
      {...props}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-sm shadow-xs">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-foreground truncate text-sm font-medium">{title}</p>
        <p className="text-foreground-muted mt-0.5 text-xs">{timestamp}</p>
      </div>
    </div>
  );
}
