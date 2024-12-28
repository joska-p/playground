import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
	type ComponentProps,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";

type SidebarProviderProps = ComponentProps<"div"> & {
	position?: "horizontal";
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

const sidebarProviderVariants = cva("flex", {
	variants: {
		position: {
			horizontal: "flex-row",
			vertical: "flex-col md:flex-row",
		},
	},
	defaultVariants: {
		position: "vertical",
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
				className={cn(sidebarProviderVariants({ position, className }))}
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
}: ComponentProps<"div">) => {
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
}: ComponentProps<"div">) => {
	const { isOpen } = useSidebarContext();
	return (
		<div
			ref={ref}
			className={cn("flex-shrink-0 md:w-[40ch]", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export { SidebarProvider };
