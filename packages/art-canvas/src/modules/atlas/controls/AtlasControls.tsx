import { ControlGrid, ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider, Textarea } from '@repo/ui/data-entry';
import { startTransition } from 'react';
import {
    setComplexity,
    setGlitch,
    setModulo,
    setPalette,
    setSeed,
    setSymbolType
} from '../store/actions';
import {
    useComplexity,
    useGlitch,
    useModulo,
    usePalette,
    useSeed,
    useSymbolType
} from '../store/selectors';

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

const symbolSample = [
    { id: 0, label: 'ᐱ Arrow', sym: 'ᐱ' },
    { id: 1, label: 'ᑕ Contain', sym: 'ᑕ' },
    { id: 2, label: '🌙 Crescent', sym: '🌙' },
    { id: 3, label: '🖿 Chevron', sym: '◇' }
];

const paletteSample = [
    { id: 0, name: 'Neon Matrix' },
    { id: 1, name: 'Ochre Clay' },
    { id: 2, name: 'Aurora Skies' },
    { id: 3, name: 'Blueprint Mono' }
];

function AtlasControls() {
    const seed = useSeed();
    const modulo = useModulo();
    const complexity = useComplexity();
    const symbolType = useSymbolType();
    const palette = usePalette();
    const glitch = useGlitch();

    const handleComplexityChange = (value: number) => {
        startTransition(() => {
            setComplexity(value);
        });
    };

    const seedOffset = () => {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash % 1000);
    };

    return (
        <>
            <ControlSection title="generation">
                <Textarea
                    value={seed}
                    onChange={(e) => {
                        setSeed(e.target.value);
                    }}
                />
                <Button onClick={generateRandomSeed}>Generate Random Seed</Button>
                <Slider
                    title="Pisano Period"
                    min={2}
                    max={16}
                    step={1}
                    value={modulo}
                    onChange={setModulo}
                />
                <Slider
                    title="Complexity"
                    min={5}
                    max={45}
                    step={1}
                    value={complexity}
                    onChange={handleComplexityChange}
                />
            </ControlSection>
            <ControlSection title="symbols">
                <ControlGrid columns={2}>
                    {symbolSample.map((btn) => (
                        <Button
                            className={
                                symbolType === btn.id
                                    ? 'border-aqua/80 bg-aqua/15 text-aqua'
                                    : 'border-border bg-surface/60 text-foreground-muted hover:border-foreground-dim'
                            }
                            key={btn.id}
                            onClick={() => {
                                setSymbolType(String(btn.id));
                            }}
                        >
                            {btn.label.split(' ')[1]}
                        </Button>
                    ))}
                </ControlGrid>
            </ControlSection>
            <ControlSection title="palette">
                <ControlGrid columns={2}>
                    {paletteSample.map((btn) => (
                        <Button
                            className={
                                palette === btn.id
                                    ? 'border-aqua/80 bg-aqua/15 text-aqua'
                                    : 'border-border bg-surface/60 text-foreground-muted hover:border-foreground-dim'
                            }
                            key={btn.id}
                            onClick={() => {
                                setPalette(String(btn.id));
                            }}
                        >
                            {btn.name}
                        </Button>
                    ))}
                </ControlGrid>
            </ControlSection>

            <ControlSection title="effects">
                <ControlRow label="glitch">
                    <Slider
                        title="Glitch"
                        min={0}
                        max={1}
                        step={0.05}
                        value={glitch}
                        onChange={setGlitch}
                    />
                </ControlRow>
            </ControlSection>

            <ControlSection title="infos">
                <div className="space-y-1 rounded-xl border border-border/80 bg-surface/70 p-2.5 font-mono text-[9px] text-foreground-muted">
                    <div className="flex justify-between">
                        <span>Coordinate Seed Index:</span>
                        <span className="text-aqua">#{seedOffset()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Rotations per Modulo:</span>
                        <span className="text-foreground">360° / {modulo}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Engine:</span>
                        <span className="text-aqua">React 19 + R3F v9</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-foreground">
                        The Rotational Grammar of Syllabics
                    </h3>
                    <p className="mt-1 text-[10px] leading-normal text-foreground-muted">
                        Unified Canadian Aboriginal Syllabics (UCAS) are fundamentally geometric and
                        rotational. A single shape is rotated (e.g., pointing ᐱ, ᐯ, ᐸ, ᐳ) to specify
                        vowel sounds.
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] text-aqua/90">
                        F(n) = F(n-1) + F(n-2) (mod {modulo})
                    </p>
                </div>

                <p className="font-mono text-xs text-foreground-muted">
                    Pisano Period: Rotational Matrices
                </p>
                <p className="mt-0.5 max-w-xs text-[10px] leading-normal text-foreground-dim">
                    Generating procedural textures mapped through the algebraic loop boundaries of
                    Fibonacci modulations.
                </p>
            </ControlSection>
        </>
    );
}

export { AtlasControls };
