export type UnicodeBlockConfig = {
  name: string;
  start: number; // e.g., 0x2200
  range: number; // number of symbols in the set
};

export type SymbolConverter = {
  name: string;
  config: UnicodeBlockConfig;
  fromText: (input: string) => string;
  fromHash: (input: string, outputLength?: number) => string;
};

export function createSymbolConverter(config: UnicodeBlockConfig): SymbolConverter {
  const { start, range } = config;

  // Build the lookup table once at creation time
  const lut: string[] = Array.from({ length: range }, (_, i) => String.fromCodePoint(start + i));

  return {
    name: config.name,
    config,

    fromText(input: string): string {
      let result = '';
      for (const char of input) {
        const codePoint = char.codePointAt(0) ?? 0;
        const index = codePoint % range;
        result += lut[index];
      }
      return result;
    },

    fromHash(input: string, outputLength?: number): string {
      // Simple FNV-1a hash to produce a seed
      let seed = 0x811c9dc5;
      for (let i = 0; i < input.length; i++) {
        seed ^= input.charCodeAt(i);
        seed = Math.imul(seed, 0x01000193);
      }
      seed >>>= 0;

      // Deterministic PRNG
      const rand = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      const len = outputLength ?? input.length;
      let result = '';

      for (let i = 0; i < len; i++) {
        const index = Math.floor(rand() * range);
        result += lut[index];
      }

      return result;
    }
  };
}

export const toAlchemical = createSymbolConverter({
  name: 'Alchemical Symbols',
  start: 0x1f700,
  range: 128
});

export const toMathOperators = createSymbolConverter({
  name: 'Mathematical Operators',
  start: 0x2200,
  range: 256
});

export const toRunic = createSymbolConverter({
  name: 'Runic',
  start: 0x16a0,
  range: 89
});

export const toCuneiform = createSymbolConverter({
  name: 'Cuneiform',
  start: 0x12000,
  range: 1024
});

export const toGlagolitic = createSymbolConverter({
  name: 'Glagolitic',
  start: 0x2c00,
  range: 96
});

export const toBraille = createSymbolConverter({
  name: 'Braille Patterns',
  start: 0x2800,
  range: 256
});

export const toGeoSymbols = createSymbolConverter({
  name: 'Misc Symbols & Arrows',
  start: 0x2b00,
  range: 256
});

export const toOgham = createSymbolConverter({
  name: 'Ogham',
  start: 0x1680,
  range: 32
});

export const toCanadianSyllabics = createSymbolConverter({
  name: 'Unified Canadian Aboriginal Syllabics',
  start: 0x1400,
  range: 640
});

export const EgyptianHieroglyphs = createSymbolConverter({
  name: 'Egyptian Hieroglyphs',
  start: 0x13000,
  range: 1072
});

// const secret = "hello world";

// console.log("Alchemical (Text):", toAlchemical.fromText(secret));
// console.log("Alchemical (Hash):", toAlchemical.fromHash(secret));

// console.log("Math (Text):      ", toMathOperators.fromText(secret));
// console.log("Math (Hash):      ", toMathOperators.fromHash(secret));

// console.log("Runic (Hash):     ", toRunic.fromHash(secret));
