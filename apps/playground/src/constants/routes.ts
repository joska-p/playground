import { projects } from "../data/projects";

export interface Route {
  label: string;
  href: string;
  children: Route[];
  icon?: string;
  description?: string;
  isUtility?: boolean;
}

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

// Generate project routes from central data source
const projectRoutes = Object.entries(projects).map(([slug, meta]) => ({
  label: meta.name,
  href: `/projects/${slug}/`,
  description: meta.description,
  children: [],
}));

const rawRoutes = [
  {
    label: "Projects",
    href: "/projects/",
    description: "Browse creative projects by category",
    children: projectRoutes,
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
