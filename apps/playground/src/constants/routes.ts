export interface Route {
  label: string;
  href: string;
  children?: Route[];
  icon?: string;
  description?: string;
  isUtility?: boolean;
}

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

const rawRoutes = [
  { label: "Home", href: "/" },
  {
    label: "Particles",
    href: "/particles/",
    children: [
      {
        label: "Image to Particles",
        href: "/particles/image-to-particles/",
        description: "Transform images into interactive particles",
      },
    ],
  },
  {
    label: "Sequences",
    href: "/sequences/",
    children: [
      {
        label: "Sequence Renderer",
        href: "/sequences/sequence-renderer/",
        description: "Explore the Recamán's sequence visualization",
      },
    ],
  },
  {
    label: "Mosaic",
    href: "/mosaic/",
    children: [
      {
        label: "Mosaic Maker",
        href: "/mosaic/mosaic-maker/",
        description: "Create complex mosaic patterns from images",
      },
    ],
  },
  {
    label: "Colors",
    href: "/colors/",
    children: [
      {
        label: "Palettes Generator",
        href: "/colors/palettes-generator/",
        description: "Generate color palettes from algorithms",
      },
    ],
  },
  {
    label: "Data Viz",
    href: "/data-viz/",
    children: [
      {
        label: "Piechart",
        href: "/data-viz/piechart/",
        description: "Interactive d3-based piechart examples",
      },
    ],
  },
  {
    label: "Storybook",
    href: "/storybook/",
    description: "Component documentation",
    isUtility: true,
    icon: "storybook",
  },
  {
    label: "Graph",
    href: "/graph/",
    description: "Knowledge graph",
    isUtility: true,
    icon: "graph",
  },
  {
    label: "GitHub",
    href: "https://github.com/joska-p/playground",
    description: "View source on GitHub",
    isUtility: true,
    icon: "github",
  },
] satisfies Route[];

const normalize = (route: Route): Route => {
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
    children: route.children?.map(normalize),
  };
};

export const routes = rawRoutes.map(normalize);

export const getActiveCategory = (path: string): Route | undefined => {
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  const homePath = `${baseUrl}/`.replace(/\/+/g, "/");

  if (normalizedPath === homePath) return undefined;

  return routes.find((route) =>
    route.children?.some((child) => normalizedPath.startsWith(child.href))
  );
};
