import { defineMdastPlugin } from 'satteri';
import type { Link } from 'mdast';

// Prefix root-absolute links (single `/`) with the site base so they survive
// deployment under a subpath (e.g. GitHub Pages `/playground`). Applied to every
// content collection render; generated api pages rely on it for their `/api/...`
// cross-links.
export function remarkBaseUrl({ base }: { base: string }) {
    const cleanBase = base.replace(/\/$/, '');

    return defineMdastPlugin({
        name: 'base-url',
        link(node: Link, ctx) {
            if (node.url.startsWith('/') && !node.url.startsWith('//')) {
                ctx.setProperty(node, 'url', `${cleanBase}${node.url}`);
            }
        }
    });
}
