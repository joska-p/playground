import type { Palette } from "../config.js";
export interface CachedPalettes {
    palettes: Palette[];
    expiration: number;
    version: number;
}
declare function fetchPalettes(): Promise<Palette[]>;
export { fetchPalettes };
//# sourceMappingURL=fetch-palettes.d.ts.map