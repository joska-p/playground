import type { ComponentProps } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import styles from './sidebar.module.css';
import type { SidebarContextValue } from './sidebarContext';
import { SidebarContext } from './sidebarContext';
import { SidebarMain } from './SidebarMain';
import { SidebarPanel } from './SidebarPanel';
import { SidebarToggle } from './SidebarToggle';
import { useSidebarContext } from './useSidebarContext';

export type SidebarProps = {
  defaultOpen?: boolean;
  mobilePosition?: 'top' | 'right' | 'bottom' | 'left';
  desktopPosition?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost';
  panelWidth?: string;
  panelHeight?: string;
} & ComponentProps<'div'>;

export function Sidebar({
  children,
  ref,
  className,
  mobilePosition = 'bottom',
  desktopPosition = 'bottom',
  variant = 'primary',
  defaultOpen = true,
  panelWidth,
  panelHeight,
  style,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    (): SidebarContextValue => ({
      isOpen,
      toggleSidebar,
      desktopPosition: desktopPosition ?? 'bottom',
      mobilePosition: mobilePosition ?? 'bottom',
    }),
    [isOpen, toggleSidebar, desktopPosition, mobilePosition]
  );

  const sidebarStyles = useMemo(
    () => ({
      ...style,
      ...(panelWidth && { '--sidebar-width': panelWidth }),
      ...(panelHeight && { '--sidebar-height': panelHeight }),
    }),
    [style, panelWidth, panelHeight]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        data-mobile-position={mobilePosition}
        data-desktop-position={desktopPosition}
        data-variant={variant}
        className={cn(styles.sidebar, 'group', className)}
        style={sidebarStyles as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

Sidebar.Panel = SidebarPanel;
Sidebar.Main = SidebarMain;
Sidebar.Toggle = SidebarToggle;
Sidebar.use = useSidebarContext;
