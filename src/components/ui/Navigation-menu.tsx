import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Navigation menu
 */

const navigationMenuVariants = cva(
	"relative z-10 flex flex-1 items-center space-x-1",
	{
		variants: {
			variant: {
				default: "text-foreground",
			},
			position: {
				left: "justify-start",
				center: "justify-center",
				right: "justify-end",
			},
			spacing: {
				none: "space-x-0",
				xs: "space-x-1",
				sm: "space-x-2",
				lg: "space-x-4",
				xl: "space-x-8",
			},
		},
		defaultVariants: {
			variant: "default",
			position: "center",
			spacing: "none",
		},
	},
);

type NavigationMenuProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof navigationMenuVariants>;

const NavigationMenu = ({
	children,
	variant,
	position,
	spacing,
	className,
}: NavigationMenuProps) => {
	return (
		<div
			className={cn(
				navigationMenuVariants({ variant, position, spacing, className }),
			)}
		>
			{children}
		</div>
	);
};

/**
 * Navigation menu list
 */

const navigationMenuListVariants = cva(
	"group flex flex-1 list-none items-center",
	{
		variants: {
			variant: {
				default: "text-foreground",
			},
			position: {
				left: "justify-start",
				center: "justify-center",
				right: "justify-end",
			},
			spacing: {
				none: "space-x-0",
				xs: "space-x-1",
				sm: "space-x-2",
				lg: "space-x-4",
				xl: "space-x-8",
			},
		},
		defaultVariants: {
			variant: "default",
			position: "center",
			spacing: "none",
		},
	},
);
type NavigationMenuListProps = React.HTMLAttributes<HTMLUListElement> &
	VariantProps<typeof navigationMenuListVariants>;

const NavigationMenuList = ({
	children,
	variant,
	position,
	spacing,
	className,
}: NavigationMenuListProps) => {
	return (
		<ul
			className={cn(
				navigationMenuListVariants({ variant, position, spacing, className }),
			)}
		>
			{children}
		</ul>
	);
};

/**
 * Navigation menu item
 */

const navigationMenuItemVariants = cva(
	"flex items-center rounded-md px-2 py-1.5 font-medium text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	{
		variants: {
			variant: {
				default: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type NavigationMenuItemProps = React.LiHTMLAttributes<HTMLLIElement> &
	VariantProps<typeof navigationMenuItemVariants>;

const NavigationMenuItem = ({
	children,
	variant,
	className,
}: NavigationMenuItemProps) => {
	return (
		<li className={cn(navigationMenuItemVariants({ variant, className }))}>
			{children}
		</li>
	);
};

/**
 * Navigation menu link
 */

const navigationMenuLinkVariants = cva(
	"inline-flex items-center rounded-md px-2 py-1.5 font-medium text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	{
		variants: {
			variant: {
				default: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type NavigationMenuLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
	VariantProps<typeof navigationMenuLinkVariants>;

const NavigationMenuLink = ({
	href,
	variant,
	className,
	children,
	title,
}: NavigationMenuLinkProps) => {
	return (
		<a
			href={href}
			title={title}
			className={cn(navigationMenuLinkVariants({ variant, className }))}
		>
			{children}
		</a>
	);
};
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
};
