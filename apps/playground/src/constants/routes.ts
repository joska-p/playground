export interface Route {
  label: string;
  href: string;
  children?: Route[];
  icon?: string;
  description?: string;
}

// 1. Prepare the Base URL
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

const rawRoutes = [
  { label: "Home", href: "/" },
  {
    label: "Particles",
    href: "/particles/image-to-particles",
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
    href: "/sequences/sequence-renderer",
    children: [
      {
        label: "Sequence Renderer",
        href: "/sequences/sequence-renderer",
        description: "Explore the Recamán's sequence visualization",
      },
    ],
  },
  {
    label: "Mosaic",
    href: "/mosaic/mosaic-maker",
    children: [
      {
        label: "Mosaic Maker",
        href: "/mosaic/mosaic-maker",
        description: "Create complex mosaic patterns from images",
      },
    ],
  },
  {
    label: "Colors",
    href: "/colors/palettes-generator",
    children: [
      {
        label: "Palettes generator",
        href: "/colors/palettes-generator",
        description: "Generate color palettes from algorithms",
      },
    ],
  },
  {
    label: "Misc",
    href: "/misc/piechart",
    children: [
      {
        label: "Piechart",
        href: "/misc/piechart",
        description: "Interactive d3-based piechart examples",
      },
    ],
  },
] satisfies Route[];

/**
 * Normalizes a route path to: /base/path/
 */
const normalize = (route: Route): Route => {
  // Collapse double slashes and ensure a leading slash
  const combined = `${baseUrl}/${route.href}`.replace(/\/+/g, "/");

  // Ensure exactly one trailing slash
  const href = combined.endsWith("/") ? combined : `${combined}/`;

  return {
    ...route,
    href,
    children: route.children?.map(normalize),
  };
};

export const routes = rawRoutes.map(normalize);

/**
 * Utility to detect the active top-level category
 */
export const getActiveCategory = (path: string): Route | undefined => {
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  const homePath = `${baseUrl}/`.replace(/\/+/g, "/");

  if (normalizedPath === homePath) return undefined;

  return routes.find((route) =>
    route.children?.some((child) => normalizedPath.startsWith(child.href)),
  );
};
