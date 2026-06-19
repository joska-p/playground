export type AnimationBehavior = {
  id: string;
  name: string;
  // GLSL function definition
  glslFunction: string;
  // How to apply it in the shader
  // "spatial" applies to UV before evaluation
  // "color" applies to final color
  type: 'spatial' | 'color';
  // Code to insert in main()
  applyCode: (timeVar: string, speedVar: string) => string;
};

export const hueShiftBehavior: AnimationBehavior = {
  id: 'hue-shift',
  name: 'Hue Shift',
  glslFunction: `
vec3 hueRotate(vec3 color, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(
    (0.299 + 0.701*c + 0.168*s) * color.r + (0.587 - 0.587*c + 0.330*s) * color.g + (0.114 - 0.114*c - 0.331*s) * color.b,
    (0.299 - 0.299*c - 0.328*s) * color.r + (0.587 + 0.413*c + 0.035*s) * color.g + (0.114 - 0.114*c + 0.292*s) * color.b,
    (0.299 - 0.299*c + 1.250*s) * color.r + (0.587 - 0.587*c - 1.050*s) * color.g + (0.114 + 0.886*c - 0.203*s) * color.b
  );
}
`,
  type: 'color',
  applyCode: (timeVar, speedVar) => `color = hueRotate(color, ${timeVar} * ${speedVar});`
};

export const zoomBehavior: AnimationBehavior = {
    id: 'zoom',
    name: 'Zoom',
    glslFunction: ``, // No extra function needed, just math
    type: 'spatial',
    applyCode: (timeVar, speedVar) => `uv *= (1.0 + 0.5 * sin(${timeVar} * ${speedVar}));`
};

export const wobbleBehavior: AnimationBehavior = {
    id: 'wobble',
    name: 'Wobble',
    glslFunction: ``,
    type: 'spatial',
    applyCode: (timeVar, speedVar) => `uv += 0.1 * vec2(sin(${timeVar} * ${speedVar}), cos(${timeVar} * ${speedVar}));`
};

export const rotateBehavior: AnimationBehavior = {
    id: 'rotate',
    name: 'Rotate',
    glslFunction: `
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
`,
    type: 'spatial',
    applyCode: (timeVar, speedVar) => `uv = rotate2d(${timeVar} * ${speedVar} * 0.5) * uv;`
};

export const animationRegistry: AnimationBehavior[] = [
    hueShiftBehavior,
    zoomBehavior,
    wobbleBehavior,
    rotateBehavior
];
