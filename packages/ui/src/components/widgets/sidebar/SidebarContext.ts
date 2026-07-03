import { createContext } from 'react';

export type SidebarContextValue = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  panelId: string;
  desktopPosition: 'top' | 'right' | 'bottom' | 'left';
  mobilePosition: 'top' | 'right' | 'bottom' | 'left';
  variant: 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost';
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export { SidebarContext };
