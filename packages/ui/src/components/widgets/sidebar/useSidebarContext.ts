import { useContext } from "react";
import { SidebarContext } from "./sidebarContext";

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar compound components must be used within a Sidebar");
  }
  return context;
}

export { useSidebarContext };
