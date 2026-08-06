export const plasmaFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 p = (vUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float d = length(p);
  float angle = atan(p.y, p.x);
  float wave = 0.5 + 0.5 * sin(d * 5.0 - u_time * 4.0 + angle * 2.0);
  vec3 color = mix(vec3(0.08, 0.05, 0.16), vec3(1.0, 0.35, 0.18), wave);
  out_color = vec4(color, 1.0);
}
`.trim();
