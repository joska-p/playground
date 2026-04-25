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
    label: "Docs",
    href: "/docs/",
    description: "Documentation",
    children: [],
  },
  {
    label: "Particles",
    href: "/particles/",
    description: "Visual effects using particle systems",
    children: [
      {
        label: "Image to Particles",
        href: "/particles/image-to-particles/",
        description: "Transform images into interactive particles",
        children: [],
      },
    ],
  },
  {
    label: "Sequences",
    href: "/sequences/",
    description: "Mathematical sequence visualizations",
    children: [
      {
        label: "Sequence Renderer",
        href: "/sequences/sequence-renderer/",
        description: "Explore the Recamán's sequence visualization",
        children: [],
      },
    ],
  },
  {
    label: "Mosaic",
    href: "/mosaic/",
    description: "Pattern generation and tiling algorithms",
    children: [
      {
        label: "Mosaic Maker",
        href: "/mosaic/mosaic-maker/",
        description: "Create complex mosaic patterns from images",
        children: [],
      },
    ],
  },
  {
    label: "Colors",
    href: "/colors/",
    description: "Color tools and palette generators",
    children: [
      {
        label: "Palettes Generator",
        href: "/colors/palettes-generator/",
        description: "Generate color palettes from algorithms",
        children: [],
      },
    ],
  },
  {
    label: "Data Viz",
    href: "/data-viz/",
    description: "Charts and data visualization tools",
    children: [
      {
        label: "Piechart",
        href: "/data-viz/piechart/",
        description: "Interactive d3-based piechart examples",
        children: [],
      },
    ],
  },
  {
    label: "Storybook",
    href: "/storybook/",
    description: "Component documentation",
    isUtility: true,
    icon: "storybook",
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
