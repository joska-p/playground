#version 300 es

uniform vec2 uPosition;
uniform float uPointSize;

void main() {
  gl_Position = vec4(uPosition, 0.0, 1.0);
  gl_PointSize = uPointSize;
}
