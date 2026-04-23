import { createContext, useContext } from "react";

export interface SidebarContextValue {
  isOpen: boolean;
  toggleSidebar: () => void;
  desktopPosition?: "top" | "right" | "bottom" | "left";
  mobilePosition?: "top" | "right" | "bottom" | "left";
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar compound components must be used within a Sidebar");
  }
  return context;
}

export { SidebarContext, useSidebarContext };
