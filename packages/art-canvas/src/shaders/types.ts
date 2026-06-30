export type ShaderModule = {
  name: string;
  category: 'space' | 'shapes' | 'effects';
  code: string;
  // A template function that generates the actual GLSL function call line
  // e.g., "uv = repeatSpace(uv, 3.0);"
  getCall: (inputs: Record<string, string | number>) => string;
};
