import { cn } from '../../utils/cn';
import { iconMap } from './iconMap';
import { toastVariants } from './toastVariants';
import type { ToastItemData } from './types';

const iconColorMap: Record<ToastItemData['variant'], string> = {
  default: 'text-primary',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  destructive: 'text-destructive',
  warning: 'text-warning'
};

function ToastItem({ item }: { item: ToastItemData }) {
  return (
    <div
      className={cn(
        toastVariants({ variant: item.variant }),
        item.exiting && 'animate-[toastOut_0.3s_ease_both]'
      )}
    >
      <span className={cn('mt-0.5 shrink-0', iconColorMap[item.variant])}>
        {iconMap[item.variant]}
      </span>
      <div>
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{item.description}</p>
      </div>
    </div>
  );
}

export { ToastItem };
