export type Route = {
    label: string;
    href: string;
};

/**
 * A route is "active" when it exactly matches baseUrl (the root), or when the current path starts
 * with its href.
 */
export const isActiveRoute = (href: string, currentPath: string, baseUrl: string): boolean => {
    if (href === baseUrl) {
        return currentPath === href || currentPath === href + '/';
    }

    return currentPath.startsWith(href);
};

// Single source of truth for the two external profile links.
export const githubUrl = 'https://github.com/joska-p/playground';

export const socialLinks: Route[] = [{ label: 'GitHub', href: githubUrl }];
