export interface Route {
  label: string;
  href: string;
  children: Route[];
  icon?: string;
  description?: string;
  isUtility?: boolean;
}

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

const rawRoutes = [
  {
    label: "Projects",
    href: "/projects/",
    description: "Browse creative projects by category",
    children: [
      {
        label: "Mosaic Maker",
        href: "/projects/mosaic/",
        description: "Procedural mosaic patterns",
        children: [],
      },
      {
        label: "Sequence Renderer",
        href: "/projects/sequences/",
        description: "Mathematical sequence visualizations",
        children: [],
      },
      {
        label: "Palettes Generator",
        href: "/projects/palettes/",
        description: "Color palette generator",
        children: [],
      },
      {
        label: "Image to Particles",
        href: "/projects/particles/",
        description: "Transform images into particles",
        children: [],
      },
      {
        label: "Pie Chart",
        href: "/projects/piechart/",
        description: "D3-based pie chart",
        children: [],
      },
    ],
  },
  {
    label: "Docs",
    href: "/docs/",
    description: "Documentation",
    children: [],
  },
  {
    label: "GitHub",
    href: "https://github.com/joska-p/playground",
    description: "View source on GitHub",
    isUtility: true,
    icon: "github",
    children: [],
  },
] satisfies Route[];

function normalize(route: Route): Route {
  let href: string;

  if (route.href.startsWith("http://") || route.href.startsWith("https://")) {
    href = route.href;
  } else {
    const combined = `${baseUrl}/${route.href}`.replace(/\/+/g, "/");
    href = combined.endsWith("/") ? combined : `${combined}/`;
  }

  return {
    ...route,
    href,
    children: route.children?.map(normalize) ?? [],
  };
}

const routes = rawRoutes.map(normalize);

function getActiveCategory(path: string): Route | undefined {
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  const homePath = `${baseUrl}/`.replace(/\/+/g, "/");

  if (normalizedPath === homePath) return undefined;

  return routes.find((route) =>
    route.children?.some((child) => normalizedPath.startsWith(child.href))
  );
}

export { baseUrl, routes, getActiveCategory };
