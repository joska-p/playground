import { routes } from "@/constants/routes";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui/navigation-menu";

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-10">
        {routes.map((route) => (
          <NavigationMenuItem key={route.title}>
            <NavigationMenuLink href={route.url}>{route.title}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
