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
 * Badge color variants - inferred from @repo/ui Badge
 * Use this type to ensure only valid badge colors are used
 */
export type BadgeColor = Extract<
  BadgeVariant,
  "primary" | "secondary" | "accent" | "destructive" | "outline"
>;

/**
 * Categories for organizing projects
 */
export type Category = "generative" | "color" | "image";

/**
 * Category metadata
 */
export const categories = {
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
} satisfies Record<Category, { name: string; description: string; icon: LucideIcon }>;

/**
 * Icon mapping - maps icon name to imported icon component
 * All projects must have an icon defined here
 */
export const projectIcons: Record<ProjectSlug, LucideIcon> = {
  mosaic: Grid3X3,
  sequences: InfinityIcon,
  palettes: Palette,
  particles: Flame,
  piechart: PieChart,
};

/**
 * Icon background color mapping per project
 */
export const projectIconBgColors: Record<ProjectSlug, string> = {
  mosaic: "bg-secondary/20",
  sequences: "bg-primary/20",
  palettes: "bg-accent/20",
  particles: "bg-destructive/20",
  piechart: "bg-primary/20",
};

/**
 * Icon text color mapping per project
 */
export const projectIconColors: Record<ProjectSlug, string> = {
  mosaic: "text-secondary",
  sequences: "text-primary",
  palettes: "text-accent",
  particles: "text-destructive",
  piechart: "text-primary",
};

/**
 * Icon and color mapping for each project
 */
export interface ProjectMeta {
  name: string;
  description: string;
  category: Category;
  tags: { label: string; color: BadgeColor }[];
}

/**
 * Central source of truth for all projects
 * Add/edit projects here - changes propagate automatically
 */
export const projects = {
  mosaic: {
    name: "Mosaic Maker",
    description:
      "Transform color palettes into beautiful procedural mosaic patterns using CSS Grid.",
    category: "generative" as const,
    tags: [
      { label: "Canvas", color: "secondary" as const },
      { label: "Zustand", color: "secondary" as const },
    ],
  },
  sequences: {
    name: "Sequence Renderer",
    description:
      "Visualize mathematical sequences like Recamán and Fibonacci with pluggable renderers.",
    category: "generative" as const,
    tags: [
      { label: "Math", color: "primary" as const },
      { label: "SVG", color: "primary" as const },
    ],
  },
  palettes: {
    name: "Palettes Generator",
    description: "Generate harmonious color schemes using mathematical color theory models.",
    category: "color" as const,
    tags: [
      { label: "Design", color: "accent" as const },
      { label: "Theory", color: "accent" as const },
    ],
  },
  particles: {
    name: "Image to Particles",
    description:
      "Deconstruct images into physics-based particle systems with real-time interaction.",
    category: "image" as const,
    tags: [
      { label: "Physics", color: "destructive" as const },
      { label: "Canvas", color: "destructive" as const },
    ],
  },
  piechart: {
    name: "Pie Chart",
    description: "Interactive D3-based pie chart examples for data visualization.",
    category: "image" as const,
    tags: [
      { label: "D3", color: "primary" as const },
      { label: "Charts", color: "primary" as const },
    ],
  },
} satisfies Record<string, ProjectMeta>;

/**
 * Get all projects as an array
 */
export type ProjectSlug = keyof typeof projects;

/**
 * Get project by slug
 */
export function getProject(slug: ProjectSlug): ProjectMeta {
  return projects[slug];
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(
  category: Category
): Array<{ slug: ProjectSlug } & ProjectMeta> {
  return (Object.entries(projects) as [ProjectSlug, ProjectMeta][])
    .filter(([, meta]) => meta.category === category)
    .map(([slug, meta]) => ({ slug, ...meta }));
}
