import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/Navigation-menu";

type Props = {
	routes: { text: string; url: string }[];
};

const Navigation = ({ routes }: Props) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{routes.map((route) => (
					<NavigationMenuItem key={route.text}>
						<NavigationMenuLink href={route.url}>
							{route.text}
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export { Navigation };
