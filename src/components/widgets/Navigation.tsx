import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui/navigation-menu";

type Props = {
  routes: { text: string; url: string }[];
};

const Navigation = ({ routes }: Props) => {
  return (
    <NavigationMenu>
      <NavigationMenuList position="right" spacing="lg">
        {routes.map((route) => (
          <NavigationMenuItem key={route.text}>
            <NavigationMenuLink href={route.url}>{route.text}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
