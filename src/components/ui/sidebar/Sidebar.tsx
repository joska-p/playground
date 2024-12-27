import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { createContext, useContext, useMemo, useState } from "react";

type SidebarProviderProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
	className?: string;
	position?: "horizontal";
};
type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
	className?: string;
};
type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
	className?: string;
};

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

const sidebarVariants = cva("flex relative", {
	variants: {
		position: {
			horizontal: "flex-row",
		},
	},
	defaultVariants: {
		position: "horizontal",
	},
});

const SidebarProvider = ({
	children,
	ref,
	className,
	position,
	...props
}: SidebarProviderProps) => {
	const [isOpen, toggleSidebar] = useState(true);

	const value = useMemo<SidebarContext>(
		() => ({
			isOpen,
			toggleSidebar,
		}),
		[isOpen],
	);

	return (
		<sidebarContext.Provider value={value}>
			<div
				ref={ref}
				className={cn(sidebarVariants({ position }), className)}
				{...props}
			>
				{children}
			</div>
		</sidebarContext.Provider>
	);
};

SidebarProvider.Content = ({
	children,
	ref,
	className,
	...props
}: ContentProps) => {
	return (
		<div ref={ref} className={cn("flex-grow", className)} {...props}>
			{children}
		</div>
	);
};

SidebarProvider.Sidebar = ({
	children,
	ref,
	className,
	...props
}: SidebarProps) => {
	const { isOpen } = useSidebarContext();
	return (
		<div ref={ref} className={cn(className)} {...props}>
			{children}
		</div>
	);
};

export { SidebarProvider };
