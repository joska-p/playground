import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { notificationItemVariants } from './notificationItemVariants';

type NotificationItemProps = {
  icon: ReactNode;
  iconColor: string;
  title: string;
  timestamp: string;
  className?: string;
};

function NotificationItem({ icon, iconColor, title, timestamp, className }: NotificationItemProps) {
  return (
    <div className={cn(notificationItemVariants(), className)}>
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs',
          iconColor
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-foreground text-xs font-medium">{title}</p>
        <p className="text-foreground-dim text-xs">{timestamp}</p>
      </div>
    </div>
  );
}

export { NotificationItem };
export type { NotificationItemProps };
