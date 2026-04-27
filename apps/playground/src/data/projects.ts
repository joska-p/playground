import type { ComponentType } from "react";
import {
  Grid3X3,
  Infinity as InfinityIcon,
  Palette,
  Flame,
  PieChart,
  Sparkles,
  BarChart3,
  Grid
} from "lucide-react";

/**
 * Project categories
 */
export type Category = "generative" | "color" | "image" | "data-viz";

/**
 * Category metadata - human-readable names
 */
export const categories: Record<Category, { name: string; description: string }> = {
  generative: {
    name: "Generative Art",
    description:
      "Procedural patterns and mathematical visualizations that create art from algorithms.",
  },
  color: {
    name: "Color & Design",
    description:
      "Tools for exploring color theory, generating harmonious palettes, and design utilities.",
  },
  "data-viz": {
    name: "Data Visualization",
    description:
      "Interactive charts, graphs, and visual representations of data using D3 and other libraries.",
  },
  image: {
    name: "Image Processing",
    description: "Transform, deconstruct, and visualize images through creative algorithms.",
  },
};

/**
 * Project data - single source of truth for all project metadata
 * Styling is derived from category via CSS tokens (see gruvbox-styles.css)
 */
export interface Project {
  slug: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  icon: ComponentType<{ className?: string }>;
}

/**
 * Icon map - components are already imported at top
 */
const icons = {
  Grid3X3,
  InfinityIcon,
  Palette,
  Flame,
  PieChart,
  Sparkles,
  BarChart3,
  Grid
};

/**
 * All projects - add/edit here only
 */
export const projects: Record<string, Project> = {
  mosaic: {
    slug: "mosaic",
    name: "Mosaic Maker",
    description:
      "Transform color palettes into beautiful procedural mosaic patterns using CSS Grid.",
    category: "generative",
    tags: ["Canvas", "Zustand"],
    icon: icons.Grid3X3,
  },
  sequences: {
    slug: "sequences",
    name: "Sequence Renderer",
    description:
      "Visualize mathematical sequences like Recamán and Fibonacci with pluggable renderers.",
    category: "generative",
    tags: ["Math", "SVG"],
    icon: icons.InfinityIcon,
  },
  palettes: {
    slug: "palettes",
    name: "Palettes Generator",
    description: "Generate harmonious color schemes using mathematical color theory models.",
    category: "color",
    tags: ["Design", "Theory"],
    icon: icons.Palette,
  },
  particles: {
    slug: "particles",
    name: "Image to Particles",
    description:
      "Deconstruct images into physics-based particle systems with real-time interaction.",
    category: "image",
    tags: ["Physics", "Canvas"],
    icon: icons.Flame,
  },
  piechart: {
    slug: "piechart",
    name: "Pie Chart",
    description: "Interactive D3-based pie chart examples for data visualization.",
    category: "data-viz",
    tags: ["D3", "Charts"],
    icon: icons.PieChart,
  },
  graphify: {
    slug: "graphify",
    name: "Graphify",
    description: "interactive graph, click nodes, search, filter by community.",
    category: "data-viz",
    tags: ["Graph", "D3"],
    icon: icons.Grid,
  },
};

/**
 * Type for project slug
 */
export type ProjectSlug = keyof typeof projects;

/**
 * Helper: get all project slugs
 */
export function getProjectSlugs(): ProjectSlug[] {
  return Object.keys(projects) as ProjectSlug[];
}

/**
 * Helper: get projects grouped by category
 */
export function getProjectsByCategory(): Record<Category, Project[]> {
  const result: Record<Category, Project[]> = {
    generative: [],
    color: [],
    "data-viz": [],
    image: [],
  };

  for (const project of Object.values(projects)) {
    result[project.category].push(project);
  }

  return result;
}
