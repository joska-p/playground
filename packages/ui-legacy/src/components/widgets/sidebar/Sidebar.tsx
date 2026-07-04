import type { ComponentProps } from 'react';
import { useCallback, useId, useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import styles from './sidebar.module.css';
import type { SidebarContextValue } from './SidebarContext';
import { SidebarContext } from './SidebarContext';
import { SidebarMain } from './SidebarMain';
import { SidebarPanel } from './SidebarPanel';
import { SidebarToggle } from './SidebarToggle';
import { useSidebarContext } from './useSidebarContext';

export type SidebarProps = {
  /** Uncontrolled: initial open state. Ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled: drives the open state from the outside. */
  open?: boolean;
  /** Fires whenever the sidebar wants to change state. */
  onOpenChange?: (open: boolean) => void;
  mobilePosition?: 'top' | 'right' | 'bottom' | 'left';
  desktopPosition?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost';
  panelWidth?: string;
  panelHeight?: string;
} & Omit<ComponentProps<'div'>, 'open'>;

export function Sidebar({
  children,
  ref,
  className,
  mobilePosition = 'bottom',
  desktopPosition = 'bottom',
  variant = 'primary',
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  panelWidth,
  panelHeight,
  style,
  ...props
}: SidebarProps) {
  const generatedId = useId();
  const panelId = `sidebar-panel-${generatedId}`;

  // Uncontrolled internal state — ignored when `open` is provided.
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const openSidebar = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const closeSidebar = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  const toggleSidebar = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, isOpen, onOpenChange]);

  const value = useMemo(
    (): SidebarContextValue => ({
      isOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      panelId,
      desktopPosition,
      mobilePosition
    }),
    [isOpen, toggleSidebar, openSidebar, closeSidebar, panelId, desktopPosition, mobilePosition]
  );

  const sidebarStyles = useMemo(
    () => ({
      ...style,
      ...(panelWidth && { '--sidebar-width': panelWidth }),
      ...(panelHeight && { '--sidebar-height': panelHeight })
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
        className={cn(styles['sidebar'], className)}
        style={sidebarStyles}
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
