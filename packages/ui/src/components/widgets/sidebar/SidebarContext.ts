import { createContext } from 'react';
import type { ColorVariant } from '../../../lib/colorVariant';

export type SidebarContextValue = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  panelId: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  variant: ColorVariant;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export { SidebarContext };
