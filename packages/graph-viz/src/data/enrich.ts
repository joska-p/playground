/**
 * Build-time semantic enrichment for graph data.
 *
 * Transforms the raw graphify AST dump into a meaning-rich structure:
 *  - Classifies each node by entity type (file, function, type, config-key, etc.)
 *  - Extracts package name from source_file paths
 *  - Generates descriptive community labels from child node labels
 *  - Identifies cross-package edges for the "packages view"
 *
 * This runs once at build time inside prepare.ts — zero runtime cost.
 */
import type { CommunityData, EntityType, GraphNode } from '../types';

// ── Entity-type classification ──────────────────────────────────────────────

const FUNCTION_RE = /^\w*\(\)$/;
const METHOD_RE = /^\.\w+\(\)$/;
const UPPER_CASE_RE = /^[A-Z][a-zA-Z0-9]+$/;
const SCREAMING_CASE_RE = /^[A-Z][A-Z0-9_]+$/;
const FILE_EXT_RE = /\.\w+$/;
const PACKAGE_RE = /^@[\w/-]+$/;

/**
 * Classify a single node's entity type from its label.
 * Heuristics based on observed patterns in graphify output.
 */
export function classifyEntity(label: string): EntityType {
  if (METHOD_RE.test(label)) return 'method';
  if (FUNCTION_RE.test(label)) return 'function';
  if (PACKAGE_RE.test(label)) return 'package';
  if (FILE_EXT_RE.test(label) && label.includes('.')) return 'file';
  if (SCREAMING_CASE_RE.test(label)) return 'constant';
  if (UPPER_CASE_RE.test(label)) return 'type';
  // Lower-case generic tokens like "name", "version", "scripts"
  if (/^[a-z][a-zA-Z0-9]*$/.test(label)) return 'config-key';
  return 'unknown';
}

// ── Package extraction ──────────────────────────────────────────────────────

/** Generic tokens that shouldn't be used for community labels */
const GENERIC_LABELS = new Set([
  'dependencies',
  'devDependencies',
  'scripts',
  'name',
  'version',
  'type',
  'engines',
  'node',
  'exports',
  'main',
  'module',
  'types',
  'files',
  'keywords',
  'author',
  'license',
  'description',
  'repository',
  'bugs',
  'homepage',
  'compilerOptions',
  'include',
  'allowImportingTsExtensions',
  'erasableSyntaxOnly',
  'jsx',
  'lib',
  'moduleDetection',
  'moduleResolution',
  'noEmit',
  'target',
  'noFallthroughCasesInSwitch',
  'noUnusedLocals',
  'noUnusedParameters',
  'strict',
  'skipLibCheck',
  'outDir',
  'sourceMap',
  'babel-plugin-react-compiler',
  'eslint',
  'react',
  'react-dom',
  'preview',
  'build',
  'dev',
  'lint',
  'lint-fix',
  'check-types',
  'clean',
  'astro'
]);

/**
 * Extract package name from a source_file path.
 * Handles monorepo layout and external refs.
 *
 *   "apps/playground/src/pages/index.astro"    → "apps/playground"
 *   "packages/ui/src/Button.tsx"               → "@repo/ui"
 *   "@repo/ui/Icon"                            → "@repo/ui"
 *   "react"                                    → "react"
 *   "astro:assets"                             → "astro"
 */
export function extractPackage(sourceFile: string): string {
  if (!sourceFile) return 'unknown';

  // Direct package refs like "@repo/ui/Icon"
  if (sourceFile.startsWith('@')) {
    return sourceFile.split('/').slice(0, 2).join('/');
  }

  // Monorepo paths: "packages/ui/..." or "apps/playground/..."
  const parts = sourceFile.split('/');
  if (parts.length >= 2) {
    const top = parts[0]!;
    const second = parts[1]!;
    if (top === 'packages') return `@repo/${second}`;
    if (top === 'apps') return `${top}/${second}`;
    return `${top}/${second}`;
  }

  // Bare module name like "react", "zustand"
  if (sourceFile.includes(':')) return sourceFile.split(':')[0]!;
  return sourceFile;
}

// ── Node enrichment ─────────────────────────────────────────────────────────

export type EnrichedNode = GraphNode & {
  entity_type: EntityType;
  package_name: string;
};

/**
 * Enrich every node with entity_type and package_name.
 * Mutates in place for performance (build-time only).
 */
export function enrichNodes(nodes: GraphNode[]): void {
  for (const node of nodes) {
    (node as EnrichedNode).entity_type = classifyEntity(node.label);
    (node as EnrichedNode).package_name = extractPackage(node.source_file);
  }
}

// ── Semantic community labels ───────────────────────────────────────────────

/**
 * Build a human-readable label for a community from its children.
 * Also returns the dominant package so callers avoid recomputing it.
 *
 * Strategy:
 *  1. Find the dominant package name
 *  2. Collect non-generic, non-file labels
 *  3. Take the top 3 most frequent meaningful terms
 *  4. Format as "Package — Term1, Term2, Term3"
 */
export function buildCommunityLabel(
  communityId: number,
  nodeIndices: number[],
  nodes: GraphNode[]
): { label: string; dominantPackage: string } {
  const childLabels: string[] = [];
  const packageCounts = new Map<string, number>();

  for (const idx of nodeIndices) {
    const n = nodes[idx]!;
    const pkg = extractPackage(n.source_file);
    packageCounts.set(pkg, (packageCounts.get(pkg) ?? 0) + 1);

    // Skip generic boilerplate tokens
    if (
      !GENERIC_LABELS.has(n.label) &&
      n.entity_type !== 'file' &&
      n.entity_type !== 'config-key'
    ) {
      childLabels.push(n.label);
    }
  }

  // Dominant package
  const dominantPackage =
    [...packageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1)
      .map(([pkg]) => pkg)[0] ?? `C${communityId}`;

  if (childLabels.length === 0) {
    return { label: dominantPackage, dominantPackage };
  }

  // Count label frequency
  const freq = new Map<string, number>();
  for (const lbl of childLabels) {
    freq.set(lbl, (freq.get(lbl) ?? 0) + 1);
  }

  // Top 3 most common distinctive labels
  const topTerms = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([label]) => label);

  return {
    label: `${dominantPackage} — ${topTerms.join(', ')}`,
    dominantPackage
  };
}

/**
 * Enrich every community with semantic_label and dominant_package.
 * Mutates in place.
 */
export function enrichCommunities(
  communities: Map<number, CommunityData>,
  nodes: GraphNode[]
): void {
  for (const [cid, comm] of communities) {
    const { label, dominantPackage } = buildCommunityLabel(
      cid,
      comm.nodeIndices,
      nodes
    );
    comm.semantic_label = label;
    comm.dominant_package = dominantPackage;
  }
}
