import { ControlGrid, Button, Textarea } from '@repo/tlc/components/forms';

import { RuleControls } from './RuleControls';
import { setColorSpace, setSeedText } from '../../stores/randomart/actions/config';
import { useColorSpace, useSeedText } from '../../stores/randomart/selectors';

import type { ColorSpaceId } from '@repo/randomart-engine-next/types';

const COLOR_SPACES: { id: ColorSpaceId; label: string }[] = [
    { id: 'srgb', label: 'sRGB' },
    { id: 'oklch', label: 'OKLCH' },
    { id: 'oklab', label: 'OKLab' },
    { id: 'hsl', label: 'HSL' }
];

function ConfigControls() {
    const seedText = useSeedText();
    const activeSpace = useColorSpace();

    return (
        <>
            <Textarea
                autoGrow={false}
                value={seedText}
                onChange={(e) => {
                    setSeedText(e.target.value);
                }}
            />

            <RuleControls />

            <ControlGrid columns={4}>
                {COLOR_SPACES.map((cs) => (
                    <Button
                        size="sm"
                        key={`color-space-${cs.id}`}
                        variant={activeSpace === cs.id ? 'primary' : 'default'}
                        onClick={() => {
                            setColorSpace(cs.id);
                        }}
                    >
                        {cs.label}
                    </Button>
                ))}
            </ControlGrid>
        </>
    );
}

export { ConfigControls };
