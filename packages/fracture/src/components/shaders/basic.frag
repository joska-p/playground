#version 300 es
precision highp float;

in vec2 v_coord; // Catch the coordinate from the vertex shader
out vec4 fragColor;

void main() {
  // Default background color (Green)
  vec3 color = vec3(0.1, 0.8, 0.4);

  // Define how thick we want our axis line to be
  float thickness = 0.01;

  // If the pixel's X is close to 0, or its Y is close to 0, color it White
  if (abs(v_coord.x) < thickness || abs(v_coord.y) < thickness) {
    color = vec3(1.0, 1.0, 1.0);
  }

  fragColor = vec4(color, 1.0);
}
