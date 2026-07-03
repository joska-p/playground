import { cn } from '../../../utils/cn';
import { feedbackIconColorMap, feedbackIconMap } from '../iconUtils';
import { toastVariants } from './toastVariants';
import type { ToastItemData } from './types';

function ToastItem({ item }: { item: ToastItemData }) {
  return (
    <div
      className={cn(
        toastVariants({ variant: item.variant }),
        item.exiting && 'animate-[toastOut_0.3s_ease_both]'
      )}
    >
      <span className={cn('mt-0.5 shrink-0', feedbackIconColorMap[item.variant])}>
        {feedbackIconMap[item.variant]}
      </span>
      <div>
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{item.description}</p>
      </div>
    </div>
  );
}

export { ToastItem };
