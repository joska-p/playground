import type { IconName } from '@repo/ui/icons';

export type Category =
  | 'generative'
  | 'color'
  | 'image'
  | 'data-viz'
  | 'random'
  | 'simulation';

export const CATEGORIES = {
  generative: {
    name: 'Generative Art',
    description:
      'Procedural patterns and mathematical visualizations that create art from algorithms.',
    icon: 'generative',
    order: 0,
  },
  color: {
    name: 'Color & Design',
    description:
      'Tools for exploring color theory, generating harmonious palettes, and design utilities.',
    icon: 'color',
    order: 1,
  },
  'data-viz': {
    name: 'Data Visualization',
    description:
      'Interactive charts, graphs, and visual representations of data using D3 and other libraries.',
    icon: 'data-viz',
    order: 3,
  },
  image: {
    name: 'Image Processing',
    description:
      'Transform, deconstruct, and visualize images through creative algorithms.',
    icon: 'image',
    order: 2,
  },
  'random': {
    name: 'Random & Misc',
    description:
      "A collection of miscellaneous projects that don't fit into other categories but are fun and interesting.",
    icon: 'random',
    order: 4,
  },
  simulation: {
    name: 'Simulation',
    description:
      'Cellular automata, particle systems, and process simulations that model emergent behavior from simple rules.',
    icon: 'simulation',
    order: 5,
  },
} as const;

type CategoryMeta = (typeof CATEGORIES)[Category];

export const SORTED_CATEGORIES = (
  Object.entries(CATEGORIES) as [Category, CategoryMeta][]
).sort((a, b) => a[1].order - b[1].order);

export type Project = {
  slug: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  icon: IconName;
  featured: boolean;
};

export const projects: Record<string, Project> = {
  mosaic: {
    slug: 'mosaic',
    name: 'Mosaic Maker',
    description:
      'Transform color palettes into beautiful procedural mosaic patterns using CSS Grid.',
    category: 'generative',
    tags: ['Canvas', 'Zustand'],
    icon: 'generative',
    featured: true,
  },
  sequences: {
    slug: 'sequences',
    name: 'Sequence Renderer',
    description:
      'Visualize mathematical sequences like Recamán and Fibonacci with pluggable renderers.',
    category: 'generative',
    tags: ['Math', 'SVG'],
    icon: 'generative',
    featured: true,
  },
  palettes: {
    slug: 'palettes',
    name: 'Palettes Generator',
    description:
      'Generate harmonious color schemes using mathematical color theory models.',
    category: 'color',
    tags: ['Design', 'Theory'],
    icon: 'color',
    featured: false,
  },
  particles: {
    slug: 'particles',
    name: 'Image to Particles',
    description:
      'Deconstruct images into physics-based particle systems with real-time interaction.',
    category: 'image',
    tags: ['Physics', 'Canvas'],
    icon: 'image',
    featured: false,
  },
  imageManipulator: {
    slug: 'image-manipulator',
    name: 'Image Manipulator',
    description:
      'A tool for manipulating images using canvas and webb workers.',
    category: 'image',
    tags: ['Images', 'Canvas'],
    icon: 'image',
    featured: true,
  },
  pipeline: {
    slug: 'pipeline',
    name: 'Image Pipeline',
    description:
      'Interactive API documentation for the browser-based image manipulation pipeline with live visual examples.',
    category: 'image',
    tags: ['Pipeline', 'Docs'],
    icon: 'image',
    featured: true,
  },
  'pie-chart': {
    slug: 'pie-chart',
    name: 'Pie Chart',
    description:
      'Interactive D3-based pie chart examples for data visualization.',
    category: 'data-viz',
    tags: ['D3', 'Charts'],
    icon: 'data-viz',
    featured: false,
  },
  graphify: {
    slug: 'graphify',
    name: 'Graphify',
    description: 'Interactive graph, click nodes, search, filter by community.',
    category: 'data-viz',
    tags: ['Graph', 'D3'],
    icon: 'data-viz',
    featured: true,
  },
  'three-stage': {
    slug: 'three-stage',
    name: 'Three Stage',
    description: 'A 3D stage for rendering and animate 3D objects.',
    category: 'random',
    tags: ['Threejs', '3D', 'WebGL'],
    icon: 'random',
    featured: false,
  },
  automa: {
    slug: 'automa',
    name: 'Automa',
    description:
      "Interactive Conway's Game of Life simulator with Web Worker stepping, editable grid, and R3F orthographic rendering.",
    category: 'simulation',
    tags: ['Three.js', 'Simulation', 'WebGL'],
    icon: 'simulation',
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
        projects: Object.values(projects).filter(
          (p) => p.category === category
        ),
      },
    ];
  }
  return Object.entries(CATEGORIES).map(([id, meta]) => ({
    id: id as Category,
    ...meta,
    projects: Object.values(projects).filter((p) => p.category === id),
  }));
}
