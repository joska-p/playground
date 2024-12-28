import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type NavigationMenuProps = ComponentProps<"div">;

const NavigationMenu = ({ children, className }: NavigationMenuProps) => {
	return <nav className={cn(" flex items-center", className)}>{children}</nav>;
};

type NavigationMenuListProps = ComponentProps<"ul">;

const NavigationMenuList = ({
	children,
	className,
}: NavigationMenuListProps) => {
	return (
		<ul
			className={cn("group flex list-none flex-wrap items-center", className)}
		>
			{children}
		</ul>
	);
};

type NavigationMenuItemProps = ComponentProps<"li">;
const NavigationMenuItem = ({
	children,
	className,
}: NavigationMenuItemProps) => {
	return <li className={cn("flex items-center", className)}>{children}</li>;
};

type NavigationMenuLinkProps = ComponentProps<"a">;

const NavigationMenuLink = ({
	className,
	children,
	...props
}: NavigationMenuLinkProps) => {
	return (
		<a
			className={cn(
				"inline-flex items-center rounded-md px-2 py-1.5 font-medium text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</a>
	);
};

export {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
};
