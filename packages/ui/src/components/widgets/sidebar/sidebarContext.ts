import { createContext } from 'react';

export type SidebarContextValue = {
  isOpen: boolean;
  toggleSidebar: () => void;
  desktopPosition: 'top' | 'right' | 'bottom' | 'left';
  mobilePosition: 'top' | 'right' | 'bottom' | 'left';
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export { SidebarContext };
