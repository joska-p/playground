import { BUILDERS, graphicSeed, styleFromSeed } from './registry';
import { mulberry32, hashString, hashHex } from './rng';
import type { CardGraphic, CardStyleId } from './types';
export { SIZE } from './styles/common';

export function toSeed(input: string | number): number {
    return typeof input === 'number' ? input >>> 0 : hashString(input);
}

export function generateGraphic(style: CardStyleId, seed: number): CardGraphic {
    const rand = mulberry32(graphicSeed(seed, style));

    return BUILDERS[style](rand);
}

export interface CardVisual {
    style: CardStyleId;
    seed: number;
    hashHex: string;
    graphic: CardGraphic;
}

export function generateCardVisual(
    seedInput: string | number,
    styleOverride?: CardStyleId
): CardVisual {
    const seed = toSeed(seedInput);
    const style = styleOverride ?? styleFromSeed(seed);

    return {
        style,
        seed,
        hashHex: hashHex(seed),
        graphic: generateGraphic(style, seed)
    };
}
