import { atlasStore } from './store';

export const setSeed = (seed: string) => {
  atlasStore.setState({ seed });
};

export const setComplexity = (complexity: number) => {
  atlasStore.setState({ complexity });
};

export const setModulo = (modulo: number) => {
  atlasStore.setState({ modulo });
};

export const setPalette = (palette: string | number) => {
  atlasStore.setState({ palette: Number(palette) });
};

export const setGlitch = (glitch: string | number) => {
  atlasStore.setState({ glitch: Number(glitch) });
};

export const setSymbolType = (symbolType: string | number) => {
  atlasStore.setState({ symbolType: Number(symbolType) });
};
