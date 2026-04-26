import type { BadgeVariant } from "@repo/ui";
import type { LucideIcon } from "lucide-react";
import {
  Grid3X3,
  Infinity as InfinityIcon,
  Palette,
  Flame,
  PieChart,
  Sparkles,
} from "lucide-react";

/**
 * Valid badge color variants - inferred from @repo/ui Badge
 */
export type BadgeColor = Extract<
  BadgeVariant,
  "primary" | "secondary" | "accent" | "destructive" | "outline"
>;

/**
 * Project categories
 */
export type Category = "generative" | "color" | "image";

/**
 * Category metadata
 */
export interface CategoryMeta {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const categories: Record<Category, CategoryMeta> = {
  generative: {
    name: "Generative Art",
    description:
      "Procedural patterns and mathematical visualizations that create art from algorithms.",
    icon: Sparkles,
  },
  color: {
    name: "Color & Design",
    description:
      "Tools for exploring color theory, generating harmonious palettes, and design utilities.",
    icon: Palette,
  },
  image: {
    name: "Image Processing",
    description: "Transform, deconstruct, and visualize images through creative algorithms.",
    icon: Flame,
  },
};

/**
 * Project data - single source of truth for all project metadata
 */
export interface Project {
  name: string;
  description: string;
  category: Category;
  tags: { label: string; color: BadgeColor }[];
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

/**
 * All projects - add/edit here only
 */
export const projects = {
  mosaic: {
    name: "Mosaic Maker",
    description:
      "Transform color palettes into beautiful procedural mosaic patterns using CSS Grid.",
    category: "generative",
    tags: [
      { label: "Canvas", color: "secondary" },
      { label: "Zustand", color: "secondary" },
    ],
    icon: Grid3X3,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
  sequences: {
    name: "Sequence Renderer",
    description:
      "Visualize mathematical sequences like Recamán and Fibonacci with pluggable renderers.",
    category: "generative",
    tags: [
      { label: "Math", color: "primary" },
      { label: "SVG", color: "primary" },
    ],
    icon: InfinityIcon,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  palettes: {
    name: "Palettes Generator",
    description: "Generate harmonious color schemes using mathematical color theory models.",
    category: "color",
    tags: [
      { label: "Design", color: "accent" },
      { label: "Theory", color: "accent" },
    ],
    icon: Palette,
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
  },
  particles: {
    name: "Image to Particles",
    description:
      "Deconstruct images into physics-based particle systems with real-time interaction.",
    category: "image",
    tags: [
      { label: "Physics", color: "destructive" },
      { label: "Canvas", color: "destructive" },
    ],
    icon: Flame,
    iconBg: "bg-destructive/20",
    iconColor: "text-destructive",
  },
  piechart: {
    name: "Pie Chart",
    description: "Interactive D3-based pie chart examples for data visualization.",
    category: "image",
    tags: [
      { label: "D3", color: "primary" },
      { label: "Charts", color: "primary" },
    ],
    icon: PieChart,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
} satisfies Record<string, Project>;

/**
 * Type for project slug - derived from projects object
 */
export type ProjectSlug = keyof typeof projects;

/**
 * Get all project slugs as an array
 */
export const projectSlugs = Object.keys(projects) as ProjectSlug[];

/**
 * Get projects grouped by category - pre-computed for efficient lookups
 * Each project includes its slug for easy linking
 */
export interface ProjectWithSlug extends Project {
  slug: ProjectSlug;
}

export const projectsByCategory: Record<Category, ProjectWithSlug[]> = {
  generative: [],
  color: [],
  image: [],
};

for (const slug of projectSlugs) {
  const project = projects[slug];
  projectsByCategory[project.category].push({ ...project, slug });
}
