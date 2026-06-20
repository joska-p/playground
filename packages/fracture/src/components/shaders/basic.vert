#version 300 es

layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aPointSize;
layout(location = 2) in vec3 aColor;

out vec3 vColor;

void main() {
  vColor = aColor;
  gl_Position = vec4(aPosition, 0.0, 1.0);
  gl_PointSize = aPointSize;
}
