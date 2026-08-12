import type Color from 'colorjs.io';

/**
 * A derived color palette wrapping an array of computed colors.
 */
export type Palette = {
    /** The computed colors comprising the palette. */
    colors: Color[];
};

/**
 * A color harmony rule contract defining an application function and metadata.
 */
export type Rule = {
    /** Generates derived colors from a base color. */
    apply: (color: Color) => Color[];
    /** Display information for the harmony rule. */
    info: {
        name: string;
        description: string;
    };
};

