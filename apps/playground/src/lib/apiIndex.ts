import apiIndexJson from '../content/api/index.json';

export type ApiPackage = {
    package: string;
    packageDir: string;
    routeId: string;
    title: string;
    description: string | null;
    keywords: string;
    hasApp: boolean;
    appImport: string;
};

export type ApiEntry = {
    id: string;
    package: string;
    kind: 'package' | 'module' | 'internal';
    module: string | null;
    title: string;
    description: string | null;
    namespace: string;
};

export type ApiIndex = {
    version: number;
    packages: ApiPackage[];
    entries: ApiEntry[];
};

export const apiIndex = apiIndexJson as ApiIndex;

export function entriesForPackage(packageName: string): ApiEntry[] {
    return apiIndex.entries.filter((e) => e.package === packageName);
}

export function packageForRoute(routeId: string): ApiPackage | undefined {
    return apiIndex.packages.find((p) => p.routeId === routeId);
}

export function namespaceForEntry(entryId: string): string {
    return apiIndex.entries.find((e) => e.id === entryId)?.namespace ?? entryId.replace(/\./g, '-');
}
