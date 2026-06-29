import type { Node, Root } from 'mdast';

export function remarkBaseUrl({ base }: { base: string }) {
  const cleanBase = base.replace(/\/$/, '');

  return (tree: Root) => {
    function walk(node: Node) {
      // Look for Markdown link elements
      if (node.type === 'link' && 'url' in node && typeof node.url === 'string') {
        if (node.url.startsWith('/') && !node.url.startsWith('//')) {
          node.url = `${cleanBase}${node.url}`;
        }
      }

      // Recursively walk through any children
      if ('children' in node && Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    }

    walk(tree);
  };
}
