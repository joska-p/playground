import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../../../utils/cn.js";
import type { SidebarContextValue } from "./SidebarContext.js";
import { SidebarContext, useSidebarContext } from "./SidebarContext.js";
import { SidebarMain } from "./SidebarMain.js";
import { SidebarPanel } from "./SidebarPanel.js";
import { SidebarToggle } from "./SidebarToggle.js";
import { sidebarVariants } from "./sidebarVariants.js";

export interface SidebarProps extends ComponentProps<"div">, VariantProps<typeof sidebarVariants> {
  defaultOpen?: boolean;
}

export function Sidebar({
  children,
  ref,
  className,
  mobilePosition = "bottom",
  desktopPosition = "bottom",
  variant,
  defaultOpen = true,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      toggleSidebar,
      desktopPosition: desktopPosition as SidebarContextValue["desktopPosition"],
      mobilePosition: mobilePosition as SidebarContextValue["mobilePosition"],
    }),
    [isOpen, toggleSidebar, desktopPosition, mobilePosition]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(
          "relative",
          sidebarVariants({ variant, mobilePosition, desktopPosition }),
          className
        )}
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
