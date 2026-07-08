import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { useCallback, useId, useMemo } from 'react';
import { useSidebarState } from '../../../hooks/useSidebarState';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { SidebarContext, type SidebarContextValue } from './SidebarContext';
import { SidebarMain } from './SidebarMain';
import { SidebarPanel } from './SidebarPanel';
import { SidebarToggle } from './SidebarToggle';
import { useSidebarContext } from './useSidebarContext';

export type SidebarProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: 'top' | 'right' | 'bottom' | 'left';
  variant?: ColorVariant;
  panelWidth?: string;
  panelHeight?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function Sidebar({
  children,
  ref,
  className,
  style,
  position = 'left',
  variant = 'default',
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  panelWidth,
  panelHeight,
  ...props
}: SidebarProps) {
  const panelId = `sidebar-panel-${useId()}`;
  const internal = useSidebarState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internal.isOpen;

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) internal.toggle();
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange, internal]);

  const open = useCallback(() => {
    if (!isControlled) internal.open();
    onOpenChange?.(true);
  }, [isControlled, onOpenChange, internal]);

  const close = useCallback(() => {
    if (!isControlled) internal.close();
    onOpenChange?.(false);
  }, [isControlled, onOpenChange, internal]);

  const ctx = useMemo(
    (): SidebarContextValue => ({
      isOpen,
      toggle,
      open,
      close,
      panelId,
      position,
      variant
    }),
    [isOpen, toggle, open, close, panelId, position, variant]
  );

  const isHorizontal = position === 'left' || position === 'right';

  return (
    <SidebarContext.Provider value={ctx}>
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        data-position={position}
        className={cn(
          'grid overflow-hidden',
          isHorizontal
            ? position === 'left'
              ? 'grid-cols-[auto_1fr] grid-rows-[1fr]'
              : 'grid-cols-[1fr_auto] grid-rows-[1fr]'
            : position === 'top'
              ? 'grid-cols-[1fr] grid-rows-[auto_1fr]'
              : 'grid-cols-[1fr] grid-rows-[1fr_auto]',
          className
        )}
        style={{
          ...style,
          ...(panelWidth && { '--sidebar-width': panelWidth }),
          ...(panelHeight && { '--sidebar-height': panelHeight })
        }}
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

export { Sidebar };
