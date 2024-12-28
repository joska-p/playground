import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import {
	type ComponentProps,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";

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
		position: {
			top: "grid-cols-1 grid-rows-[auto,1fr]",
			right:
				"grid-cols-1 grid-rows-[1fr,auto] md:grid-cols-[1fr,auto] md:grid-rows-1",
			bottom: "grid-cols-1 grid-rows-[1fr,auto]",
			left: "grid-cols-1 grid-rows-[auto,1fr] md:grid-cols-[auto,1fr] md:grid-rows-1",
		},
	},
	defaultVariants: {
		position: "right",
	},
});

type SidebarProviderProps = ComponentProps<"div"> &
	VariantProps<typeof sidebarProviderVariants>;

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
		<div ref={ref} className={cn(className)} {...props}>
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
		<div ref={ref} className={cn(className)} {...props}>
			{children}
		</div>
	);
};

export { SidebarProvider };
