import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import styles from './sidebar.module.css';
import { sidebarMainVariants } from './sidebarVariants';

function SidebarMain({ children, ref, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      ref={ref}
      className={cn(sidebarMainVariants(), styles['main'], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { SidebarMain };
