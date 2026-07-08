import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { notificationItemVariants } from './variants';

type NotificationItemProps = {
  icon: ReactNode;
  title: string;
  timestamp: string;
  variant?: ColorVariant;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function NotificationItem({
  icon,
  title,
  timestamp,
  variant = 'primary',
  className,
  style,
  ref,
  ...props
}: NotificationItemProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-start gap-3 font-mono',
        notificationItemVariants({ variant }),
        className
      )}
      style={style}
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

export { NotificationItem };
export type { NotificationItemProps };
