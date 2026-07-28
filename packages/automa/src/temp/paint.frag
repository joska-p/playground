#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_stateTexture;
uniform vec2 u_mouse;       // Mouse normalized grid position [0..1]
uniform float u_brushSize;  // Radius in normalized units
uniform float u_value;      // 1.0 for add, 0.0 for erase
uniform vec2 u_resolution;  // Grid dimensions

void main() {
    vec4 current = texture(u_stateTexture, v_uv);

    // Correct aspect ratio for circular brush
    vec2 diff = (v_uv - u_mouse) * vec2(u_resolution.x / u_resolution.y, 1.0);
    float dist = length(diff);

    if (dist < u_brushSize) {
        fragColor = vec4(u_value, u_value, u_value, 1.0);
    } else {
        fragColor = current; // Retain existing state
    }
}
