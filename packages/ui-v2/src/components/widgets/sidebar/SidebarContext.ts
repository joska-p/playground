import { createContext } from 'react';

export type SidebarContextValue = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  panelId: string;
  position: 'top' | 'right' | 'bottom' | 'left';
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export { SidebarContext };
