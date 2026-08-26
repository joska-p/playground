import { Button, Input } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { rerollGlobalSeed, setSeed, useSeed } from '../store';

export function SeedSection() {
    const seed = useSeed();

    return (
        <PanelSection
            label="Global Seed"
            defaultOpen
        >
            <div className="flex items-center gap-2">
                <Input
                    type="number"
                    value={seed}
                    onChange={(e) => {
                        setSeed(Number(e.target.value));
                    }}
                    className="w-24"
                />
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={rerollGlobalSeed}
                    className="text-xs"
                >
                    reroll all
                </Button>
            </div>
        </PanelSection>
    );
}
