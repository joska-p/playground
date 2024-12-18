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
      <NavigationMenuList className="gap-10">
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
