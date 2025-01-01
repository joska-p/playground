import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, createContext, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SidebarContext = {
  isOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialeContext = {
  isOpen: true,
  toggleSidebar: () => {},
} as SidebarContext;

const sidebarContext = createContext(initialeContext);

const useSidebarContext = () => {
  const context = useContext(sidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

const sidebarProviderVariants = cva("grid h-full", {
  variants: {
    mobilePosition: {
      top: "grid-cols-1 grid-rows-[auto,1fr]",
      right: "grid-cols-[1fr,auto] grid-rows-1",
      bottom: "grid-cols-1 grid-rows-[1fr,auto]",
      left: "grid-cols-[auto,1fr] grid-rows-1",
    },
    desktopPosition: {
      top: "lg:grid-cols-1 lg:grid-rows-[auto,1fr]",
      right: "lg:grid-cols-[1fr,auto] lg:grid-rows-1",
      bottom: "lg:grid-cols-1 lg:grid-rows-[1fr,auto]",
      left: "lg:grid-cols-[auto,1fr] lg:grid-rows-1",
    },
  },
  defaultVariants: {
    mobilePosition: "bottom",
    desktopPosition: "bottom",
  },
});

type SidebarProviderProps = ComponentProps<"div"> & VariantProps<typeof sidebarProviderVariants>;

const SidebarProvider = ({
  children,
  ref,
  className,
  mobilePosition,
  desktopPosition,
  ...props
}: SidebarProviderProps) => {
  const [isOpen, toggleSidebar] = useState(true);

  const value = useMemo<SidebarContext>(
    () => ({
      isOpen,
      toggleSidebar,
    }),
    [isOpen]
  );

  return (
    <sidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(
          sidebarProviderVariants({
            mobilePosition,
            desktopPosition,
            className,
          })
        )}
        {...props}
      >
        {children}
      </div>
    </sidebarContext.Provider>
  );
};

const Content = ({ children, ref, className, ...props }: ComponentProps<"div">) => {
  return (
    <div ref={ref} className={cn("h-full", className)} {...props}>
      {children}
    </div>
  );
};

const Sidebar = ({ children, ref, className, ...props }: ComponentProps<"div">) => {
  const { isOpen } = useSidebarContext();
  return (
    <div ref={ref} className={cn("h-full", className, !isOpen && "hidden")} {...props}>
      {children}
    </div>
  );
};

SidebarProvider.Content = Content;
SidebarProvider.Sidebar = Sidebar;

export { SidebarProvider };
