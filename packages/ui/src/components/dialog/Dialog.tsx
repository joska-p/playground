import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type DialogProps = {
  children: ReactNode;
} & ComponentProps<'dialog'>;

function Dialog({ children, className, ...props }: DialogProps) {
  return (
    <dialog
      className={cn(
        'bg-surface text-foreground w-full max-w-md rounded-lg p-0 shadow-lg',
        'self-center justify-self-center open:flex open:flex-col',
        'starting:opacity-0 starting:scale-95 starting:translate-y-2.5',
        'animate-[dialogIn_0.3s_cubic-bezier(0.4,0,0.2,1)]',
        'backdrop:bg-black/60 backdrop:backdrop-blur-sm backdrop:starting:opacity-0',
        'backdrop:animate-[fadeIn_0.25s_ease]',
        className
      )}
      {...props}
    >
      {children}
    </dialog>
  );
}

export { Dialog };
export type { DialogProps };
