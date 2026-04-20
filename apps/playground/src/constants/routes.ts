import { z } from "zod";

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

export const RouteSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    label: z.string(),
    href: z.string(),
    children: z.array(RouteSchema).optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
  }),
);

export type Route = z.infer<typeof RouteSchema>;

const rawRoutes: Route[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Particles",
    href: "/particles",
    children: [
      {
        label: "Image to Particles",
        href: "/particles/image-to-particles",
        description: "Transform images into interactive particles",
      },
    ],
  },
  {
    label: "Sequences",
    href: "/sequences",
    children: [
      {
        label: "Recaman",
        href: "/sequences/recaman",
        description: "Explore the Recamán's sequence visualization",
      },
    ],
  },
  {
    label: "Mosaic",
    href: "/mosaic",
    children: [
      {
        label: "Mosaic Maker",
        href: "/mosaic/maker",
        description: "Create complex mosaic patterns from images",
      },
    ],
  },
  {
    label: "Misc",
    href: "/misc",
    children: [
      {
        label: "Palettes",
        href: "/misc/palettes-generator",
        description: "Generate color palettes from algorithms",
      },
      {
        label: "Piechart",
        href: "/misc/piechart",
        description: "Interactive d3-based piechart examples",
      },
    ],
  },
];

/**
 * Normalizes URLs to include the BASE_URL and ensure trailing slashes for Astro
 */
const normalizeRoutes = (routes: Route[]): Route[] => {
  return routes.map((route) => ({
    ...route,
    href: `${baseUrl}${route.href}`.replace(/\/$/, "") + "/",
    children: route.children ? normalizeRoutes(route.children) : undefined,
  }));
};

export const routes = normalizeRoutes(rawRoutes);

/**
 * Utility to find a route by its href
 */
export const findRouteByHref = (
  href: string,
  items: Route[] = routes,
): Route | undefined => {
  for (const item of items) {
    if (item.href === href || item.href === href + "/") return item;
    if (item.children) {
      const found = findRouteByHref(href, item.children);
      if (found) return found;
    }
  }
  return undefined;
};

/**
 * Utility to get breadcrumbs for a given path
 */
export const getBreadcrumbs = (
  path: string,
  items: Route[] = routes,
  acc: Route[] = [],
): Route[] => {
  for (const item of items) {
    if (path.startsWith(item.href)) {
      const newAcc = [...acc, item];
      if (item.href === path || item.href === path + "/") return newAcc;
      if (item.children) {
        return getBreadcrumbs(path, item.children, newAcc);
      }
      return newAcc;
    }
  }
  return acc;
};
