import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import styles from './sidebar.module.css';
import { sidebarPanelVariants } from './sidebarVariants';
import { useSidebarContext } from './useSidebarContext';

type SidebarPanelProps = ComponentProps<'div'> & VariantProps<typeof sidebarPanelVariants>;

function SidebarPanel({ children, ref, className, ...props }: SidebarPanelProps) {
  const { isOpen, variant } = useSidebarContext();

  return (
    <div
      ref={ref}
      className={cn(
        sidebarPanelVariants({ variant }),
        styles['panel'],
        isOpen ? '' : 'invisible opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type { SidebarPanelProps };

export { SidebarPanel };
