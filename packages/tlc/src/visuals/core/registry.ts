import { buildCircuit } from './styles/circuit';
import { buildConstellation } from './styles/constellation';
import { buildContour } from './styles/contour';
import { buildGlyph } from './styles/glyph';
import { buildLattice } from './styles/lattice';
import { buildOrbit } from './styles/orbit';
import { buildRadar } from './styles/radar';
import { buildSpectrum } from './styles/spectrum';
import { buildWeave } from './styles/weave';
import { CARD_STYLE_IDS } from './types';
import type { CardGraphic, CardStyleId } from './types';

export type CardStyleBuilder = (rand: () => number) => CardGraphic;

export interface CardStyleMeta {
    id: CardStyleId;
    label: string;
    blurb: string;
}

export const CARD_STYLES: readonly CardStyleMeta[] = [
    { id: 'circuit', label: 'Circuit', blurb: 'Traces ouvertes et nœuds' },
    { id: 'constellation', label: 'Constellation', blurb: "Graphe d'étoiles" },
    { id: 'orbit', label: 'Orbite', blurb: 'Ellipses et satellites' },
    { id: 'weave', label: 'Tissage', blurb: 'Champ de flux' },
    { id: 'glyph', label: 'Glyphe', blurb: 'Alphabet procédural' },
    { id: 'lattice', label: 'Treillis', blurb: 'Maille hexagonale' },
    { id: 'contour', label: 'Contour', blurb: 'Courbes de niveau' },
    { id: 'radar', label: 'Radar', blurb: 'Balayage concentrique' },
    { id: 'spectrum', label: 'Spectre', blurb: "Barres d'oscilloscope" }
] as const;

export const BUILDERS: Record<CardStyleId, CardStyleBuilder> = {
    circuit: buildCircuit,
    constellation: buildConstellation,
    orbit: buildOrbit,
    weave: buildWeave,
    glyph: buildGlyph,
    lattice: buildLattice,
    contour: buildContour,
    radar: buildRadar,
    spectrum: buildSpectrum
};

export function styleFromSeed(seed: number): CardStyleId {
    return CARD_STYLE_IDS[seed % CARD_STYLE_IDS.length];
}

export function isCardStyleId(value: unknown): value is CardStyleId {
    return typeof value === 'string' && (CARD_STYLE_IDS as readonly string[]).includes(value);
}

// Golden-ratio step used to decouple the PRNG stream per style, so forcing a
// style different from the seed-derived one still produces distinct output.
const STYLE_SEED_STEP = 0x9e3779b9;

export function graphicSeed(seed: number, style: CardStyleId): number {
    return (seed + CARD_STYLE_IDS.indexOf(style) * STYLE_SEED_STEP) >>> 0;
}
