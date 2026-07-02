import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../elements/button/Button';
import { IconClose } from '../../icons/components/IconClose';
import { IconHamburger } from '../../icons/components/IconHamburger';
import styles from './sidebar.module.css';
import { useSidebarContext } from './useSidebarContext';

export function SidebarToggle({ className, children, ...props }: ComponentProps<'button'>) {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={toggleSidebar}
      className={cn(styles['toggle'], className)}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      {...props}
    >
      {children ??
        (isOpen ? <IconClose className="h-4 w-4" /> : <IconHamburger className="h-4 w-4" />)}
    </Button>
  );
}
