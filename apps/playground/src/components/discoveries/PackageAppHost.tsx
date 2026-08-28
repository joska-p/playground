// Lazy host mounted via `client:only="react"`: the glob base is relative to
// THIS module (5 levels up from src/components/discoveries to the repo root).
// Loading on demand keeps the per-page client bundle small and never pulls
// package sources into the app's strict type-check.
import { useEffect, useState } from 'react';

import type { ComponentType } from 'react';

const appLoaders = import.meta.glob('../../../../../packages/*/src/App.tsx');

interface PackageModule {
    App: ComponentType;
}

interface PackageAppHostProps {
    appId: string;
}

function PackageAppHost({ appId }: PackageAppHostProps) {
    const [App, setApp] = useState<ComponentType | null>(null);

    useEffect(() => {
        let alive = true;

        appLoaders[`../../../../../packages/${appId}/src/App.tsx`]?.()
            .then((mod) => {
                if (alive) setApp((mod as PackageModule).App);
            })
            .catch(() => undefined);

        return () => {
            alive = false;
        };
    }, [appId]);

    return App ? <App /> : null;
}

export { PackageAppHost };
