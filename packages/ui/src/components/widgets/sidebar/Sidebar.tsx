import type { VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { cn } from "../../../utils/cn.js";
import { sidebarProviderVariants } from "./variants.js";

const SidebarContext = createContext<{
  isOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof sidebarProviderVariants> {
  children: React.ReactNode;
}

function SidebarProvider({
  children,
  ref,
  className,
  mobilePosition,
  desktopPosition,
  ...props
}: SidebarProviderProps) {
  const [isOpen, toggleSidebar] = useState(true);

  const value = useMemo(
    () => ({
      isOpen,
      toggleSidebar,
    }),
    [isOpen],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(
          sidebarProviderVariants({
            mobilePosition,
            desktopPosition,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Content({
  children,
  ref,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}

function Sidebar({
  children,
  ref,
  className,
  ...props
}: ComponentProps<"div">) {
  const { isOpen } = useSidebarContext();
  return (
    <div ref={ref} className={cn(className, { hidden: !isOpen })} {...props}>
      {children}
    </div>
  );
}

SidebarProvider.Content = Content;
SidebarProvider.Sidebar = Sidebar;

export { SidebarProvider, useSidebarContext };
