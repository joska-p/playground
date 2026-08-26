import { Button, Slider, Textarea } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';
import { startTransition } from 'react';

import { setComplexity, setModulo, setSeed } from '../store/actions';
import { useComplexity, useModulo, useSeed } from '../store/selectors';

const generateRandomSeed = () => {
    const randomPhrases = [
        'cree-geometry-pulse',
        'ojibwe-pisano-grid',
        'inuktitut-vowel-rot',
        'aboriginal-glyph-wave',
        'modulo-digital-artifact',
        'cosmic-mathematics-flow'
    ];
    const randomPhrase =
        randomPhrases[Math.floor(Math.random() * randomPhrases.length)] ?? 'ojibwe-pisano-grid';
    const newSeed = randomPhrase + '-' + String(Math.floor(Math.random() * 1000));

    setSeed(newSeed);
};

function AtlasControls() {
    const seed = useSeed();
    const modulo = useModulo();
    const complexity = useComplexity();

    const handleComplexityChange = (value: number) => {
        startTransition(() => {
            setComplexity(value);
        });
    };

    return (
        <>
            <PanelSection label="generation">
                <Textarea
                    value={seed}
                    onChange={(e) => {
                        setSeed(e.target.value);
                    }}
                />
                <Button onClick={generateRandomSeed}>Generate Random Seed</Button>
                <Slider
                    value={modulo}
                    min={2}
                    max={16}
                    step={1}
                    onChange={setModulo}
                />
                <Slider
                    value={complexity}
                    min={5}
                    max={45}
                    step={1}
                    onChange={handleComplexityChange}
                />
            </PanelSection>
        </>
    );
}

export { AtlasControls };
