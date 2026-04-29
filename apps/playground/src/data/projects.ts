import type { ComponentType } from "react";
import { Grid3X3, Infinity as InfinityIcon, Palette, Flame, PieChart, Grid } from "lucide-react";

/**
 * Project categories
 */
export type Category = "generative" | "color" | "image" | "data-viz";

/**
 * Category metadata
 */
export const CATEGORIES = {
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
} as const;

export interface Project {
  slug: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  icon: ComponentType<{ className?: string }>;
  featured: boolean;
}

/**
 * All projects - icons assigned directly from imports
 */
export const projects: Record<string, Project> = {
  mosaic: {
    slug: "mosaic",
    name: "Mosaic Maker",
    description:
      "Transform color palettes into beautiful procedural mosaic patterns using CSS Grid.",
    category: "generative",
    tags: ["Canvas", "Zustand"],
    icon: Grid3X3,
    featured: true,
  },
  sequences: {
    slug: "sequences",
    name: "Sequence Renderer",
    description:
      "Visualize mathematical sequences like Recamán and Fibonacci with pluggable renderers.",
    category: "generative",
    tags: ["Math", "SVG"],
    icon: InfinityIcon,
    featured: true,
  },
  palettes: {
    slug: "palettes",
    name: "Palettes Generator",
    description: "Generate harmonious color schemes using mathematical color theory models.",
    category: "color",
    tags: ["Design", "Theory"],
    icon: Palette,
    featured: true,
  },
  particles: {
    slug: "particles",
    name: "Image to Particles",
    description:
      "Deconstruct images into physics-based particle systems with real-time interaction.",
    category: "image",
    tags: ["Physics", "Canvas"],
    icon: Flame,
    featured: false,
  },
  piechart: {
    slug: "piechart",
    name: "Pie Chart",
    description: "Interactive D3-based pie chart examples for data visualization.",
    category: "data-viz",
    tags: ["D3", "Charts"],
    icon: PieChart,
    featured: false,
  },
  graphify: {
    slug: "graphify",
    name: "Graphify",
    description: "Interactive graph, click nodes, search, filter by community.",
    category: "data-viz",
    tags: ["Graph", "D3"],
    icon: Grid,
    featured: true,
  },
};

/**
 * API: Get featured projects
 */
export function getFeaturedProjects() {
  return Object.values(projects).filter((p) => p.featured);
}

/**
 * API: Get projects grouped by category with metadata
 */
export function getProjectsByCategory(category?: Category) {
  if (category) {
    const meta = CATEGORIES[category];
    return [
      {
        id: category,
        ...meta,
        projects: Object.values(projects).filter((p) => p.category === category),
      },
    ];
  }
  return Object.entries(CATEGORIES).map(([id, meta]) => ({
    id: id as Category,
    ...meta,
    projects: Object.values(projects).filter((p) => p.category === id),
  }));
}
