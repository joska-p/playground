#version 300 es
in vec2 position;
out vec2 v_coord; // Send this to the fragment shader

void main() {
  v_coord = position; // Pass the coordinate along
  gl_Position = vec4(position, 0.0, 1.0);
}
