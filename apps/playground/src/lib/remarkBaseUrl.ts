import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function remarkBaseUrl({
  base,
}: {
  base: string;
}): (tree: Root) => void {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = `${base.replace(/\/$/, '')}${node.url}`;
      }
    });
  };
}
