import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

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
	return (
		<div
			ref={ref}
			className={cn(sidebarVariants({ position }), className)}
			{...props}
		>
			{children}
		</div>
	);
};

SidebarProvider.Content = ({
	children,
	ref,
	className,
	...props
}: ContentProps) => {
	return (
		<div ref={ref} className={cn("w-full", className)} {...props}>
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
	return (
		<div ref={ref} className={cn("w-[38rem]", className)} {...props}>
			{children}
		</div>
	);
};

export { SidebarProvider };
