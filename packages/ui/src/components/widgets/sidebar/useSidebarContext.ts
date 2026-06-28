import { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar compound components must be used within a Sidebar');
  }
  return context;
}

export { useSidebarContext };
