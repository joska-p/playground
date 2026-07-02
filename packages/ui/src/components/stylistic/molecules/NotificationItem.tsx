import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

type NotificationItemProps = {
  icon: ReactNode;
  iconColor: string;
  title: string;
  timestamp: string;
};

function NotificationItem({ icon, iconColor, title, timestamp }: NotificationItemProps) {
  return (
    <div className="flex gap-2.5">
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
